import React, { Component, PropTypes } from 'react';

import { get_NOZZLE } from '../core/core_Function.jsx';

import List_nozzle from './list_nozzle.jsx';

const _Debuge = false;


export default class w_main_nozzle extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            _NOZZLE :null,

        }
    }
    componentDidMount() {
        this.setState({ _NOZZLE: get_NOZZLE().nozzle });
    }


    render() {
        return (
            <div>
                <center><h4>{this.props.header}</h4></center>
                <hr /><hr />
                <hr /><hr />
                <List_nozzle nozzles={this.state._NOZZLE}/>
            </div>
        );
    }
}
