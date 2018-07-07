import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from 'core/colors'
import { CONSTANTS } from 'core/constants'
import InputBox from '../lib/inputBox'
import Button from '../lib/button'
import { getSessionSimilarity, getSimilarDevice, getDistribution } from '../../api/similarityApi'
import SimilarityGraph from '../graph/similarityGraph'
import DistributionGraph from '../graph/distributionGraph'

class Similarity extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {
            form: {
                devices: [],
                allSelected: null
            },
            showDistribution: true
        };
    }

    componentDidMount(){
        this.props.getDeviceSimilarity()
    }

    replaceAll(str, search, replacement) {
        return str.replace(new RegExp(search, 'g'), replacement);
    }

    onPost(){
        var devices = this.state.form.devices

        if(devices.length > 1){
            if(devices.length > 50){
                console.log("Too many items. This requests builds a carthesian product take2: n*(n -1) / 2 edges. In your case: " + devices.length * devices.length -1 /2 + " edges would blow up your browser.")
            }else{
                this.props.getGraph(devices)
            }   
        }
    }

    checkSimilarToThis(){
        var device = this.replaceAll(this.state.form.devices[0], "\"", "").trim()
        this.props.getSimGraph(device)
    }

    render() {
        return (
            <div>
                <InputBox placeholder="Device or devices" onChange={(val) => {
                    var form = this.state.form; 
                    form.devices = this.replaceAll(val, "\"", "").split(",").map((item) => {
                        return item.trim()
                    })
                    this.setState({form: form})
                }}/>
                <Button  onClick={() => {
                    var form = this.state.form; 
                    form.allSelected = form.devices
                    this.setState({form: form})
                    this.onPost()
                }}>
                    <p>Check Intra Similarity</p>
                </Button>
                 <Button onClick={() => {
                    this.checkSimilarToThis()
                }}>
                    <p>Check Similar to this</p>
                </Button>
                <SimilarityGraph onSelect={(devices) => {
                    var form = this.state.form; 
                    form.devices = devices
                    form.allSelected = devices
                    this.setState({form: form})
                }}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        distribution: state.appState.distribution
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGraph: (devices) => {
            getSessionSimilarity(devices, dispatch)
        },
        getSimGraph: (device) => {
            getSimilarDevice(device, dispatch)
        },
        getDeviceSimilarity: () =>{
            getDistribution(dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Similarity);