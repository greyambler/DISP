import React, { Component, PropTypes } from 'react';

import {
    get_TRK, get_VIEW_VIDGs,
    IsExistAZS, get_ETALON_AZS, get_Mas_MAS_S,
    compare_storage_space, compare_azs
} from '../core/core_Function.jsx';

import List_trk from './list_trk.jsx';
import FILTER from './filters.jsx'

import moment from 'moment';

const _Debuge = true;
const _Debuge_update_Pls = false;
const _Debuge_Mess = false;


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
function Delete_StateGun(data, dataF) {
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
function Delete_Pump(data, dataF) {
    var indices = [];
    if (data != null && dataF != null) {
        var indices = [];
        let t = 0;
        for (let index = 0; index < data.length; index++) {

            if (dataF.indexOf(data[index].pump.toUpperCase()) == -1) {
                indices[t] = data[index];
                t++;
            }
        }
    }
    return indices;
}
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
function get_Mass_View(mas_Vidg) {
    let View_Fields = new Array();
    for (const nameView of mas_Vidg) {
        if (nameView.value == 'selectAll') {
            View_Fields.push('vidget');
            View_Fields.push('data');

            View_Fields.push('icon_alarm');
            View_Fields.push('status_alarm');
            View_Fields.push('state_alarm');

            View_Fields.push('pump');
            View_Fields.push('Counter_Curent');
            View_Fields.push('fuel');
            View_Fields.push('nozzle');
            View_Fields.push('date');
            View_Fields.push('time');
            View_Fields.push('status');
            View_Fields.push('state');
        }
        if (nameView.value == 'vidget') {
            View_Fields.push('vidget');
            View_Fields.push('icon_alarm');
            View_Fields.push('status_alarm');
            View_Fields.push('state_alarm');
        }
        if (nameView.value == 'data') {
            View_Fields.push('data');
            View_Fields.push('pump');
            View_Fields.push('Counter_Curent');
            View_Fields.push('fuel');
            View_Fields.push('nozzle');
            View_Fields.push('date');
            View_Fields.push('time');
            View_Fields.push('status');
            View_Fields.push('state');
        }
        if (nameView.value == 'icon_alarm') { View_Fields.push('icon_alarm'); }
        if (nameView.value == 'status_alarm') { View_Fields.push('status_alarm'); }
        if (nameView.value == 'state_alarm') { View_Fields.push('state_alarm'); }
        if (nameView.value == 'pump') { View_Fields.push('pump'); }
        if (nameView.value == 'Counter_Curent') { View_Fields.push('Counter_Curent'); }
        if (nameView.value == 'fuel') { View_Fields.push('fuel'); }
        if (nameView.value == 'nozzle') { View_Fields.push('nozzle'); }
        if (nameView.value == 'date') { View_Fields.push('date'); }
        if (nameView.value == 'time') { View_Fields.push('time'); }
        if (nameView.value == 'status') { View_Fields.push('status'); }
        if (nameView.value == 'state') { View_Fields.push('state'); }
    }
    return View_Fields;
}




export default class w_main_trk extends React.Component {
    constructor(props) {
        super(props);
        //this.SetFilters = this.SetFilters.bind(this);
        this.update_VV_TREE = this.update_VV_TREE.bind(this);
        this.state = {
            _Trk: null,

            _Azs: this.props.azs,
            _Fuels: this.props.fuels,
            _Status: null,
            _State: null,

            _Stategun: null,

            _View_Vidg: null,

            _View_Icon: false,
            _View_Data: false,

            View_Fields: get_Mass_View([{ value: 'selectAll' }]),

        }
    }
    componentDidMount() {
        this.setState({ _Trk: get_TRK().trk });
    }
    componentDidUpdate(prevProps) {
        if (this.props.azs != prevProps.azs) {
            this.setState({ _Azs: this.props.azs }, this.SetFilters);
        }
        if (this.props.fuels != prevProps.fuels) {
            this.setState({ _Fuels: this.props.fuels }, this.SetFilters);
        }
    }
    SetFilters() {
        this.setState({ _Trk: null });
        let _trk;
        if (_Debuge) {
            _trk = get_TRK().trk;
        } else {
            if(this.state._Object != undefined)
            _trk = this.state._Object.trk;
        }

        if (this.state._Stategun != null) {
            _trk = Delete_StateGun(_trk, this.state._Stategun);
        }
        if (this.state._Pump != null) {
            _trk = Delete_Pump(_trk, this.state._Pump);
        }
        if (this.state._Azs != null) {
            _trk = Delete_Azs(_trk, this.state._Azs);
        }
        if (this.state._Status != null) {
            _trk = Delete_Status(_trk, this.state._Status);
        }
        if (this.state._Fuels != null) {
            _trk = Delete_Fuels(_trk, this.state._Fuels);
        }
        if (this.state._State != null) {
            _trk = Delete_State(_trk, this.state._State);
        }
        this.setState({ _Trk: _trk });
    }
    update_VIEW_VIDG = (View_Vidg) => {
        if (View_Vidg != null) {
            let _view_Icon = true;
            let _view_Data = true;
            for (const iterator of View_Vidg) {
                if (iterator == "виджет") {
                    _view_Icon = false;
                }
                if (iterator == "данные") {
                    _view_Data = false;
                }
            }
            this.setState({ _View_Icon: _view_Icon, _View_Data: _view_Data });
        } else {
            this.setState({ _View_Icon: true, _View_Data: true });
        }
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
    update_Pump = (Pump) => {
        this.setState({ _Pump: Pump }, this.SetFilters);
    }
    update_VV_TREE = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            //this.setState({ _View_Icon: false, _View_Data: false, View_Fields: new Array() });
            this.setState({ View_Fields: _View_Fields });
        } else {
            let _view_Icon = false;
            let _view_Data = false;
            _View_Fields = get_Mass_View(View_Vidg);
            /*
                     for (const iterator of View_Vidg) {
         
                      
                         if (iterator.value == "is_selectAll") {
                             _view_Icon = true;
                             _view_Data = true;
                             break;
                         }
                         if (iterator.label == "виджет") {
                             _view_Icon = true;
                         }
                         if (iterator.label == "данные") {
                             _view_Data = true;
                         }
                         
                     }*/
            //this.setState({ _View_Icon: _view_Icon, _View_Data: _view_Data, View_Fields: _View_Fields });
            this.setState({ View_Fields: _View_Fields });
        }
    }
    update_Trk = (J_TRK) => {
        try {
            if (J_TRK != undefined &&  J_TRK != "") {
                let Item = JSON.parse(J_TRK);
                if (this.state._Trk != null) {
                    for (const iterator of this.state._Trk) {
                        if (Item.id == iterator.id) {
                            for (var key in Item) {
                                if (key != "id") {
                                    let date = moment().local('ru').format('HH-mm-ss');
                                    iterator[key] = (_Debuge_Mess) ? Item[key] + "  [ws]" : Item[key];
                                }
                            }
                        }
                    }
                    this.setState({ _Trk: this.state._Trk });
                }
            }
        } catch (error) {
            let r = 0;
        }
    }

    render() {
        if (this.state._Trk != null) {
            let _TRK_Filter = this.state._Trk.sort(compare_azs);
            let E_AZS = undefined;
            let _TRK = undefined;
            if (this.props.isHiFilter) {
                E_AZS = get_ETALON_AZS(this.state._Trk);
                _TRK = get_Mas_MAS_S(this.state._Trk, E_AZS);
            }
            return (
                <div>
                    <center><h4>{this.props.header}</h4></center>
                    <hr /><hr />
                    <FILTER
                        update_VV_TREE={this.update_VV_TREE}

                        update_VIEW_VIDG={this.update_VIEW_VIDG}
                        trk={_TRK_Filter}
                        update_Fuels={this.update_Fuels}
                        update_Status={this.update_Status}
                        update_Azs={this.update_Azs}
                        update_State={this.update_State}
                        update_Stategun={this.update_Stategun}
                        update_Pump={this.update_Pump}
                        isAZS={this.props.isAZS}
                        isFUEL={this.props.isFUEL}
                    />
                    <hr /><hr />
                    {this.state._Trk != null &&
                        <List_trk
                            trk={_TRK_Filter}
                            trk_Mass={_TRK}
                            update_Trk={this.update_Trk}
                            View_Icon={this.state._View_Icon}
                            View_Data={this.state._View_Data}
                            View_Fields={this.state.View_Fields}
                        />
                    }
                </div>
            );
        } else {
            return <h4><center>Нет связи с сервером!!</center></h4>
        }

    }
}
