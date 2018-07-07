import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from 'core/colors'
import { CONSTANTS } from 'core/constants'
import styles from './logout.css'
import { logoutUser } from '../../api/userApi'
import Button from './button'

class Logout extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() { }

    onLogout(){
        this.props.logout(); 
    }

    render() {
        return (
            <div className={ styles.container }> 
                <Button onClick={this.onLogout.bind(this)}>Logout</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            logoutUser(dispatch); 
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);