import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { get_PL, get_NameFuel } from '../../core/core_Function.jsx';
import Field from '../../control/Field.jsx'
import AZS_Image from '../../control/AZS_Image.jsx'

import moment from 'moment';

const _Debuge = false;

let TRK_Text = 'black';
function get_ICON_Fuel(TP_STATUS, Full_V, Curent_V) {

    //#define TP_ST_NON_REACHABLE       0 /* Нет резервуара */
    //#define TP_ST_INOPERATIVE         1 /* Неисправен, или нет связи */
    //#define TP_ST_OPERATIVE           2 /* Исправен */
    //#define TP_ST_MAINTENANCE         3 /* Идет конфигурация */

    let col = '/images/TCO_Error.png';
    if (TP_STATUS == null || TP_STATUS === undefined || !TP_STATUS.toString().startsWith("2")) {
        if (TP_STATUS == null || TP_STATUS === undefined || !TP_STATUS.toString().startsWith("0")) {

            return col;
        } else {
            col = '/images/TCO_NoConect.png';
            return col;
        }
    } else {
        col = '/images/TCO_Ok.png';

        return col;
    }
}
function get_TextFirstCol(nameCol, TCO_0) {
    let r = 0;
    return TCO_0[nameCol];
    /*
    for (const iterator of PL_0) {
        return iterator[nameCol];
    }
    */
}



export default class tco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TCO: null,
            DeVal: null,
        }
    }
    componentDidMount() {
        this.setState({ TCO: this.props.TCO });
        this.setState({ DeVal: this.props.DeVal });
    }
    componentDidUpdate(prevProps) {
        if (this.props.TCO != prevProps.TCO) {
            this.setState({ TCO: this.props.TCO });
        }
        if (this.props.DeVal != prevProps.DeVal) {
            this.setState({ DeVal: this.props.DeVal }, this.full_Value);
        }
    }
    full_Value() {
        if (this.state.TCO != null) {
            if (this.state.DeVal != null && this.state.TCO.id == this.state.DeVal.id) {
                for (const iterator of this.state.DeVal.values) {
                    this.state.TCO[iterator.typ] = iterator.val;
                    this.setState({ TCO: this.state.TCO });
                }
            }
        }
    }
    render() {
        if (this.state.TCO != null) {
            let _height = 60;
            let _width = (this.state.TCO.id == 0) ? 110 : 80;
            let _dX = 2;
            let PL_width = _width + _dX + 0.4;
            let Icon_TCO = get_ICON_Fuel(this.state.TCO.TP_STATUS, "TOTAL_VOLUME", this.state.TCO.CURENT_VOLUME);

            return (
                <div>
                    {this.props.TCO_Col != null &&
                        <table
                            id={(this.state.TCO.id != 0) ? 'Li_Level' : 'li_Level'}>
                            <tbody>
                                {this.props.View_Icon &&
                                    <tr>
                                        <td colSpan='1'>
                                            <Stage width={PL_width} height={_height + 30} x={_dX} y={0}>
                                                <Layer key='1'>
                                                    <AZS_Image Image={Icon_TCO} _W='65' _H='55' _X={0 + 4} _Y={0 + 14} />

                                                    {this.state.TCO.id != 0 && /*this.state.TRK.status == 1 &&*/
                                                        <Text Text={get_NameFuel(this.state.TCO.fuel, this.props.fuels)} x='2' y='75' fill='black'
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
                                    this.props.TCO_Col.map(el => (
                                        (this.props.View_Data || el == 'nm') &&
                                        <>
                                            <tr>
                                                <td colSpan='2'>
                                                    <hr />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td id='td_ID'>
                                                    {get_TextFirstCol(el, this.state.TCO)}
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