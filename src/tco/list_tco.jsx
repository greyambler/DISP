import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { get_Trk, get_Azs, get_Azs_Trk } from '../core/core_Function.jsx';

import Tco from './tco.jsx'

const _Debuge = false;


function get_ZeroColumn_TRK() {
    var col = {
        "id": 0,
        "typ": "ТРК",
        "nm": "Название ТРК",
    };
    return col;
}
function get_ZeroColumn() {
    var col = {
        "id": 0,
        "azs": "АЗС",
        "number": "ТСО №",

        "iSelf": "iSelf",
        "fr": "ФР",
        "validator": "Валидато",
        "lowerSection": "Нижний отсек",
        "safe": "Сейф",

        "date": "Дата",
        "time": "Время",
        "status": "Статус",
        "state": "Состояние"
    };
    return col;
}

export default class list_tco extends Component {
    constructor(props) {
        super(props);
    }   /*
    render(){
        return <br/>;
    }
 */
    render() {
        if (this.props.tco_Mass == undefined) {
            if (this.props.tco != null) {
                if (this.props.tco.length > 0 && this.props.tco[0].id != 0) {
                    let _TCO_0 = get_ZeroColumn();
                    this.props.tco.splice(0, -1, _TCO_0);
                }

                let Li_Style = {
                    width: this.props.tco.length * 120 + 'px',
                    //color: 'black',
                    //background: 'burlywood',
                }

                return (
                    <div className='prokrutka_trk'>
                        <center>
                            <ul className="hr" style={Li_Style}>
                                <center className='TBL' ><h4>ТЕСТ</h4></center>
                                <hr /><hr />
                                <center>
                                    {
                                        this.props.tco.map(el => (
                                            <li key={'li ' + el.id}>
                                                <Tco TCO={el}
                                                    key={'TCO ' + el.id}
                                                    id={el.id}
                                                    View_Icon={this.props.View_Icon}
                                                    View_Data={this.props.View_Data}
                                                />
                                            </li>
                                        ))
                                    }
                                </center>
                            </ul>
                        </center>
                    </div>
                );
            } else {
                return <br />;
            }

        } else {
            if (this.props.tco_Mass != null) {
                if (this.props.tco_Mass.length > 0 && this.props.tco_Mass[0][0].id != 0) {
                    let N = new Array();
                    N.push(get_ZeroColumn());
                    this.props.tco_Mass.splice(0, -1, N);
                    //let _PL_0 = get_ZeroColumn();
                    //this.props.tco_Mass[0].splice(0, -1, _PL_0);
                }
                /*
                let ColAll = 0;
                for (const iterator of this.props.trk_Mass) {
                    ColAll = ColAll + iterator.length;
                }
        
                let Li_Style = { width: ColAll * 130 + 'px', }
        */
                let Li_Level = { width: 6 * 120 + 'px', }
                let li_Level = { width: 180 + 'px'}
                return (
                    <div className='prokrutka_trk'>
                        <left>
                            <ul className="hr">
                                <center className='TBL' ><h4>ТСО</h4></center>
                                <hr /><hr />
                                <left>
                                    {
                                        this.props.tco_Mass.map(tco_el => (
                                            <td>
                                                <div>
                                                    <table style={(tco_el[0].id != 0) ? Li_Level : li_Level}>
                                                        <tbody>
                                                            <tr>
                                                                {
                                                                    tco_el.map(el => (
                                                                        <li key={'tco_li_' + el.id}>
                                                                            <Tco TCO={el}
                                                                                key={'TCO_' + el.id}
                                                                                id={el.id}
                                                                                View_Icon={this.props.View_Icon}
                                                                                View_Data={this.props.View_Data}
                                                                            />
                                                                        </li>
                                                                    ))
                                                                }
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        ))
                                    }
                                </left>
                            </ul>
                        </left>
                    </div>
                );
            } else {
                return <br />;
            }
        }

    }

}
