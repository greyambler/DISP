import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

//import Field from '../../control/Field.jsx'

import { get_PL, get_NameFuel } from '../../core/core_Function.jsx';

import AZS_Image from '../../control/AZS_Image.jsx'

import moment from 'moment';

const _Debuge = false;

let TRK_Text = 'white';
function get_ICON_Fuel(_STATUS) {

    let col = '/images/ТРК_Error.png';
    let r = +_STATUS;
    let NUM_STATUS = Number(_STATUS);
    if (!isNaN(NUM_STATUS)) {
        switch (NUM_STATUS) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11: col = '/images/ТРК_Ok.png'; break;
            default: col = '/images/ТРК_NoConect.png'; break;
        }
    }
    return col;
}

function get_ICON_Lock(val) {

    let col = '/images/Unlocked.png';


    switch (val) {
        case 0:
        case 1:col = '/images/Unlocked.png'; break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:col = '/images/Locked.png'; break; 
        default: col = '/images/Unlocked.png'; break;
    }
    return col;
}


function get_TextFirstCol(nameCol, TRK_0, _List_Objs) {
    let text = nameCol;
    try {
        text = TRK_0[nameCol];
    } catch (error) {

    }

    /*
    if (text != "0" && text != "---" && nameCol == "CURRENT_TRANSACTION" && TRK_0.id != 0) {
        try {
            let NUM_Text = Number(text);
            if (!isNaN(NUM_Text)) 
            {
                text = NUM_Text.toFixed(6);
            }
        } catch (error) {
        }
    }
    */
    if (text != "0" && text != "---" && nameCol == "STATUS_TRK" && TRK_0.id != 0 && _List_Objs != undefined) {
        if (_List_Objs.tpList != undefined) {
            for (const devType of _List_Objs.tpList) {
                if (devType.typ == "pump") {
                    for (const typeCheck of devType.cntyp) {
                        if (typeCheck.typ == "STATUS_TRK") {
                            for (const defType of typeCheck.def.op) {
                                if (defType.val == text.toString()) {
                                    //text = text + " " + defType.text;
                                    text = defType.text + " [" + defType.val + "]";
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return text;
    /*
    for (const iterator of PL_0) {
        return iterator[nameCol];
    }
    */
}
function get_Nozzle_Fuel(nameCol, TRK_0, _Devices, _List_Objs) {
    let text = TRK_0[nameCol];
    let FUEL_NAME = "";
    if (text != "0" && text != "---" && TRK_0.id != 0 && _Devices != undefined && _List_Objs != undefined && _List_Objs.fuel != undefined) {

        for (const dev_A of _Devices) {
            if (dev_A.id == TRK_0.id && dev_A.prop != undefined) {

                for (const item_devices of dev_A.devices) {
                    if (item_devices.prop != null && item_devices.prop != undefined) {
                        for (const item_prop of item_devices.prop) {
                            if (item_prop.typ == 'NUM' && item_prop.capacity.toString() == text) {
                                let fuels_Code = item_devices.fuel;

                                for (const item_fuel of _List_Objs.fuel) {
                                    if (item_fuel.id == fuels_Code) {
                                        FUEL_NAME = item_fuel.fu;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    }
    return FUEL_NAME;
}
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
let r = 0;
export default class trk extends Component {
    constructor(props) {
        super(props);
        this.Test_Onclick = this.Test_Onclick.bind(this);
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

    Test_Onclick(text) {
        alert("Тест = " + text);
    }

    render() {
        if (this.state.TRK != null) {
            let _height = 60;
            let _width = (this.state.TRK.id == 0) ? 110 : 110;
            let _dX = 2;
            let PL_width = _width + _dX + 0.4;
            let Icon_TRK = get_ICON_Fuel(this.state.TRK.STATUS_TRK);
            return (
                <div>
                    {this.props.TRK_Col != null &&
                        <table
                            id={(this.state.TRK.id != 0) ? 'Li_Level' : 'li_Level'}>
                            <tbody>
                                {//this.props.View_Icon &&
                                    Is_View_Row(this.props.List_Fields_Main, 'icon_alarm') &&
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
                                                        <Text Text={get_Nozzle_Fuel("nozzle", this.state.TRK, this.props.devices, this.props._List_Objs)}
                                                            x='62' y='25' fill='black'
                                                            fontSize='44' fontFamily='Calibri' />
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

                                {//this.props.View_Icon &&
                                    Is_View_Row(this.props.List_Fields_Main, 'icon_alarm') &&
                                    <tr>
                                        <td colSpan='1'>
                                            {this.state.TRK.id == 0 ? (
                                                <Stage width={PL_width} height={_height + 9} x={_dX} y={0}>
                                                    <Layer key='1'>
                                                        <Text Text='блокировка'
                                                            x='24' y='20' fill='black'
                                                            fontSize='12' fontFamily='Calibri' />
                                                    </Layer>
                                                </Stage>
                                            ) : (
                                                    <button onClick={() => this.Test_Onclick(this.state.TRK.nm)}>
                                                        <Stage width={PL_width} height={_height + 3} x={_dX} y={0}>
                                                            <Layer key='1'>
                                                                <AZS_Image Image={get_ICON_Lock(++r)} _W='55' _H='55' _X={21} _Y={ 6} />
                                                            </Layer>
                                                        </Stage>
                                                    </button>
                                                )
                                            }
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
                                        //(this.props.View_Data || el == 'nm') &&
                                        (Is_View_Row(this.props.List_Fields_Main, 'data') || el == 'nm') &&
                                        <>
                                            <tr>
                                                <td colSpan='2'>
                                                    <hr />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td id='td_ID'>
                                                    {get_TextFirstCol(el, this.state.TRK, this.props._List_Objs)}
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
/*


 <td id='td_ID'>
                                                    {el}
                                                </td>




<tr>
                                                <td id='td_ID'>
                                                    {el}
                                                </td>
                                            </tr>


*/