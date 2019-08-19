import React, { Component } from 'react';
import { get_FUEL, get_Objs, get_Status, get_State, get_StateGun, get_Pump, get_VIEW_VIDGs } from '../core/core_Function.jsx';

import W_CheckBox from '../control/w_List_ChBox.jsx';

import W_List_ChBoxTree from '../control/w_List_ChBoxTree.jsx';

const _Debuge = false;

//const data = get_VTree_LEVEL();
function get_VTree_LEVEL() {

    let _Data = {
        label: 'Выбрать все',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: [
            {
                label: 'виджет',
                value: 'vidget',
                expanded: true,
                children: [
                    {
                        label: 'Иконка',
                        value: 'icon_alarm'
                    },
                    /*{
                        label: 'Статус',
                        value: 'status_alarm'
                    },
                    {
                        label: 'Состояние',
                        value: 'state_alarm'
                    }*/
                ]
            },
            /*{
                label: 'объекты',
                value: 'azs',
                children: []
            },*/
            {
                label: 'данные',
                value: 'data'
            },
            {
                label: 'Функции кнопки',
                value: 'F_button',
                expanded: true,
                children: [{
                    label: 'блокировка',
                    value: 'lock'
                },
                {
                    label: 'управление',
                    value: 'management'
                }]
            }
        ]
    }
    return _Data;
    /*,
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
*/

}

let T = true;

export default class filters extends Component {
    constructor(props) {
        super(props);
        this.fullFilter = this.fullFilter.bind(this);
        this.state = {
            all_azs: this.props.all_azs,
            azs: null,
        }
    }
    componentDidMount() {
        this.setState({ all_azs: this.props.all_azs }, this.fullFilter);
    }
    componentDidUpdate(prevProps) {
        if (this.props.all_azs != prevProps.all_azs) {
            this.setState({ all_azs: this.props.all_azs }, this.fullFilter);
        }
    }

    fullFilter() {
        let _AZS = new Array();
        if (this.state.all_azs != null) {
            for (let item_azs of this.state.all_azs) {
                if (item_azs.id != 0) {
                    _AZS.push({ value: item_azs.id, label: item_azs.nm, code: item_azs.ob });
                }
            }
        }
        this.setState({ azs: _AZS });
    }
    render() {
        let r1 = {
            width: 30,
            paddingLeft: 20,
            textAlign: 'left',
        }
        let r2 = {
            minWidth: 160,
            textAlign: 'left',
        }
        return (
            <center>
                <table >
                    <tbody>
                        {/*
                        <tr>
                            <td style={r1}>Вид</td>
                        </tr>
                        */}
                        <tr>
                            <td style={r2}>
                                <W_List_ChBoxTree data={this.props.dataFilter}
                                    onChange={(currentNode, selectedNodes) => { this.props.update_VV_TREE(selectedNodes) }}
                                />
                            </td>
                            {/*
                            <td style={r1}>АЗК</td>
                            <td style={r2}><W_CheckBox list={this.state.azs}
                                update_Azs={this.props.update_Azs} type='azs' /></td>

*/}
                        </tr>
                    </tbody>
                </table>
            </center>
        );
    }
}

