import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { get_Trk, get_Azs, get_Azs_Trk } from '../core/core_Function.jsx';

import Trk from './trk.jsx'

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
        "pump": "ТРК",

        "Counter_Curent": "Cч.текщего налива",
        "fuel": "Вид НП",
        "nozzle": "пистолет",

        "date": "Дата",
        "time": "Время",
        "status": "Статус",
        "state": "Состояние"
    };
    return col;
}

export default class list_trk extends Component {
    constructor(props) {
        super(props);
    }   /*
    render(){
        return <br/>;
    }
 */
    render() {
        if (this.props.trk_Mass == undefined) {
            if (this.props.trk != null) {
                if (this.props.trk.length > 0 && this.props.trk[0].id != 0) {
                    let _TRK_0 = get_ZeroColumn();
                    this.props.trk.splice(0, -1, _TRK_0);
                }

                let Li_Style = {
                    width: this.props.trk.length * 120 + 'px',
                    //color: 'black',
                    //background: 'burlywood',
                }

                return (
                    <div className='prokrutka_trk'>
                        <center>
                            <ul className="hr" style={Li_Style}>
                                <center className='TBL' ><h4>ТРК</h4></center>
                                <hr /><hr />
                                <center>
                                    {
                                        this.props.trk.map(el => (
                                            <li key={'li ' + el.id}>
                                                <Trk TRK={el}
                                                    key={'PL ' + el.id}
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
            if (this.props.trk_Mass != null) {
                if (this.props.trk_Mass.length > 0 && this.props.trk_Mass[0][0].id != 0) {
                    let _PL_0 = get_ZeroColumn();
                    this.props.trk_Mass[0].splice(0, -1, _PL_0);
                }
                let ColAll = 0;
                for (const iterator of this.props.trk_Mass) {
                    ColAll = ColAll + iterator.length;
                }

                let Li_Style = { width: ColAll * 130 + 'px', }

                return (
                    <div className='prokrutka_trk'>
                        <center>
                            <ul className="hr" style={Li_Style}>
                                <center className='TBL' ><h4>ТРК</h4></center>
                                <hr /><hr />
                                <center>
                                    <table>
                                        <tbody>
                                            <tr>
                                                {

                                                    this.props.trk_Mass.map(trk_el => (
                                                        <td>
                                                            {
                                                                trk_el.map(el => (
                                                                    <li key={'trk_li' + el.id}>
                                                                        <Trk TRK={el}
                                                                            key={'Trk ' + el.id}
                                                                            id={el.id}
                                                                            View_Icon={this.props.View_Icon}
                                                                            View_Data={this.props.View_Data}
                                                                        />
                                                                    </li>
                                                                ))
                                                            }
                                                        </td>                                                        
                                                    ))
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                </center>
                            </ul>
                        </center>
                    </div>
                );
            } else {
                return <br />;
            }
        }

    }

}
/*

{
                                        this.props.trk.map(el => (
                                            <li key={'li ' + el.id}>
                                                <Trk TRK={el}
                                                    key={'PL ' + el.id}
                                                    id={el.id}
                                                    View_Icon={this.props.View_Icon}
                                                    View_Data={this.props.View_Data}
                                                />
                                            </li>
                                        ))
                                    }

*/