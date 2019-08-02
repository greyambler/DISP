import React, { Component, PropTypes } from 'react';

import {
    get_DateRSS, get_Rss_ID, get_PL,
    IsExistAZS, get_ETALON_AZS, get_Mas_MAS_S,
    compare_storage_space, compare_azs
} from '../core/core_Function.jsx';


import Header from '../control/header.jsx';
import TreeDevice from '../control/treeDevice.jsx';

import List_pl from './list_pl_icon.jsx'
import FILTER from './filters.jsx'

import moment from 'moment';

const _Debuge = false;
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

let _CURENT_VOLUME = 2000;
let _density = 754;
let _temperature = 17;
let _TOTAL_WATER = 200;



export default class w_main_azk extends React.Component {
    constructor(props) {
        super(props);
        this.SetFilters = this.SetFilters.bind(this);
        this.tick = this.tick.bind(this);
        this.state = {
            _Pls: null,

            _Azs: this.props.azs,
            _Fuels: this.props.fuels,
            _Status: null,
            _State: null,

            Rss: this.props.Rss,
            _Object: null,

            _View_Vidg: null,
            _View_Icon: true,
            _View_Data: true,
        }
    }
    componentDidMount() {
        if (_Debuge) {
            this.setState({ _Pls: get_PL().pl });
        } else {
            this.tick();
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.Rss != prevProps.Rss) {
            this.setState({ Rss: this.props.Rss }, this.tick);
        }
        if (this.props.azs != prevProps.azs) {
            this.setState({ _Azs: this.props.azs }, this.SetFilters);
        }
        if (this.props.fuels != prevProps.fuels) {
            this.setState({ _Fuels: this.props.fuels }, this.SetFilters);
        }
    }
    async tick() {

        let rss = this.state.Rss;
        var myRequest = new Request(rss);

        try {
            var response = await fetch(myRequest,
                {
                    method: 'GET',
                    headers:
                    {
                        'Accept': 'application/json',
                    },
                }
            );
            if (response.ok) {
                const Jsons = await response.json();
                this.setState({ _Object: Jsons, _Pls: Jsons.pl });
            }
            else {
                throw Error(response.statusText);
            }
            this.setState({ isExistError: false })
        }
        catch (error) {
            this.setState({ isExistError: true })
            console.log(error);
        }
    }
    SetFilters() {
        let _pls;
        if (_Debuge) {
            _pls = get_PL().pl;
        } else {
            _pls = this.state._Object.pl;
        }

        if (_pls != null) {
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
    update_Pls = (J_PL) => {
        if (_Debuge_update_Pls) {
            if (this.state._Pls != null) {
                for (const iterator of this.state._Pls) {
                    if (iterator.id != 0) {
                        iterator.CURENT_VOLUME = _CURENT_VOLUME += 30;
                        iterator.density = _density += 7;
                        iterator.temperature = _temperature += 3;
                        iterator.TOTAL_WATER = _TOTAL_WATER += 12;
                    }
                }
                this.setState({ _Pls: this.state._Pls });
            }
        } else {
            try {
                if (J_PL != undefined && J_PL != "") {
                    let Item = JSON.parse(J_PL);
                    if (this.state._Pls != null) {
                        for (const iterator of this.state._Pls) {
                            if (Item.id == iterator.id) {
                                for (var key in Item) {
                                    if (key != "id") {
                                        let date = moment().local('ru').format('HH-mm-ss');
                                        iterator[key] = (_Debuge_Mess) ? Item[key] + "  [ws]" : Item[key];
                                    }
                                }
                            }
                        }
                        this.setState({ _Pls: this.state._Pls });
                    }
                }
            } catch (error) {

            }


            /*
            if (Item.CURENT_VOLUME != null && Item.density != null && Item.temperature != null && Item.TOTAL_WATER != null) {
                if (this.state._Pls != null) {
                    for (const iterator of this.state._Pls) {
                        if (Item.id == iterator.id) {
                            iterator.CURENT_VOLUME = Item.CURENT_VOLUME;
                            iterator.density = Item.density;
                            iterator.temperature = Item.temperature;
                            iterator.TOTAL_WATER = Item.TOTAL_WATER;
                        }
                    }
                    this.setState({ _Pls: this.state._Pls });
                }
            }*/

        }
    }

    render() {
        if (this.state._Pls != null) {
            let _PLS_Filter = this.state._Pls;
            let E_AZS = undefined;
            let _PLS = undefined;
            if (this.props.isHiFilter) {
                E_AZS = get_ETALON_AZS(this.state._Pls);
                _PLS = get_Mas_MAS_S(this.state._Pls, E_AZS);
            }
            return (
                <div>
                    <center><h4>{this.props.header}</h4></center>
                    <hr /><hr />
                    <FILTER
                        update_VIEW_VIDG={this.update_VIEW_VIDG}

                        pls={_PLS_Filter}
                        update_Fuels={this.update_Fuels}
                        update_Status={this.update_Status}
                        update_Azs={this.update_Azs}
                        update_State={this.update_State}
                        isAZS={this.props.isAZS}
                        isFUEL={this.props.isFUEL}
                    />
                    <hr /><hr />

                    {this.state._Pls != null &&
                        <List_pl
                            pls={_PLS_Filter}
                            pls_Mass={_PLS}
                            update_Pls={this.update_Pls}
                            View_Icon={this.state._View_Icon}
                            View_Data={this.state._View_Data}
                        />
                    }

                </div>
            );
        } else {
            return <h4><center>Нет связи с сервером!!</center></h4>
        }
    }
}
