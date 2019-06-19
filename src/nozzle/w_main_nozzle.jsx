import React, { Component, PropTypes } from 'react';

import { get_NOZZLE } from '../core/core_Function.jsx';

import List_nozzle from './list_nozzle.jsx';
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
function Delete_Stategun(data, dataF) {
    var indices = [];
    if (data != null && dataF != null) {
        var indices = [];
        let t = 0;
        for (let index = 0; index < data.length; index++) {

            if (dataF.indexOf(data[index].stategun) == -1) {
                indices[t] = data[index];
                t++;
            }
        }
    }
    return indices;
}


export default class w_main_nozzle extends React.Component {
    constructor(props) {
        super(props);
        this.SetFilters = this.SetFilters.bind(this);
        this.state = {
            _NOZZLE: null,


            _Fuels: null,
            _Status: null,
            _State: null,
            _Azs: null,
            _Stategun: null,

        }
    }
    componentDidMount() {
        this.setState({ _NOZZLE: get_NOZZLE().nozzle });
    }

    SetFilters() {
        this.setState({ _NOZZLE: null });
        let _noz = get_NOZZLE().nozzle;


        if (this.state._Stategun != null) {
            _noz = Delete_Stategun(_noz, this.state._Stategun);
        }
        if (this.state._Azs != null) {
            _noz = Delete_Azs(_noz, this.state._Azs);
        }        
        if (this.state._Status != null) {
            _noz = Delete_Status(_noz, this.state._Status);
        }
        if (this.state._Fuels != null) {
            _noz = Delete_Fuels(_noz, this.state._Fuels);
        }
        if (this.state._State != null) {
            _noz = Delete_State(_noz, this.state._State);
        }
        this.setState({ _NOZZLE: _noz });
    }

    update_Stategun = (Stategun) => {
        this.setState({ _Stategun: Stategun }, this.SetFilters);
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
                    update_Stategun={this.update_Stategun}
                />
                <hr /><hr />
                <List_nozzle nozzles={this.state._NOZZLE} />
            </div>
        );
    }
}
