import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { WS } from '../core/core_Function.jsx';

import { Array } from 'core-js';


import Devices from './devices.jsx'

import Pl from './device/pl.jsx'
import TRK from './device/trk.jsx'
import TCO from './device/tco.jsx'



const _Debuge = false;



function IsExistID(id, mass) {
    for (const iterator of mass) {
        if (iterator == id) {
            return true;
        }
    }
    return false;
}

function get_Json_String(mstring) {
    var mS = [];
    mS[0] = mstring;
    const T_Json = JSON.stringify(mstring);
    return T_Json;

}

export default class azs extends Component {
    constructor(props) {
        super(props);
        this.update_Dev = this.update_Dev.bind(this);
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

        }
    }
    componentDidMount() {
        this.tick();
    }

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
            this.setState({ PLs: _PLs, Trk: _Trk, Tco: _Tco, Nozzle: _Nozzle });
        }

        if (this.state._devices != null && this.state._devices != undefined) {
            //let _PLS = new Array();
            //let _TRK = new Array();
            let _TCO = new Array();

            if (this.props.id != 0) {


                for (const iterator of this.state._devices) {
                    //if (iterator.typ == 'tso') {
                    //    _TCO.push(iterator);
                    //}

                    if (iterator.typ == 'tso') {
                        let t_TCO_0 = new Array();
                        for (const Item in iterator) {
                            if (Item == 'id') {
                                t_TCO_0[Item] = iterator[Item];
                            }
                            if (Item == 'nm' || Item == 'typ') {
                                t_TCO_0[Item] = iterator[Item];

                            }
                            //if (Item != 'cntyp' && Item != 'id' && Item != 'typ' && Item != 'dvctyptree')
                            //    t_TCO_Val_0.push(Item);
                        }
                        if (iterator.cntyp != undefined) {
                            for (const key of iterator.cntyp) {
                                t_TCO_0[key.typ] = key.def.nm;
                                //t_TCO_Val_0.push(key.typ);
                            }
                        }

                        for (const Item_DVC of iterator.devices) {
                            for (const item in Item_DVC) {
                                if (item == 'id') {
                                    t_TCO_0[item + '_' + Item_DVC['typ']] = Item_DVC[item];//'001';//
                                } else {

                                    t_TCO_0[item + '_' + Item_DVC['typ']] = Item_DVC[item];
                                }
                                //if (item != 'cntyp')//  && item != 'typ' && item != 'id')
                                //    t_TCO_Val_0.push(item + '_' + Item_DVC['typ']);
                            }
                        }
                        let r = 0;
                        _TCO.push(t_TCO_0);
                    }



                    /*
                    if (prop_dev.typ == 'pl') {
                        _PLS.push(prop_dev);
                    }
                    if (prop_dev.typ == 'pump') {
                        _TRK.push(prop_dev);
                    }
                    */

                }
            }


            //this.setState({ PLS: _PLS, TRK: _TRK, TCO: _TCO });
            this.setState({ TCO: _TCO });

        }
    }

    render(d) {
        let _height = this.props.w_Height - 150 + "px";
        return (
            <dev>
                <Devices
                    _List_Objs={this.props._List_Objs}
                    AZS={this.state.AZS}

                    View_Icon={this.props.View_Icon}
                    View_Data={this.props.View_Data}

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

                    w_Height={_height}
                />
            </dev>
        );
    }
}
