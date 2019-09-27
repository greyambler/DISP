import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

//import Field from '../../control/Field.jsx'

import { get_PL, get_NameFuel, Is_View_Row, POST } from '../../core/core_Function.jsx';

import AZS_Image from '../../control/AZS_Image.jsx'

import moment from 'moment';

const _Debuge = false;
const _Debuge_Message = true;

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
function get_ICON_TCO_Lock(TCO_0) {
    let col = '/images/Locked.png';

    let _code = Number(TCO_0.code);
    if (!isNaN(_code)) {
        if (_code != 2) {
            col = '/images/Unlocked.png';
        }
    }
    return col;
}


function get_ICON_Lock_2(val) {

    let col = '/images/Unlocked.png';


    switch (val) {
        case 0:
        case 1: col = '/images/Unlocked.png'; break;
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
        case 13: col = '/images/Locked.png'; break;
        default: col = '/images/Unlocked.png'; break;
    }
    return col;
}


function get_TextFirstCol(nameCol, TRK_0, _List_Objs) {
    let text = nameCol;
    try {
        if (TRK_0[nameCol].code != undefined) {
            text = TRK_0[nameCol].code;
        } else {
            text = TRK_0[nameCol];
        }
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
    if (text != 0 && text != "---" && _List_Objs != undefined && nameCol == "STATUS_TRK") {
        for (const devType of _List_Objs.tpList) {
            if (devType.typ == "pump") {
                for (const typeCheck of devType.cntyp) {
                    if (typeCheck.typ == "STATUS_TRK") {
                        for (const defType of typeCheck.def.op) {
                            let code = Number(defType.val);
                            if (text == code) {
                                if (TRK_0[nameCol].crit != undefined) {
                                    text = defType.text + " [" + defType.val + "]" + "{" + TRK_0[nameCol].crit + "}";
                                } else {
                                    text = defType.text + " [" + defType.val + "]";
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    /*
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
     */

    return text;
    /*
    for (const iterator of PL_0) {
        return iterator[nameCol];
    }
    */
}
function get_Nozzle_Fuel(nameCol, TRK_0, _Devices, _List_Objs) {
    let text = "";//TRK_0[nameCol];
    if (TRK_0[nameCol].code != undefined) {
        text = TRK_0[nameCol].code;
    } else {
        text = TRK_0[nameCol];
    }
    let FUEL_NAME = "";
    if (text != "0" && text != "---" && TRK_0.id != 0 && _Devices != undefined && _List_Objs != undefined && _List_Objs.fuel != undefined) {

        for (const dev_A of _Devices) {
            if (dev_A.id == TRK_0.id && dev_A.prop != undefined && dev_A.devices != undefined) {
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


function get_LOCK_TCO(id) {
    let T_Json =
        '{' +
        '   "type": "cmd_mfc",' +
        '   "obj": {' +
        '     "dev_id": "' + id + '",' +
        '     "action": "lock_tso"' +
        '   }' +
        ' }'
    let y = JSON.parse(T_Json);
    let t_Json = JSON.stringify(y);
    return t_Json;
}
function get_ID_cmd_TCO(TCO) {
    let ID = null;
    if (TCO != null && TCO[TCO.length - 1].prop != null) {
        for (const prop of TCO[TCO.length - 1].prop) {
            if (prop.typ == "AGENT_ID") {
                ID = prop.capacity;
                break;
            }
        }
    }
    return ID;
}

function get_TRK(id, nameCommand) {
    let T_Json =
        '{"type": "cmd_trk",' +
        '"dev_id": "' + id + '",' +
        '"obj": {' +
        '           "ctrl_value": "' + nameCommand + '",' +
        '           "cashier_code": 1' +
        '       }' +
        ' }'
    let y = JSON.parse(T_Json);
    let t_Json = JSON.stringify(y);
    return t_Json;
}

function get_LOCK_TRK(id, ctrl_number_capacity) {
    let r =
        '{"ctrl": 2,' +
        '"ctrl_type": "trkOperate",' +
        '"ctrl_value": "pump_lock",' +
        '"ctrl_number": ' + ctrl_number_capacity + ',' +
        '"cashier_code": 3}';

    let rw = {
        'ctrl': 2,
        'ctrl_type': 'trkOperate',
        'ctrl_value': 'pump_lock',
        'ctrl_number': 1,
        'cashier_code': 3
    }

    let rR = {
        'type': "cmd_mfc",
        'obj': {
            'dev_id': id,
            'action': r
        }
    };
    let RR = JSON.stringify(rR);
    return RR;
    /*
    let y1 = JSON.parse(RR);
    let t_Json1 = JSON.stringify(y1);


    let T_Json =
        '{' +
        '   "type": "cmd_mfc",' +
        '   "obj": {' +
        '     "dev_id": "' + id + '",' +
        '     "action": "lock_tso"' +
        '   }' +
        ' }'
    let y = JSON.parse(T_Json);
    let t_Json = JSON.stringify(y);
return RR;
*/
}

let r = 0;
export default class trk extends Component {
    constructor(props) {
        super(props);
        this.toock = this.toock.bind(this);
        this.Test_Onclick = this.Test_Onclick.bind(this);
        this.Test_Maile_Onclick = this.Test_Maile_Onclick.bind(this);
        this.state = {
            TCO: null,
            TRK: null,
            DeVal: null,
        }
    }
    componentDidMount() {
        this.setState({ TCO: this.props.TCO });
        this.setState({ TRK: this.props.TRK });
        this.setState({ DeVal: this.props.DeVal });
    }
    componentDidUpdate(prevProps) {
        if (this.props.TCO != prevProps.TCO) {
            this.setState({ TCO: this.props.TCO });
        }
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
                    if (iterator.crit != undefined) {
                        this.state.TRK[iterator.typ] = { text: "", crit: iterator.crit, code: iterator.val };
                        this.setState({ TRK: this.state.TRK });
                    } else {
                        this.state.TRK[iterator.typ] = iterator.val;
                        this.setState({ TRK: this.state.TRK });
                    }
                }
            }
            //text: 
            //crit:
            //code:
        }
    }

    Test_Onclick(text) {
        alert("Тест = " + text);
    }

    async toock(text, id, dev, type_Body) {//, ctrl_number_capacity) {///Отправка команды
        let rss = POST;
        var myRequest = new Request(rss);
        let _body = null;

        let _code = Number(dev.STATUS_TRK.code);
        if (!isNaN(_code)) {
            if (_code == 2) {
                _body = get_TRK(id, 'pump_unlock');
            } else {
                _body = get_TRK(id, 'pump_lock');
            }
        }


        /*
                let ID = get_ID_cmd_TCO(tco);
                if (ID != null) {
                    //id = ID;
                }
        
                var myRequest = new Request(rss);
                //let _body = get_LOCK_TRK(id, ctrl_number_capacity);
        
                */

        /*
                •	pump_lock - заблокировать ТРК
                •	pump_unlock - разблокировать ТРК
        */

        if (_Debuge_Message) {
            if (_body != null) {
                alert("Команда " + text + "запроса =" + _body);
            } else {
                alert("Команда " + text + "запроса = null. Отмена");
            }
        }

        if (_body != null) {
            try {
                var response = await fetch(myRequest,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: _body,
                    }
                );
                const Jsons = await response.json();
                if (response.ok) {
                    this.setState({ _ANS: Jsons });
                    alert("Команда получила ответ - " + Jsons.status + ",\n АЗК = " + dev.nm + ",\n id = " + id + ",\n команда = " + type_Body + ",\n запрос =" + _body);
                }
                else {
                    throw Error(Jsons.message);
                    throw Error(response.statusText);
                }
            }
            catch (error) {
                console.log(error);
                alert(error);
            }
        }
    }
    Test_Maile_Onclick(_object, message) {

        let M = "Тест тело сообщения\n\r" + message;

        var link = "mailto:me@example.ru"
            //+ "?cc=myCCaddress@example.com"
            + "&subject=" + _object
            + "&body=" + M
            /*    + "&body=" + message
    
               + "?cc=myCCaddress@example.com"
               + "&subject=" + escape("This is my subject")
               + "&body=" + escape(document.getElementById('myText').value)
               */
            ;
        window.location.href = link;
    }

    getStyle(el, mass) {
        let style = {
            background: 'white',
        }
        if (mass[el].crit != undefined) {
            switch (mass[el].crit.toString()) {
                case '0': {
                    style = {
                        background: 'white',
                        fontSize: 10,
                    }
                    break;
                }
                case '1': {
                    style = {
                        background: 'white',
                        fontSize: 10,
                    }

                    break;
                }
                case '2': {
                    style = {
                        background: 'yellow',
                        fontSize: 10,
                    }

                    break;
                }
                case '3': {
                    style = {
                        background: 'hotpink',
                        fontSize: 10,
                    }

                    break;
                }
            }
        }
        return style;
    }

    render() {
        if (this.state.TRK != null) {
            let _height = 60;
            let _width = (this.state.TRK.id == 0) ? 110 : 110;
            let _dX = 2;
            let PL_width = _width + _dX + 0.4;

            let Icon_TRK = get_ICON_Fuel(this.state.TRK.STATUS_TRK);
            let Icon_TCO_Lock = get_ICON_TCO_Lock(this.state.TRK.STATUS_TRK);

            let V_ID = this.state.TRK.id;//Get_Val(this.state.TCO[0], "id")

            let BTN_width = 20;
            let BTN_height = 20;
            let style_TD_BTN = {
                verticalAlign: 'top',
                height: '30px',
                //background: 'rgb(0, 141, 141)',
            }

            let capacity = 0;
            if (this.state.TRK.prop != null) {
                for (const prop of this.state.TRK.prop) {
                    if (prop.typ == "NUM") {
                        capacity = prop.capacity;
                        break;
                    }
                }
            }

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
                                    Is_View_Row(this.props.List_Fields_Main, 'lock') &&
                                    <tr>
                                        <td colSpan='1' style={style_TD_BTN}>
                                            {this.state.TRK.id == 0 ? (
                                                <Stage width={PL_width} height={BTN_height} x={0} y={0}>
                                                    <Layer key='1'>
                                                        <Text Text='сервисные команда'
                                                            x='1' y='5' fill='black'
                                                            fontSize='12' fontFamily='Calibri' />
                                                    </Layer>
                                                </Stage>
                                            ) : (
                                                    <>
                                                        <button className='Min_button' title="блокировка"
                                                            onClick={() => this.toock('Блокировка TRK', this.state.TRK.id, this.state.TRK, 'lock_tso')}>
                                                            {/*<button onClick={() => this.Test_Onclick(this.state.TRK.nm)}>*/}
                                                            <Stage width={BTN_width} height={BTN_height} x={_dX} y={0}>
                                                                <Layer key='1'>
                                                                    <AZS_Image Image={Icon_TCO_Lock}
                                                                        _W='15' _H='15' _X={2} _Y={1} />
                                                                </Layer>
                                                            </Stage>
                                                        </button>
                                                        <button className='Min_button_EMAIL' title="письмо"
                                                            onClick={() => this.Test_Maile_Onclick("ТРК", "this.props.Trk")}
                                                        >
                                                            <Stage width={BTN_width} height={BTN_height} x={0} y={0}>
                                                                <Layer key='1' background='red' >
                                                                    <AZS_Image Image='/images/email.png'
                                                                        _W='15' _H='15' _X={4} _Y={1} />
                                                                </Layer>
                                                            </Stage>
                                                        </button>
                                                    </>
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
                                        (Is_View_Row(this.props.List_Fields_TRK, el) || el == 'nm') &&
                                        <>
                                            <tr>
                                                <td colSpan='2'>
                                                    <hr />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td id='td_ID' style={this.getStyle(el, this.state.TRK)}
                                                    title={get_TextFirstCol(el, this.state.TRK, this.props._List_Objs)}>
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