import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image, Ellipse } from 'react-konva';

import { get_PL, get_Text_Status_PL, get_Color_Status_PL, get_NameFuel } from '../../core/core_Function.jsx';

import AZS_Image from '../../control/AZS_Image.jsx'

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

function get_TextFirstCol(nameCol, PL_0, isFull) {
    let r = 0;
    let text = isFull ? PL_0[nameCol] : PL_0[nameCol].substr(0, 36);
    //let text = PL_0[nameCol];
/**/
    if (text != "0" && text != "---" && nameCol == "PRODUCT_LEVEL" && PL_0.id != 0) {
        try {
            let NUM_Text = Number(text);
            if (!isNaN(NUM_Text)) 
            {
                text = NUM_Text.toFixed(2);
            }
        } catch (error) {
        }
    }

    return text;
}
/*
function get_NameFuel(_id, ListType) {
    let t = _id;
    for (const iterator of ListType) {
        if (iterator.id == _id) {
            t = iterator.fu;
        }
    }
    return t;
}

*/

function Is_View_Row(Data, Name_Row) {
    let row = false;
    if (Data != undefined) {
        for (const iterator of Data) {
            if (iterator == Name_Row) {
                row = true;
                break;
            }
        }
        let r = 0;
    }

    return row;
}


export default class pl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PL: null,
            DeVal: null,
        }
    }
    componentDidMount() {
        this.setState({ PL: this.props.PL });
        this.setState({ DeVal: this.props.DeVal });
    }
    componentDidUpdate(prevProps) {
        if (this.props.PL != prevProps.PL) {
            this.setState({ PL: this.props.PL });
        }
        if (this.props.DeVal != prevProps.DeVal) {
            this.setState({ DeVal: this.props.DeVal }, this.full_Value);
            /*
            if (this.props.DeVal != null) {
                console.log('************************' + this.props.DeVal.id + '  ' + this.props.DeVal.values.length + '  ' + this.props.DeVal.values[0].typ + '  ' + this.props.DeVal.values[0].val);
            }
             */
        }
    }
    full_Value() {
        if (this.state.PL != null) {
            if (this.state.DeVal != null && this.state.PL.id == this.state.DeVal.id) {
                for (const iterator of this.state.DeVal.values) {
                    this.state.PL[iterator.typ] = iterator.val;
                    this.setState({ PL: this.state.PL });
                }
            }
        }
    }

    render() {

        if (this.state.PL != null) {
            let _height = 60;
            let _width = (this.state.PL.id == 0) ? 110 : 110;
            let _dX = 2;
            let PL_width = _width + _dX + 0.4;
            let Icon_Tank = get_ICON_Fuel(this.state.PL.TP_STATUS, "TOTAL_VOLUME", this.state.PL.CURENT_VOLUME);

            return (
                <div>
                    {this.props.PL_Col != null &&
                        <table
                            id={(this.state.PL.id != 0) ? 'Li_Level' : 'li_Level'}>
                            <tbody>
                                {//this.props.View_Icon &&
                                    Is_View_Row(this.props.View_Fields, 'icon_alarm') &&
                                    <tr>
                                        <td colSpan='1'>

                                            <Stage width={PL_width} height={_height + 3} x={_dX} y={0}>
                                                <Layer key='1' background='red' >

                                                    <AZS_Image Image={Icon_Tank} _W='75' _H='60' _X={0 + 4} _Y={0 + 4} />

                                                    {this.state.PL.id != '0' &&
                                                        <Text Text={get_NameFuel(this.state.PL.fuel, this.props.fuels)}
                                                            x='24' y='20' fill='black'
                                                            fontSize='34' fontFamily='Calibri' />
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
                                    this.props.PL_Col.map(el => (
                                        //(this.props.View_Data || el == 'nm') &&
                                        (Is_View_Row(this.props.View_Fields, 'data') || el == 'nm') &&
                                        <>

                                            <tr>
                                                

                                                <td colSpan='2'>
                                                    <hr />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td id='td_ID' title={get_TextFirstCol(el, this.state.PL, true)}>
                                                    {get_TextFirstCol(el, this.state.PL, true)}
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
        } else {
            return <br />
        }
    }
}

/*
    <tr>
        <td id='td_ID'>
            {el}
        </td>
    </tr>*/
