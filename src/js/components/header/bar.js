import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CONSTANTS } from 'core/constants'
import styles from './bar.css'
import { COLORS } from 'core/colors'

class Bar extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() {}

    render() {
        var nameLabel = (<div></div>); 

        return (
            <div className={ styles.container }>
                <div className={ styles.innerContainer }>
                    <h1>{this.props.title}</h1>
                </div>
                <div style={{position: 'absolute', right: 10, top: 5}}>
                    {nameLabel}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        title: state.navigation.route.title,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Bar);