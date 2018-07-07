import React, { Component } from 'react'
import { CONSTANTS } from 'core/constants'
import { connect } from 'react-redux'

const InputBox = ({placeholder, onChange}) => {
    return (
        <input 
            type="text" 
            placeholder={placeholder}
            style={{height: 45, margin:5, padding: 5}}
            onChange={(e) => {
                onChange(e.target.value); 
            }}
            />
    );
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);