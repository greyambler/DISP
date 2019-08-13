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
import FILTER_AF from './filtersAF.jsx'

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


export default class w_main_azs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Rss: RSS_AZS,
            _Objects: null,
            _Azs: null,
            _Azs_Mass: null,

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
                this.setState({
                    _Objects: Jsons,
                    _Azs: Jsons.obList,
                    _Azs_Mass: get_ZeroColumn(Jsons.obList)
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


    render() {
        if (this.state._Azs != null) {
            return (
                <div>
                    <center >{this.props.header}</center>

                    <hr /><hr />

                    {this.state._Azs != null &&
                        <List_azs

                            _List_Objs={this.props._List_Objs}

                            w_Height={this.props.w_Height}
                            RSS={this.state.Rss}
                            azs={this.state._Azs}
                            azs_Mass={this.state._Azs_Mass}

                            PL_0={this.props.PL_0} PL_Col={this.props.PL_Col}
                            TRK_0={this.props.TRK_0} TRK_Col={this.props.TRK_Col}

                            TCO_0={this.props.TCO_0} TCO_Col={this.props.TCO_Col}
                            
                            NOZZLE_0={this.props.NOZZLE_0} NOZZLE_Col={this.props.NOZZLE_Col}
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