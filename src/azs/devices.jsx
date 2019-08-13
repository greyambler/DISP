import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { WS } from '../core/core_Function.jsx';

import { Array } from 'core-js';

import Pl from './device/pl.jsx'
import TRK from './device/trk.jsx'
import TCO from './device/tco.jsx'
import TCO_Tee from './device/tcoTree.jsx'

import NOZZLE from './device/nozzle.jsx'

import FILTER_F from './filtersF.jsx'


import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const _Debuge = false;


function get_ZeroColumn_0(ValF) {
    let M = null;
    if (ValF != null) {
        M = new Array();
        M.push(ValF)
    }
    return M;
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
        }
        if (this.props.Trk != prevProps.Trk) {
            this.setState({ Trk: this.props.Trk });
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
                            {this.state._pl != null &&
                                <tr>
                                    <td>
                                        <center><Element name="test1" className="element" >Резервуары</Element></center>
                                        {
                                            this.state._pl.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <Pl PL={el}
                                                        key={'PL ' + el.id}
                                                        id={el.id}

                                                        PL_Col={this.props.PL_Col}

                                                        View_Icon={this.props.View_Icon}
                                                        View_Data={this.props.View_Data}

                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            }

                            {this.state._trk != null &&
                                <tr>
                                    <td>
                                        <center><Element name="test2" className="element" >ТРК</Element></center>
                                        {
                                            this.state._trk.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <TRK TRK={el}
                                                        key={'Trk ' + el.id}
                                                        id={el.id}

                                                        TRK_Col={this.props.TRK_Col}

                                                        View_Icon={this.props.View_Icon}
                                                        View_Data={this.props.View_Data}


                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            }

                            {this.state.Tree_TCO != null &&
                                <tr>
                                    <td>
                                        <center ><Element name="test3" className="element" >ТСО</Element></center>
                                        {
                                            <td>
                                                <TCO_Tee TCO={this.state.Tree_TCO}
                                                    IsHead={true}
                                                    View_Icon={this.props.View_Icon}
                                                    View_Data={this.props.View_Data}

                                                />
                                            </td>
                                            /*
                                                                                          this.state._tco.map(el => (
                                              
                                                                                              <td key={'li ' + el.id}>
                                                                                                  <TCO TCO={el}
                                                                                                      key={'Tco ' + el.id}
                                                                                                      id={el.id}
                                              
                                                                                                      TCO_Col={this.props.TCO_Col}
                                              
                                                                                                      View_Icon={this.props.View_Icon}
                                                                                                      View_Data={this.props.View_Data}
                                              
                                                                                                  />
                                                                                              </td>
                                              
                                                                                          ))
                                         */
                                        }
                                    </td>
                                </tr>
                            }

                            {/*this.state._nozzle != null &&
                                <tr>
                                    <td>
                                        <center ><h4>Пистолеты</h4></center>
                                        {
                                            this.state._nozzle.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <NOZZLE NOZZLE={el}
                                                        key={'PL ' + el.id}
                                                        id={el.id}

                                                        NOZZLE_Col={this.props.NOZZLE_Col}

                                                        View_Icon={this.props.View_Icon}
                                                        View_Data={this.props.View_Data}

                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            */}

                        </tbody>
                    </table>
                </div>
            );
        }
        else if (this.state.AZS != null && this.state.id != 0) {
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

                            {(this.state.PLs != null && this.state.PLs.length > 0) &&
                                <>
                                    <tr>
                                        <td>
                                            <center ><h4>Резервуары</h4></center>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td >
                                            {
                                                this.state.PLs.map(el => (
                                                    <td key={'li ' + el.id}>
                                                        <Pl PL={el}
                                                            fuels={this.props._List_Objs.fuel}
                                                            key={'PL ' + el.id}
                                                            id={el.id}

                                                            PL_Col={this.props.PL_Col}
                                                            DeVal={this.props.DeVal}

                                                            View_Icon={this.props.View_Icon}
                                                            View_Data={this.props.View_Data}

                                                            _List_Objs={this.props._List_Objs}
                                                        />
                                                    </td>
                                                ))
                                            }
                                        </td>
                                    </tr>
                                </>
                            }

                            {(this.state.Trk != null && this.state.Trk.length > 0) &&
                                <tr>
                                    <td>
                                        <center ><h4>ТРК</h4></center>
                                        {
                                            this.state.Trk.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <TRK TRK={el}
                                                        fuels={this.props._List_Objs.fuel}
                                                        key={'Trk ' + el.id}
                                                        id={el.id}

                                                        TRK_Col={this.props.TRK_Col}
                                                        DeVal={this.props.DeVal}

                                                        View_Icon={this.props.View_Icon}
                                                        View_Data={this.props.View_Data}

                                                        _List_Objs={this.props._List_Objs}

                                                        devices={this.props.devices}
                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            }

                            {(this.state.TCO != null && this.state.TCO.length > 0) &&
                                <tr>
                                    <td id="td_tso">
                                        <center ><h4>ТСО</h4></center>
                                        {
                                            this.state.TCO.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <TCO_Tee TCO={el}
                                                        IsHead={false}
                                                        View_Icon={this.props.View_Icon}
                                                        View_Data={this.props.View_Data}

                                                        DeVal={this.props.DeVal}
                                                    />
                                                </td>
                                            ))
                                            /*
                                              this.state.Tco.map(el => (
                                                      <td key={'li ' + el.id}>
                                                <TCO TCO={el}
                                                    fuels={this.props._List_Objs.fuel}
                                                    key={'Tco ' + el.id}
                                                    id={el.id}
    
                                                    TCO_Col={this.props.TCO_Col}
                                                    DeVal={this.props.DeVal}
    
                                                    View_Icon={this.props.View_Icon}
                                                    View_Data={this.props.View_Data}
    
                                                    _List_Objs={this.props._List_Objs}
    
                                                />
                                            </td>
                                            ))
                                             */
                                        }
                                    </td>
                                </tr>
                            }

                            {/*(this.state.Nozzle != null && this.state.Nozzle.length > 0) &&
                                <tr>
                                    <td>
                                        <center ><h4>Пистолеты</h4></center>
                                        {
                                            this.state.Nozzle.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <NOZZLE NOZZLE={el}
                                                        fuels={this.props._List_Objs.fuel}
                                                        key={'NOZZLE ' + el.id}
                                                        id={el.id}

                                                        NOZZLE_Col={this.props.NOZZLE_Col}
                                                        DeVal={this.props.DeVal}

                                                        View_Icon={this.props.View_Icon}
                                                        View_Data={this.props.View_Data}

                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            */}

                        </tbody>
                    </table>
                </div>
            );
        } else {
            return <br />;
        }
    }

}
