import React, { Component, PropTypes } from 'react';
import { RSS_AZS, getDVC_Tree } from '../core/core_Function.jsx';

import { Link as S_Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


import List_azs from './list_azs.jsx'

import FILTER from './filters.jsx'



const _Debuge = false;

function get_ZeroColumn(Mass) {
    var col = {
        "id": 0,
        "nm": "Название",
    };
    let AZS = new Array();


    if (AZS.length == 0) {
        AZS.push(col);
    }
    for (const iterator of Mass) {
        AZS.push(iterator);
    }
    return AZS;
}
function get_Mass_View_Save(mas_Vidg, ASZ_M) {
    let View_Fields = new Array();
    for (const nameView of mas_Vidg) {
        if (nameView.value == 'selectAll') {
            View_Fields.push('icon_alarm');
            View_Fields.push('data');
        }
        if (nameView.value == 'vidget') {
            View_Fields.push('vidget');
            View_Fields.push('icon_alarm');
        }
        if (nameView.value == 'icon_alarm') {
            View_Fields.push('icon_alarm');
        }
        if (nameView.value == 'data') {
            View_Fields.push('data');
        }
        View_Fields.push(nameView.value);
    }

    return View_Fields;
}

function Get_Key_View_Main(mas_Vidg, AZS) {
    let View_Fields = new Array();
    for (const nameView of mas_Vidg) {
        if (nameView.value == 'selectAll') {
            View_Fields.push('selectAll');
            View_Fields.push('vidget');
            View_Fields.push('azs');
            //            View_Fields.push('AI');
            View_Fields.push('data');

            View_Fields.push('icon_alarm');
            View_Fields.push('lock');
            View_Fields.push('management');

            View_Fields.push('dvc');
            View_Fields.push('pl');
            View_Fields.push('trk');
            View_Fields.push('tco');

        }
        if (nameView.value == 'dvc') {
            View_Fields.push('dvc');
            View_Fields.push('pl');
            View_Fields.push('trk');
            View_Fields.push('tco');
        }
        if (nameView.value == 'vidget') {
            View_Fields.push('vidget');
            View_Fields.push('icon_alarm');
            View_Fields.push('lock');
            View_Fields.push('management');
        }
        if (nameView.value == 'icon_alarm') {
            View_Fields.push('icon_alarm');
        }

        View_Fields.push('0');

        if (nameView.value == 'azs' || nameView.value == 'selectAll') {
            View_Fields.push('azs');
            if (AZS != null) {
                for (const azs of AZS) {
                    View_Fields.push(azs.id);
                }
            }
        }
        if (nameView.value == 'F_button') {
            View_Fields.push('lock');
            View_Fields.push('management');

        }
        /*
                if (nameView.value == 'AI' || nameView.value == 'selectAll') {
                    View_Fields.push("fuel_all");
                    if (AI != null) {
                        for (const ai of AI) {
                            View_Fields.push("fuel_" + ai.id);
                        }
                    }
                }
        */
        if (nameView.value == 'data') {
            View_Fields.push('data');
        }
        View_Fields.push(nameView.value);

    }

    return View_Fields;
}
function Get_Key_View_PL(mas_Vidg, AI, PL_Counter, IsCheckCounter) {
    let View_Fields = new Array();
    for (const nameView of mas_Vidg) {
        if (nameView.value == 'selectAll') {
            View_Fields.push('selectAll');
            //View_Fields.push('AI');
        }
        /*
        View_Fields.push('0');
        if (nameView.value == 'AI' || nameView.value == 'selectAll') {
            View_Fields.push("fuel_all");
            if (AI != null) {
                for (const ai of AI) {
                    View_Fields.push("fuel_" + ai.id);
                }
            }
            
        }
        */
        if (IsCheckCounter) {
            if (nameView.value == 'AI_COUNTER' || nameView.value == 'selectAll') {
                if (PL_Counter != null && PL_Counter.cntyp != null) {
                    for (const item of PL_Counter.cntyp) {
                        View_Fields.push(item.typ);
                    }
                }
            }

            View_Fields.push(nameView.value);
        }
    }
    return View_Fields;
}
function Get_Key_View_TRK(mas_Vidg, AI, _Counter, IsCheckCounter) {
    let View_Fields = new Array();
    for (const nameView of mas_Vidg) {
        if (nameView.value == 'selectAll') {
            View_Fields.push('selectAll');
            //View_Fields.push('AI');
        }
        /*
        View_Fields.push('0');
        if (nameView.value == 'AI' || nameView.value == 'selectAll') {
            View_Fields.push("fuel_all");
            if (AI != null) {
                for (const ai of AI) {
                    View_Fields.push("fuel_" + ai.id);
                }
            }
            
        }
        */
        if (IsCheckCounter) {
            if (nameView.value == 'TRK_COUNTER' || nameView.value == 'selectAll') {
                if (_Counter != null && _Counter.cntyp != null) {
                    for (const item of _Counter.cntyp) {
                        View_Fields.push(item.typ);
                    }
                }
            }
            View_Fields.push(nameView.value);
        }
    }
    return View_Fields;
}
function Get_Key_View_TCO(mas_Vidg, AI, _Counter, IsCheckCounter) {
    let View_Fields = new Array();
    let row = 0;
    for (const nameView of mas_Vidg) {
        if (nameView.value == 'selectAll') {
            View_Fields.push('selectAll');
            View_Fields.push('id');
            View_Fields.push('nm');
            View_Fields.push('typ');

            if (_Counter != null && _Counter.cntyp != null) {
                for (const item of _Counter.cntyp) {
                    View_Fields.push(item.typ);
                }
            }
            for (const item_DVC of _Counter.dvctyptree) {
                View_Fields.push(item_DVC.typ + "_id");
                View_Fields.push(item_DVC.typ + "_nm");
                View_Fields.push(item_DVC.typ + "_typ");
                if (item_DVC.cntyp != null) {
                    for (const item of item_DVC.cntyp) {

                        View_Fields.push(item_DVC.typ + "_" + item.typ);
                    }
                }
            }
        } else {
            if (row == 0) {
                View_Fields.push('id');
                View_Fields.push('nm');
                View_Fields.push('typ');
            }
        }
        if (nameView.value == 'TCO_DEVICES') {
            if (_Counter != null && _Counter.cntyp != null) {
                for (const item_DVC of _Counter.dvctyptree) {
                    View_Fields.push(item_DVC.typ + "_id");
                    View_Fields.push(item_DVC.typ + "_nm");
                    View_Fields.push(item_DVC.typ + "_typ");

                    if (item_DVC.cntyp != null) {
                        for (const item of item_DVC.cntyp) {

                            View_Fields.push(item_DVC.typ + "_" + item.typ);
                        }
                    }
                }
            }
        }
        if (nameView.value != 'TCO_DEVICES' && nameView.value != 'selectAll') {
            for (const nameView of mas_Vidg) {
                if (_Counter != null && _Counter.dvctyptree != null) {
                    for (const item_DVC of _Counter.dvctyptree) {
                        if (item_DVC.typ == nameView.value) {
                            View_Fields.push(item_DVC.typ + "_id");
                            View_Fields.push(item_DVC.typ + "_nm");
                            View_Fields.push(item_DVC.typ + "_typ");
                            if (item_DVC.cntyp != null) {
                                for (const item of item_DVC.cntyp) {
                                    View_Fields.push(item_DVC.typ + "_" + item.typ);
                                }
                            }
                        } else {
                            if (item_DVC.cntyp != null) {

                                for (const item of item_DVC.cntyp) {
                                    if (item.typ == nameView.value) {
                                        View_Fields.push(item_DVC.typ + "_" + item.typ);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        View_Fields.push(nameView.value);
        row++;
    }

    return View_Fields;
}


function GetAZS_FILTER(azs) {
    let M_AZS = new Array();
    if (azs != null) {
        for (const item_AZS of azs) {
            if (item_AZS.id != 0) {
                M_AZS.push({ label: item_AZS.nm, value: item_AZS.id, code: item_AZS.ob });
            }
        }
    }

    return M_AZS;
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
function Get_Counters_PL(PL_Counter) {
    let M_Counter = new Array();
    if (PL_Counter != null && PL_Counter.cntyp != null) {
        for (const item of PL_Counter.cntyp) {
            M_Counter.push({ label: item.def.nm, value: item.typ });
        }
    }
    return M_Counter;
}
function Get_Counters_TRK(TRK_Counter) {
    let M_Counter = new Array();
    if (TRK_Counter != null && TRK_Counter.cntyp != null) {
        for (const item of TRK_Counter.cntyp) {
            M_Counter.push({ label: item.def.nm, value: item.typ });
        }
    }
    return M_Counter;
}
function Get_Counters_TCO_Main(TCO_Counter) {
    let M_Counter = new Array();
    if (TCO_Counter != null && TCO_Counter.cntyp != null) {
        for (const item of TCO_Counter.cntyp) {
            M_Counter.push({ label: item.def.nm, value: item.typ });
        }
    }
    if (TCO_Counter != null && TCO_Counter.dvctyptree != null) {
        M_Counter.push({
            label: 'устройства',
            value: 'TCO_DEVICES',
            checked: true,
            expanded: true,
            children: Get_Counters_TCO_DVC(TCO_Counter),
        })
    }
    return M_Counter;
}
function Get_Counters_TCO_DVC(TCO_Counter) {
    let M_Counter = new Array();
    if (TCO_Counter != null && TCO_Counter.dvctyptree != null) {
        for (const item of TCO_Counter.dvctyptree) {

            if (item.cntyp != null) {
                M_Counter.push({
                    label: item.nm,
                    value: item.typ,
                    checked: true,
                    expanded: true,
                    children: Get_Counters_TCO_Main(item),
                })
            } else {
                M_Counter.push({ label: item.nm, value: item.typ });
            }
        }
    }
    return M_Counter;
}

function CreatViewFILTER_Main(azs, AIs) {

    let _Data = {
        label: 'Все',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: [
            /*
            {
                label: 'виджет',
                value: 'vidget',
                expanded: true,
                children: [
                    {
                        label: 'Иконка',
                        value: 'icon_alarm'
                    },
                ]
            },*/
            {
                label: 'объекты',
                value: 'azs',
                expanded: true,
                children: GetAZS_FILTER(azs)
            },
            {
                label: 'Виды устройств',
                value: 'dvc',
                expanded: true,
                children: [{
                    label: 'Резервуары',
                    value: 'pl'
                },
                {
                    label: 'ТРК',
                    value: 'trk'
                },
                {
                    label: 'ТСО',
                    value: 'tco'
                }]
            },

            /*{
                label: 'Вид НП',
                value: 'AI',
                checked: true,
                expanded: false,
                children: Get_AI_FILTER(AIs)
            },
            {
                label: 'данные',
                value: 'data'
            },
            {
                label: 'Функции кнопки',
                value: 'F_button',
                expanded: true,
                children: [{
                    label: 'блокировка',
                    value: 'lock'
                },
                {
                    label: 'управление',
                    value: 'management'
                }]
            }*/

            {
                label: 'виджет',
                value: 'vidget',
                expanded: true,
                children: [
                    {
                        label: 'Иконка',
                        value: 'icon_alarm'
                    },
                    {
                        label: 'сервисные команда',
                        value: 'lock'
                    },
                    {
                        label: 'управление',
                        value: 'management'
                    }]
            }
        ]
    }
    return _Data;
}
function CreatViewFILTER_PL(AIs, _Counter) {

    let _Data = {
        label: 'Все',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: [
            /* {
                 label: 'Вид НП',
                 value: 'AI',
                 checked: true,
                 expanded: false,
                 children: Get_AI_FILTER(AIs)
             },*/
            {
                label: 'данные',
                value: 'AI_COUNTER',
                checked: true,
                expanded: true,
                children: Get_Counters_PL(_Counter)
            }
        ]
    }
    return _Data;
}
function CreatViewFILTER_TRK(_Counter) {

    let _Data = {
        label: 'Все',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: [
            {
                label: 'данные',
                value: 'TRK_COUNTER',
                checked: true,
                expanded: true,
                children: Get_Counters_TRK(_Counter)
            }
        ]
    }
    return _Data;
}
function CreatViewFILTER_TCO(_Counter) {

    let _Data = {
        label: 'Все',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: [
            {
                label: 'данные',
                value: 'TCO_COUNTER',
                checked: true,
                expanded: true,
                children: Get_Counters_TCO_Main(_Counter),
            }
        ]
    }
    return _Data;
}

let R1 = {
    marginTop: '120px',
    alignSelf: 'center',

}
export default class w_main_azs extends React.Component {
    constructor(props) {
        super(props);
        //this.IsCheckData = this.IsCheckData.bind(this);
        this.ShowNav = this.ShowNav.bind(this);
        this.state = {
            Rss: RSS_AZS,
            _Objects: null,

            _Azs: null,
            _Azs_Mass: null,

            List_Fields_Main: Get_Key_View_Main([{ value: 'selectAll' }]),

            List_Fields_PL: Get_Key_View_PL([{ value: 'selectAll' }], this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'pl'), true),
            List_Fields_TRK: Get_Key_View_TRK([{ value: 'selectAll' }], this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'pump'), true),

            List_Fields_TCO: Get_Key_View_TCO([{ value: 'selectAll' }], this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'tso'), true),
        }
    }
    async componentDidMount() {
        let r = await this.tick();
        this.setState({ List_Fields_Main: Get_Key_View_Main([{ value: 'selectAll' }], this.state._Azs) });
    }
    componentDidUpdate(prevProps) {
        if (this.props.Rss != prevProps.Rss) {
            this.setState({ Rss: this.props.Rss }, this.tick);
        }
    }
    async tick() {
        let rss = this.state.Rss;
        var myRequest = new Request(rss);

        try {
            var response = await fetch(myRequest,
                {
                    method: 'GET',
                    headers:
                    {
                        'Accept': 'application/json',
                    },
                }
            );
            if (response.ok) {
                const Jsons = await response.json();
                let azs = get_ZeroColumn(Jsons.obList);
                this.setState({
                    _Objects: Jsons,
                    _Azs: Jsons.obList,
                    _Azs_Mass: azs,
                    //_Azs_Mass_Filter: azs,
                });
                return Jsons;
            }
            else {
                throw Error(response.statusText);
            }
            this.setState({ isExistError: false })
        }
        catch (error) {
            this.setState({ isExistError: true })
            console.log(error);
        }
    }
    /********** ФИЛЬТРЫ ********/

    update_VIEW_Main = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ List_Fields_Main: _View_Fields });//, this.IsCheckData(this.state.List_Fields_PL, this.state.List_Fields_Main));
        } else {
            _View_Fields = Get_Key_View_Main(View_Vidg, this.state._Azs_Mass);
            this.setState({ List_Fields_Main: _View_Fields });//, this.IsCheckData(this.state.List_Fields_PL, this.state.List_Fields_Main));
        }

    }


    update_VIEW_PL = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ List_Fields_PL: _View_Fields });
        } else {
            _View_Fields = Get_Key_View_PL(View_Vidg, this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'pl'), true);
            this.setState({ List_Fields_PL: _View_Fields });
        }
    }
    update_VIEW_TRK = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ List_Fields_TRK: _View_Fields });
        } else {
            _View_Fields = Get_Key_View_TRK(View_Vidg, this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'pump'), true);
            this.setState({ List_Fields_TRK: _View_Fields });
        }
    }

    update_VIEW_TCO = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ List_Fields_TCO: _View_Fields });
        } else {
            _View_Fields = Get_Key_View_TCO(View_Vidg, this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'tso'), true);
            this.setState({ List_Fields_TCO: _View_Fields });
        }
    }

    /*
    update_Create_PL = (View_Vidg) => {
        CreatViewFILTER_PL(this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'pl'), View_Vidg);
    }
    */
    /********** ФИЛЬТРЫ ********/
    ShowNav(text) {
        //alert("Тест = " + text);
        let El = document.getElementById('tr_Nav');
        let _content = document.getElementById('content');
        if (El != null) {
            El.hidden = !El.hidden;
            let _div_M = document.getElementById('div_M');
            if (El.hidden) {
                _div_M.style.marginTop = "0px";
            } else {
                _div_M.style.marginTop = "120px";
            }
        }
    }
    render() {
        if (this.state._Azs != null) {
            let View_Filter_Main = CreatViewFILTER_Main(this.state._Azs_Mass, this.props._List_Objs.fuel);

            let PL_Counter = getDVC_Tree(this.props._List_Objs.dvctyptree, 'pl');
            let TRK_Counter = getDVC_Tree(this.props._List_Objs.dvctyptree, 'pump');
            let TCO_Counter = getDVC_Tree(this.props._List_Objs.dvctyptree, 'tso');

            let View_Filter_PL = CreatViewFILTER_PL(this.props._List_Objs.fuel, PL_Counter);
            let View_Filter_TRK = CreatViewFILTER_TRK(TRK_Counter);
            let View_Filter_TCO = CreatViewFILTER_TCO(TCO_Counter);
            /*
                        let View_Filter_PL = this.IsCheckData(
                            CreatViewFILTER_PL(this.props._List_Objs.fuel, PL_Counter),
                            this.state.List_Fields_Main, Get_Counters_PL(PL_Counter));
            */
            return (
                <div id='div_M' style={R1}>
                    <button className='btn_nav' onClick={() => this.ShowNav("this.state.PL.nm")}>^</button>
                    <nav className='Nav1'>
                        <table className="tableDevice_nav">
                            <tbody>

                                <tr id="tr_Nav">
                                    <td>
                                        {/*<div className='div_Region'>
                                            <S_Link
                                                activeClass="active" className="test0" to="test0" spy={true} smooth={true} duration={500} offset={-170}>Вверх</S_Link>
                                        </div>*/}
                                    </td>
                                    <td id='td_Left'>
                                        <FILTER text_head=''
                                            update_VIEW={this.update_VIEW_Main}
                                            dataFilter={View_Filter_Main}
                                        />
                                    </td>
                                    <td >
                                        <div className='div_Region'>
                                            <S_Link 
                                                activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} offset={-210}>резервуары</S_Link>
                                        </div>
                                    </td>

                                    <td id='td_Left'>
                                        <FILTER text_head=''
                                            update_VIEW={this.update_VIEW_PL}
                                            dataFilter={View_Filter_PL}
                                        />
                                    </td>
                                    <td>
                                        <div className='div_Region'>
                                            <S_Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500} offset={-150}>трк</S_Link>
                                        </div>
                                    </td>

                                    <td id='td_Left'>
                                        <FILTER text_head=''
                                            update_VIEW={this.update_VIEW_TRK}
                                            dataFilter={View_Filter_TRK}
                                        />
                                    </td>
                                    <td>
                                        <div className='div_Region'>
                                            <S_Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} offset={-150}>тсо</S_Link>
                                        </div>
                                    </td>

                                    <td id='td_Left'>
                                        <FILTER text_head=''
                                            update_VIEW={this.update_VIEW_TCO}
                                            dataFilter={View_Filter_TCO}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </nav>

                    <center><Element name="test0" className="element" >{this.props.header}</Element></center>
                    {/*<center >{this.props.header}</center>*/}

                    {/*
                    <hr /><hr />
                 
                    <table className="tableDevice">
                        <tbody>
                            <tr>
                                <td id='td_Left'>
                                    <FILTER text_head='Общий фильтр'
                                        update_VIEW={this.update_VIEW_Main}
                                        dataFilter={View_Filter_Main}
                                    />
                                </td>

                                <td id='td_Left'>
                                    <FILTER text_head='Резервуары'
                                        update_VIEW={this.update_VIEW_PL}
                                        dataFilter={View_Filter_PL}
                                    />
                                </td>

                                <td id='td_Left'>
                                    <FILTER text_head='ТРК'
                                        update_VIEW={this.update_VIEW_TRK}
                                        dataFilter={View_Filter_TRK}
                                    />
                                </td>
                                {
                                    <td id='td_Left'>
                                        <FILTER text_head='ТСО'
                                            update_VIEW={this.update_VIEW_TCO}
                                            dataFilter={View_Filter_TCO}
                                        />
                                    </td>
                                }
                            </tr>
                        </tbody>
                    </table>
*/}
                    <hr /><hr />

                    {this.state._Azs != null &&
                        <List_azs
                            _List_Objs={this.props._List_Objs}
                            w_Height={this.props.w_Height}
                            RSS={this.state.Rss}

                            azs={this.state._Azs}
                            azs_Mass={this.state._Azs_Mass}//{this.state._Azs_Mass_Filter}

                            PL_0={this.props.PL_0} PL_Col={this.props.PL_Col}
                            TRK_0={this.props.TRK_0} TRK_Col={this.props.TRK_Col}
                            TCO_0={this.props.TCO_0} TCO_Col={this.props.TCO_Col}

                            /* NOZZLE_0={this.props.NOZZLE_0} NOZZLE_Col={this.props.NOZZLE_Col}
                           */
                            List_Fields_Main={this.state.List_Fields_Main}
                            List_Fields_PL={this.state.List_Fields_PL}
                            List_Fields_TRK={this.state.List_Fields_TRK}
                            List_Fields_TCO={this.state.List_Fields_TCO}

                            history={this.props.history}
                        />
                    }
                </div>
            );

        } else {
            return (
                <div>
                    <center><h4>{this.props.header}</h4></center>
                    <hr /><hr />
                    <h4><center>Нет связи с сервером!!(w_main_azs)</center></h4>
                </div>
            );
        }
    }
}