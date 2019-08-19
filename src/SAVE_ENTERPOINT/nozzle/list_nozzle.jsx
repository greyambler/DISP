import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { get_Trk, get_Azs, get_Azs_Trk } from '../../core/core_Function.jsx';

import Nozzle from './nozzle.jsx'

const _Debuge = false;


function get_ZeroColumn() {
    var col = {
        "id": 0,
        "name": "Пистолет",
        "fuel": "Вид НП",
        "azs": "АЗС",
        "pump": "ТРК",
        "counter":"Cчётчик",
        "date": "Дата",
        "time": "Время",
        "status": "Статус",
        "state": "Состояние",
    };
    return col;
}

export default class list_nozzle extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.nozzles != null) {

            if (this.props.nozzles.length > 0 && this.props.nozzles[0].id != 0) {
                let _NOZZLE_0 = get_ZeroColumn();
                this.props.nozzles.splice(0, -1, _NOZZLE_0);
            }

            let Li_Style = {
                width: this.props.nozzles.length * 110 + 'px',
                //color: 'black',
                //background: 'burlywood',
            }

            return (
                <div className='prokrutka_noz'>
                    <center>
                        <ul className="hr" style={Li_Style}>
                            <center className='TBL' ><h4>Счетчики</h4></center>
                            <hr /><hr />
                            <center>
                                {
                                    this.props.nozzles.map(el => (
                                        <li key={'li ' + el.id}>
                                            <Nozzle NOZZLE={el}
                                                key={'PL ' + el.id}
                                                id={el.id}
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
    }
}
