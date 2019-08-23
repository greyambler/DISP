import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { WS, Get_MainHead } from '../core/core_Function.jsx';

import { Array } from 'core-js';


import Devices from './devices.jsx'

import Pl from './device/pl.jsx'
import TRK from './device/trk.jsx'
import TCO from './device/tco.jsx'

const _Debuge = false;

function Get_Key_View_ID_PL(mas_Vidg, _Fields_PL, PLs) {
    let Is_selectAll_mas_Vidg = true;
    if (mas_Vidg != null) {
        Is_selectAll_mas_Vidg = false;
        for (const nameView of mas_Vidg) {
            if (nameView.value == 'selectAll') {
                Is_selectAll_mas_Vidg = true;
                break;
            }
        }
    }

    let Is_selectAll_Fields_PL = false;

    for (const nameView of _Fields_PL) {
        if (nameView == 'selectAll') {
            Is_selectAll_Fields_PL = true;
            break;
        }
    }


    let View_Fields = new Array();

    if ((Is_selectAll_mas_Vidg && Is_selectAll_Fields_PL) || PLs == null) {
        return _Fields_PL
    } else {

        let onlyPL = new Array();
        let Del_onlyPL = new Array();
        let EXIST_ID = false;


        if (Is_selectAll_mas_Vidg && !Is_selectAll_Fields_PL) {
            for (const iterator of PLs) {
                View_Fields.push(iterator.id);
            }
            for (const iterator of _Fields_PL) {
                if (iterator.startsWith("fuel_")) {
                    if (iterator == "fuel_all") {

                    }
                } else {
                    View_Fields.push(iterator);
                }
            }
        } 
        if(!Is_selectAll_mas_Vidg && Is_selectAll_Fields_PL) {


            let r =0;
        }
        
        if(!Is_selectAll_mas_Vidg && !Is_selectAll_Fields_PL) {

            for (const iterator of PLs) {
                EXIST_ID = false;
                for (const nameView of mas_Vidg) {
                    //iterator.fuel = код топлива ->  "fuel_"+ iterator.fuel
                    if (nameView.value == iterator.id) {
                        onlyPL.push({ fuel: "fuel_" + iterator.fuel, id: iterator.id });
                        EXIST_ID = true;
                        
                    }
                }
                if (!EXIST_ID) {
                    Del_onlyPL.push({ fuel: "fuel_" + iterator.fuel, id: iterator.id });

                }
            }

            for (const item of onlyPL) {
                View_Fields.push(item.id);
            }

            for (const iterator of _Fields_PL) {
                if (iterator.startsWith("fuel_")) {
                    if (iterator == "fuel_all") {

                    }

                    let r = 0;
                } else {
                    View_Fields.push(iterator);
                }
            }
        }

        return View_Fields;
    }

}


export default class azs extends Component {
    constructor(props) {
        super(props);
        this.update_Dev = this.update_Dev.bind(this);

        this.Get_TCO_TREE = this.Get_TCO_TREE.bind(this);
        this.Get_Mass = this.Get_Mass.bind(this);
        this.Get_Mass_Devices = this.Get_Mass_Devices.bind(this);

        this.state = {
            Rss: this.props.RSS,
            AZS: this.props.AZS,
            _Objects: null,
            _dvc: null,

            _devices: null,

            PLs: null,

            Trk: null,
            Tco: null,
            Nozzle: null,

            PLS: null,
            TRK: null,
            TCO: null,



            //List_Fields_Main: this.props.List_Fields_Main,
            //List_Fields_PL: this.props.List_Fields_PL,

            //List_Fields_ID_PL: this.props.List_Fields_PL,

        }
    }
    componentDidMount() {
        this.tick();
    }
    /*
    componentDidUpdate(prevProps) {
        if (this.props.List_Fields_PL != prevProps.List_Fields_PL) {
            this.setState({ List_Fields_ID_PL: Get_Key_View_ID_PL([{ value: 'selectAll' }], this.props.List_Fields_PL, this.state.PLs) });
        }
    }
    */
    update_Dev() {
        try {
            if (this.state.data != null) {
                this.setState({ DeVal: JSON.parse(this.state.data) });
            }
        } catch (error) {

        }
    }
    async tick() {///Получение устройств по ID AZS
        if (this.props.id != 0) {
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
                    this.setState({ _Objects: Jsons, _dvc: Jsons.dvc, _devices: Jsons.devices }, this.Full_Dev);
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
    }
    Full_Dev() {
        if (this.state._dvc != null) {
            let _PLs = new Array();
            let _Trk = new Array();
            let _Tco = new Array();
            let _Nozzle = new Array();
            if (this.props.id != 0) {
                for (const iterator of this.state._dvc) {
                    if (iterator.typ == 'pl') {
                        let pl = new Array();
                        for (const key in iterator) {
                            pl[key] = iterator[key];
                        }
                        for (const key in this.props.PL_0) {
                            if (pl[key] == undefined) {
                                pl[key] = "---";
                            }
                        }
                        _PLs.push(pl);
                    }
                    if (iterator.typ == 'pump') {

                        let trk = new Array();
                        for (const key in iterator) {
                            trk[key] = iterator[key];
                        }
                        for (const key in this.props.TRK_0) {
                            if (trk[key] == undefined) {
                                trk[key] = "---";
                            }
                        }
                        _Trk.push(trk);
                    }
                    if (iterator.typ == 'tso') {

                        _Tco.push(iterator);
                    }

                    if (iterator.typ == 'nozzle') {
                        let nozzle = new Array();
                        for (const key in iterator) {
                            nozzle[key] = iterator[key];
                        }
                        for (const key in this.props.NOZZLE_0) {
                            if (nozzle[key] == undefined) {
                                nozzle[key] = "---";
                            }
                        }
                        _Nozzle.push(nozzle);
                    }

                }
            }
           //Get_Key_View_ID_PL([{ value: 'selectAll' }], this.props.List_Fields_PL, _PLs);
            this.setState({
                PLs: _PLs, Trk: _Trk,
                Tco: _Tco,
                Nozzle: _Nozzle
            }, this.Get_TCO_TREE());
        }

    }
    Get_Mass(iterator, TCO_0) {
        /** Массив 0 - TCO */
        let TSO_Val = new Array();
        for (const key of TCO_0) {
            if (!Array.isArray(key)) {

                TSO_Val[key] = (iterator[key] != undefined) ? iterator[key] : '-----';
            }
        }
        let TSO_Item = new Array();
        for (const item of TCO_0) {
            if (!Array.isArray(item)) {
                TSO_Item.push(item);
            } else {
                TSO_Item.push(TSO_Val);
            }
        }
        /** Массив 0 - TCO */
        return TSO_Item;
    }
    Get_Mass_Devices(iterator, TCO_1) {
        let DEV_Mass_Val = new Array();
        for (const deviceS of TCO_1) {
            for (const device of deviceS) {
                if (Array.isArray(device)) {
                    let Is_Exist = false;
                    if (iterator != undefined) {
                        for (const key of iterator) {
                            if (device['typ'] == key['typ']) {

                                let M = this.Get_Mass(key, deviceS);
                                DEV_Mass_Val.push(M);
                                Is_Exist = true;
                                break;
                            }
                        }
                    }
                    if (!Is_Exist && iterator != undefined) {
                        let M = this.Get_Mass(device, deviceS);
                        M[3]['id'] = "a12";
                        DEV_Mass_Val.push(M);
                    }
                    if (iterator == undefined) {
                        let M = this.Get_Mass("zero", deviceS);

                        DEV_Mass_Val.push(M);
                    }

                }
            }

        }
        return DEV_Mass_Val;
    }
    Get_TCO_TREE() {

        let All_TSO = null;

        if (this.state._devices != undefined && this.state._devices != null && this.props.TCO_0 != null) {
            for (const iterator of this.state._devices) {

                if (iterator.typ == 'tso' && this.props.TCO_0[0] != null) {
                    if (All_TSO == null) {
                        All_TSO = new Array();
                    }

                    let TSO_Item = this.Get_Mass(iterator, this.props.TCO_0[0]);
                    let TSO_Devices = null;
                    //if (this.props.TCO_0[1] != null && iterator.devices != null) 
                    {
                        TSO_Devices = this.Get_Mass_Devices(iterator.devices, this.props.TCO_0[1]);
                    }
                    let TSO_TWO_M = new Array();
                    TSO_TWO_M.push(TSO_Item);
                    TSO_TWO_M.push(TSO_Devices);
                    All_TSO.push(TSO_TWO_M);

                    this.setState({ TCO: All_TSO });
                }

            }
        }

    }

    /********** ФИЛЬТРЫ ********

    update_VIEW_ID_PL = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            _View_Fields = Get_Key_View_ID_PL(View_Vidg, this.props.List_Fields_PL, this.state.PLs);
            this.setState({ List_Fields_ID_PL: _View_Fields });
        } else {
            _View_Fields = Get_Key_View_ID_PL(View_Vidg, this.props.List_Fields_PL, this.state.PLs);
            this.setState({ List_Fields_ID_PL: _View_Fields });
        }
    }

    ********** ФИЛЬТРЫ ********/

    render() {
        let _height = this.props.w_Height - 150 + "px";

        //Get_Key_View_PL(this.state.List_Fields_PL, this.state.PLs, this.props.View_Filter_PL);

        return (
            <Devices
                _List_Objs={this.props._List_Objs}
                w_Height={_height}

                AZS={this.state.AZS}

                //                    View_Icon={this.props.View_Icon}
                //                    View_Data={this.props.View_Data}

                id={this.props.id}

                DeVal={this.props.data}

                devices={this.state._devices}

                PL_0={this.props.PL_0} PL_Col={this.props.PL_Col}

                TRK_0={this.props.TRK_0} TRK_Col={this.props.TRK_Col}

                TCO_0={this.props.TCO_0} TCO_Col={this.props.TCO_Col}

                NOZZLE_0={this.props.NOZZLE_0} NOZZLE_Col={this.props.NOZZLE_Col}

                PLs={this.state.PLs}

                Trk={this.state.Trk}

                Tco={this.state.TCO}

                Nozzle={this.state.Nozzle}

                TCO={this.state.TCO}

                List_Fields_Main={this.props.List_Fields_Main}
                List_Fields_PL={this.props.List_Fields_PL}
                List_Fields_TRK={this.props.List_Fields_TRK}
                List_Fields_TCO={this.props.List_Fields_TCO}
                
                //update_VIEW_ID_PL={this.update_VIEW_ID_PL}

            />
        );
    }
}
