import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image, Ellipse } from 'react-konva';

import { get_Text_Status_PL, get_Color_Status_PL, get_NameFuel, Is_View_Row, POST } from '../../core/core_Function.jsx';

import AZS_Image from '../../control/AZS_Image.jsx'

import moment from 'moment';

const _Debuge = false;
const _Debuge_Key = false;
const _Debuge_Message = true;

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
function get_ICON_TCO_Lock(TCO_0) {
    let col = '/images/Locked.png';
    let _code = Number(TCO_0.code);
    if (!isNaN(_code)) {
        if (_code == 1) {
            col = '/images/Unlocked.png';
        }
    }
    return col;
}

function get_ICON_Lock_2(val) {

    let col = '/images/Locked.png';


    switch (val) {
        case 0: col = '/images/Locked.png'; break;
        case 1: col = '/images/Unlocked.png'; break;
        case 2: col = '/images/Locked.png'; break;
        case 3: col = '/images/Unlocked.png'; break;
        case 4: col = '/images/Locked.png'; break;
        case 5: col = '/images/Unlocked.png'; break;
        case 6: col = '/images/Locked.png'; break;
        case 7: col = '/images/Unlocked.png'; break;
        case 8: col = '/images/Locked.png'; break;
        case 9: col = '/images/Unlocked.png'; break;
        case 10: col = '/images/Locked.png'; break;
        case 11: col = '/images/Unlocked.png'; break;
        case 12: col = '/images/Locked.png'; break;
        case 13: col = '/images/Unlocked.png'; break;
        default: col = '/images/Unlocked.png'; break;
    }
    return col;
}


function get_TextFirstCol(nameCol, PL_0, isFull) {
    let r = 0;
    let text = "";

    if (PL_0[nameCol].crit != undefined) {
        let newText = PL_0[nameCol].text;

        if ((nameCol == "TOTAL_OBSERVED_VOLUME" ||
            nameCol == "PRODUCT_LEVEL")
            && PL_0.id != 0) {
            try {
                let NUM_Text = Number(newText);
                if (!isNaN(NUM_Text)) {
                    newText = NUM_Text.toFixed(2);
                }
            } catch (error) {
            }
        }

        newText = newText + " {" + PL_0[nameCol].crit + "}";

        text = isFull
            ? newText
            : (newText.length > 36)
                ? newText.substr(0, 36)
                : newText;
    } else {
        text = isFull
            ? PL_0[nameCol]
            : (PL_0[nameCol].length > 36)
                ? PL_0[nameCol].substr(0, 36)
                : PL_0[nameCol];
    }


    if (_Debuge_Key) {
        text = text + " [" + nameCol + "]";
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

function Is_View_Row_11(Data, Name_Row) {
    let row = false;
    if (Data != null && Data != undefined && Data.children != null) {
        for (const iterator of Data.children) {
            if (iterator.value == Name_Row) {
                row = true;
                break;
            }
        }
        let r = 0;
    }

    return row;
}

function get_PL(id, nameCommand) {
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

let r = 0;

export default class pl extends Component {
    constructor(props) {
        super(props);
        this.Test_Onclick = this.Test_Onclick.bind(this);
        this.Test_Maile_Onclick = this.Test_Maile_Onclick.bind(this);
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

            onclick={Test_Onclick()}
             */
        }
    }
    full_Value() {
        if (this.state.PL != null) {
            if (this.state.DeVal != null && this.state.PL.id == this.state.DeVal.id) {
                for (const iterator of this.state.DeVal.values) {
                    if (iterator.crit != undefined) {
                        this.state.PL[iterator.typ] = { text: iterator.val, crit: iterator.crit, code: iterator.val };
                        this.setState({ PL: this.state.PL });
                    } else {
                        this.state.PL[iterator.typ] = iterator.val;
                        this.setState({ PL: this.state.PL });
                    }
                }
            }
        }
    }

    Test_Onclick(text) {
        alert("Тест = " + text);
    }
    async toock(text, id, dev, type_Body) {//, ctrl_number_capacity) {///Отправка команды
        let rss = POST;
        var myRequest = new Request(rss);
        let _body = null;

        let _code = Number(dev.STATE_PL.code);
        if (!isNaN(_code)) {
            if (_code == 1) {
                _body = get_PL(id, 'tank_lock');
            } else {
                _body = get_PL(id, 'tank_unlock');
            }
        }

        /*
                •	tank_lock - заблокировать резервуар
                •	tank_unlock - разблокировать резервуар
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
                }
            }
            catch (error) {
                console.log(error);
                alert(error);
            }
        }
    }


    //test = () => Test_Onclick();
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
                        fontSize: 14,
                    }
                    break;
                }
                case '1': {
                    style = {
                        background: 'white',
                        fontSize: 14,
                    }

                    break;
                }
                case '2': {
                    style = {
                        background: 'yellow',
                        fontSize: 14,
                    }

                    break;
                }
                case '3': {
                    style = {
                        background: 'hotpink',
                        fontSize: 14,
                    }

                    break;
                }
            }
        }
        return style;
    }

    render() {
        if (this.state.PL != null) {
            let _height = 60;
            let _width = (this.state.PL.id == 0) ? 110 : 110;
            let _dX = 2;
            let PL_width = (_width + _dX + 0.4);

            let BTN_width = 20;
            let BTN_height = 20;

            let Icon_Tank = (this.state.PL == 'ZERO') ? "" : get_ICON_Fuel(this.state.PL.TP_STATUS, "TOTAL_VOLUME", this.state.PL.CURENT_VOLUME);

            let Icon_TCO_Lock = get_ICON_TCO_Lock(this.state.PL.STATE_PL);

            let style_TD_BTN = {
                verticalAlign: 'top',
                height: '30px',
                //background: 'rgb(0, 141, 141)',
            }

            return (
                <div>
                    {this.props.PL_Col != null &&
                        <table
                            id={(this.state.PL.id != 0) ? 'Li_Level' : 'li_Level'}>
                            <tbody>
                                {
                                    Is_View_Row(this.props.List_Fields_Main, 'icon_alarm') &&
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
                                    Is_View_Row(this.props.List_Fields_Main, 'lock') &&
                                    <tr>
                                        <td colSpan='1' style={style_TD_BTN}>
                                            {this.state.PL.id == 0 ? (
                                                <Stage width={PL_width} height={BTN_height} x={0} y={0}>
                                                    <Layer key='1' background='red' >
                                                        <Text Text='сервисные команда'
                                                            x='1' y='5' fill='black'
                                                            fontSize='12' fontFamily='Calibri' />
                                                    </Layer>
                                                </Stage>
                                            ) : (
                                                    <>
                                                        <button className='Min_button' title="блокировка"
                                                            onClick={() => this.toock('Блокировка резервуара', this.state.PL.id, this.state.PL, 'pump_lock')}>
                                                            {/*onClick={() => this.Test_Onclick(this.state.PL.nm)}>*/}
                                                            <Stage width={BTN_width} height={BTN_height} x={0} y={0}>
                                                                <Layer key='1' background='red' >
                                                                    <AZS_Image Image={Icon_TCO_Lock}
                                                                        _W='15' _H='15' _X={2} _Y={1} />
                                                                </Layer>
                                                            </Stage>
                                                        </button>
                                                        <button className='Min_button_EMAIL' title="письмо"
                                                            onClick={() => this.Test_Maile_Onclick("Резервуары", "this.props.PLs")}
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
                                            {/*                                         
                                            {this.state.PL.id == 0 ? (

                                                <Stage width={PL_width} height={BTN_height} x={0} y={0}>
                                                    <Layer key='1' background='red' >
                                                        <Text Text='блокировка'
                                                            x='1' y='5' fill='black'
                                                            fontSize='10' fontFamily='Calibri' />
                                                    </Layer>
                                                </Stage>

                                            ) : (
                                                
                                                    <>
                                                        <button onClick={() => this.Test_Onclick(this.state.PL.nm)}>
                                                            <Stage width={BTN_width} height={BTN_height} x={0} y={0}>
                                                                <Layer key='1' background='red' >
                                                                    <AZS_Image Image={get_ICON_Lock(++r)}
                                                                        _W='15' _H='15' _X={1} _Y={1} />
                                                                </Layer>
                                                            </Stage>
                                                        </button>
                                                    </>
                                                
                                                )
                                            }
*/ }
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
                                        // (Is_View_Row(this.props.List_Fields_Main, 'data') || el == 'nm') &&

                                        (Is_View_Row(this.props.List_Fields_PL, el) || el == 'nm') &&
                                        <>
                                            <tr>
                                                <td colSpan='2'>
                                                    <hr />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td id='td_ID' style={this.getStyle(el, this.state.PL)}
                                                    title={get_TextFirstCol(el, this.state.PL, true)}
                                                >
                                                    {get_TextFirstCol(el, this.state.PL, false)}
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
