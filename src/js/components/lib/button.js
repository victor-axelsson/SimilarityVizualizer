import React, { Component } from 'react'
import { CONSTANTS } from 'core/constants'
import { COLORS } from 'core/colors'
import { connect } from 'react-redux'
import styles from './button.css'

class Button extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() {}


    getBackgroundColor() {
        if (this.props.backgroundColor && this.props.backgroundColor == 'green') {
            return styles.greenButton;
        }
    }

    render() {
        return (<button className={ 'btn ' + styles.btn + ' ' + this.props.className + ' ' + this.getBackgroundColor() }
                    onClick={ this.props.onClick.bind(this) }>
                    { this.props.children }
                </button>);
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Button);


