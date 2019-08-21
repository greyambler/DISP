import React, { Component, PropTypes } from 'react';
import { RSS_AZS, getDVC_Tree } from '../core/core_Function.jsx';
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
        }
        if (nameView.value == 'vidget') {
            View_Fields.push('vidget');
            View_Fields.push('icon_alarm');
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
function Get_Key_View_PL(mas_Vidg, AI, PL_Counter) {
    let View_Fields = new Array();
    for (const nameView of mas_Vidg) {
        if (nameView.value == 'selectAll') {
            View_Fields.push('selectAll');
            View_Fields.push('AI');
        }
        View_Fields.push('0');
        if (nameView.value == 'AI' || nameView.value == 'selectAll') {
            View_Fields.push("fuel_all");
            if (AI != null) {
                for (const ai of AI) {
                    View_Fields.push("fuel_" + ai.id);
                }
            }
        }
        if (nameView.value == 'AI_COUNTER' || nameView.value == 'selectAll') {
            if (PL_Counter != null && PL_Counter.cntyp != null) {
                for (const item of PL_Counter.cntyp) {
                    View_Fields.push(item.typ);
                }
            }
        }
        View_Fields.push(nameView.value);
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
function Get_Counters_FILTER(PL_Counter) {
    let M_Counter = new Array();
    if (PL_Counter != null && PL_Counter.cntyp != null) {
        for (const item of PL_Counter.cntyp) {
            M_Counter.push({ label: item.def.nm, value: item.typ });
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
            {
                label: 'виджет',
                value: 'vidget',
                expanded: false,
                children: [
                    {
                        label: 'Иконка',
                        value: 'icon_alarm'
                    },
                ]
            },
            {
                label: 'объекты',
                value: 'azs',
                expanded: false,
                children: GetAZS_FILTER(azs)
            },
            /*{
                label: 'Вид НП',
                value: 'AI',
                checked: true,
                expanded: false,
                children: Get_AI_FILTER(AIs)
            },*/
            {
                label: 'данные',
                value: 'data'
            },
            {
                label: 'Функции кнопки',
                value: 'F_button',
                expanded: false,
                children: [{
                    label: 'блокировка',
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
function CreatViewFILTER_PL(AIs, pl_Counter, PLS) {

    let _Data = {
        label: 'Все',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: [
            {
                label: 'Вид НП',
                value: 'AI',
                checked: true,
                expanded: false,
                children: Get_AI_FILTER(AIs)
            },
            {
                label: 'данные',
                value: 'AI_COUNTER',
                checked: true,
                expanded: false,
                children: Get_Counters_FILTER(pl_Counter)
            }
        ]
    }
    return _Data;
}



export default class w_main_azs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Rss: RSS_AZS,
            _Objects: null,

            _Azs: null,
            _Azs_Mass: null,

            List_Fields_Main: Get_Key_View_Main([{ value: 'selectAll' }]),

            List_Fields_PL: Get_Key_View_PL([{ value: 'selectAll' }], this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'pl')),
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
            this.setState({ List_Fields_Main: _View_Fields });
        } else {
            _View_Fields = Get_Key_View_Main(View_Vidg, this.state._Azs_Mass);
            this.setState({ List_Fields_Main: _View_Fields });
        }
    }

    update_VIEW_PL = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ List_Fields_PL: _View_Fields });
        } else {
            _View_Fields = Get_Key_View_PL(View_Vidg, this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'pl'));
            this.setState({ List_Fields_PL: _View_Fields });
        }
    }
    update_Create_PL = (View_Vidg) => {
        CreatViewFILTER_PL(this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'pl'), View_Vidg);
    }
    /********** ФИЛЬТРЫ ********/

    render() {
        if (this.state._Azs != null) {
            let View_Filter_Main = CreatViewFILTER_Main(this.state._Azs_Mass, this.props._List_Objs.fuel);
            let View_Filter_PL = CreatViewFILTER_PL(this.props._List_Objs.fuel, getDVC_Tree(this.props._List_Objs.dvctyptree, 'pl'));

            return (
                <div>
                    <center >{this.props.header}</center>
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
                                        update_VIEW={this.update_VIEW_Main}
                                        dataFilter={View_Filter_Main}
                                    />
                                </td>
                                <td id='td_Left'>
                                    <FILTER text_head='ТСО'
                                        update_VIEW={this.update_VIEW_Main}
                                        dataFilter={View_Filter_Main}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

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
                            View_Filter_PL={View_Filter_PL}

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