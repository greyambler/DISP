import React, { Component, PropTypes } from 'react';

import {
    RSS_AZS,
    get_DateRSS, get_Rss_ID, get_PL,
    IsExistAZS, get_ETALON_AZS, get_Mas_MAS_S,
    compare_storage_space, compare_azs
} from '../core/core_Function.jsx';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Header from '../control/header.jsx';
import TreeDevice from '../control/treeDevice.jsx';

import List_azs from './list_azs.jsx'

import moment from 'moment';
//import FILTER_AF from './filtersAF.jsx'

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
function get_Mass_View(mas_Vidg, ASZ_M) {
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
        /*
        if (nameView.value == 'azs') {
            View_Fields.push('azs');
            if (ASZ_M != null) {
                for (const iterator of ASZ_M) {
                    View_Fields.push(iterator.id);
                }
            }
        }
        if (ASZ_M != null) {
            for (const iterator of ASZ_M) {
                View_Fields.push(iterator.id);
            }
        }*/

       /* if (nameView.value == 'selectAll') {
            View_Fields.push('vidget');

            View_Fields.push("azs");

            View_Fields.push('data');

            View_Fields.push('icon_alarm');
            View_Fields.push('status_alarm');
            View_Fields.push('state_alarm');

            View_Fields.push('pump');
            View_Fields.push('Counter_Curent');
            View_Fields.push('fuel');
            View_Fields.push('nozzle');
            View_Fields.push('date');
            View_Fields.push('time');
            View_Fields.push('status');
            View_Fields.push('state');
        }

        if (nameView.value == 'vidget') {
            View_Fields.push('vidget');
            View_Fields.push('icon_alarm');
            View_Fields.push('status_alarm');
            View_Fields.push('state_alarm');
        }


        if (nameView.value == 'data') {
            View_Fields.push('data');
            View_Fields.push('pump');
            View_Fields.push('Counter_Curent');
            View_Fields.push('fuel');
            View_Fields.push('nozzle');
            View_Fields.push('date');
            View_Fields.push('time');
            View_Fields.push('status');
            View_Fields.push('state');
        }

        if (nameView.value == 'icon_alarm') { View_Fields.push('icon_alarm'); }
        if (nameView.value == 'status_alarm') { View_Fields.push('status_alarm'); }
        if (nameView.value == 'state_alarm') { View_Fields.push('state_alarm'); }
        if (nameView.value == 'pump') { View_Fields.push('pump'); }
        if (nameView.value == 'Counter_Curent') { View_Fields.push('Counter_Curent'); }
        if (nameView.value == 'fuel') { View_Fields.push('fuel'); }
        if (nameView.value == 'nozzle') { View_Fields.push('nozzle'); }
        if (nameView.value == 'date') { View_Fields.push('date'); }
        if (nameView.value == 'time') { View_Fields.push('time'); }
        if (nameView.value == 'status') { View_Fields.push('status'); }
        if (nameView.value == 'state') { View_Fields.push('state'); }
    */}

    return View_Fields;
}
function Delete_Azs(data, dataF) {
    var indices = [];
    if (data != null && dataF != null) {
        var indices = [];
        let t = 0;
        for (let index = 0; index < data.length; index++) {

            if (dataF.indexOf(data[index].azs.toUpperCase()) == -1) {
                indices[t] = data[index];
                t++;
            }
        }
    }
    return indices;
}
function get_VTree_LEVEL(azs) {

    let _Data = {
        label: 'Выбрать все',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: [
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
            },
            {
                label: 'объекты',
                value: 'azs',
                expanded: true,
                children: []
            },
            {
                label: 'данные',
                value: 'data'
            }
            /*,
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
        ]
    }
    if (azs != null) {
        for (const item_Filter of _Data.children) {
            if (item_Filter.value == 'azs') {
                for (const iterator of azs) {
                    if (iterator.id != 0) {
                        item_Filter.children.push({ label: iterator.nm, value: iterator.id, code: iterator.ob });
                    }
                }
            }
        }
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
            View_Fields: get_Mass_View([{ value: 'selectAll' }]),
            _Azs_Mass_Filter: null,
        }
    }
    componentDidMount() {
        this.tick();
    }
    componentDidUpdate(prevProps) {
        if (this.props.Rss != prevProps.Rss) {
            this.setState({ Rss: this.props.Rss }, this.tick);
        }
        if (this.props.azs != prevProps.azs) {
            this.setState({ _Azs: this.props.azs }, this.SetFilters);
        }
        if (this.props.fuels != prevProps.fuels) {
            this.setState({ _Fuels: this.props.fuels }, this.SetFilters);
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
                    _Azs_Mass_Filter: azs,
                });
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

    update_VV_TREE = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ View_Fields: _View_Fields });
        } else {
            let _view_Icon = false;
            let _view_Data = false;
            _View_Fields = get_Mass_View(View_Vidg, this.state._Azs_Mass);
            this.setState({ View_Fields: _View_Fields });
        }
        let _AZS = new Array();
        let isAzs = false;

        for (const it_View_Vidg of View_Vidg) {
            if (it_View_Vidg.value == 'azs') {
                isAzs = true;
                this.setState({ _Azs_Mass_Filter: this.state._Azs_Mass });
            } else if (it_View_Vidg.value == "selectAll") {
                isAzs = true;
                this.setState({ _Azs_Mass_Filter: this.state._Azs_Mass });
            } else {
                for (const azs of this.state._Azs_Mass) {
                    if (azs.id == it_View_Vidg.value) {
                        if (_AZS.length == 0) {
                            for (const azs of this.state._Azs_Mass) {
                                if (azs.id == 0) {
                                    isAzs = true;
                                    _AZS.push(azs);
                                    break;
                                }
                            }
                        }
                        _AZS.push(azs);
                    }
                }
                if (_AZS.length > 0) {
                    this.setState({ _Azs_Mass_Filter: _AZS });
                }
            }
        }
        if (!isAzs) {
            for (const azs of this.state._Azs_Mass) {
                if (azs.id == 0) {
                    isAzs = true;
                    _AZS.push(azs);
                    this.setState({ _Azs_Mass_Filter: _AZS });
                    break;
                }
            }
        }
    }

    update_Azs = (Azs) => {
        this.setState({ _Azs: Azs }, this.SetFilters);
    }
    SetFilters() {
        this.setState({ _Trk: null });
        let _trk;

        if (this.state._Azs != null) {
            _trk = Delete_Azs(_trk, this.state._Azs);
        }
        this.setState({ _Trk: _trk });
    }

    /********** ФИЛЬТРЫ ********/

    render() {
        if (this.state._Azs != null) {

            let _TRK_Filter = null;//this.state._Trk.sort(compare_azs);

            let dataFilter = get_VTree_LEVEL(this.state._Azs_Mass);
            return (
                <div>
                    <center >{this.props.header}</center>

                    <hr /><hr />
                    <table className="tableDevice">
                        <tbody>
                            <tr>
                                <td >
                                    <center>
                                        <FILTER
                                            update_VV_TREE={this.update_VV_TREE}
                                            //trk={_TRK_Filter}
                                            //all_azs={this.state._Azs_Mass}
                                            //update_Azs={this.update_Azs}

                                            dataFilter={dataFilter}
                                        />
                                    </center>
                                </td>
                                <td >
                                    <center ><h4>АЗК</h4></center>
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
                            azs_Mass={this.state._Azs_Mass_Filter}

                            PL_0={this.props.PL_0} PL_Col={this.props.PL_Col}
                            TRK_0={this.props.TRK_0} TRK_Col={this.props.TRK_Col}

                            TCO_0={this.props.TCO_0} TCO_Col={this.props.TCO_Col}

                            NOZZLE_0={this.props.NOZZLE_0} NOZZLE_Col={this.props.NOZZLE_Col}



                            View_Fields={this.state.View_Fields}

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

/*
<FILTER_AF
                        fuels={this.props._List_Objs.fuel}
                        azs={this.state._Azs}
                        update_Fuels={this.update_Fuels}
                        update_Azs={this.update_Azs}
                    />
*/