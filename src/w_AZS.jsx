import React, { Component, PropTypes } from 'react';
import { RSS_Tanks, Get_RSS, RSS, ETALON_AZS, RSS_AZS, RSS_Type_List ,Get_Device, Get_MainHead, Get_Val} from './core/core_Function.jsx';
//import W_main_AZS from './shared_FilterAZS/w_main_AZS.jsx';

import W_main_azs from './azs/w_main_azs.jsx';


const _Debuge = false;

export default class w_AZS extends React.Component {
    constructor(props) {
        super(props);
        this.Get_FieldsPL = this.Get_FieldsPL.bind(this);
        this.Get_TCO_TREE = this.Get_TCO_TREE.bind(this);
        this.state = {
            header: 'Объекты.',
            _List_Objs: null,
            PL_0: null,
            PL_Col: null,

            TRK_0: null,
            TRK_Col: null,

            TCO_0: null,
            TCO_Col: null,

            t_TCO_0: null,
            t_TCO_Col: null,


            NOZZLE_0: null,
            NOZZLE_Col: null,

            

        }
    }
    componentDidMount() {
        this.setState({ _List_Objs: this.props._List_Objs }, this.Get_FieldsPL);
        //this.tick();

        //this.Get_FieldsPL();
    }
    componentDidUpdate(prevProps) {
        if (this.props._List_Objs != prevProps._List_Objs) {
            this.setState({ _List_Objs: this.props._List_Objs }, this.Get_FieldsPL);
        }
    }

    Get_FieldsPL() {
        let _PL_0 = new Array();
        let _PL_Col = new Array();

        let _TRK_0 = new Array();
        let _TRK_Col = new Array();

        let _TCO_0 = new Array();
        let _TCO_Col = new Array();

        let _NOZZLE_0 = new Array();
        let _NOZZLE_Col = new Array();

        let t_TCO_0 = new Array();
        let t_TCO_Val_0 = new Array();


        if (this.state._List_Objs != null) {
            for (const iterator of this.state._List_Objs.tpList) {
                if (iterator.typ == 'pl') {
                    for (const Item in iterator) {
                        if (Item == 'id') {
                            _PL_0[Item] = 0;
                        }
                        if (Item == 'nm' || Item == 'typ') {
                            _PL_0[Item] = iterator[Item];

                        }
                        if (Item != 'cntyp' && Item != 'id' && Item != 'typ')
                            _PL_Col.push(Item);
                    }
                    for (const key of iterator.cntyp) {
                        _PL_0[key.typ] = key.def.nm;
                        _PL_Col.push(key.typ);
                    }
                }

                if (iterator.typ == 'pump') {
                    for (const Item in iterator) {
                        if (Item == 'id') {
                            _TRK_0[Item] = 0;
                        }
                        if (Item == 'nm' || Item == 'typ') {
                            _TRK_0[Item] = iterator[Item];

                        }
                        if (Item != 'cntyp' && Item != 'id' && Item != 'typ')
                            _TRK_Col.push(Item);
                    }
                    for (const key of iterator.cntyp) {

                        _TRK_0[key.typ] = key.def.nm;
                        _TRK_Col.push(key.typ);
                    }
                }

                if (iterator.typ == 'tso') {
                    for (const Item in iterator) {
                        if (Item == 'id') {
                            _TCO_0[Item] = 0;
                        }
                        if (Item == 'nm' || Item == 'typ') {
                            _TCO_0[Item] = iterator[Item];

                        }
                        if (Item != 'cntyp' && Item != 'id' && Item != 'typ')
                            _TCO_Col.push(Item);
                    }

                }

                if (iterator.typ == 'nozzle') {
                    for (const Item in iterator) {
                        if (Item == 'id') {
                            _NOZZLE_0[Item] = 0;
                        }
                        if (Item == 'nm' || Item == 'typ') {
                            _NOZZLE_0[Item] = iterator[Item];

                        }
                        if (Item != 'cntyp' && Item != 'id' && Item != 'typ')
                            _NOZZLE_Col.push(Item);
                    }
                    for (const key of iterator.cntyp) {
                        _NOZZLE_0[key.typ] = key.def.nm;
                        _NOZZLE_Col.push(key.typ);
                    }
                }
            }
            for (const iterator of this.state._List_Objs.dvctyptree) {
                if (iterator.typ == 'tso') {
                    for (const Item in iterator) {
                        if (Item == 'id') {
                            t_TCO_0[Item] = 0;
                        }
                        if (Item == 'nm' || Item == 'typ') {
                            t_TCO_0[Item] = iterator[Item];

                        }
                        if (Item != 'cntyp' && Item != 'id' && Item != 'typ' && Item != 'dvctyptree')
                            t_TCO_Val_0.push(Item);
                    }
                    for (const key of iterator.cntyp) {
                        t_TCO_0[key.typ] = key.def.nm;
                        t_TCO_Val_0.push(key.typ);
                    }

                    for (const Item_DVC of iterator.dvctyptree) {
                        for (const item in Item_DVC) {
                            if (item == 'id') {
                                t_TCO_0[item + '_' + Item_DVC['typ']] = Item_DVC[item];//'001';//
                            } else {

                                t_TCO_0[item + '_' + Item_DVC['typ']] = Item_DVC[item];
                            }
                            if (item != 'cntyp')//  && item != 'typ' && item != 'id')
                                t_TCO_Val_0.push(item + '_' + Item_DVC['typ']);
                        }
                    }
                    let r = 0;
                }
            }



            this.setState({
                PL_0: _PL_0, PL_Col: _PL_Col,
                TRK_0: _TRK_0, TRK_Col: _TRK_Col,
                //TCO_0: _TCO_0, 
                //TCO_Col: _TCO_Col,

                //TCO_0: t_TCO_0,
                //TCO_Col: t_TCO_Val_0,


                NOZZLE_0: _NOZZLE_0, NOZZLE_Col: _NOZZLE_Col
            }, this.Get_TCO_TREE);
        }
    }

    Get_TCO_TREE() {
        if (this.state._List_Objs != null && this.state._List_Objs.dvctyptree != undefined) {
            for (const iterator of this.state._List_Objs.dvctyptree) {
                if (iterator.typ == 'tso') {

                    let TSO_ALL = new Array();

                    let TCO = iterator;

                    let Tso_Main = Get_MainHead(TCO);
                    let DEVICES = new Array();
                    for (const item of TCO.dvctyptree) {
                        DEVICES.push(Get_MainHead(item));
                    }
                    TSO_ALL.push(Tso_Main);
                    TSO_ALL.push(DEVICES);
                    this.setState({ TCO_0: TSO_ALL });
                }
            }
        }

    }


    render() {
        if (this.state._List_Objs != null) {
            return (
                <W_main_azs
                    header={this.state.header} w_Width={this.props.w_Width} w_Height={this.props.w_Height}
                    startDate={this.props.dateStart} endDate={this.props.dateStop}
                    PL_0={this.state.PL_0} PL_Col={this.state.PL_Col}

                    TRK_0={this.state.TRK_0} TRK_Col={this.state.TRK_Col}

                    TCO_0={this.state.TCO_0} TCO_Col={this.state.TCO_Col}

                    NOZZLE_0={this.state.NOZZLE_0} NOZZLE_Col={this.state.NOZZLE_Col}

                    _List_Objs={this.props._List_Objs}
                />
            );
        } else {
            return (
                <div>
                    <center><h4>{this.props.header}</h4></center>
                    <hr /><hr />
                    <h4><center>Нет связи с сервером!!(w_AZS)</center></h4>
                </div>
            );
        }
    }
}
