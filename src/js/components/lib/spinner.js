import React, { Component } from 'react'
import { CONSTANTS } from 'core/constants'
import { connect } from 'react-redux'

const Spinner = ({visible}) => {
    if (visible) {
        return (
            <div>
                <img src={ CONSTANTS.LOCAL_FILE_SERVER + "spinner.gif" } />
            </div>
            );
    } else {
        return (
            <div></div>
        );
    }

}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);