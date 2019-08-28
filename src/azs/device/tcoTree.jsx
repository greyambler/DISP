import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { RSS_Type_List, get_DVC_TREE, Get_Device, Get_MainHead, Get_Val, get_NameFuel, POST, Is_View_Row } from '../../core/core_Function.jsx';
import AZS_Image from '../../control/AZS_Image.jsx'

import Tco_Item_Tree from '../../control/tco_Item_Tree.jsx';
import Tco_Dvc_Item_Tree from '../../control/tco_Dvc_Item_Tree.jsx';


const _Debuge = false;

function get_ICON_Fuel(TCO_0) {
    let NUM_STATE_TSO = Number(TCO_0[TCO_0.length - 1]['STATE_TSO']);

    let col = '/images/TCO_Error.png';
    if (!isNaN(NUM_STATE_TSO)) {
        switch (NUM_STATE_TSO) {
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
            case 11: col = '/images/TCO_Ok.png'; break;
            default: col = '/images/TCO_NoConect.png'; break;
        }
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
let r = 0;

export default class tcoTree extends Component {
    constructor(props) {
        super(props);
        this.toock = this.toock.bind(this);
        this.Test_Onclick = this.Test_Onclick.bind(this);
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
                        F_mass[this.state.DeVal.values[0].typ] = TextValue + ' [' + this.state.DeVal.values[0].val + '] ';
                    } else {
                        TextValue = isOpExist_TSO_DVC(this.props._List_Objs.dvctyptree, this.state.DeVal.values[0]);
                        if (TextValue != null) {
                            F_mass[this.state.DeVal.values[0].typ] = TextValue + ' [' + this.state.DeVal.values[0].val + '] ';
                        }
                        else {
                            for (const iterator of this.state.DeVal.values) {
                                if (iterator.comment != null && iterator.comment != undefined) {
                                    F_mass[iterator.typ] = iterator.comment + ' [' + iterator.val + '] ';
                                } else {
                                    F_mass[iterator.typ] = iterator.val;
                                }
                            }
                        }
                    }
                    this.setState({ TCO: this.state.TCO });
                }
            }
        }
    }
    Test_Onclick(text, id) {
        alert("Тест = " + text + ",  id = " + id);
    }

    async toock(text, id) {///Отправка команды
        let rss = POST;
        var myRequest = new Request(rss);
        let _body = get_Json_TEST(id);
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
            if (response.ok) {
                const Jsons = await response.json();
                this.setState({ _ANS: Jsons });
                alert("Команда получила ответ - " + Jsons.status + ",  id = " + id);
            }
            else {
                throw Error(response.statusText);
            }
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
    }



    render() {
        if (this.state.TCO != null) {
            let V_ID = Get_Val(this.state.TCO[0], "id")
            let _height = 60;
            let _width = (V_ID == 6) ? 110 : 110;
            let _dX = 2;
            let PL_width = _width + _dX + 0.4;
            let Icon_TCO = get_ICON_Fuel(this.state.TCO[0]);

            //id={(V_ID != 6) ? 'Li_Level' : 'li_Level'}>

            let MASS = this.state.TCO[0];
            let DEVICES = null;
            if (this.state.TCO[1] != null) {
                DEVICES = this.state.TCO[1];
            }
            let F = 2;
            let isKeyShow = false;
            //List_Fields_Main={this.props.List_Fields_Main}

            //{this.props.View_Icon &&
            //let r = Is_View_Row(this.props.List_Fields_Main, 'icon_alarm');
            //{ Is_View_Row(this.props.List_Fields_Main, 'icon_alarm') &&
            //id={(V_ID != 6) ? 'Li_Level_tco' : 'li_Level'}>
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
                                    <td colSpan='2'>
                                        {V_ID == 6 ? (
                                            <Stage width={PL_width} height={_height + 9} x={_dX} y={0}>
                                                <Layer key='1'>
                                                    <Text Text='блокировка'
                                                        x='0' y='20' fill='black'
                                                        fontSize='12' fontFamily='Calibri' />
                                                </Layer>
                                            </Stage>
                                        ) : (
                                                <button onClick={() => this.Test_Onclick("this.Test_Onclick")}>
                                                    <Stage width={PL_width} height={_height + 3} x={_dX} y={0}>
                                                        <Layer key='1'>
                                                            <AZS_Image Image={get_ICON_Lock(++r)} _W='55' _H='55' _X={21} _Y={6} />
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
                                            {Is_View_Row(this.props.List_Fields_TCO, m_MASS[m_MASS.length - 1].typ + "_" + main) &&
                                                <Tco_Dvc_Item_Tree PROPERTYS={main} MASS_LIBRR={m_MASS} isKeyShow={isKeyShow} FirstPROPS={F} N={p}
                                                    IsHead={this.props.IsHead} IsZERO={this.props.IsZERO} />
                                            }

                                            {("fr_id" == m_MASS[m_MASS.length - 1].typ + "_" + main) &&
                                                Is_View_Row(this.props.List_Fields_Main, 'management') &&
                                                <>
                                                    <tr>
                                                        <td colSpan='2'>
                                                            {V_ID == 6 ? (
                                                                <Stage width={PL_width} height={_height + 9} x={_dX} y={0}>
                                                                    <Layer key='1'>
                                                                        <Text Text='Перезагрузка ФР'
                                                                            x='24' y='20' fill='black'
                                                                            fontSize='12' fontFamily='Calibri' />
                                                                    </Layer>
                                                                </Stage>
                                                            ) : (
                                                                    <button onClick={() => this.toock('Перезагрузка ФР', m_MASS[m_MASS.length - 1].id)}>
                                                                        <Stage width={PL_width} height={_height + 3} x={_dX} y={0}>
                                                                            <Layer key='1'>
                                                                                <AZS_Image Image={get_ICON_Refr(++r)} _W='55' _H='55' _X={21} _Y={6} />
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
                                                                <Stage width={PL_width} height={_height + 9} x={_dX} y={0}>
                                                                    <Layer key='1'>
                                                                        <Text Text='Перезагрузка ПК'
                                                                            x='0' y='20' fill='black'
                                                                            fontSize='12' fontFamily='Calibri' />
                                                                    </Layer>
                                                                </Stage>
                                                            ) : (
                                                                    <button onClick={() => this.toock("Перезагрузка ПК", m_MASS[m_MASS.length - 1].id)}>
                                                                        {/*</button><button onClick={() => this.Test_Onclick('Перезагрузка ПК', m_MASS[m_MASS.length - 1].id)}>*/}
                                                                        <Stage width={PL_width} height={_height + 3} x={_dX} y={0}>
                                                                            <Layer key='1'>
                                                                                <AZS_Image Image={get_ICON_Refr(++r)} _W='55' _H='55' _X={21} _Y={6} />
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
                                            {("td_id" == m_MASS[m_MASS.length - 1].typ + "_" + main) &&
                                                Is_View_Row(this.props.List_Fields_Main, 'management') &&
                                                <>
                                                    <tr>
                                                        <td colSpan='2'>
                                                            {V_ID == 6 ? (
                                                                <Stage width={PL_width} height={_height + 9} x={_dX} y={0}>
                                                                    <Layer key='1'>
                                                                        <Text Text='Перезагрузка Валидатора'
                                                                            x='0' y='20' fill='black'
                                                                            fontSize='12' fontFamily='Calibri' />
                                                                    </Layer>
                                                                </Stage>
                                                            ) : (
                                                                
                                                                    <button onClick={() => this.toock('Перезагрузка Валидатора', m_MASS[m_MASS.length - 1].id)}>
                                                                        <Stage width={PL_width} height={_height + 3} x={_dX} y={0}>
                                                                            <Layer key='1'>
                                                                                <AZS_Image Image={get_ICON_Refr(++r)} _W='55' _H='55' _X={21} _Y={6} />
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
