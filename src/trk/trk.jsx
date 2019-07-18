import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { get_PL } from '../core/core_Function.jsx';
import Field from '../control/Field.jsx'
import AZS_Image from '../control/AZS_Image.jsx'

import moment from 'moment';


const _Debuge = false;


function get_Text_NET(Int) {
    var col = 'Нет данных';
    switch (Int) {
        case 0: col = 'Нет связи'; break;
        case 1: col = 'В сети'; break;
        default: col = 'Нет связи'; break;
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
let TRK_Text = 'black';
function get_ICON_NET_3(Int) {
    var col = ' - ';

    switch (Int) {
        case 0: col = '/images/ТРК_Ok.png'; break;
        case 1: col = '/images/ТРК_out.png'; break;
        case 2: col = '/images/ТРК_Work.png'; break;
        case 3: col = '/images/ТРК_Error.png'; break;
        default: col = '/images/ТРК_NoConect.png'; break;
    }
    TRK_Text = 'black';

    return col;
}

export default class trk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TRK: this.props.TRK,
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.TRK != prevProps.TRK) {
            this.setState({ TRK: this.props.TRK });
        }
    }
    render() {
        if (this.state.TRK != null) {
            let _height = 60;
            let _width = 100;
            let _dX = 5;
            let PL_width = _width + _dX + 0.4;
            let Icon_TRK = get_ICON_NET_3(this.state.TRK.status);
            /*
                        let _W_Image = 65;
                        let _X_s = 0;
                        let _Y_s = 0;
                        let _X_1 = _X_s + _W_Image;
                        let _Y_1 = _Y_s + 1;
            */
            return (
                <div>
                    <table className="tb_TRK" >
                        <tbody>
                            {this.props.View_Icon &&
                                <tr>
                                    <td colSpan='1'>
                                        <Stage width={PL_width} height={_height + 30} x={_dX} y={0}>
                                            <Layer key='1'>
                                                <AZS_Image Image={Icon_TRK} _W='65' _H='55' _X={0 + 4} _Y={0 + 14} />

                                                <Text Text={this.state.TRK.pump} x='2' y='0' fill='black'
                                                    fontSize='14' fontFamily='Calibri' />


                                                {this.state.TRK.id != 0 && this.state.TRK.status == 1 &&
                                                    <Text Text={this.state.TRK.nozzle} x='65' y='20' fill='black'
                                                        fontSize='50' fontFamily='Calibri' />
                                                }

                                                {this.state.TRK.id != 0 && this.state.TRK.status == 1 &&
                                                    <Text Text={this.state.TRK.fuel} x='2' y='75' fill='black'
                                                        fontSize='14' fontFamily='Calibri' />
                                                }
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
                                                    Text={get_Text_NET(this.state.TRK.status)} align='center'
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
                                                    Text={this.state.TRK.state.toString()} align='center'
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
                                                Text={this.state.TRK.azs} align='center'
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
                                        {this.state.TRK.pump}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TRK.status == 1 || this.state.TRK.id == 0 ?
                                            (this.state.TRK.Counter_Curent) : ("")
                                        }
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }
                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TRK.status == 1 || this.state.TRK.id == 0 ?
                                            (this.state.TRK.fuel) : ("")
                                        }
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TRK.status == 1 || this.state.TRK.id == 0 ?
                                            (this.state.TRK.nozzle) : ("")
                                        }
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TRK.date == "" ? ('-') : (this.state.TRK.date)}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TRK.time == "" ? ('-') : (this.state.TRK.time)}
                                    </td>
                                </tr>
                            }

                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TRK.status}
                                    </td>
                                </tr>
                            }
                            {this.props.View_Data &&
                                <tr><td colSpan='2'><hr /></td></tr>
                            }

                            {this.props.View_Data &&
                                <tr>
                                    <td className='td_Data'>
                                        {this.state.TRK.state}
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