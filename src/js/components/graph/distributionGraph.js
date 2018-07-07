import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from 'core/colors'
import { CONSTANTS } from 'core/constants'
import VisGraph from 'react-graph-vis';
const ReactHighcharts = require('react-highcharts'); 


class DistributionGraph extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {}
    }

    componentDidMount() {}

    getDevices(){
        return this.props.distribution.sortedItems.map((item) => {
            return item.item
        })
    }

    getValues(){
        var selectedKeys = {}
        if(this.props.selected){
            this.props.selected.forEach((item) => {
                selectedKeys[item] = 1
            })
        }

        return this.props.distribution.sortedItems.map((item, i) => {
            return {
                y: item.val,
                x: i,
                name: item.item,
                color: item.item in selectedKeys ? "red" : "#CCC"
            }
        })
    }

    getConfig(){
        return {
            exporting: {
                enabled: true
            },
            chart: {
                type: 'column',
                zoomType:'xy',
                panning: true,
                panKey: 'shift'
            },
            title: {
                text: 'Device distribution'
            },
            subtitle: {
                text: 'Device frequency count over training set sessions'
            },
            xAxis: {
                categories: this.getDevices(),
                title: {
                    text: null
                }
            },
            plotOptions: {
                series: {
                    turboThreshold: 20000
                }
            },
            yAxis: {
                min: 1,
                type: 'logarithmic',
                title: {
                    text: 'Frequency',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify',
                },
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Frequency',
                data: this.getValues(),
                dataLabels: {
                    formatter: function () {
                        return this.y
                    },
                }
            }]
        }
    }

    render() {

        if(!!this.props.distribution){
            return (
                <div>
                    <ReactHighcharts config = {this.getConfig()}></ReactHighcharts>
                </div>
            );
        }else{
            return (
                <div>
                    <p>Loading graph distribution...</p>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        distribution: state.appState.distribution
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DistributionGraph);