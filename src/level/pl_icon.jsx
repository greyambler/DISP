import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image, Ellipse } from 'react-konva';
import { get_PL, get_Text_Status_PL, get_Color_Status_PL } from '../core/core_Function.jsx';

import AZS_Image from '../control/AZS_Image.jsx'

import moment from 'moment';

const _Debuge = false;
/*
function get_Color_NET_2(Int) {
    var col = 'white';
    
    switch (Int) {
        case 0: col = 'rgba(0, 128, 0, 0.7)';//'green';
            break;
        case 1: col = 'rgba(0, 128, 0, 0.7)';//'green'; 
            break;
        case 2: col = 'yellow'; break;
        case 3: col = 'rgba(255, 0, 0, 0.6)';//'red';
            break;
        default: col = 'grey'; break;
    }
    
    return col;
}
function get_Text_NET_2(Int) {
    //var col = ' - ';
    var col = Int;
    
    switch (Int) {
        case 0: col = 'Превышие по параметру подтоварная вода'; break;
        case 1: col = 'Превышие по параметру минимальный объём'; break;
        case 2: col = 'Требуется поставка НП '; break;
        case 3: col = 'Отсутсвует информация в  период 1ч 15м'; break;
        case 4: col = 'По данным ручного ввода в период 1ч 15м'; break;
        default: col = ' - '; break;
    }
    
    return col;
}
*/

let TRK_Text = 'white';
function get_ICON_Fuel(TP_STATUS, Full_V, Curent_V) {

    //#define TP_ST_NON_REACHABLE       0 /* Нет резервуара */
    //#define TP_ST_INOPERATIVE         1 /* Неисправен, или нет связи */
    //#define TP_ST_OPERATIVE           2 /* Исправен */
    //#define TP_ST_MAINTENANCE         3 /* Идет конфигурация */

    let col = '/images/TANK_Error.png';
    if (TP_STATUS == null || TP_STATUS === undefined || !TP_STATUS.toString().startsWith("2")) {
        if (TP_STATUS == null || TP_STATUS === undefined || !TP_STATUS.toString().startsWith("0")) {

            return col;
        } else {
            col = '/images/TANK_NoConect.png';
            return col;
        }
    } else {
        col = '/images/TANK_Full_waterHalf.png';
        /*
                let PROC = Curent_V * 100 / Full_V;
        
                let Int = 0;
                if (PROC < 20) {
                    Int = 4;
                } else if (PROC > 20 && PROC < 60) {
                    Int = 3;
                } else if (PROC > 60) {
                    Int = 2;
                }
                switch (Int) {
                    case 0: col = '/images/TANK_Error.png'; break;
                    case 1: col = '/images/TANK_NoConect.png'; break;
                    case 2: col = '/images/TANK_Full_waterHalf.png'; break;
                    case 3: col = '/images/TANK_Half_waterNorm.png'; break;
                    case 4: col = '/images/TANK_Min_waterNorm.png'; break;
                    default: col = '/images/TANK_Full_waterHalf.png'; break;
                }
                */
        return col;
    }

}

export default class pl extends Component {
    constructor(props) {
        super(props);
        this.Set_Meter = this.Set_Meter.bind(this)
        this.state = {
            PL: null,
        }
    }
    componentDidMount() {
        this.setState({ PL: this.props.PL });
    }
    componentDidUpdate(prevProps) {
        if (this.props.PL != prevProps.PL) {
            this.setState({ PL: this.props.PL });
        }
    }
    Set_Meter() {
        /*
                let TOTAL_VOLUME = 0;
                let Available_volume = this.state.PL.Available_volume;
                if (Available_volume == 0) {
                    Available_volume = 1000 + this.state.PL.CURENT_VOLUME;
                }
                TOTAL_VOLUME = Available_volume +
                    this.state.PL.CURENT_VOLUME + this.state.PL.TOTAL_WATER;
        
                if (TOTAL_VOLUME != 0) {
        
        
        
                    /// координаты для отрисовки ////
                    let _width = 90;
                    let _height = 60;
        
        
        
                    let _delenie1 = _height / TOTAL_VOLUME;
                    let Level_Total = _delenie1 * TOTAL_VOLUME;
                    let Level_Water = _delenie1 * this.state.PL.TOTAL_WATER;
                    let Level_Fuel = _delenie1 * this.state.PL.CURENT_VOLUME;
        
                    let _level_water = _height - Level_Water;
                    let _level_fuel = _height - Level_Fuel - Level_Water;
        
                    let _dX = 5;
        
                    let PL_width = _width + _dX + 0.4;
        
                    /// координаты для отрисовки ////
        
                    /// сигнализация для отрисовки ////
        
                    let _color1 = 'white';//get_Color_Status_PL(this.props.PL.status);
        
                    let _text1 = this.props.PL.status;//get_Text_Status_PL(this.props.PL.status);
        
                    let _color2 = 'white';//get_Color_NET_2(this.props.PL.state);
        
                    let _text2 = this.props.PL.state;//get_Text_NET_2(this.props.PL.state);
        
                    let te_Mess_Level = {
                        minHeight: '50px',
                        fontSize: '12px',
                        fontWeight: '600',
                        height: '100%',
                        width: '100%',
                        textAlign: 'center',
                        color: 'black',
                        background: 'red',
                    }
        
                    /// сигнализация для отрисовки ////
        
                    let fill_1 = 'rgb(240, 209, 173)';
                    let fill_2 = 'rgb(163, 226, 245)';//'rgb(194, 125, 46)';
                    let fill_3 = 'blue';//'rgb(163, 226, 245)';
        
                    //'linear-gradient( rgb(4, 231, 231), rgb(1, 107, 107)) rgb(126, 255, 255)';
        
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
                    }
                    let ShowAll = false;
                    let s_meter = {
                        textAlign: 'center',
                    };
        
                    let _max = TOTAL_VOLUME;
                    if (_max == null)
                        _max = 0;
                    let _high = TOTAL_VOLUME * 49 / 100;     //49%
                    if (isNaN(_high))
                        _high = 0;
                    let _low = TOTAL_VOLUME * 19 / 100;      //21%
                    if (isNaN(_low))
                        _low = 0;
                    let _optimum = TOTAL_VOLUME * 70 / 100;  //70%
                    if (isNaN(_optimum))
                        _optimum = 0;
                    let _value = this.state.PL.CURENT_VOLUME + this.state.PL.TOTAL_WATER * 100 / TOTAL_VOLUME;
        
                }


                <tr>
                                <td style={s_meter}>
                                    <meter id={this.state.PL.id}
                                        low={_low}
                                        high={_high}
                                        max={_max}
                                        optimum="_optimum"
                                        value="_value"
                                    />
                                </td>
                            </tr>

                */
    }
    render() {
        if (this.state.PL != null) {
            let _height = 60;
            let _width = 70;
            let _dX = 5;
            let PL_width = _width + _dX + 0.4;
            let Icon_Tank = get_ICON_Fuel(this.state.PL.TP_STATUS, "TOTAL_VOLUME", this.state.PL.CURENT_VOLUME);
            return (
                <div>
                    <table className="tb_PL_Icon" >
                        <tbody>
                            {this.props.View_Icon &&
                                <tr>
                                    <td colSpan='1' className='td_Stage'>{this.state.PL.fuel}</td>
                                </tr>
                            }
                            {this.props.View_Icon &&
                                <tr>
                                    <td colSpan='1'>
                                        <Stage width={PL_width} height={_height + 10} x={_dX} y={0}>
                                            <Layer key='1' background='red' >
                                                <AZS_Image Image={Icon_Tank} _W='75' _H='65' _X={0 + 4} _Y={0 + 4} />
                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>
                            }
                            {this.props.View_Icon &&
                                <tr>
                                    <td colSpan='2'>
                                        <hr /><hr />
                                    </td>
                                </tr>
                            }
                            {this.props.View_Icon &&
                                <tr>
                                    <td colSpan='2'>
                                        <Stage width={PL_width} height={20} x={0} y={0}>
                                            <Layer key='1'>
                                                <Rect
                                                    width={PL_width}
                                                    height={20}
                                                    x={0}
                                                    y={0}
                                                    fill='white'
                                                    stroke='black'
                                                    strokeWidth={0}
                                                    valign="top"
                                                />

                                                <Text fontSize={12} fill='black'
                                                    Text={this.state.PL.TP_STATUS} align='center'
                                                    x={0} y={+ 5} width={PL_width} height={50} />
                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>
                            }
                            {this.props.View_Icon &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }
                            {this.props.View_Icon &&
                                <tr>
                                    <td colSpan='2'>
                                        <Stage width={PL_width} height={50} x={0} y={0}>
                                            <Layer key='1'>
                                                <Rect
                                                    width={PL_width}
                                                    height={50}
                                                    x={0}
                                                    y={0}
                                                    fill='white'
                                                    stroke='black'
                                                    strokeWidth={0}
                                                    valign="top"
                                                />
                                                <Text fontSize={12} fill='black'
                                                    Text={this.state.PL.TP_ALARM} align='center'
                                                    x={0} y={+ 5} width={PL_width} height={50} />
                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>
                            }
                            {this.props.View_Icon &&
                                <tr>
                                    <td colSpan='2'>
                                        <hr />
                                    </td>
                                </tr>
                            }
                            
                                <tr>
                                    <td colSpan='2'>
                                        <Stage width={PL_width} height={30} x={0} y={0}>
                                            <Layer key='1'>
                                                <Text fontSize={12} fill='black'
                                                    Text={this.state.PL.azs} align='center'
                                                    x={0} y={+ 1} width={PL_width} height={30} />
                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>
                            
                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.storage_space}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.fuel}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.Available_volume}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.CURENT_VOLUME}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.WATER_LEVEL}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.temperature}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.density}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.date == "" ? ('-') : (this.state.PL.date)}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.time == "" ? ('-') : (this.state.PL.time)}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.TP_STATUS}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.TP_ALARM}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&

                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.PRODUCT_LEVEL}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.TOTAL_OBSERVED_VOLUME}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.TOTAL_GROSS_STANDARD_VOLUME}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.AVERAGE_TEMP}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.OBSERVED_DENSITY}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.LAST_READING_DATE}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data && 
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.LAST_READING_TIME}
                                    </td>
                                </tr>
                            }{this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }{this.props.View_Data && 
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.WATER_VOLUME}
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>
            );
        } else {
            return <br />
        }
    }
}

