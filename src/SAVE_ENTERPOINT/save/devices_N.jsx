import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { WS } from '../core/core_Function.jsx';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import { Array } from 'core-js';

import Pl from './device/pl.jsx'
import TRK from './device/trk.jsx'
import TCO from './device/tco.jsx'
import NOZZLE from './device/nozzle.jsx'

const _Debuge = false;

function get_ZeroColumn_0(ValF) {
    let M = null;
    if (ValF != null) {
        M = new Array();
        M.push(ValF)
    }
    return M;
}

export default class devices_N extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

            value: ''
        }
    }
    
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('Отправленное имя: ' + this.state.value);
        event.preventDefault();
    }
    componentDidMount() {
        this.setState({ _pl: get_ZeroColumn_0(this.props.PL_0) });
        this.setState({ _trk: get_ZeroColumn_0(this.props.TRK_0) });
        this.setState({ _tco: get_ZeroColumn_0(this.props.TCO_0) });
        this.setState({ _nozzle: get_ZeroColumn_0(this.props.NOZZLE_0) });

        this.setState({
            PLs: this.props.PLs, Trk: this.props.Trk,
            Tco: this.props.Tco, Nozzle: this.props.Nozzle
        });
    }
    componentDidUpdate(prevProps) {
        if (this.props.id != prevProps.id) {
            this.setState({ id: this.props.id });
        }
        if (this.props.AZS != prevProps.AZS) {
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
    }

    render() {
        if (this.state.AZS != null && this.state.id == 0) {
            if (_Debuge) {
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
                                            <center ><h4>Резервуары</h4></center>
                                            {
                                                this.state._pl.map(el => (
                                                    <td key={'li ' + el.id}>
                                                        <Pl PL={el}
                                                            key={'PL ' + el.id}
                                                            id={el.id}
                                                            View_Icon={true}
                                                            View_Data={true}

                                                            PL_Col={this.props.PL_Col}
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
                                            <center ><h4>ТРК</h4></center>
                                            {
                                                this.state._trk.map(el => (
                                                    <td key={'li ' + el.id}>
                                                        <TRK TRK={el}
                                                            key={'Trk ' + el.id}
                                                            id={el.id}
                                                            View_Icon={true}
                                                            View_Data={true}

                                                            TRK_Col={this.props.TRK_Col}
                                                        />
                                                    </td>
                                                ))
                                            }
                                        </td>
                                    </tr>
                                }

                                {this.state._tco != null &&
                                    <tr>
                                        <td>
                                            <center ><h4>ТСО</h4></center>
                                            {
                                                this.state._tco.map(el => (
                                                    <td key={'li ' + el.id}>
                                                        <TCO TCO={el}
                                                            key={'Tco ' + el.id}
                                                            id={el.id}
                                                            View_Icon={true}
                                                            View_Data={true}

                                                            TCO_Col={this.props.TCO_Col}
                                                        />
                                                    </td>
                                                ))
                                            }
                                        </td>
                                    </tr>
                                }

                                {this.state._nozzle != null &&
                                    <tr>
                                        <td>
                                            <center ><h4>Пистолеты</h4></center>
                                            {
                                                this.state._nozzle.map(el => (
                                                    <td key={'li ' + el.id}>
                                                        <NOZZLE NOZZLE={el}
                                                            key={'PL ' + el.id}
                                                            id={el.id}
                                                            View_Icon={true}
                                                            View_Data={true}

                                                            NOZZLE_Col={this.props.NOZZLE_Col}
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
            }
            else {
                return (
                    <div width='100%'>
                        <center><h4>{this.props.header}</h4></center>
                        <hr /><hr />
                        <center>
                            <table className="Link_El">
                                <tbody>
                                    <tr>
                                        <td><center><Link className="Def_button_Linc" activeClass="active" to="e1" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '2px' }}>Отображение данных от уровнемеров</Link></center></td>
                                        <td><center><Link className="Def_button_Linc" activeClass="active" to="e2" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '2px' }}>Отображение данных с ТРК </Link></center></td>
                                        <td><center><Link className="Def_button_Linc" activeClass="active" to="e3" spy={true} smooth={true} duration={250} containerId="containerElement" style={{ display: 'inline-block', margin: '2px' }}>Отображение данных с ТСО </Link></center></td>
                                    </tr>
                                </tbody>
                            </table>
                        </center>

                        <Element name="test7" className="element" id="containerElement" style={{

                            position: 'relative',
                            height: this.props.w_Height,
                            overflow: 'scroll',
                            marginBottom: '10px'
                        }}>
                            <Element name="e1" style={{
                                marginBottom: this.props.w_Height,
                            }}>
                                {this.state._pl != null &&

                                    this.state._pl.map(el => (
                                        <Pl
                                            PL={el}
                                            key={'PL ' + el.id}
                                            id={el.id}
                                            View_Icon={true}
                                            View_Data={true}

                                            PL_Col={this.props.PL_Col}

                                            isHiFilter={true}
                                        />
                                    ))

                                }
                            </Element>

                            <Element name="e2" style={{
                                marginBottom: this.props.w_Height,
                            }}>
                                {this.state._trk != null &&

                                    this.state._trk.map(el => (
                                        <TRK
                                            TRK={el}
                                            key={'Trk ' + el.id}
                                            id={el.id}
                                            View_Icon={true}
                                            View_Data={true}

                                            TRK_Col={this.props.TRK_Col}
                                            isHiFilter={true}
                                        />
                                    ))

                                }
                            </Element>
                            <Element name="e3" style={{
                                marginBottom: this.props.w_Height,
                            }}>
                                {this.state._tco != null &&

                                    this.state._tco.map(el => (
                                        <TCO
                                            TCO={el}
                                            key={'Tco ' + el.id}
                                            id={el.id}
                                            View_Icon={true}
                                            View_Data={true}

                                            TCO_Col={this.props.TCO_Col}
                                            isHiFilter={true}
                                        />))

                                }
                            </Element>
                        </Element>
                        <hr /><hr />
                    </div>
                );

            }
        }
        else {
            return <br />;
        }
    }
}
