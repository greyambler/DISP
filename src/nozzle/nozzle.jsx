import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { get_PL } from '../core/core_Function.jsx';
import Field from '../control/Field.jsx'
import AZS_Image from '../control/AZS_Image.jsx'

import moment from 'moment';
import './nozzle.css';

const _Debuge = false;



function get_Color_NET(Int) {
    var col = 'while';
    switch (Int) {
        case 0: col = 'red'; break;
        case 1: col = 'green'; break;
        default: col = 'red'; break;
    }
    return col;
}
function get_Text_NET(Int) {
    var col = 'Нет данных';
    switch (Int) {
        case 0: col = 'Нет связи'; break;
        case 1: col = 'В сети'; break;
        default: col = 'Нет связи'; break;
    }
    return col;
}

function get_Color_NET_2(Int) {
    var col = 'while';
    switch (Int) {
        case 0: col = 'green'; break;
        case 1: col = 'red'; break;
        case 2: col = 'red'; break;
        default: col = 'grey'; break;
    }
    return col;
}
function get_Text_NET_2(Int) {
    var col = ' - ';
    switch (Int) {
        case 0: col = ''; break;
        case 1: col = 'Превышие по параметру снят пистолет в период'; break;
        case 2: col = 'Отсутсвует информация в период '; break;
        default: col = ' - '; break;
    }
    return col;
}

export default class nozzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NOZZLE: this.props.NOZZLE,
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.NOZZLE != prevProps.NOZZLE) {
            this.setState({ NOZZLE: this.props.NOZZLE });
        }
    }
    render() {
        if (this.state.NOZZLE != null) {
            /********* координаты для отрисовки********************* */
            let _W_Image = 65;
            let _H_Image = 65;

            let _W = _H_Image + 8; //130
            let _H = _H_Image + 28;



            let _X_s = 0;
            let _Y_s = 0;
            let _X_1 = _X_s + _W_Image;
            let _Y_1 = _Y_s + 1;

            //let _dX = 5;

            /********* координаты для отрисовки********************* */
            /********* сигнализация для отрисовки********************* */

            let _color1 = get_Color_NET(this.props.NOZZLE.status);
            let _text1 = get_Text_NET(this.props.NOZZLE.status);

            let _color2 = get_Color_NET_2(this.props.NOZZLE.state);
            let _text2 = get_Text_NET_2(this.props.NOZZLE.state);

            /********* сигнализация для отрисовки********************* */



            if (this.state.NOZZLE.id == 0) {
                /*            _delenie1 = 1;
                            Level_Total = 200;
                            Level_Water = 10;
                            Level_Fuel = 100;
                
                            _level_water = _height - Level_Water;
                            _level_fuel = _height - Level_Fuel - Level_Water;*/
                _text1 = this.state.NOZZLE.status;
                _text2 = this.state.NOZZLE.state;
                _color1 = 'rgb(255, 255, 255)';
                _color2 = 'rgb(255, 255, 255)';
                /*
                te_Mess_Level = {
                    minHeight: '50px',
                    fontSize: '12px',
                    fontWeight: '600',
                    height: '100%',
                    width: '100%',
                    textAlign: 'center',
                    color: 'black',
                    background: 'white',
                }
               */

            }


            let ShowAll = this.state.NOZZLE.id != 0;
            /*<Text Text={this.state.NOZZLE.fuel} x={_X_1} y={_Y_1 + 20} />*/

            return (
                <div>
                    <table className="tb_NOZZ" >
                        <tbody>
                            <tr>
                                <td>
                                    {this.state.NOZZLE.id != 0
                                        ? (
                                            <Stage className="t_Stage" width={_W} height={_H} x={_X_s} y={_Y_s} >
                                                <Layer>
                                                    <Field _W={_W} _H={_H} obj_color={_color1} _X={_X_s} _Y={_Y_s} s_Width={0} />
                                                    <AZS_Image Image='/images/trk0.png' _W={_W_Image} _H={_H_Image} _X={_X_s + 4} _Y={_Y_1 + 4} />

                                                    <Text Text={this.state.NOZZLE.name} x={_X_s + 15} y={_Y_s + 32} fill='white'
                                                        fontSize='30' fontFamily='Calibri' />

                                                </Layer>
                                            </Stage>
                                        ) : (
                                            <Stage className="t_Stage" width={_W} height={_H} x={_X_s} y={_Y_s} >
                                                <Layer>

                                                    <Field _W={_W} _H={_H} obj_color='white' _X={_X_s} _Y={_Y_s} s_Width={0} />

                                                </Layer>
                                            </Stage>
                                        )
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Stage width={_W} height={20} x={0} y={0}>
                                        <Layer key='1'>
                                            <Rect
                                                width={_W}
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
                                                x={10} y={5} />
                                        </Layer>
                                    </Stage>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Stage width={_W} height={50} x={0} y={0}>
                                        <Layer key='1'>
                                            <Rect
                                                width={_W}
                                                height={50}
                                                x={0}
                                                y={0}
                                                fill={_color2}
                                                stroke='black'
                                                strokeWidth={0}
                                                valign="top"
                                            />
                                            <Text fontSize={10} fill='black'
                                                Text={_text2} align='center'
                                                x={0} y={5} width={_W} height={50} />
                                        </Layer>
                                    </Stage>
                                </td>
                            </tr>

                            <tr>
                                <td className='td_Data'>
                                    {this.state.NOZZLE.azs}
                                </td>
                            </tr>
                            <tr>
                                <td className='td_Data'>
                                    {this.state.NOZZLE.pump}
                                </td>
                            </tr>
                            <tr>
                                <td className='td_Data'>
                                    {this.state.NOZZLE.name}
                                </td>
                            </tr>
                            <tr>
                                <td className='td_Data'>
                                    {this.state.NOZZLE.counter}
                                </td>
                            </tr>
                            <tr>
                                <td className='td_Data'>
                                    {this.state.NOZZLE.fuel}
                                </td>
                            </tr>
                            <tr>
                                <td className='td_Data'>
                                    {this.state.NOZZLE.date}
                                </td>
                            </tr>
                            <tr>
                                <td className='td_Data'>
                                    {this.state.NOZZLE.time}
                                </td>
                            </tr>
                            <tr>
                                <td className='td_Data'>
                                    {this.state.NOZZLE.status}
                                </td>
                            </tr>
                            <tr>

                                <td className='td_Data'>
                                    {this.state.NOZZLE.state}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return <br />
        }
    }
}