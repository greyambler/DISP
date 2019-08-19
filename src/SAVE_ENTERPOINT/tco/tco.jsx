import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { get_PL } from '../../core/core_Function.jsx';
import Field from '../../control/Field.jsx'
import AZS_Image from '../../control/AZS_Image.jsx'

import moment from 'moment';

const _Debuge = false;

let TRK_Text = 'black';
function get_ICON(Int) {
    var col = ' - ';

    switch (Int) {
        case 0: col = '/images/TCO_locked.png'; break;
        case 1: col = '/images/TCO_Ok.png'; break;
        case 2: col = '/images/TCO_Error.png'; break;
        default: col = '/images/TCO_NoConect.png'; break;
    }
    TRK_Text = 'black';

    return col;
}
function get_status(Int) {
    let col = 'Нет связи';
    switch (Int) {
        case 0: col = 'Ок'; break;
        case 1: col = 'Нет связи'; break;
        default: col = 'Нет связи'; break;
    }
    return col;
}
function get_iSelf (Int) {
    let col = 'Нет связи';
    switch (Int) {
        case 0: col = 'Ок'; break;
        case 1: col = 'нет связи с одним из хостов'; break;
        case 2: col = 'нет связи с устройством'; break;
        default: col = 'нет связи с устройством'; break;
    }
    return col;
}
function get_FR (Int, err_Mess) {
    let col = 'Нет связи';
    switch (Int) {
        case 0: col = 'Ок'; break;
        case 1: col = 'Нет связи'; break;
        case 2: col = err_Mess; break;
        default: col = 'Нет связи'; break;
    }
    return col;
}
function get_validator (Int, err_Mess) {
    let col = 'Нет связи';
    switch (Int) {
        case 0: col = 'Ок'; break;
        case 1: col = 'Нет связи'; break;
        case 2: col = err_Mess; break;
        default: col = 'Нет связи'; break;
    }
    return col;
}

function get_MFK (Int) {
    let col = 'Нет связи';
    switch (Int) {
        case 0: col = 'Ок'; break;
        case 1: col = 'Нет связи'; break;
        default: col = 'Нет связи'; break;
    }
    return col;
}

export default class tco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TCO: this.props.TCO,
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.TCO != prevProps.TCO) {
            this.setState({ TCO: this.props.TCO });
        }
    }
    render() {
        if (this.state.TCO != null) {
            let _height = 60;
            let _width = (this.state.TCO.id ==0 )?130:100;
            let _dX = 5;
            let PL_width = _width + _dX + 0.4;
            let Icon_TCO = get_ICON(this.state.TCO.status);
            /*
                        let _W_Image = 65;
                        let _X_s = 0;
                        let _Y_s = 0;
                        let _X_1 = _X_s + _W_Image;
                        let _Y_1 = _Y_s + 1;
            */
           let Li_Level = {
            'border': '0.1px solid rgb(0, 141, 141)',
            'paddingTop': '20px',
            'verticalAlign': 'text-top',
            'font-size': '12px'
        }
        let li_Level = {
            'background': 'white',
            'border': '3.1px solid rgb(0, 141, 141)',
            'paddingTop': '20px',
            'verticalAlign': 'text-top',
            'font-size': '12px'
        }
        //className="tb_TRK"
            return (
                <div>
                    <table style={(this.state.TCO.id != 0) ? Li_Level : li_Level} >
                        <tbody>
                            {this.props.View_Icon &&
                                <tr>
                                    <td colSpan='1'>
                                        <Stage width={PL_width} height={_height + 30} x={_dX} y={0}>
                                            <Layer key='1'>
                                                <AZS_Image Image={Icon_TCO} _W='65' _H='55' _X={0 + 4} _Y={0 + 14} />

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
                                                    Text={this.state.TCO.status.toString()} align='center'
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
                                                    Text={this.state.TCO.state.toString()} align='center'
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
                                                Text={this.state.TCO.azs} align='center'
                                                x={0} y={+ 1} width={PL_width} height={30} />
                                        </Layer>
                                    </Stage>
                                </td>
                            </tr>

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.number}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.iSelf}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }
                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.fr}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.validator}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.topSection}
                                    </td>
                                </tr>
                            }
                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }
                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.lowerSection}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }                       
                                 {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.safe}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }
                                                  
                                 {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.MFK}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }
                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.date == "" ? ('-') : (this.state.TCO.date)}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.time == "" ? ('-') : (this.state.TCO.time)}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.status}
                                    </td>
                                </tr>
                            }
                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TCO.state}
                                    </td>
                                </tr>
                            }

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