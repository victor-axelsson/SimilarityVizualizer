import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from 'core/colors'
import { CONSTANTS } from 'core/constants'
//import { onEdge, onSnapshot } from '../../core/socket';
import VisGraph from 'react-graph-vis';

class Graph extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {
            nodes: [], 
            edges: [],
            nodeKeys: {},
            edgeKeys: {},
            graphData: {
                nodes: [],
                edges: []
            }
        };
    }

    addListenerForEdge(){
        var nodeKey = "local_node"
        var counter = 0; 

        onEdge(nodeKey, (err, edge) => {
            var nodes = this.state.nodes.slice(); 
            var edges = this.state.edges.slice(); 
            var edgeKeys = this.state.edgeKeys; 
            var nodekeys = this.state.nodeKeys; 

            //console.log(edge)
            edge.forEach((e) => {

                console.log(e)
                if(e.weight > 1){

                    if(!(e.from in nodekeys)){
                        nodekeys[e.from] = 1
                        nodes.push({id: e.from, label: e.from})
                    }

                    if(!(e.to in nodekeys)){
                        nodekeys[e.to] = 1
                        nodes.push({id: e.to, label: e.to})
                    }

                    if(!(e.from + "->" + e.to in edgeKeys)){
                        edgeKeys[e.from + "->" + e.to] = 1
                        e.id = counter; 
                        e.value = e.weight; 
                        counter++;
                        edges.push(e)
                    }
                }
            })
            
            //Build new graph state
            var newGraphData = Object.assign({}, this.state.graphData); 
            newGraphData.nodes = nodes; 
            newGraphData.edges = edges; 

            //Update state
            this.setState({
                nodes: nodes,
                edges: edges, 
                nodekeys: nodekeys, 
                edgeKeys: edgeKeys,
                graphData: newGraphData
            });

            //It needs to be explicitly updated
            if(this.visGraph && !this.props.selectedSnapshot){
               this.visGraph.updateGraph(); 
            }
        })   
    }

    addListenerForSnapshot(){
        var nodeKey = "local_node"; 

        onSnapshot(nodeKey, (err, processTime) => {
            console.log("Received snapshot..")
            var newGraphData = Object.assign({}, this.state.graphData); 
            this.props.storeSnapshot(newGraphData, processTime); 
        }); 
    }

    componentDidMount() {
        this.addListenerForEdge(); 
        this.addListenerForSnapshot(); 
    }

    render() {
        var options = {
            layout: {
                hierarchical: false
            },
            edges: {
                color: "#000000"
            },
            nodes: {
                shape: 'dot'
            },
            physics:{
                solver: 'barnesHut',
                barnesHut:{
                    centralGravity: 0.4,
                    damping: 0.4,
                    springLength: 120,
                    avoidOverlap: 0.9
                }
            }
        }
         
        var events = {
            select: function(event) {
                console.log(event)
            }
        }   

        console.log(this.props.selectedSnapshot)

        return (
            <div style={{flex: 1}}>
                <VisGraph graph={this.props.selectedSnapshot || this.state.graphData} ref={(g) => {
                    this.visGraph = g; 
                }} options={options} events={events} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedSnapshot: state.appState.selectedSnapshot
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        storeSnapshot : (data, processTime) => {
            dispatch({
                type:CONSTANTS.STORE_SNAPSHOT,
                payload: {
                    data: data,
                    processTime: processTime
                }
            })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);