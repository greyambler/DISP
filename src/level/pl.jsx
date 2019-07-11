import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image, Ellipse } from 'react-konva';
import { get_PL, get_Text_Status_PL, get_Color_Status_PL } from '../core/core_Function.jsx';

import moment from 'moment';

const _Debuge = false;


function get_Color_NET_2(Int) {
    var col = 'while';
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
    var col = ' - ';
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


export default class pl extends Component {
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
            this.setState({ PL: this.props.PL });
        }
    }
    render() {
        if (this.state.PL != null) {
            let TOTAL_VOLUME = 0;
            let Available_volume = this.state.PL.Available_volume;
            if (Available_volume == 0) {
                Available_volume = 1000 + this.state.PL.CURENT_VOLUME;
            }
            TOTAL_VOLUME = Available_volume +
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

                let _color1 = get_Color_Status_PL(this.props.PL.status);
                let _text1 = get_Text_Status_PL(this.props.PL.status);

                let _color2 = get_Color_NET_2(this.props.PL.state);
                let _text2 = get_Text_NET_2(this.props.PL.state);

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

                /********* сигнализация для отрисовки********************* */

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
                /*
                                _min = 0;
                                _max = 100;
                                _high = 30;
                                _low = 15;
                                _optimum = 70;
                                _value = 37;
                <meter max="10" high="6" low="3" value="2"  optimum="7"></meter>
                */
                /*
                
                                                <tr>
                                                    <td className='td_Stage'>
                                                        {this.state.PL.azs}
                                                    </td>
                                                </tr>
                */
                return (
                    <div>
                        <table className="tb_PL" >
                            <tbody>
                                <tr>
                                    <td colSpan='1' className='td_Stage'>{this.state.PL.fuel}</td>
                                </tr>
                                <tr>
                                    <td colSpan='1'>
                                        <Stage width={_width + _dX + 0.4} height={_height + 20} x={_dX} y={0}>
                                            <Layer key='1' background='red' >

                                                <Rect className="rec_air"
                                                    width={_width - 0.5}
                                                    height={_height - 12}
                                                    x={0}
                                                    y={12}
                                                    fill={fill_1}
                                                    stroke='black'
                                                    strokeWidth={1}
                                                    valign="top"
                                                />
                                                <Ellipse
                                                    width={50}
                                                    height={20}
                                                    x={25}
                                                    y={10}
                                                    radius={50}
                                                    fill={fill_1}
                                                    stroke='black'
                                                    strokeWidth={1}
                                                />

                                                <Rect className="rec_fuel"
                                                    width={_width - 0.5}
                                                    height={_height - _level_fuel}
                                                    x={0}
                                                    y={_level_fuel}
                                                    fill={fill_2}
                                                    stroke='black'
                                                    strokeWidth={1}
                                                    valign="top"
                                                />

                                                <Ellipse
                                                    width={50}
                                                    height={20}
                                                    x={25}
                                                    y={_level_water + _height - _level_water}
                                                    radius={50}
                                                    fill={fill_3}
                                                    stroke='black'
                                                    strokeWidth={1}
                                                />

                                                <Rect className="rec_water"
                                                    width={_width - 0.5}
                                                    height={_height - _level_water}
                                                    x={0}
                                                    y={_level_water}
                                                    fill={fill_3}
                                                    stroke='black'
                                                    strokeWidth={1}
                                                    valign="top"
                                                />
                                                <Ellipse
                                                    width={49}
                                                    height={19}
                                                    x={25}
                                                    y={_level_water + _height - _level_water}
                                                    radius={49}
                                                    fill={fill_3}
                                                    stroke='black'
                                                    strokeWidth={0}
                                                />
                                                <Ellipse
                                                    width={50}
                                                    height={20}
                                                    x={25}
                                                    y={_level_water}

                                                    radius={50}
                                                    fill={fill_2}
                                                    border={1}
                                                    stroke='black'
                                                    strokeWidth={1}
                                                />

                                                <Text fontSize={12} fill='black' Text={this.state.PL.TOTAL_WATER} x={3} y={_level_water - 5} />

                                                <Ellipse
                                                    width={50}
                                                    height={20}
                                                    x={25}
                                                    y={_level_fuel}
                                                    radius={50}
                                                    fill={fill_2}
                                                    stroke='black'
                                                    strokeWidth={1}
                                                />

                                                <Text fontSize={12} fill='black' Text={this.state.PL.Available_volume} x={3} y={5} />

                                                <Text fontSize={12} fill='black' Text={this.state.PL.CURENT_VOLUME} x={3} y={_level_fuel - 5} />

                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={s_meter}>
                                        <meter id={this.state.PL.id}
                                            low={_low}
                                            high={_high}
                                            max={_max}
                                            optimum={_optimum}
                                            value={_value}
                                        />
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
                                                <Text fontSize={13} fill='black'
                                                    Text={_text1}
                                                    x={_dX} y={+ 5} />
                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>

                                <tr><td colSpan='2'><hr /></td></tr>

                                <tr>
                                    <td colSpan='2'>
                                        <Stage width={130} height={50} x={0} y={0}>
                                            <Layer key='1'>
                                                <Rect
                                                    width={130}
                                                    height={50}
                                                    x={0}
                                                    y={0}
                                                    fill={_color2}
                                                    stroke='black'
                                                    strokeWidth={0}
                                                    valign="top"
                                                />
                                                <Text fontSize={13} fill='black'
                                                    Text={_text2} align='center'
                                                    x={0} y={+ 5} width={130} height={50} />
                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>
                                {ShowAll &&
                                    <tr>
                                        <td colSpan='2' className='te_Mess'>
                                            <textarea style={te_Mess_Level} readOnly="readOnly"
                                                defaultValue={_text2} color={_color2} />
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <td colSpan='2'>
                                        <hr />
                                    </td>
                                </tr>


                                <tr>
                                    <td colSpan='2'>
                                        <Stage width={130} height={30} x={0} y={0}>
                                            <Layer key='1'>
                                                <Text fontSize={13} fill='black'
                                                    Text={this.state.PL.azs} align='center'
                                                    x={0} y={+ 1} width={130} height={30} />
                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>


                                <tr><td colSpan='2'><hr /></td></tr>

                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.storage_space}
                                    </td>
                                </tr>

                                <tr><td colSpan='2'><hr /></td></tr>

                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.fuel}
                                    </td>
                                </tr>
                                <tr><td colSpan='2'><hr /></td></tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.Available_volume}
                                    </td>
                                </tr>
                                <tr><td colSpan='2'><hr /></td></tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.CURENT_VOLUME}
                                    </td>
                                </tr>
                                <tr><td colSpan='2'><hr /></td></tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.TOTAL_WATER}
                                    </td>
                                </tr>
                                <tr><td colSpan='2'><hr /></td></tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.temperature}
                                    </td>
                                </tr>
                                <tr><td colSpan='2'><hr /></td></tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.density}
                                    </td>
                                </tr>
                                <tr><td colSpan='2'><hr /></td></tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.date == "" ? ('-') : (this.state.PL.date)}
                                    </td>
                                </tr>
                                <tr><td colSpan='2'><hr /></td></tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.time == "" ? ('-') : (this.state.PL.time)}
                                    </td>
                                </tr>
                                <tr><td colSpan='2'><hr /></td></tr>
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.PL.status}
                                    </td>
                                </tr>
                                <tr><td colSpan='2'><hr /></td></tr>
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
