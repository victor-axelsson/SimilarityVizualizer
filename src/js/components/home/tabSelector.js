import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from 'core/colors'
import { CONSTANTS } from 'core/constants'
import TimeLabel from '../lib/timeLabel'

class TabSelector extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() {}

    onSnapshotSelect(snapshot){
        console.log("Selecting snapshot", snapshot)

        this.props.selectSnapshot(snapshot); 
    }

    renderTabs(){
        if(this.props.snapshots.length == 0){
            return (
                <div>
                    <p style={{marginRight: 2, padding: 10}}>Collecting snapshot...</p>
                </div>
            );
        }

        return this.props.snapshots.map((snapshot) => {

            let tag = (<TimeLabel timestamp={snapshot.processTime} />); 

            if(snapshot.processTime == this.props.selectedProcessTime){
                tag = (
                    <p style={{backgroundColor: '#CCC', padding: 10}}>
                        <TimeLabel timestamp={snapshot.processTime} />
                    </p>
                ); 
            }

            return (
                <div key={snapshot.processTime + "tab"} style={{marginRight: 2, padding: 10, width: 80}} onClick={() => {
                    this.onSnapshotSelect(snapshot); 
                }}>
                    { tag }
                </div>
            );
        });
    }

    render() {
        return (
            <div style={{flexDirection:'row'}}>
                { this.renderTabs() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        snapshots: state.appState.snapshots,
        selectedProcessTime: state.appState.selectedProcessTime
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectSnapshot: (snapshot) => {
            dispatch({
                type:CONSTANTS.ON_SNAPSHOT_SELECT, 
                payload: snapshot
            })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TabSelector);