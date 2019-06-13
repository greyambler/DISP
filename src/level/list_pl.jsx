import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import Pl from './pl.jsx'

import { get_PL } from '../core/core_Function.jsx';

import './pl.css';

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
        "state": "Соостояние",
        "fuel": "Вид НП"
    };
    return col;
}

export default class list_pl extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let _PL = get_PL();
        S = 0;
        if (_PL.pl.length > 0) {
            let _PL_0 = get_ZeroColumn();
            _PL.pl.splice(0, 1, _PL_0);
        }
        return (
            <ul className="hr">
                <center className='TBL' ><h4>Объекты</h4></center>
                <hr /><hr />
                <center>
                    {
                        _PL.pl.map(el => (
                            <li key={'li ' + S + el.id}>
                                <Pl PL={el}
                                    key={'PL ' + S + el.id}
                                    id={el.id + S}
                                    S={S++}
                                />
                            </li>
                        ))
                    }
                </center>
            </ul>
        );
    }
    /*
        render() {
            let _PL = get_PL();
            return (
                <div>
                    <ul className="hr">
                        <center className='TBL' ><h4>Танки</h4></center>
                        <hr /><hr />
                        <Pl PL={_PL} />
                    </ul>
                </div>
            );
        }*/
}
