import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from 'core/colors'
import { CONSTANTS } from 'core/constants'
import VisGraph from 'react-graph-vis';

class SimilarityGraph extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {
            filter: 0,
            keepNodes: false
        }
    }

    componentDidMount() {}


    getFilteredGraph(){

        var keptNodes = {}
        var edges = this.props.simGraph.edges.filter((e) => {
            var keep =  e.value > this.state.filter
            if(keep){
                keptNodes[e.from] = 1
                keptNodes[e.to] = 1
                
            }
            return keep
        })

        var nodes = this.props.simGraph.nodes;

        if(!this.state.keepNodes){
           nodes = nodes.filter((n) => {
                return n.id in keptNodes
           })
        }

        return {
            nodes: nodes,
            edges : edges
        }
    }

    render() {
        var options = {
            layout: {
                hierarchical: false
            },
            edges: {
                color: {
                    highlight: 'red'
                }
            },
            nodes: {
                shape: 'dot',
                color: {
                    highlight: 'red'
                }
            },
            physics:{
                solver: 'barnesHut',
                barnesHut:{
                    centralGravity: 0.4,
                    damping: 0.4,
                    springLength: 220,
                    avoidOverlap: 0.01
                }
            }
        }
        
        var that = this
        var events = {
            select: function(event) {
                that.props.onSelect(event.nodes)
            }
        }   

        if(!this.props.simGraph){
            return (
                <div style={{flex: 1}}>
                    <p>Waiting for graph</p>
                </div>
            )
        }

        var graph = {
          nodes: [
              {id: "a", label: 'Node 1->a'},
              {id: 2, label: 'Node 2'},
              {id: 3, label: 'Node 3'},
              {id: 4, label: 'Node 4'},
              {id: 5, label: 'Node 5'}
            ],
          edges: [
              {from: "a", to: 2},
              {from: "a", to: 3},
              {from: 2, to: 4},
              {from: 2, to: 5}
            ]
        };

        var graph = this.getFilteredGraph()

        return (
            <div style={{width: 800, height: 800}}>
                <input type="range" min="-1" max="1" step="0.01" value="0" className="slider" value={this.state.filter} onChange={(e) => {
                    this.setState({
                        filter: e.target.value
                    })
                }} />
                <p>Keep nodes when filtering</p>
                <input type="checkbox" value={this.state.showNodes} onChange={(e) => {
                    this.setState({
                        keepNodes: e.target.value
                    })
                }} />
                
                <VisGraph graph={graph} ref={(g) => {
                    this.visGraph = g; 
                }} options={options} events={events} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        simGraph: state.appState.simGraph,
        simThreshold: state.appState.simThreshold
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SimilarityGraph);