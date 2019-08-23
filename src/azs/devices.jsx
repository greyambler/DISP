import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import { createGuid, Is_View_Row } from '../core/core_Function.jsx';

import { Array } from 'core-js';

import Pl from './device/pl.jsx'
import TRK from './device/trk.jsx'
import TCO_Tee from './device/tcoTree.jsx'


import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import FILTER from './filters.jsx'

const _Debuge = false;

function get_ZeroColumn_0(ValF) {
    let M = null;
    if (ValF != null) {
        M = new Array();
        M.push(ValF)
    }
    return M;
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
        label: 'Резервуары',
        value: 'selectAll',
        checked: true,
        expanded: true,
        children: Get_Trk_FILTER(trk),
    }
    return _Data;
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

export default class devices extends Component {
    constructor(props) {
        super(props);

        this.state = {
            AZS: this.props.AZS,
            id: this.props.id,

            _pl: null,
            _trk: null,
            _tco: null,
            _nozzle: null,

            PLs: null,
            Trk: null,
            Tco: null,
            Nozzle: null,

            Tree_TCO: null,
            Tree_TCO_DEVICES: null,


            TCO: null,

            List_Fields_ID_PL: Get_Key_View_ID_PL([{ value: 'selectAll' }], this.props.List_Fields_PL, this.props.PLs),
            LineZeroPL: false,

            List_Fieldss_ID_TRK: Get_Key_View_ID_TRK([{ value: 'selectAll' }], this.props.List_Fields_TRK, this.props.Trk),
            LineZeroTRK: false,
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
        }


    }
    /********** ФИЛЬТРЫ ********/

    update_VIEW_ID_PL = (View_Vidg) => {
        let _View_Fields = new Array();
        if (View_Vidg == undefined || View_Vidg.length == 0) {
            this.setState({ List_Fields_ID_PL: _View_Fields, LineZeroPL: true });
        } else {
            _View_Fields = Get_Key_View_ID_PL(View_Vidg, this.props.List_Fields_PL, this.state.PLs);
            this.setState({ List_Fields_ID_PL: _View_Fields, LineZeroPL: false });
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

    /********** ФИЛЬТРЫ ********/


    render() {




        if (this.state.AZS != null && this.state.id == 0) {
            return (
                <div >
                    <table className="Dev_TBL">
                        <tbody>
                            <tr>
                                <td>
                                    <center>{this.state.AZS.nm}</center>
                                    <hr /><hr />
                                </td>
                            </tr>
                            {
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
                                                <td key={'pl_' + createGuid()}>
                                                    <Pl PL={this.state._pl[0]}
                                                        key={'PL_' + createGuid()}
                                                        id={this.state._pl[0].id}
                                                        PL_Col={this.props.PL_Col}
                                                        List_Fields_Main={this.props.List_Fields_Main}
                                                        List_Fields_PL={this.props.List_Fields_PL}
                                                    />
                                                </td>
                                            }
                                        </td>
                                    </tr>
                                </>
                            }

                            {
                                this.state._trk != null &&
                                <>
                                    <tr>
                                        <td id='td_Left'>
                                            <center><Element name="test2" className="element" >ТРК</Element></center>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>

                                            {
                                                <td key={'trk_' + createGuid()}>
                                                    <TRK TRK={this.state._trk[0]}
                                                        key={'Trk ' + createGuid()}
                                                        id={this.state._trk[0].id}

                                                        TRK_Col={this.props.TRK_Col}

                                                        //View_Icon={this.props.View_Icon}
                                                        //View_Data={this.props.View_Data}

                                                        List_Fields_Main={this.props.List_Fields_Main}
                                                        List_Fields_TRK={this.props.List_Fields_TRK}

                                                    />

                                                </td>
                                                /*
                                            this.state._trk.map(el => (
                                                <td key={'trk_' + createGuid()}>
                                                    <TRK TRK={el}
                                                        key={'Trk ' + createGuid()}
                                                        id={el.id}
     
                                                        TRK_Col={this.props.TRK_Col}
     
                                                        View_Icon={this.props.View_Icon}
                                                        View_Data={this.props.View_Data}
     
                                                        List_Fields_Main={this.props.List_Fields_Main}
     
                                                    />
     
                                                </td>
                                                
                                            ))*/
                                            }
                                        </td>
                                    </tr>
                                </>
                            }

                            {
                                this.state.Tree_TCO != null &&
                                <tr>
                                    <td>
                                        <center ><Element name="test3" className="element" >ТСО</Element></center>
                                        {
                                            <td key={'tso_' + createGuid()}>


                                                <TCO_Tee TCO={this.state.Tree_TCO}
                                                    IsHead={true}
                                                    List_Fields_Main={this.props.List_Fields_Main}
                                                    List_Fields_TCO={this.props.List_Fields_TCO}
                                                />

                                            </td>

                                        }
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>
            );
        }
        else if (this.state.AZS != null && this.state.id != 0) {
            let View_Filter_id_pl = CreatViewFILTER_ID_PL(this.state.PLs);
            let View_Filter_id_krk = CreatViewFILTER_ID_TRK(this.state.Trk);

            return (
                <div >
                    <table className="DevS_TBL">
                        <tbody>

                            {(this.state.PLs != null && this.state.PLs.length > 0) &&
                                <tr>
                                    <td>
                                        <center>{this.state.AZS.nm}</center>
                                        <hr /><hr />
                                    </td>
                                </tr>
                            }


                            {
                                (this.state.PLs != null && this.state.PLs.length > 0) &&
                                <>
                                    <tr>
                                        <td id='td_Left'>
                                            <FILTER text_head='резервуары'
                                                update_VIEW={this.update_VIEW_ID_PL}
                                                dataFilter={View_Filter_id_pl}
                                            />
                                        </td>
                                        {/*<td><h4>Резервуары</h4></td>*/}
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
                                                        List_Fields_Main={this.props.List_Fields_Main}
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
                                                                Is_View_Row(this.state.List_Fields_ID_PL, el.id) &&

                                                                <td key={'li ' + el.id}>
                                                                    <Pl PL={el}
                                                                        fuels={this.props._List_Objs.fuel}
                                                                        key={'PL ' + el.id}
                                                                        id={el.id}
                                                                        PL_Col={this.props.PL_Col}
                                                                        DeVal={this.props.DeVal}
                                                                        _List_Objs={this.props._List_Objs}
                                                                        List_Fields_Main={this.props.List_Fields_Main}
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

                            {
                                (this.state.Trk != null && this.state.Trk.length > 0) &&
                                <>
                                    <tr>
                                        <td id='td_Left'>
                                            <FILTER text_head='ТРК'
                                                update_VIEW={this.update_VIEW_ID_TRK}
                                                dataFilter={View_Filter_id_krk}
                                            />
                                        </td>
                                        {/*<center ><h4>ТРК</h4></center>*/}
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
                                                        List_Fields_Main={this.props.List_Fields_Main}
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

                                                                < td key={'li ' + el.id} >
                                                                    <TRK TRK={el}
                                                                        fuels={this.props._List_Objs.fuel}
                                                                        key={'Trk ' + el.id}
                                                                        id={el.id}
                                                                        TRK_Col={this.props.TRK_Col}
                                                                        DeVal={this.props.DeVal}
                                                                        _List_Objs={this.props._List_Objs}
                                                                        devices={this.props.devices}
                                                                        List_Fields_Main={this.props.List_Fields_Main}
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

                                (this.state.TCO != null && this.state.TCO.length > 0) &&
                                <tr>
                                    <td id="td_tso">
                                        <center ><h4>ТСО</h4></center>
                                        {
                                            this.state.TCO.map(el => (

                                                <td key={'tso_' + el.id}>
                                                    <TCO_Tee TCO={el}
                                                        IsHead={false}
                                                        DeVal={this.props.DeVal}
                                                        dataFilter={this.props.dataFilter}
                                                        _List_Objs={this.props._List_Objs}
                                                        devices={this.props.devices}

                                                        List_Fields_Main={this.props.List_Fields_Main}
                                                        List_Fields_TCO={this.props.List_Fields_TCO}
                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
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
