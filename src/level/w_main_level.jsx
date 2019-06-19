import React, { Component, PropTypes } from 'react';

import { get_DateRSS, get_Rss_ID, get_PL } from '../core/core_Function.jsx';


import Header from '../control/header.jsx';
import TreeDevice from '../control/treeDevice.jsx';

import List_pl from './list_pl.jsx'
import FILTER from './filters.jsx'

const _Debuge = false;


function Delete_Status(data, dataF) {
    var indices = [];
    if (data != null && dataF != null) {
        var indices = [];
        let t = 0;
        for (let index = 0; index < data.length; index++) {

            if (dataF.indexOf(data[index].status) == -1) {
                indices[t] = data[index];
                t++;
            }
        }
    }
    return indices;
}
function Delete_Fuels(data, dataF) {
    var indices = [];
    if (data != null && dataF != null) {
        var indices = [];
        let t = 0;
        for (let index = 0; index < data.length; index++) {

            if (dataF.indexOf(data[index].fuel.toUpperCase()) == -1) {
                indices[t] = data[index];
                t++;
            }
        }
    }
    return indices;
}
function Delete_Azs(data, dataF) {
    var indices = [];
    if (data != null && dataF != null) {
        var indices = [];
        let t = 0;
        for (let index = 0; index < data.length; index++) {

            if (dataF.indexOf(data[index].azs.toUpperCase()) == -1) {
                indices[t] = data[index];
                t++;
            }
        }
    }
    return indices;
}
function Delete_State(data, dataF) {
    var indices = [];
    if (data != null && dataF != null) {
        var indices = [];
        let t = 0;
        for (let index = 0; index < data.length; index++) {

            if (dataF.indexOf(data[index].state) == -1) {
                indices[t] = data[index];
                t++;
            }
        }
    }
    return indices;
}



export default class w_main_azk extends React.Component {
    constructor(props) {
        super(props);
        this.SetFilters = this.SetFilters.bind(this);
        this.state = {

            _Pls: null,

            _Fuels: null,
            _Status: null,
            _State: null,
            _Azs: null,
        }
    }
    componentDidMount() {
        this.setState({ _Pls: get_PL().pl });
    }
    SetFilters() {
        let _pls = get_PL().pl;
        if (this.state._Status != null) {
            _pls = Delete_Status(_pls, this.state._Status);
        }
        if (this.state._Fuels != null) {
            _pls = Delete_Fuels(_pls, this.state._Fuels);
        }
        if (this.state._Azs != null) {
            _pls = Delete_Azs(_pls, this.state._Azs);
        }
        if (this.state._State != null) {
            _pls = Delete_State(_pls, this.state._State);
        }
        this.setState({ _Pls: _pls });
    }

    update_Fuels = (Fuels) => {
        this.setState({ _Fuels: Fuels }, this.SetFilters);
    }

    update_Status = (Status) => {
        this.setState({ _Status: Status }, this.SetFilters);
    }
    update_Azs = (Azs) => {
        this.setState({ _Azs: Azs }, this.SetFilters);
    }
    update_State = (State) => {
        this.setState({ _State: State }, this.SetFilters);
    }


    render() {
        return (
            <div>
                <center><h4>{this.props.header}</h4></center>
                <hr /><hr />
                <FILTER
                    update_Fuels={this.update_Fuels}
                    update_Status={this.update_Status}
                    update_Azs={this.update_Azs}
                    update_State={this.update_State}
                />
                <hr /><hr />
                <List_pl pls={this.state._Pls} />
            </div>
        );
    }
}
