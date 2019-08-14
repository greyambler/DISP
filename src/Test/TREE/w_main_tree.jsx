import React, { Component, PropTypes } from 'react';
import TreeDevice from './treeDevice.jsx';

import { RSS_Type_List, get_DVC_TREE, Get_Device, Get_MainHead, Get_Val } from '../../core/core_Function.jsx';

import Tco_Item_Tree from '../../control/tco_Item_Tree.jsx';
import Tco_Dvc_Item_Tree from '../../control/tco_Dvc_Item_Tree.jsx';
import W_CheckBox from '../../control/w_List_ChBox.jsx';
import W_List_ChBoxTree from '../../control/w_List_ChBoxTree.jsx';

//import Writ_Keys from '/writ_Keys.jsx';

const _Debuge = false;
export default class w_main_tree extends React.Component {
    //myRef = React.createRef();
    constructor(props) {
        super(props);
        this.Get_TCO_TREE = this.Get_TCO_TREE.bind(this);
        this.Set_TCO_TREE_CHECK = this.Set_TCO_TREE_CHECK.bind(this);

        this.state = {
            TCO: null,
            _List_Objs: this.props._List_Objs,

            DATA_CHECK: null
        };
    }
    componentDidMount() {
        this.setState({ TCO: Get_Device("tso") });

    }
    componentDidUpdate(prevProps) {
        if (this.props._List_Objs != prevProps._List_Objs) {
            this.setState({ _List_Objs: this.props._List_Objs }, this.Set_TCO_TREE_CHECK);
        }
    }
    _Data = {
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

    Set_TCO_TREE_CHECK() {

        let N_Start = 2;

        if (this.state._List_Objs != null && this.state._List_Objs.dvctyptree != undefined) {
            for (const iterator of this.state._List_Objs.dvctyptree) {
                if (iterator.typ == 'tso') {

                    let TSO_ALL = new Array();
                    let TCO = iterator;
                    let Tso_Main = Get_MainHead(TCO);

                    let _DATA_CHECK = { label: 'Выбрать все', value: 'selectAll', checked: true, children: new Array() };
                    //let _Children_0 = new Array();
                    let _Children_1 = new Array();
                    let _Children_2 = new Array();

                    //_Children_0 = { label: 'виджет', value: 'vidget', children: new Array() };
                    //_Children_0['children'].push({ label: 'Иконка', value: 'icon_alarm' });
                    
                    _Children_1 = { label: 'данные', value: 'data', children: new Array() };
                    _Children_2 = {
                        label: 'Функции кнопки', value: 'F_button', children: [{
                            label: 'блокировка',
                            value: 'lock'
                        },
                        {
                            label: 'управление',
                            value: 'management'
                        }]
                    };

                    

                    let _children = new Array();

                    for (let index = N_Start; index < Tso_Main.length; index++) {

                        let Index_Mass = Tso_Main.length - 1;
                        if (Array.isArray(Tso_Main[Index_Mass])) {

                            const _value = Tso_Main[index];
                            let _label = Tso_Main[Index_Mass][_value];
                            if (!Array.isArray(_value) && _value != 'nm') {

                                _Children_1['children'].push({ label: _label, value: _value });
                            }
                            let r = 0;
                        }
                    }


                    //_Children['children'].push(_children);
                    //_DATA_CHECK['children'].push(_Children_0);
                    _DATA_CHECK['children'].push(_Children_1);
                    _DATA_CHECK['children'].push(_Children_2);

                    /*
                    let DEVICES = new Array();
                    for (const item of TCO.dvctyptree) {
                        DEVICES.push(Get_MainHead(item));
                    }
                    */

                    TSO_ALL.push(Tso_Main);
                    //TSO_ALL.push(DEVICES);
                    this.setState({ TCO_0: TSO_ALL, DATA_CHECK: _DATA_CHECK });
                }
            }
        }

    }

    Get_TCO_TREE() {
        if (this.state._List_Objs != null && this.state._List_Objs.dvctyptree != undefined) {
            for (const iterator of this.state._List_Objs.dvctyptree) {
                if (iterator.typ == 'tso') {

                    let TSO_ALL = new Array();
                    let TCO = iterator;
                    let Tso_Main = Get_MainHead(TCO);

                    /*
                    let DEVICES = new Array();
                    for (const item of TCO.dvctyptree) {
                        DEVICES.push(Get_MainHead(item));
                    }
                    */

                    TSO_ALL.push(Tso_Main);
                    //TSO_ALL.push(DEVICES);
                    this.setState({ TCO_0: TSO_ALL });
                }
            }
        }

    }
    render() {
        if (this.state.TCO != null) {
            let MASS = Get_MainHead(this.state.TCO);
            let DEVICES = new Array();
            for (const item of this.state.TCO.dvctyptree) {
                DEVICES.push(Get_MainHead(item));
            }
            let F = 2;
            let isKeyShow = false;


            let r1 = {
                width: 90,
                paddingLeft: 20,
                textAlign: 'left',
                fontSize: 12,
            }
            let r2 = {
                width: 120,
                textAlign: 'left',
                fontSize: 12,
            }
            //onChange={(currentNode, selectedNodes) => { this.props.update_VV_TREE(selectedNodes) }}
            return (
                <div>
                    <table>
                        <tbody>
                            <tr>

                                <td style={r1}>Статус</td>
                                <td style={r2}><W_CheckBox list={this.state.status} update_Status={this.props.update_Status} type='status' /></td>

                            </tr>
                            <tr>
                                <td style={r2}>
                                    {this.state.DATA_CHECK != null &&
                                        <W_List_ChBoxTree data={this.state.DATA_CHECK}

                                        />
                                    }
                                </td>
                            </tr>

                            {/*
                                MASS.map((main, p) => (
                                    <Tco_Item_Tree PROPERTYS={main} MASS_LIBRR={MASS} isKeyShow={isKeyShow} FirstPROPS={F} N={p} />
                                ))
                            */}

                            {
                                DEVICES.map(MASS => (
                                    MASS.map((main, p) => (
                                        <Tco_Dvc_Item_Tree PROPERTYS={main} MASS_LIBRR={MASS} isKeyShow={isKeyShow} FirstPROPS={F} N={p}
                                            IsHead={true}
                                        />
                                    ))
                                ))
                            }
                            {<tr>
                                <td colSpan='2'>
                                    <br />
                                </td>
                            </tr>}

                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <h1> Нет массива</h1>
            );
        }
    }
}
