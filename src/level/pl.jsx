import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { get_PL } from '../core/core_Function.jsx';
import './pl.css';

import moment from 'moment';

const _Debuge = false;



function get_Color_NET(Int) {
    var col = 'while';
    switch (Int) {
        case 0:
        case 1:
        case 2:
        case 5: col = 'green'; break;

        default: col = 'red'; break;
    }
    return col;
}
function get_Text_NET(Int) {
    var col = 'Нет данных';
    switch (Int) {
        case 0:
        case 1:
        case 2:
        case 5: col = 'В сети'; break;
        default: col = 'Нет связи'; break;
    }
    return col;
}

function get_Color_NET_2(Int) {
    var col = 'while';
    switch (Int) {
        case 1: col = 'green'; break;
        case 2: col = 'yellow'; break;
        case 3: col = 'red'; break;
        default: col = 'grey'; break;
    }
    return col;
}
function get_Text_NET_2(Int) {
    var col = ' - ';
    switch (Int) {
        case 0: col = 'Превышие по параметру подтоварная вода'; break;
        case 1: col = 'Превышие по параметру подтоварная вода'; break;
        case 2: col = 'Превышие по параметру минимальный объём'; break;
        case 3: col = 'Требуется поставка НП '; break;
        case 4: col = 'Отсутсвует информация в  период 1ч 15м'; break;
        case 5: col = 'По данным ручного ввода в период 1ч 15м'; break;
        default: col = ' - '; break;
    }
    return col;
}


export default class list_pl extends Component {
    constructor(props) {
        super(props);

        this.state = {
            PL: this.props.PL,

            /*
            name: this.props.PL.azs,
            storage_space: this.props.PL.storage_space,
            fuel: this.props.PL.fuel,
            Available_volume: this.props.PL.Available_volume,// 1358.64;
            CURENT_VOLUME: this.props.PL.CURENT_VOLUME,//4510.2;
            TOTAL_WATER: this.props.PL.TOTAL_WATER,//231.16;
            TOTAL_VOLUME: this.props.PL.Available_volume + this.props.PL.CURENT_VOLUME + this.props.PL.TOTAL_WATER,

            temperature: this.props.PL.temperature,
            density: this.props.PL.density,
            date: this.props.PL.date,
            time: this.props.PL.time,
            status: this.props.PL.status,
            state: this.props.PL.state,
            */
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.PL != prevProps.PL) {
            this.setState({
                PL: this.props.PL,
            });
        }
    }
    render() {
        if (this.state.PL != null) {
            let TOTAL_VOLUME = 0;
            TOTAL_VOLUME = this.state.PL.Available_volume +
                this.state.PL.CURENT_VOLUME + this.state.PL.TOTAL_WATER;


            if (TOTAL_VOLUME != 0) {


                /******* координаты для отрисовки********************* *
                //MAX _height 
                let _water = 10;//уровень воды.
                let _fuel = 110;//уровень топлива.
                let _level_water = _height - _water;
                let _level_fuel = _height - _fuel - _water;
                ********* координаты для отрисовки********************* */

                /********* координаты для отрисовки********************* */
                let _width = 50;
                let _height = 200;

                let _delenie1 = _height / TOTAL_VOLUME;
                let Level_Total = _delenie1 * TOTAL_VOLUME;
                let Level_Water = _delenie1 * this.state.PL.TOTAL_WATER;
                let Level_Fuel = _delenie1 * this.state.PL.CURENT_VOLUME;

                let _level_water = _height - Level_Water;
                let _level_fuel = _height - Level_Fuel - Level_Water;

                let _dX = 35;
                /********* координаты для отрисовки********************* */

                /********* сигнализация для отрисовки********************* */

                let _color1 = get_Color_NET(this.props.S);
                let _text1 = get_Text_NET(this.props.S);

                let _color2 = get_Color_NET_2(this.props.S);
                let _text2 = get_Text_NET_2(this.props.S);


                /********* сигнализация для отрисовки********************* */

                let fill_1 = 'rgb(240, 209, 173)';
                let fill_2 = 'rgb(194, 125, 46)';
                let fill_3 = 'rgb(163, 226, 245)';

                if (this.state.PL.id == 0) {
                    _delenie1 = 1;
                    Level_Total = 200;
                    Level_Water = 10;
                    Level_Fuel = 100;

                    _level_water = _height - Level_Water;
                    _level_fuel = _height - Level_Fuel - Level_Water;
                    _text1 = this.state.PL.status;
                    _text2 = this.state.PL.state;
                    _color1 = 'rgb(255, 255, 255)';
                    _color2 = 'rgb(255, 255, 255)';
                }
                return (
                    <div>
                        <table className="tb_PL" >
                            <tbody>
                                <tr>
                                    <td colSpan='2' className='td_Stage'>{this.state.PL.fuel}</td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <Stage width={_width + _dX} height={_height + 20} x={_dX} y={0}>
                                            <Layer key='1' background='red' >

                                                <Rect className="rec_air"
                                                    width={_width}
                                                    height={_height}
                                                    x={0}
                                                    y={0}
                                                    fill={fill_1}
                                                    stroke='black'
                                                    strokeWidth={0}
                                                    valign="top"
                                                />

                                                <Rect className="rec_fuel"
                                                    width={_width}
                                                    height={_height - _level_fuel}
                                                    x={0}
                                                    y={_level_fuel}
                                                    fill={fill_2}
                                                    stroke='black'
                                                    strokeWidth={0}
                                                    valign="top"
                                                />

                                                <Rect className="rec_water"
                                                    width={_width}
                                                    height={_height - _level_water}
                                                    x={0}
                                                    y={_level_water}
                                                    fill={fill_3}
                                                    stroke='black'
                                                    strokeWidth={0}
                                                    valign="top"
                                                />

                                                <Text fontSize={12} fill='black' Text={this.state.PL.Available_volume} x={2} y={+ 5} />

                                                <Text fontSize={12} fill='white' Text={this.state.PL.CURENT_VOLUME} x={2} y={_level_fuel + 5} />

                                                <Text fontSize={12} fill='blue' Text={this.state.PL.TOTAL_WATER} x={2} y={_level_water + 2} />
                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <hr /><hr />
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan='2'>
                                        <Stage width={130} height={20} x={0} y={0}>
                                            <Layer key='1'>
                                                <Rect
                                                    width={130}
                                                    height={20}
                                                    x={0}
                                                    y={0}
                                                    fill={_color1}
                                                    stroke='black'
                                                    strokeWidth={0}
                                                    valign="top"
                                                />
                                                <Text fontSize={12} fill='black'
                                                    Text={_text1}
                                                    x={_dX} y={+ 5} />
                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan='2' className='te_Mess'>
                                        <textarea className="te_Mess_Level" readOnly="readOnly"
                                            defaultValue={_text2} color={_color2} />

                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Stage'>
                                        {this.state.PL.azs}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='2'>
                                        <hr />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.storage_space}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.fuel}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.Available_volume}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.CURENT_VOLUME}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.TOTAL_WATER}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.temperature}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.density}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.date}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.time}
                                    </td>
                                </tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.status}
                                    </td>
                                </tr>
                                <tr>

                                    <td className='td_Data'>
                                        {this.state.PL.state}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                );
            } else {
                return <br />
            }
        } else {
            return <br />
        }
    }
}
