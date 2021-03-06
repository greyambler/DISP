import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { createGuid, Is_View_Row } from '../core/core_Function.jsx';

import { Array } from 'core-js';

import Pl from './device/pl.jsx'
import TRK from './device/trk.jsx'
import AZS_Image from '../control/AZS_Image.jsx'
import TCO_Tree from './device/tcoTree.jsx'






import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import FILTER from './filters.jsx'
import { write } from 'fs';

const _Debuge = false;

function Is_View_Row_Fuels(Data, Name_Row) {
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

function get_ZeroColumn_0(ValF) {
    let M = null;
    if (ValF != null) {
        M = new Array();
        M.push(ValF)
    }
    return M;
}

function CreatViewFILTER_FUELS(_List_Objs) {


    let _Data = {
        label: 'Вид НП',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: Get_AI_FILTER(_List_Objs.fuel),
    }
    return _Data;
}

function CreatViewFILTER_ID_PL(pls) {

    let _Data = {
        label: 'Резервуары',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: Get_PLs_FILTER(pls),
    }
    return _Data;
}

function CreatViewFILTER_ID_TRK(trk) {

    let _Data = {
        label: 'ТРК',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: Get_Trk_FILTER(trk),
    }
    return _Data;
}
function CreatViewFILTER_ID_TCO(TCO) {
    let _Data = {
        label: 'ТСО',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: Get_Tco_FILTER(TCO),
    }
    return _Data;
}
function Get_AI_FILTER(AIs) {
    let M_AI = new Array();
    if (AIs != null) {
        for (const item_AI of AIs) {
            M_AI.push({ label: item_AI.nm, value: "fuel_" + item_AI.id, code: item_AI.fu });
        }
    }
    return M_AI;
}


function Get_PLs_FILTER(pls) {
    let M_PL = new Array();
    if (pls != null) {
        for (const item_PL of pls) {
            M_PL.push({ label: item_PL.nm, value: item_PL.id });
        }
    }
    return M_PL;
}
function Get_Trk_FILTER(trk) {
    let M_PL = new Array();
    if (trk != null) {
        for (const item_TRK of trk) {
            M_PL.push({ label: item_TRK.nm, value: item_TRK.id });
        }
    }
    return M_PL;
}
function Get_Tco_FILTER(TCO) {
    let M_PL = new Array();
    if (TCO != null) {
        for (const item_TCO of TCO) {

            for (const iterator of item_TCO) {
                if (iterator[iterator.length - 1].typ == 'tso') {
                    let tso = iterator[iterator.length - 1];
                    M_PL.push({ label: tso.nm, value: tso.id });
                }
            }
        }
    }
    return M_PL;
}


function Get_Key_View_ID_PL(mas_Vidg, _Fields_PL, PLs) {
    let View_Fields = new Array();
    let Is_selectAll_mas_Vidg = true;
    if (mas_Vidg != null) {
        Is_selectAll_mas_Vidg = false;
        for (const nameView of mas_Vidg) {
            if (nameView.value == 'selectAll') {
                Is_selectAll_mas_Vidg = true;
                break;
            }
        }
    }
    if (PLs != null) {
        if (_Fields_PL != null) {
            for (const iterator of _Fields_PL) {
                View_Fields.push(iterator);
            }
        }
        if (Is_selectAll_mas_Vidg) {
            for (const iterator of PLs) {
                View_Fields.push(iterator.id);
            }
        } else {
            for (const iterator of mas_Vidg) {
                View_Fields.push(iterator.value);
            }
        }
        return View_Fields;
    } else {
        return _Fields_PL;
    }
}

function Get_Key_View_FUELS(mas_Vidg, _List_Objs) {
    let View_Fields = new Array();
    if (mas_Vidg != null) {
        for (const nameView of mas_Vidg) {
            if (nameView.value == 'selectAll') {
                if (nameView.value == 'selectAll') {
                    if (_List_Objs != null && _List_Objs.fuel != null) {
                        for (const iterator of _List_Objs.fuel) {
                            View_Fields.push("fuel_" + iterator.id);
                        }
                    }
                }
            } else {
                View_Fields.push(nameView.value);
            }
        }
    }
    return View_Fields;
}

function Get_Key_View_ID_TRK(mas_Vidg, _Fields_TRK, Trk) {
    let View_Fields = new Array();
    let Is_selectAll_mas_Vidg = true;
    if (mas_Vidg != null) {
        Is_selectAll_mas_Vidg = false;
        for (const nameView of mas_Vidg) {
            if (nameView.value == 'selectAll') {
                Is_selectAll_mas_Vidg = true;
                break;
            }
        }
    }

    if (Trk != null) {
        if (_Fields_TRK != null) {
            for (const iterator of _Fields_TRK) {
                View_Fields.push(iterator);
            }
        }
        if (Is_selectAll_mas_Vidg) {
            for (const iterator of Trk) {
                View_Fields.push(iterator.id);
            }
        } else {
            for (const iterator of mas_Vidg) {
                View_Fields.push(iterator.value);
            }
        }
        return View_Fields;
    } else {
        return _Fields_TRK;
    }
}
function Get_Key_View_ID_TCO(mas_Vidg, _Fields_TCO, TCO) {
    let View_Fields = new Array();
    let Is_selectAll_mas_Vidg = true;
    if (mas_Vidg != null) {
        Is_selectAll_mas_Vidg = false;
        for (const nameView of mas_Vidg) {
            if (nameView.value == 'selectAll') {
                Is_selectAll_mas_Vidg = true;
                break;
            }
        }
    }

    if (TCO != null) {
        if (_Fields_TCO != null) {
            for (const iterator of _Fields_TCO) {
                View_Fields.push(iterator);
            }
        }
        if (Is_selectAll_mas_Vidg) {
            for (const item_TCO of TCO) {
                for (const iterator of item_TCO) {
                    if (iterator[iterator.length - 1].typ == 'tso') {
                        let tso = iterator[iterator.length - 1];
                        View_Fields.push(tso.id);
                    }
                }
            }
        } else {
            for (const iterator of mas_Vidg) {
                View_Fields.push(iterator.value);
            }
        }
        return View_Fields;
    } else {
        return _Fields_TCO;
    }
}


export default class devices extends Component {
    constructor(props) {
        super(props);
        this.Test_Maile_Onclick = this.Test_Maile_Onclick.bind(this);
        this.AZS_ERROR_Onclick = this.AZS_ERROR_Onclick.bind(this);
        this.state = {
            AZS: this.props.AZS,
            id: this.props.id,

            _pl: null,
            _trk: null,
            //_tco: null,
            _nozzle: null,

            PLs: null,
            Trk: null,
            //Tco: null,
            Nozzle: null,

            //Tree_TCO: null,
            //Tree_TCO_DEVICES: null,


            TCO: null,

            List_Fields_ID_PL: Get_Key_View_ID_PL([{ value: 'selectAll' }], this.props.List_Fields_PL, this.props.PLs),
            LineZeroPL: false,

            List_Fields_FUELS: Get_Key_View_FUELS([{ value: 'selectAll' }], this.props._List_Objs),


            List_Fieldss_ID_TRK: Get_Key_View_ID_TRK([{ value: 'selectAll' }], this.props.List_Fields_TRK, this.props.Trk),
            LineZeroTRK: false,

            List_Fieldss_ID_TCO: Get_Key_View_ID_TCO([{ value: 'selectAll' }], this.props.List_Fields_TCO, this.props.TCO),
            LineZeroTCO: false,


            List_Fields_Main: this.props.List_Fields_Main,


        }
    }

    componentDidMount() {


        this.setState({ _pl: get_ZeroColumn_0(this.props.PL_0) });
        this.setState({ _trk: get_ZeroColumn_0(this.props.TRK_0) });
        this.setState({ _tco: get_ZeroColumn_0(this.props.TCO_0) });

        this.setState({ _nozzle: get_ZeroColumn_0(this.props.NOZZLE_0) });


        this.setState({
            PLs: this.props.PLs, Trk: this.props.Trk,
            Tco: this.props.Tco, Nozzle: this.props.Nozzle,
            TCO: this.props.TCO,
        });


        this.setState({ Tree_TCO: this.props.TCO_0 });


    }
    componentDidUpdate(prevProps) {
        if (this.props.id != prevProps.id) {
            this.setState({ id: this.props.id });
        } if (this.props.AZS != prevProps.AZS) {
            this.setState({ AZS: this.props.AZS });
        }
        if (this.props.RSS != prevProps.RSS) {
            this.setState({ Rss: this.props.RSS });
        }
        if (this.props.PL_0 != prevProps.PL_0) {
            this.setState({ _pl: get_ZeroColumn_0(this.props.PL_0) });
        }
        if (this.props.TRK_0 != prevProps.TRK_0) {
            this.setState({ _trk: get_ZeroColumn_0(this.props.TRK_0) });
        }
        if (this.props.TCO_0 != prevProps.TCO_0) {
            this.setState({ _tco: get_ZeroColumn_0(this.props.TCO_0) });
        }
        if (this.props.PLs != prevProps.PLs) {
            this.setState({ PLs: this.props.PLs });
            this.setState({ List_Fields_ID_PL: Get_Key_View_ID_PL([{ value: 'selectAll' }], this.props.List_Fields_PL, this.props.PLs) });
        }
        /*
        if (this.props.PLs != prevProps.PLs) {
            this.setState({ List_Fields_PL: this.props.List_Fields_PL });
            this.setState({ List_Fields_ID_PL: Get_Key_View_ID_PL([{ value: 'selectAll' }], this.props.List_Fields_PL, this.props.PLs) })
        }
        */

        if (this.props.Trk != prevProps.Trk) {
            this.setState({ Trk: this.props.Trk });
            this.setState({ List_Fieldss_ID_TRK: Get_Key_View_ID_TRK([{ value: 'selectAll' }], this.props.List_Fields_TRK, this.props.Trk) });
        }
        if (this.props.Tco != prevProps.Tco) {
            this.setState({ Tco: this.props.Tco });
        }
        if (this.props.Nozzle != prevProps.Nozzle) {
            this.setState({ Nozzle: this.props.Nozzle });
        }


        if (this.props.Tree_TCO != prevProps.Tree_TCO) {
            this.setState({ Tree_TCO: this.props.Tree_TCO });
        }
        if (this.props.TCO != prevProps.TCO) {
            this.setState({ TCO: this.props.TCO });
            this.setState({ List_Fieldss_ID_TCO: Get_Key_View_ID_TCO([{ value: 'selectAll' }], this.props.List_Fields_TCO, this.props.TCO) });
        }


        if (this.props.List_Fields_Main != prevProps.List_Fields_Main) {
            this.setState({ List_Fields_Main: this.props.List_Fields_Main });
            this.setState({ List_Fields_ID_PL: Get_Key_View_ID_PL([{ value: 'selectAll' }], this.props.List_Fields_PL, this.props.PLs), LineZeroPL: false });
            this.setState({ List_Fieldss_ID_TCO: Get_Key_View_ID_TCO([{ value: 'selectAll' }], this.props.List_Fields_TCO, this.props.TCO), LineZeroTCO: false });
            this.setState({ List_Fieldss_ID_TRK: Get_Key_View_ID_TRK([{ value: 'selectAll' }], this.props.List_Fields_TRK, this.props.Trk), LineZeroTRK: false });

        }


    }
    /********** ФИЛЬТРЫ ********/

    update_VIEW_ID_PL = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ List_Fields_ID_PL: _View_Fields });//, LineZeroPL: true });
        } else {
            _View_Fields = Get_Key_View_ID_PL(View_Vidg, this.props.List_Fields_PL, this.state.PLs);
            this.setState({ List_Fields_ID_PL: _View_Fields });//, LineZeroPL: false });
        }

        if (View_Vidg.length == 0 && this.state.List_Fields_FUELS.length == 0) {
            this.setState({ LineZeroPL: true });
        } else {
            this.setState({ LineZeroPL: false });
        }
    }

    update_VIEW_FUELS = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ List_Fields_FUELS: _View_Fields });
        } else {
            _View_Fields = Get_Key_View_FUELS(View_Vidg, this.props._List_Objs);
            this.setState({ List_Fields_FUELS: _View_Fields });
        }
        if (this.state.List_Fields_ID_PL.length == 0 && View_Vidg.length == 0) {
            this.setState({ LineZeroPL: true });
        } else {
            this.setState({ LineZeroPL: false });
        }

    }

    update_VIEW_ID_TRK = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ List_Fields_ID_TRK: _View_Fields, LineZeroTRK: true });
        } else {
            _View_Fields = Get_Key_View_ID_TRK(View_Vidg, this.props.List_Fields_TRK, this.state.Trk);
            this.setState({ List_Fieldss_ID_TRK: _View_Fields, LineZeroTRK: false });
        }
    }
    update_VIEW_ID_TCO = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ List_Fieldss_ID_TCO: _View_Fields, LineZeroTCO: true });
        } else {
            _View_Fields = Get_Key_View_ID_TCO(View_Vidg, this.props.List_Fields_TCO, this.props.TCO);
            this.setState({ List_Fieldss_ID_TCO: _View_Fields, LineZeroTCO: false });
        }
    }


    /********** ФИЛЬТРЫ ********/
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

    AZS_ERROR_Onclick(id_azs) {
        //alert("Тест = " + id_azs);
        //history={this.props.history}
        this.props.history.push('/azs_listerror&' + id_azs);
    }

    Test_Onclick(text) {
        //var link = 'yourprotocolname:text & "d:\b1.bat"';
        //alert("Тест = " + text);
        var link = 'yourprotocolname:' + text;
        window.location.href = link;
    }

    render() {
        let Guid_T = createGuid();
        let style_TD_BTN = {
            verticalAlign: 'top',
            height: '30px',
            width: '355px',
        }
        if (this.state.AZS != null && this.state.id == 0) {

            return (
                <div >
                    <table className="Dev_TBL">
                        <tbody>
                            <tr>
                                <td height="43">
                                    <center>{this.state.AZS.nm}</center>
                                    <hr /><hr />
                                </td>
                            </tr>
                            {
                                Is_View_Row(this.state.List_Fields_Main, 'pl') &&
                                this.state._pl != null &&
                                <>
                                    <tr>
                                        <td id='td_Left'>
                                            <center><Element name="test1" className="element" >Резервуары</Element></center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>

                                            {

                                                <div key={'pl_' + Guid_T}>
                                                    <Pl PL={this.state._pl[0]}
                                                        key={'PL_' + Guid_T}
                                                        id={this.state._pl[0].id}
                                                        PL_Col={this.props.PL_Col}
                                                        List_Fields_Main={this.state.List_Fields_Main}
                                                        List_Fields_PL={this.props.List_Fields_PL}
                                                    />
                                                </div>

                                            }
                                        </td>
                                    </tr>
                                </>
                            }

                            {
                                Is_View_Row(this.state.List_Fields_Main, 'trk') &&
                                this.state._trk != null &&
                                <>
                                    <tr>
                                        <td id='td_Left'>
                                            <center><Element name="test2" className="element" height="243" >ТРК</Element></center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {
                                                <div key={'trk_' + Guid_T}>
                                                    <TRK TRK={this.state._trk[0]}
                                                        key={'Trk ' + Guid_T}
                                                        id={this.state._trk[0].id}
                                                        TRK_Col={this.props.TRK_Col}
                                                        List_Fields_Main={this.state.List_Fields_Main}
                                                        List_Fields_TRK={this.props.List_Fields_TRK}
                                                    />
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                </>
                            }
                            {
                                Is_View_Row(this.state.List_Fields_Main, 'tco') &&
                                this.state.Tree_TCO != null &&
                                <>
                                    <tr>
                                        <td id='td_Left'>
                                            <center ><Element name="test3" className="element" >ТСО</Element></center>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            {
                                                <div key={'tso_' + Guid_T}>
                                                    <TCO_Tree TCO={this.state.Tree_TCO}
                                                        IsHead={true}
                                                        IsZERO={false}
                                                        List_Fields_Main={this.state.List_Fields_Main}
                                                        List_Fields_TCO={this.props.List_Fields_TCO}
                                                    />
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                </>
                            }
                        </tbody>
                    </table>
                </div>
            );
        }
        else if (this.state.AZS != null && this.state.id != 0) {
            let View_Filter_id_pl = CreatViewFILTER_ID_PL(this.state.PLs);
            let View_Filter_id_krk = CreatViewFILTER_ID_TRK(this.state.Trk);
            let View_Filter_id_tco = CreatViewFILTER_ID_TCO(this.props.TCO);
            let View_Filter_fuels = CreatViewFILTER_FUELS(this.props._List_Objs);

            return (
                <div >
                    <table className="DevS_TBL">
                        <tbody>

                            {(this.state.PLs != null && this.state.PLs.length > 0) &&
                                <tr>
                                    <td>
                                        <center>
                                            {this.state.AZS.nm}
                                            <button className='Min_button_White' title="Журнал ошибок"
                                                onClick={() => this.AZS_ERROR_Onclick(this.state.AZS.id)}>
                                                <div align="center">
                                                    <img src='images/anim_engine.gif' width="15px" />
                                                </div>
                                            </button>
                                            <button className='Min_button_White' title="TH"
                                                onClick={() => this.Test_Onclick(this.state.AZS.ob)}>
                                                <div align="center">
                                                    <img src='images/favicon.ico' width="15px" />
                                                </div>
                                            </button>
                                        </center>
                                        <hr /><hr />
                                    </td>
                                </tr>
                            }
                            {Is_View_Row(this.state.List_Fields_Main, 'pl') &&
                                (this.state.PLs != null && this.state.PLs.length > 0) &&
                                <>
                                    <tr>
                                        <td id='td_Left'>
                                            <div>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <FILTER text_head=''
                                                                    update_VIEW={this.update_VIEW_ID_PL}
                                                                    dataFilter={View_Filter_id_pl}
                                                                />
                                                            </td>
                                                            <td>
                                                                <FILTER text_head=''
                                                                    update_VIEW={this.update_VIEW_FUELS}
                                                                    dataFilter={View_Filter_fuels}
                                                                />
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        {this.state.LineZeroPL ?
                                            (
                                                <td key='li_1'>
                                                    <Pl PL='ZERO'
                                                        key='PL_1'
                                                        id='PL_1'
                                                        PL_Col={this.props.PL_Col}
                                                        DeVal={this.props.DeVal}
                                                        _List_Objs={this.props._List_Objs}
                                                        List_Fields_Main={this.state.List_Fields_Main}
                                                        List_Fields_PL={this.props.List_Fields_PL}
                                                    />
                                                </td>
                                            )
                                            :
                                            (
                                                <td >
                                                    {
                                                        this.state.PLs.map((el, r) => (
                                                            (
                                                                (Is_View_Row(this.state.List_Fields_ID_PL, el.id)
                                                                    || Is_View_Row_Fuels(this.state.List_Fields_FUELS, "fuel_" + el.fuel)) &&

                                                                <td key={'li ' + el.id}>
                                                                    <Pl PL={el}
                                                                        fuels={this.props._List_Objs.fuel}
                                                                        key={'PL ' + el.id}
                                                                        id={el.id}
                                                                        PL_Col={this.props.PL_Col}
                                                                        DeVal={this.props.DeVal}
                                                                        _List_Objs={this.props._List_Objs}
                                                                        List_Fields_Main={this.state.List_Fields_Main}
                                                                        List_Fields_PL={this.props.List_Fields_PL}
                                                                    />
                                                                </td>
                                                            )))
                                                    }
                                                </td>
                                            )
                                        }
                                    </tr>
                                </>
                            }

                            {Is_View_Row(this.state.List_Fields_Main, 'trk') &&
                                (this.state.Trk != null && this.state.Trk.length > 0) &&
                                <>
                                    <tr>
                                        <td id='td_Left_TRK'>
                                            <FILTER text_head=''
                                                update_VIEW={this.update_VIEW_ID_TRK}
                                                dataFilter={View_Filter_id_krk}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        {this.state.LineZeroTRK ?
                                            (
                                                <td key='li_1'>
                                                    <TRK TRK='ZERO'
                                                        key='TRK_1'
                                                        id='TRK_1'
                                                        TRK_Col={this.props.TRK_Col}
                                                        DeVal={this.props.DeVal}
                                                        _List_Objs={this.props._List_Objs}
                                                        List_Fields_Main={this.state.List_Fields_Main}
                                                        List_Fields_TRK={this.props.List_Fields_TRK}
                                                    />
                                                </td>
                                            )
                                            :
                                            (
                                                <td>
                                                    {
                                                        this.state.Trk.map((el, r) => (
                                                            (
                                                                Is_View_Row(this.state.List_Fieldss_ID_TRK, el.id) &&

                                                                <td key={'li ' + el.id} >
                                                                    <TRK TRK={el}

                                                                        TCO={this.state.TCO[0]}

                                                                        fuels={this.props._List_Objs.fuel}
                                                                        key={'Trk ' + el.id}
                                                                        id={el.id}
                                                                        TRK_Col={this.props.TRK_Col}
                                                                        DeVal={this.props.DeVal}
                                                                        _List_Objs={this.props._List_Objs}
                                                                        devices={this.props.devices}
                                                                        List_Fields_Main={this.state.List_Fields_Main}
                                                                        List_Fields_TRK={this.props.List_Fields_TRK}
                                                                    />
                                                                </td>
                                                            )))
                                                    }
                                                </td>
                                            )
                                        }
                                    </tr>
                                </>

                            }

                            {
                                Is_View_Row(this.state.List_Fields_Main, 'tco') &&
                                (this.state.TCO != null && this.state.TCO.length > 0) &&
                                <>
                                    <tr>
                                        <td id='td_Left_TCO'>
                                            <FILTER text_head=''
                                                update_VIEW={this.update_VIEW_ID_TCO}
                                                dataFilter={View_Filter_id_tco}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        {this.state.LineZeroTCO ?
                                            (
                                                <td>
                                                    <TCO_Tree TCO={this.state.Tree_TCO}
                                                        key={'tso_' + createGuid()}
                                                        IsHead={false}
                                                        IsZERO={true}
                                                        List_Fields_Main={this.state.List_Fields_Main}
                                                        List_Fields_TCO={this.props.List_Fields_TCO}
                                                    />
                                                </td>

                                            )
                                            :
                                            (
                                                <td>
                                                    {
                                                        this.state.TCO.map(el => (
                                                            (Is_View_Row(this.state.List_Fieldss_ID_TCO, el[0][el[0].length - 1].id) &&
                                                                <td key={'tso_' + el[0][el[0].length - 1].id} id='td_top'>
                                                                    <TCO_Tree TCO={el}
                                                                        IsHead={false}
                                                                        IsZERO={false}
                                                                        DeVal={this.props.DeVal}
                                                                        dataFilter={this.props.dataFilter}
                                                                        _List_Objs={this.props._List_Objs}
                                                                        devices={this.props.devices}

                                                                        List_Fields_Main={this.state.List_Fields_Main}
                                                                        List_Fields_TCO={this.props.List_Fields_TCO}
                                                                    />
                                                                </td>
                                                            )))
                                                    }
                                                </td>
                                            )
                                        }
                                    </tr>
                                </>
                            }

                        </tbody>
                    </table>
                </div>
            );
        } else {
            return <br />;
        }
    }

}
