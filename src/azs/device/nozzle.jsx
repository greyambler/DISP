import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { get_PL, get_NameFuel } from '../../core/core_Function.jsx';


import AZS_Image from '../../control/AZS_Image.jsx'



import moment from 'moment';


const _Debuge = false;

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
        col = '/images/ТРК_Work.png';

        return col;
    }
}
function get_TextFirstCol(nameCol, PL_0) {
    let r = 0;
    return PL_0[nameCol];
    /*
    for (const iterator of PL_0) {
        return iterator[nameCol];
    }
    */
}



export default class nozzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NOZZLE: null,
            DeVal: null,
        }
    }
    componentDidMount() {
        this.setState({ NOZZLE: this.props.NOZZLE });
        this.setState({ DeVal: this.props.DeVal });
    }
    componentDidUpdate(prevProps) {
        if (this.props.NOZZLE != prevProps.NOZZLE) {
            this.setState({ NOZZLE: this.props.NOZZLE });
        }
        if (this.props.DeVal != prevProps.DeVal) {
            this.setState({ DeVal: this.props.DeVal }, this.full_Value);
        }
    }
    full_Value() {
        if (this.state.NOZZLE != null) {
            if (this.state.DeVal != null && this.state.NOZZLE.id == this.state.DeVal.id) {
                for (const iterator of this.state.DeVal.values) {
                    this.state.NOZZLE[iterator.typ] = iterator.val;
                    this.setState({ NOZZLE: this.state.NOZZLE });
                }
            }
        }
    }
    render() {
        if (this.state.NOZZLE != null) {
            let _height = 60;
            let _width = (this.state.NOZZLE.id == 0) ? 110 : 80;
            let _dX = 2;
            let PL_width = _width + _dX + 0.4;
            let Icon_Tank = get_ICON_Fuel(this.state.NOZZLE.TP_STATUS, "TOTAL_VOLUME", this.state.NOZZLE.CURENT_VOLUME);

            return (
                <div>
                    {this.props.NOZZLE_Col != null &&
                        <table
                            id={(this.state.NOZZLE.id != 0) ? 'Li_Level' : 'li_Level'}>
                            <tbody>
                                {this.props.View_Icon &&
                                    <tr>
                                        <td>
                                            <Stage width={PL_width} height={_height + 3} x={_dX} y={0}>
                                                <Layer>
                                                    <AZS_Image Image={Icon_Tank} _W='65' _H='45' _X={0 + 4} _Y={0 + 4} />
                                                    {this.state.NOZZLE.id != 0 && /*this.state.TRK.status == 1 &&*/
                                                        <Text Text={get_NameFuel(this.state.NOZZLE.fuel, this.props.fuels)}
                                                            x='12' y='22' fill='black'
                                                            fontSize='24' fontFamily='Calibri' />
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
                                    this.props.NOZZLE_Col.map(el => (
                                        (this.props.View_Data || el == 'nm') &&
                                        <>
                                            <tr>
                                                <td colSpan='2'>
                                                    <hr />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td id='td_ID'>
                                                    {get_TextFirstCol(el, this.state.NOZZLE)}
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