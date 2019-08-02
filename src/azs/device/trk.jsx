import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

//import Field from '../../control/Field.jsx'

import { get_PL, get_NameFuel } from '../../core/core_Function.jsx';

import AZS_Image from '../../control/AZS_Image.jsx'

import moment from 'moment';

const _Debuge = false;

let TRK_Text = 'white';
function get_ICON_Fuel(TP_STATUS, Full_V, Curent_V) {

    //#define TP_ST_NON_REACHABLE       0 /* Нет резервуара */
    //#define TP_ST_INOPERATIVE         1 /* Неисправен, или нет связи */
    //#define TP_ST_OPERATIVE           2 /* Исправен */
    //#define TP_ST_MAINTENANCE         3 /* Идет конфигурация */

    let col = '/images/ТРК_Error.png';
    if (TP_STATUS == null || TP_STATUS === undefined || !TP_STATUS.toString().startsWith("2")) {
        if (TP_STATUS == null || TP_STATUS === undefined || !TP_STATUS.toString().startsWith("0")) {

            return col;
        } else {
            col = '/images/ТРК_NoConect.png';
            return col;
        }
    } else {
        col = '/images/ТРК_Ok.png';

        return col;
    }
}
function get_TextFirstCol(nameCol, TRK_0) {
    let r = 0;
    return TRK_0[nameCol];
    /*
    for (const iterator of PL_0) {
        return iterator[nameCol];
    }
    */
}

export default class trk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TRK: null,
            DeVal: null,
        }
    }
    componentDidMount() {
        this.setState({ TRK: this.props.TRK });
        this.setState({ DeVal: this.props.DeVal });
    }
    componentDidUpdate(prevProps) {
        if (this.props.TRK != prevProps.TRK) {
            this.setState({ TRK: this.props.TRK });
        }
        if (this.props.DeVal != prevProps.DeVal) {
            this.setState({ DeVal: this.props.DeVal }, this.full_Value);
        }
    }
    full_Value() {
        if (this.state.TRK != null) {
            if (this.state.DeVal != null && this.state.TRK.id == this.state.DeVal.id) {
                for (const iterator of this.state.DeVal.values) {
                    this.state.TRK[iterator.typ] = iterator.val;
                    this.setState({ TRK: this.state.TRK });
                }
            }
        }
    }
    render() {
        if (this.state.TRK != null) {
            let _height = 60;
            let _width = (this.state.TRK.id == 0) ? 110 : 80;
            let _dX = 2;
            let PL_width = _width + _dX + 0.4;
            let Icon_TRK = get_ICON_Fuel(this.state.TRK.TP_STATUS, "TOTAL_VOLUME", this.state.TRK.CURENT_VOLUME);

            return (
                <div>
                    {this.props.TRK_Col != null &&
                        <table
                            id={(this.state.TRK.id != 0) ? 'Li_Level' : 'li_Level'}>
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

                                                    {this.state.TRK.id != 0 && /*this.state.TRK.status == 1 &&*/
                                                        <Text Text={get_NameFuel(this.state.TRK.fuel, this.props.fuels)} x='2' y='75' fill='black'
                                                            fontSize='14' fontFamily='Calibri' />
                                                    }

                                                </Layer>
                                            </Stage>
                                        </td>
                                    </tr>
                                }

                                <tr>
                                    <td colSpan='2'>
                                        <hr />
                                    </td>
                                </tr>
                                {
                                    this.props.TRK_Col.map(el => (
                                        (this.props.View_Data || el == 'nm') &&
                                        <>
                                            <tr>
                                                <td colSpan='2'>
                                                    <hr />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td id='td_ID'>
                                                    {get_TextFirstCol(el, this.state.TRK)}
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                }

                            </tbody>
                        </table>
                    }
                </div>
            );
        }
        else {
            return <br />
        }
    }
}