import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image, Ellipse } from 'react-konva';
import { get_PL, get_Text_Status_PL, get_Color_Status_PL } from '../core/core_Function.jsx';

import AZS_Image from '../control/AZS_Image.jsx'

import moment from 'moment';

const _Debuge = false;

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

        return col;
    }
}


export default class pl extends Component {
    constructor(props) {
        super(props);

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

    render() {
        if (this.state.PL != null) {
            let _height = 60;
            let _width = (this.state.PL.id ==0 )?130:100;
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

