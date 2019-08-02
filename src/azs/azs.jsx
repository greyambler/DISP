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
            PLs: null,
            Trk: null,
            Tco: null,
            Nozzle: null,
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
    async tick() {
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
                    this.setState({ _Objects: Jsons, _dvc: Jsons.dvc }, this.Full_Dev);
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

                    PL_0={this.props.PL_0} PL_Col={this.props.PL_Col}

                    TRK_0={this.props.TRK_0} TRK_Col={this.props.TRK_Col}

                    TCO_0={this.props.TCO_0} TCO_Col={this.props.TCO_Col}

                    NOZZLE_0={this.props.NOZZLE_0} NOZZLE_Col={this.props.NOZZLE_Col}

                    PLs={this.state.PLs}
                    Trk={this.state.Trk}
                    Tco={this.state.Tco}
                    Nozzle={this.state.Nozzle}

                    w_Height={_height}
                />
            </dev>
        );
    }
}
