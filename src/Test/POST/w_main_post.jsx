import React, { Component, PropTypes } from 'react';

//import Post from './MyComponent.jsx';

import { RSS_Tanks, RSS } from '../../core/core_Function.jsx';


import W_main_nozzle from '../../nozzle/w_main_nozzle.jsx';
import W_main_level from '../../level/w_main_level.jsx';
import W_main_trk from '../../trk/w_main_trk.jsx';
import W_main_tco from '../../tco/w_main_tco.jsx';
import { get_PL } from '../../core/core_Function.jsx';
import FILTER from './filters.jsx'



import Post from './Onle_Need.jsx';

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

//import './MyComponent.css';

const _Debuge = true;


export default class w_main_post extends React.Component {
    myRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('Отправленное имя: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        if (_Debuge) {

            return (
                <div>
                    <h1><center>{this.props.header}</center></h1>
                    <hr /><hr />
                    <Post />
                    <hr /><hr />

                </div>
            );

        } else {
            return (
                <div>
                    <center><h4>{this.props.header}</h4></center>
                    <hr /><hr />

                    <FILTER
                        data={this.state._Object}
                        update_Fuels={this.update_Fuels}
                        update_Azs={this.update_Azs}
                    />
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
                            <W_main_level
                                header='Отображение данных от уровнемеров'
                                w_Width={this.props.w_Width}
                                startDate={this.props.dateStart} endDate={this.props.dateStop}
                                Rss={RSS_Tanks} isAZS={true} isFUEL={true}
                                azs={this.state._Azs} fuels={this.state._Fuels}
                                isHiFilter={true}
                            />
                        </Element>
                        <Element name="e2" style={{
                            marginBottom: this.props.w_Height,
                        }}>
                            <W_main_trk
                                header='Отображение данных с ТРК'
                                w_Width={this.props.w_Width}
                                startDate={this.props.dateStart} endDate={this.props.dateStop}
                                RssDate={RSS} isAZS={true} isFUEL={true}
                                azs={this.state._Azs} fuels={this.state._Fuels}
                                isHiFilter={true}
                            />
                        </Element>
                        <Element name="e3" style={{
                            marginBottom: this.props.w_Height,
                        }}>
                            <W_main_tco
                                header='Отображение данных с ТСО'
                                w_Width={this.props.w_Width}
                                startDate={this.props.dateStart} endDate={this.props.dateStop}
                                RssDate={RSS} isAZS={true} isFUEL={true}
                                azs={this.state._Azs} fuels={this.state._Fuels}
                                isHiFilter={true}
                            />
                        </Element>
                    </Element>
                    <hr /><hr />
                </div>
            );
        }
    }
}





/*
    render() {
        return (
            <div>
                <h1><center>{this.props.header}</center></h1>
                <hr /><hr />
                <Post />
                <hr /><hr />

            </div>
        );
    }
}



        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Имя:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Отправить" />
            </form>
        );

        <button className="Def_button" onClick={this.stop_ws}>стоп</button>
        return (
            <div>
                <h1><center>Тест POST</center></h1>

                <table height='70px'>
                    <tbody>
                        <tr>
                            <td width='70'>
                                <input type="submit" className="Def_button" value="Отправить" />
                            </td>
                            <td width='70'>
                                <input type="submit" className="Def_button" value="CFG" />
                            </td>
                            <td width='70'>
                                <input type="submit" className="Def_button" value="DATA" />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <form>
                    <label>
                        Имя:
                            <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Отправить" />
                </form>

            </div>
        );

    }
}
*/