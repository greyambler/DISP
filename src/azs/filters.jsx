import React, { Component } from 'react';
import W_List_ChBoxTree from '../control/w_List_ChBoxTree.jsx';

const _Debuge = false;

/*const data = get_VTree_LEVEL();
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
                label: 'объекты',
                value: 'azs',
                children: []
            },
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

let T = true;
*/

export default class filters extends Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            all_azs: this.props.all_azs,
        }
        */
    }
    /*
    componentDidMount() {
        this.setState({ all_azs: this.props.all_azs });
    }
    componentDidUpdate(prevProps) {
        if (this.props.all_azs != prevProps.all_azs) {
            this.setState({ all_azs: this.props.all_azs });
        }
    }
    */
    render() {
        let r1 = {
            width: 0,
        }
        if (this.props.text_head != "") {
            r1 = {
                width: 30,
                paddingRight: 10,
                paddingLeft: 10,
                textAlign: 'left',
                fontSize: '12px',
            }
        }
        let r2 = {
            minWidth: 160,
            textAlign: 'left',
        }
        return (
            <center>
                <table >
                    <tbody>
                        <tr>
                            <td style={r1}>
                                {this.props.text_head}
                            </td>
                            <td style={r2}>
                                <W_List_ChBoxTree data={this.props.dataFilter}
                                    onChange={(currentNode, selectedNodes) => { this.props.update_VIEW(selectedNodes) }}
                                />
                            </td>
                            
                        </tr>
                    </tbody>
                </table>
            </center>
        );
    }
}

