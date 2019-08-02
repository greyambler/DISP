import React, { Component } from 'react';
import { get_FUEL, get_Objs, get_Status, get_State, get_StateGun, get_Pump, get_VIEW_VIDGs } from '../core/core_Function.jsx';

import W_CheckBox from '../control/w_List_ChBox.jsx';

import W_List_ChBoxTree from '../control/w_List_ChBoxTree.jsx';

const _Debuge = false;
const data = get_VTree_LEVEL();

let T = true;
function get_VTree_LEVEL() {

    let _Data = {
        label: 'Выбрать все',
        value: 'selectAll',
        checked: true,
        children: [
            {
                label: 'виджет',
                value: 'vidget',
                children: [
                    {
                        label: 'Иконка',
                        value: 'icon_alarm'
                    },
                    {
                        label: 'Статус',
                        value: 'status_alarm'
                    },
                    {
                        label: 'Состояние',
                        value: 'state_alarm'
                    }
                ]
            },
            {
                label: 'данные',
                value: 'data',
                children: [
                    {
                        label: 'ТРК',
                        value: 'pump'
                    },
                    {
                        label: 'Cч.текщего налива',
                        value: 'Counter_Curent'
                    },
                    {
                        label: 'Вид НП',
                        value: 'fuel'
                    },
                    {
                        label: 'пистолет',
                        value: 'nozzle'
                    },
                    {
                        label: 'Дата',
                        value: 'date'
                    },
                    {
                        label: 'Время',
                        value: 'time'
                    },
                    {
                        label: 'Статус',
                        value: 'status'
                    },
                    {
                        label: 'Состояние',
                        value: 'state'
                    }
                ]
            }
        ]
    }
    return _Data;
}


export default class list_pl extends Component {
    constructor(props) {
        super(props);

        this.Get_AZS = this.Get_AZS.bind(this);
        this.state = {
            VIEW_VIDG: null,

        }
    }
    componentDidMount() {
        this.Get_AZS();
    }

    Get_AZS(data) {
        let _View_Vidg = new Array();
        let t = 0;
        let _View_vidg = get_VIEW_VIDGs();
        for (let iterator of _View_vidg.VIEW_VIDG) {
            _View_Vidg[t] = { value: iterator.name, label: iterator.name, code: iterator.code };
            t++;
        }

        if (data != null) {
            let _azs = new Array();
            let _AZS = new Array();

            let _ai = new Array();
            let _AI = new Array();

            let _tus = new Array();
            let _TUS = new Array();

            let _te = new Array();
            let _TE = new Array();


            let t = 0;
            let i = 0;
            let r = 0;
            let s = 0;
            for (let iterator of data) {
                if (iterator.azs != 'АЗС') {
                    if (_azs.indexOf(iterator.azs) == -1) {
                        _azs[t] = iterator.azs;
                        _AZS[t] = { value: iterator.id, label: iterator.azs };
                        t++;
                    }

                    if (_ai.indexOf(iterator.fuel) == -1) {
                        _ai[i] = iterator.fuel;
                        _AI[i] = { value: iterator.id, label: iterator.fuel };
                        i++;
                    }

                    if (_tus.indexOf(iterator.status) == -1) {
                        _tus[r] = iterator.status;
                        _TUS[r] = { value: iterator.id, label: iterator.status };
                        r++;
                    }

                    if (_te.indexOf(iterator.state) == -1) {
                        _te[s] = iterator.state;
                        _TE[s] = { value: iterator.id, label: iterator.state };
                        s++;
                    }
                }
            }
            this.setState({ azs: _AZS, ai: _AI, status: _TUS, state: _TE, });
        } else {
            this.setState({ azs: null, ai: null, status: null, state: null, });
        }
    }

    render() {
        let r1 = {
            width: 30,
            paddingLeft: 20,
            textAlign: 'left',
            
        }
        let r2 = {
            nimWidth: 260,
            textAlign: 'left',
            
        }
        return (
            <center>
                <table >
                    <tbody>
                        <tr>
                            <td style={r1}>Вид</td>
                        </tr>
                        <tr>
                            <td style={r2}>
                                <W_List_ChBoxTree data={data}
                                    onChange={(currentNode, selectedNodes) => { this.props.update_VV_TREE(selectedNodes) }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
        );
    }
}

