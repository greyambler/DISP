import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { RSS_Type_List, get_DVC_TREE, Get_Device, Get_MainHead, Get_Val, get_NameFuel, POST, Is_View_Row_1 } from '../../core/core_Function.jsx';
import AZS_Image from '../../control/AZS_Image.jsx'

import Tco_Item_Tree from '../../control/tco_Item_Tree.jsx';
import Tco_Dvc_Item_Tree from '../../control/tco_Dvc_Item_Tree.jsx';


const _Debuge = false;
const _Debuge_Message = true;

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


function get_ICON_TCO(TCO_0) {
    let NUM_STATE_TSO = Number(TCO_0[TCO_0.length - 1].STATE_TSO);
    let col = '/images/TCO_Error.png';
    if (!isNaN(NUM_STATE_TSO)) {
        switch (NUM_STATE_TSO) {
            case 4:
            case 5: col = '/images/TCO_NoConect.png'; break;
            default: col = '/images/TCO_Ok.png'; break;
        }
    }
    return col;
}
function get_ICON_TCO_Lock(TCO_0) {
    let col = '/images/Locked.png';
    try {

        if (TCO_0[TCO_0.length - 1].typ == 'tso') {
            let NUM_STATE_SHIFT = TCO_0[TCO_0.length - 1].STATE_SHIFT.code;
            if (!isNaN(NUM_STATE_SHIFT)) {
                switch (NUM_STATE_SHIFT) {
                    case 2: col = '/images/Locked.png'; break;
                    case 3: col = '/images/Unlocked.png'; break;
                    default: col = '/images/Locked.png'; break;
                }
            }
            /*
            if (TCO_0[TCO_0.length - 1].STATE_TSO.code != undefined) {
                let NUM_STATE_TSO = TCO_0[TCO_0.length - 1].STATE_TSO.code;
                if (!isNaN(NUM_STATE_TSO)) {
                    switch (NUM_STATE_TSO) {
                        case 4:
                        case 5: col = '/images/Locked.png'; break;
                        default: col = '/images/Unlocked.png'; break;
                    }
                }
            }
            */
        }
    } catch (error) {
    }
    return col;
}

function Is_FindDEVICE(id, MassDev) {
    if (MassDev != null && MassDev != undefined) {

        let mass = MassDev[MassDev.length - 1];
        if (Array.isArray(mass)) {
            if (mass['id'] == id) {
                return mass;
            } else {
                return null;
            }
        }
    }
    return null;
}
function Get_Device_ID_WS(id, TCO) {
    let mass = null;
    if (TCO[0] != null && TCO[0] != undefined) {
        mass = Is_FindDEVICE(id, TCO[0]);

        if (mass == null && TCO[1] != null && TCO[1] != undefined) {
            for (const iterator of TCO[1]) {
                mass = Is_FindDEVICE(id, iterator);
                if (mass != null) {
                    break;
                }
            }
        }
    }
    return mass;
}


function isOpExist_TSO(dvctyptree, typ_key_val) {
    let TextValue = null;
    for (const iterator of dvctyptree) {
        if (iterator.typ == 'tso') {
            for (const pro_cntyp of iterator.cntyp) {
                if (pro_cntyp.typ == typ_key_val.typ) {
                    if (pro_cntyp.def != null && pro_cntyp.def != undefined && pro_cntyp.def.op != null) {
                        for (const itemVal of pro_cntyp.def.op) {
                            if (itemVal.val == typ_key_val.val.toString()) {
                                TextValue = itemVal.text;
                                break;
                            }
                        }
                    }
                }
                if (TextValue != null) {
                    break;
                }
            }
        }
        if (TextValue != null) {
            break;
        }
    }
    return TextValue;
}
function isOpExist_TSO_DVC(dvctyptree, typ_key_val) {
    let TextValue = null;
    for (const iterator of dvctyptree) {
        if (iterator.typ == 'tso') {
            for (const _DVC of iterator.dvctyptree) {
                if (_DVC.cntyp != null && _DVC.cntyp != undefined) {
                    for (const pro_cntyp of _DVC.cntyp) {
                        if (pro_cntyp.typ == typ_key_val.typ) {
                            if (pro_cntyp.def != null && pro_cntyp.def != undefined && pro_cntyp.def.op != null) {
                                for (const itemVal of pro_cntyp.def.op) {
                                    if (itemVal.val == typ_key_val.val.toString()) {
                                        TextValue = itemVal.text;
                                        break;
                                    }
                                }
                            }
                        }
                        if (TextValue != null) {
                            break;
                        }
                    }
                }
                if (TextValue != null) {
                    break;
                }
            }
        }
        if (TextValue != null) {
            break;
        }
    }
    return TextValue;
}

function get_ICON_Lock(val) {

    let col = '/images/Unlocked.png';


    switch (val) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5: col = '/images/Unlocked.png'; break;
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

function get_ICON_Refr(val) {

    let col = '/images/Recycle.png';
    switch (val) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16: col = '/images/Recycle1.png'; break;
        default: col = '/images/Recycle.png'; break;
    }
    return col;
}

function get_Json_TEST(id) {
    let T_Json =
        '{' +
        '   "type": "cmd_mfc",' +
        '   "obj": {' +
        '     "dev_id": "' + id + '",' +
        '     "action": "restart_pc"' +
        '   }' +
        ' }'
    let y = JSON.parse(T_Json);
    let t_Json = JSON.stringify(y);
    return t_Json;

}

function get_LOCK_TCO_Old_Save(id) {
    let r =
        '{"ctrl": 2,' +
        '"ctrl_type": "trkOperate",' +
        '"ctrl_value": "pump_lock",' +
        '"ctrl_number": 1,' +
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
}
function get_restart_pc_Old_Save(id) {
    let T_Json =
        '{' +
        '   "type": "cmd_mfc",' +
        '   "obj": {' +
        '     "dev_id": "' + id + '",' +
        '     "action": "restart_pc"' +
        '   }' +
        ' }'
    let y = JSON.parse(T_Json);
    let t_Json = JSON.stringify(y);
    return t_Json;
}
function get_restart_fr_Old_Save(id) {
    let T_Json =
        '{' +
        '   "type": "cmd_mfc",' +
        '   "obj": {' +
        '     "dev_id": "' + id + '",' +
        '     "action": "restart_fr"' +
        '   }' +
        ' }'
    let y = JSON.parse(T_Json);
    let t_Json = JSON.stringify(y);
    return t_Json;

}
function get_restart_cash_Old_Save(id) {
    let T_Json =
        '{' +
        '   "type": "cmd_mfc",' +
        '   "obj": {' +
        '     "dev_id": "' + id + '",' +
        '     "action": "restart_cash"' +
        '   }' +
        ' }'
    let y = JSON.parse(T_Json);
    let t_Json = JSON.stringify(y);
    return t_Json;

}

function get_AGENT_ID_cmd_mfc(TCO) {
    let ID = null;
    if (TCO != null) {

        for (const item of TCO) {
            if (item != null && item[item.length - 1].typ == "cmd_mfc") {
                if (item[item.length - 1].prop != null) {
                    for (const prop of item[item.length - 1].prop) {
                        if (prop.typ == "AGENT_ID") {
                            ID = prop.capacity;
                            break;
                        }
                    }
                }
                break;
            }
        }
    }
    return ID;
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

function get_cmd_mfc_ID(TCO) {
    let ID = null;
    if (TCO != null) {
        for (const item of TCO) {
            if (item != null && item[item.length - 1].typ == "cmd_mfc") {
                ID = item[item.length - 1].id
                break;
            }
        }
    }
    return ID;
}


function get_restart(id, nameCommand) {
    let T_Json =
        '{' +
        '   "type": "cmd_mfc",' +
        '   "dev_id": "' + id + '",' +
        '   "obj": {' +
        '     "action": "' + nameCommand + '"' +
        '   }' +
        ' }'
    let y = JSON.parse(T_Json);
    let t_Json = JSON.stringify(y);
    return t_Json;
}

function get_TCO(id, nameCommand) {
    let T_Json =
        '{' +
        '   "type": "cmd_tso",' +
        '   "dev_id": "' + id + '",' +
        '   "obj": {' +
        '           "ctrl_value": "' + nameCommand + '",' +
        '           "shift_number": 1,' +
        '           "cashier_code": 1' +
        '       }' +
        ' }'
    let y = JSON.parse(T_Json);
    let t_Json = JSON.stringify(y);
    return t_Json;
}
/*
function get_TCO_EXE1() {
    if (!document.all) {
        alert("Available only with Internet Explorer.");
        return;
    }
    var ws = new ActiveXObject("WScript.Shell");
    ws.Exec("C:\\Windows\\notepad.exe");
}
*/
function get_q_TCO(id) {


}

let r = 0;

export default class tcoTree extends Component {
    constructor(props) {
        super(props);
        this.toock = this.toock.bind(this);
        this.Test_Onclick = this.Test_Onclick.bind(this);
        this.Test_Maile_Onclick = this.Test_Maile_Onclick.bind(this);
        this.state = {
            TCO: null,
            DeVal: null,
            _ANS: null,
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
            if (this.state.DeVal != null && this.state.DeVal != undefined && this.state.DeVal.id != null) {
                let F_mass = Get_Device_ID_WS(this.state.DeVal.id, this.state.TCO);
                if (F_mass != null) {
                    let TextValue = isOpExist_TSO(this.props._List_Objs.dvctyptree, this.state.DeVal.values[0]);

                    if (TextValue != null) {
                        F_mass[this.state.DeVal.values[0].typ] =
                            {
                                text: TextValue + ' [' + this.state.DeVal.values[0].val + '] ' + "{" + this.state.DeVal.values[0].crit + "}",
                                crit: this.state.DeVal.values[0].crit,
                                code: this.state.DeVal.values[0].val
                            };
                        //+'{~'+ this.state.DeVal.values[0].crit +'}';
                        //F_mass['crit'] = this.state.DeVal.values[0].crit;
                        let r = 0;
                    } else {
                        TextValue = isOpExist_TSO_DVC(this.props._List_Objs.dvctyptree, this.state.DeVal.values[0]);
                        if (TextValue != null) {
                            F_mass[this.state.DeVal.values[0].typ] =
                                {
                                    text: TextValue + ' [' + this.state.DeVal.values[0].val + ']' + "{" + this.state.DeVal.values[0].crit + "}",
                                    crit: this.state.DeVal.values[0].crit,
                                    code: this.state.DeVal.values[0].val
                                };
                            //TextValue + ' [' + this.state.DeVal.values[0].val + ']';
                            //+'{~'+ this.state.DeVal.values[0].crit +'}';

                            //F_mass['crit'] = this.state.DeVal.values[0].crit;

                            let r = 0;
                        }
                        else {
                            for (const iterator of this.state.DeVal.values) {
                                if (iterator.comment != null && iterator.comment != undefined) {
                                    F_mass[iterator.typ] = iterator.comment + ' [' + iterator.val + '] ';
                                } else {
                                    F_mass[iterator.typ] = iterator.val;
                                }
                                //F_mass['crit'] = iterator.crit;
                            }
                        }
                    }

                    if (TextValue == null) {


                        F_mass[this.state.DeVal.values[0].typ] =
                            {
                                text: this.state.DeVal.values[0].val + "{" + this.state.DeVal.values[0].crit + "}",
                                crit: this.state.DeVal.values[0].crit,
                                code: this.state.DeVal.values[0].val
                            };
                        let r = 0;
                    }

                    this.setState({ TCO: this.state.TCO });
                }
            }
        }
    }
    Test_Onclick(text, id) {
        alert("Тест = " + text + ",  id = " + id);
    }

    async toock(text, id, tco, type_Body) {///Отправка команды
        let rss = POST;
        let ID = (type_Body != "shift_stop") ? get_cmd_mfc_ID(tco) : null;// get_ID_cmd_TCO(tco);//get_AGENT_ID_cmd_mfc(tco);
        if (ID != null) {
            id = ID;
        }
        var myRequest = new Request(rss);
        let _body = null;
        switch (type_Body) {
            case 'restart_pc': _body = get_restart(id, "restart_pc"); break;
            case 'restart_fr': _body = get_restart(id, "restart_fr"); break;
            case 'restart_cash': _body = get_restart(id, "restart_cash"); break;

            case 'shift_stop': {
                let _code = Number(tco[tco.length - 1].STATE_SHIFT.code);
                if (!isNaN(_code)) {
                    switch (_code) {
                        case 2: {
                            _body = get_TCO(id, "shift_start");
                            break;
                        }
                        case 3: {
                            _body = get_TCO(id, "shift_stop");
                            break;
                        }
                    }
                }
                //TCO_0[TCO_0.length - 1].STATE_TSO.code
                // _body = get_TCO(id, "shift_close");
            }
                break;

            /*
            •	shift_open - открыть смену
            •	shift_close - закрыть смену
            •	shift_stop - остановить смену
            •	shift_start - запустить смену
            •	print_z_report - закрыть фискальную смену (с закрытием смены на ТУ 3в1)
            •	print_fin_report - печать финансового отчета
            */

            default: _body = get_Json_TEST(id); break;
        }

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
                    if (_Debuge_Message) {
                        alert("Команда получила ответ - " + Jsons.status + ",\n АЗК = " +
                            tco[tco.length - 1].nm + ",\n id = " + id + ",\n команда = " +
                            type_Body + ",\n запрос =" + _body);
                    } else {
                        alert("Команда ушла на сервер");
                    }
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


    render() {
        

        if (this.state.TCO != null) {


            let V_ID = Get_Val(this.state.TCO[0], "id")



            let _height = 60;

            let _width = (V_ID == 6) ? 110 : 110;
            let _dX = 2;
            let PL_width = _width + _dX + 0.4;
            let Icon_TCO = get_ICON_TCO(this.state.TCO[0]);

            let Icon_TCO_Lock = get_ICON_TCO_Lock(this.state.TCO[0]);

            //id={(V_ID != 6) ? 'Li_Level' : 'li_Level'}>

            let MASS = this.state.TCO[0];
            let DEVICES = null;
            if (this.state.TCO[1] != null) {
                DEVICES = this.state.TCO[1];
            }
            let F = 2;
            let isKeyShow = false;
            let Item = 0;
            //List_Fields_Main={this.props.List_Fields_Main}

            //{this.props.View_Icon &&
            //let r = Is_View_Row(this.props.List_Fields_Main, 'icon_alarm');
            //{ Is_View_Row(this.props.List_Fields_Main, 'icon_alarm') &&
            //id={(V_ID != 6) ? 'Li_Level_tco' : 'li_Level'}>

            let BTN_width = 60;
            let BTN_height = 20;

            let style_TD_BTN = {
                verticalAlign: 'top',
                height: '30px',
                //background: 'rgb(0, 141, 141)',
            }

            

            return (
                <div>
                    <table
                        id={(V_ID != 6 || this.props.IsZERO) ? 'Li_Level' : 'li_Level'}>
                        <tbody>
                            {Is_View_Row(this.props.List_Fields_Main, 'icon_alarm') &&
                                <tr>
                                    <td colSpan='2'>
                                        <Stage width={PL_width} height={_height + 30} x={_dX} y={0}>
                                            <Layer key='1'>
                                                <AZS_Image Image={Icon_TCO} _W='65' _H='55' _X={0 + 4} _Y={0 + 14} />

                                                {this.state.TCO.id != 0 &&
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
                                Is_View_Row(this.props.List_Fields_Main, 'lock') &&
                                <tr>
                                    <td colSpan='2' style={style_TD_BTN}>
                                        {V_ID == 6 ? (
                                            <Stage width={PL_width} height={BTN_height} x={0} y={0}>
                                                <Layer key='1'>
                                                    <Text Text='сервисные команда'
                                                        x='1' y='5' fill='black'
                                                        fontSize='12' fontFamily='Calibri' />
                                                </Layer>
                                            </Stage>
                                        ) : (
                                                <>
                                                    <button className='Min_button' title="остановить/запустить смену"
                                                        onClick={() => this.toock('остановить/запустить смену', V_ID, this.state.TCO[0], 'shift_stop')}>
                                                        {/*<button onClick={() => this.Test_Onclick("this.Test_Onclick")}>*/}
                                                        <Stage width={BTN_width} height={BTN_height} x={0} y={0}>
                                                            <Layer key='1'>
                                                                <AZS_Image Image={Icon_TCO_Lock}
                                                                    _W='15' _H='15' _X={2} _Y={1} />
                                                            </Layer>
                                                        </Stage>
                                                    </button>

                                                    <button className='Min_button_EMAIL' title="письмо"
                                                        onClick={() => this.Test_Maile_Onclick("ТСО", "this.props.TCO")}
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
                            <tr>
                                <td colSpan='2'>
                                    <hr />
                                </td>
                            </tr>
                            {
                                MASS.map((main, p) => (
                                    (Is_View_Row(this.props.List_Fields_TCO, main) || main == 'nm') &&
                                    <Tco_Item_Tree PROPERTYS={main} MASS_LIBRR={MASS} isKeyShow={isKeyShow} FirstPROPS={F} N={p}
                                        IsZERO={this.props.IsZERO}
                                    />
                                ))
                            }

                            {DEVICES != null &&
                                DEVICES.map(m_MASS => (
                                    m_MASS.map((main, p) => (
                                        //Is_View_Row(this.props.List_Fields_Main, 'data') &&
                                        <>
                                            {(Is_View_Row(this.props.List_Fields_TCO, m_MASS[m_MASS.length - 1].typ + "_" + main)
                                                //|| "-----" == m_MASS[m_MASS.length - 1].typ 
                                            ) &&
                                                <Tco_Dvc_Item_Tree PROPERTYS={main} MASS_LIBRR={m_MASS} isKeyShow={isKeyShow} FirstPROPS={F} N={p}
                                                    IsHead={this.props.IsHead} IsZERO={this.props.IsZERO} />
                                            }
                                            {/*("-----_id" == m_MASS[m_MASS.length - 1].typ + "_" + main && Item++ != 1 ) &&
                                                Is_View_Row(this.props.List_Fields_Main, 'management') &&
                                                <>
                                                    <tr>
                                                        <td colSpan='2'>
                                                            <Stage width={PL_width} height={_height + 9} x={_dX} y={0}>
                                                                <Layer key='1'>
                                                                    <Text Text=''
                                                                        x='24' y='20' fill='black'
                                                                        fontSize='12' fontFamily='Calibri' />
                                                                </Layer>
                                                            </Stage>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td colSpan='2'>
                                                            <hr />
                                                        </td>
                                                    </tr>
                                                </>
                                            */}

                                            {("fr_id" == m_MASS[m_MASS.length - 1].typ + "_" + main) &&
                                                Is_View_Row(this.props.List_Fields_Main, 'management') &&
                                                <>
                                                    <tr>
                                                        <td colSpan='2'>
                                                            {V_ID == 6 ? (
                                                                <Stage width={PL_width} height={BTN_height + 4.5} x={_dX} y={0}>
                                                                    <Layer key='1'>
                                                                        <Text Text='Перезагрузка ФР'
                                                                            x='2' y='2' fill='black'
                                                                            fontSize='12' fontFamily='Calibri' />
                                                                    </Layer>
                                                                </Stage>
                                                            ) : (
                                                                    <button onClick={() => this.toock('Перезагрузка ФР', m_MASS[m_MASS.length - 1].id, this.state.TCO[1], 'restart_fr')}
                                                                        title="Перезагрузка ФР">
                                                                        <Stage width={PL_width} height={BTN_height} x={_dX} y={0}>
                                                                            <Layer key='1'>
                                                                                <AZS_Image Image={get_ICON_Refr(++r)} _W='23' _H='23' _X={41} _Y={0} />
                                                                            </Layer>
                                                                        </Stage>
                                                                    </button>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td colSpan='2'>
                                                            <hr />
                                                        </td>
                                                    </tr>
                                                </>
                                            }
                                            {("msc_id" == m_MASS[m_MASS.length - 1].typ + "_" + main) &&
                                                Is_View_Row(this.props.List_Fields_Main, 'management') &&
                                                <>
                                                    <tr>
                                                        <td colSpan='2'>
                                                            {V_ID == 6 ? (
                                                                <Stage width={PL_width} height={BTN_height + 4.5} x={_dX} y={0}>
                                                                    <Layer key='1'>
                                                                        <Text Text='Перезагрузка ПК'
                                                                            x='2' y='2' fill='black'
                                                                            fontSize='12' fontFamily='Calibri' />
                                                                    </Layer>
                                                                </Stage>
                                                            ) : (
                                                                    <button onClick={() => this.toock("Перезагрузка ПК", m_MASS[m_MASS.length - 1].id, this.state.TCO[1], 'restart_pc')}
                                                                        title="Перезагрузка ПК">
                                                                        {/*</button><button onClick={() => this.Test_Onclick('Перезагрузка ПК', m_MASS[m_MASS.length - 1].id)}>*/}
                                                                        <Stage width={PL_width} height={BTN_height} x={_dX} y={0}>
                                                                            <Layer key='1'>
                                                                                <AZS_Image Image={get_ICON_Refr(++r)} _W='23' _H='23' _X={41} _Y={0} />
                                                                            </Layer>
                                                                        </Stage>
                                                                    </button>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan='2'>
                                                            <hr />
                                                        </td>
                                                    </tr>
                                                </>
                                            }
                                            {("cash_id" == m_MASS[m_MASS.length - 1].typ + "_" + main) &&
                                                Is_View_Row(this.props.List_Fields_Main, 'management') &&
                                                <>
                                                    <tr>
                                                        <td colSpan='2'>
                                                            {V_ID == 6 ? (
                                                                <Stage width={PL_width + 120} height={BTN_height + 4.5} x={_dX} y={0}>
                                                                    <Layer key='1'>
                                                                        <Text Text='Перезагрузка Купюроприёмника'
                                                                            x='2' y='2' fill='black'
                                                                            fontSize='12' fontFamily='Calibri' />
                                                                    </Layer>
                                                                </Stage>
                                                            ) : (

                                                                    <button onClick={() => this.toock('Перезагрузка Купюроприёмника', m_MASS[m_MASS.length - 1].id, this.state.TCO[1], 'restart_cash')}
                                                                        title="Перезагрузка Купюроприёмника">
                                                                        <Stage width={PL_width} height={BTN_height} x={_dX} y={0}>
                                                                            <Layer key='1'>
                                                                                <AZS_Image Image={get_ICON_Refr(++r)} _W='23' _H='23' _X={41} _Y={0} />
                                                                            </Layer>
                                                                        </Stage>
                                                                    </button>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan='2'>
                                                            <hr />
                                                        </td>
                                                    </tr>
                                                </>
                                            }

                                        </>
                                    ))
                                ))
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
