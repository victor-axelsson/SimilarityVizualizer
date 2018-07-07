import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CONSTANTS } from 'core/constants'
import styles from './footer.css'


class Footer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() {}

    render() {
        return (
            <div className={ styles.container }>
                <div className={ styles.innerContainer }>
                    <p>Footer</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);