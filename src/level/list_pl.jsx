import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import Pl from './pl.jsx'




const _Debuge = false;

let S = 0;

function get_Color(Int) {
    var col = 'while';
    switch (Int) {
        case 1: col = 'green'; break;
        case 2: col = 'yellow'; break;
        case 3: col = 'red'; break;
        default: col = 'grey'; break;
    }
    return col;
}
function get_Text(Int) {
    var col = ' ';
    switch (Int) {
        case 2: col = 'резервуар'; break;
        case 3: col = 'ТРК'; break;
        case 5: col = 'ИБП'; break;
        case 6: col = 'терминал сам.'; break;//'терминал самообслуживания'; break;
        default: col = ' '; break;
    }
    return col;
}
function get_ZeroColumn(_pl_first) {
    var col = {
        "id": 0,
        "Available_volume": "Доступный объём",
        "CURENT_VOLUME": "Текущий объём",
        "TOTAL_WATER": "Подтоварная вода",
        "azs": "АЗС",
        "storage_space": "Резервуар №",
        "temperature": "Температура",
        "density": "Плотность",
        "date": "Дата",
        "time": "Время",
        "status": "Статус",
        "state": "Состояние",
        "fuel": "Вид НП"
    };
    return col;
}

export default class list_pl extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.pls != null) {
            if (this.props.pls.length > 0 && this.props.pls[0].id != 0) {
                let _PL_0 = get_ZeroColumn();
                this.props.pls.splice(0, -1, _PL_0);
            }

            let Li_Level = {
                width: this.props.pls.length * 140 + 'px',
                //color: 'black',
                //background: 'burlywood',
            }

            return (
                <div className='prokrutka'>
                    <center>
                        <ul className="hr" style={Li_Level}>
                            <center className='TBL' ><h4>Резервуары</h4></center>
                            <hr /><hr />
                            <center>
                                {
                                    this.props.pls.map(el => (
                                        <li key={'li ' + el.id}>
                                            <Pl PL={el}
                                                key={'PL '+ el.id}
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