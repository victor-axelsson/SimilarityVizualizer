import React, { Component } from 'react'
import { CONSTANTS } from 'core/constants'
import { connect } from 'react-redux'

const TimeLabel = ({timestamp}) => {

    var d = new Date(timestamp); 
    let hours = d.getHours() < 10 ? "0" + d.getHours() :  d.getHours(); 
    let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes(); 
    let seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds(); 

    return (
        <p>{hours}:{minutes}:{seconds}</p>
    );
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeLabel);