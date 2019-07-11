import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { get_PL } from '../core/core_Function.jsx';
import Field from '../control/Field.jsx'
import AZS_Image from '../control/AZS_Image.jsx'



import moment from 'moment';


const _Debuge = false;



function get_Color_NET(Int) {
    var col = 'while';
    switch (Int) {
        case 0: col = 'rgba(255, 0, 0, 0.6)';//'red'; 
            break;
        case 1: col = 'rgba(0, 128, 0, 0.7)';//'green'; 
            break;
        default: col = 'rgba(255, 0, 0, 0.6)';//'red'; 
            break;
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
        case 0: col = 'rgba(0, 128, 0, 0.7)';//'green';
            break;
        case 1: col = 'rgba(255, 0, 0, 0.6)';//'red'; 
            break;
        case 2: col = 'rgba(255, 0, 0, 0.6)';//'red';
            break;
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
function get_Color_NET_3(Int) {
    var col = 'while';
    switch (Int) {
        case 0: col = 'rgba(0, 128, 0, 0.7)';//'green'; 
            break;
        case 1: col = 'yellow'; break;
        case 2: col = 'rgba(255, 127, 80, 0.5)';//'coral'; 
        break;
        case 3: col = 'rgba(255, 0, 0, 0.6)';//'red'; 
            break;
        default: col = 'grey'; break;
    }
    return col;
}
function get_Text_NET_3(Int) {
    var col = ' - ';
    switch (Int) {
        case 0: col = 'Готов'; break;
        case 1: col = 'Снят'; break;
        case 2: col = 'Налив'; break;
        case 3: col = 'Не работает'; break;
        default: col = ' - '; break;
    }
    return col;
}
let TRK_Text = 'white';
function get_ICON_NET_3(Int) {
    var col = ' - ';
    switch (Int) {
        case 0: col = '/images/trk0.png'; break;
        case 1: col = '/images/trk1.png'; break;
        case 2: col = '/images/trk1.png'; break;
        case 3: col = '/images/trk0.png'; break;
        default: col = ' - '; break;
    }
    /*
    switch (Int) {
        case 0: col = '/images/ТРК_Ok.png'; break;
        case 1: col = '/images/ТРК_out.png'; break;
        case 2: col = '/images/ТРК_Work.png'; break;
        case 3: col = '/images/ТРК_Error.png'; break;
        default: col = '/images/ТРК_NoConect.png'; break;
    }
    TRK_Text = 'black';
    */
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
            /********* координаты для отрисовки*********************** */
            let _W_Image = 65;
            let _H_Image = 65;

            let _W = _H_Image + 8; //130
            let _H = _H_Image + 28;

            let _X_s = 0;
            let _Y_s = 0;
            let _X_1 = _X_s + _W_Image;
            let _Y_1 = _Y_s + 1;

            /********* координаты для отрисовки*********************** */

            /********* сигнализация для отрисовки********************* */

            let _color1 = get_Color_NET(this.props.NOZZLE.status);
            let _text1 = get_Text_NET(this.props.NOZZLE.status);

            let _color2 = get_Color_NET_2(this.props.NOZZLE.state);
            let _text2 = get_Text_NET_2(this.props.NOZZLE.state);

            let _color3 = get_Color_NET_3(this.props.NOZZLE.stategun);
            let _text3 = get_Text_NET_3(this.props.NOZZLE.stategun);
            let _icon3 = get_ICON_NET_3(this.props.NOZZLE.stategun);


            /********* сигнализация для отрисовки********************* */
            if (this.state.NOZZLE.id == 0) {
                _text1 = this.state.NOZZLE.status;
                _text2 = this.state.NOZZLE.state;
                _color1 = 'rgb(255, 255, 255)';
                _color2 = 'rgb(255, 255, 255)';
            }
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
                                                    <Field _W={_W} _H={_H} obj_color={_color3} _X={_X_s} _Y={_Y_s} s_Width={0} />
                                                    <AZS_Image Image={_icon3} _W={_W_Image} _H={_H_Image} _X={_X_s + 4} _Y={_Y_1 + 4} />

                                                    <Text Text={this.state.NOZZLE.name} x={_X_s + 15} y={_Y_s + 32} fill={TRK_Text}
                                                        fontSize='30' fontFamily='Calibri' />

                                                    <Text Text={_text3} x={_X_s + 4} y={_Y_s + 75} width={_W} fill='black'
                                                        fontSize='14' fontFamily='Calibri' />


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
                                <td className='td_Data_MaxHead'>
                                    {this.state.NOZZLE.fuel}
                                </td>
                            </tr>
                            <tr>
                                <td className='td_Data_Max'>
                                    {this.state.NOZZLE.counter}
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