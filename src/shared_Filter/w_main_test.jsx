import React, { Component, PropTypes } from 'react';

import { RSS_Tanks, RSS , get_PL, AZS_s} from '../core/core_Function.jsx';

import W_main_nozzle from '../nozzle/w_main_nozzle.jsx';
import W_main_level from '../level/w_main_level.jsx';
import W_main_trk from '../trk/w_main_trk.jsx';
import W_main_tco from '../tco/w_main_tco.jsx';

import FILTER from './filters.jsx'



const _Debuge = false;

export default class w_main_test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _Fuels: null,
            _Azs: null,
            Rss: this.props.Rss,
            _Object: null,
        }
    }
    componentDidMount() {
        if (_Debuge) {
            this.setState({ _Object: get_PL().pl });
        } else {
            this.tick();
            this.tick_azs();
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
                this.setState({ _Object: Jsons });
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
    async tick_azs() {
        let rss = {AZS_s};
        var myRequest = new Request(rss.AZS_s);
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
                this.setState({ _Object: Jsons });
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
    update_Fuels = (Fuels) => {
        this.setState({ _Fuels: Fuels });
    }
    update_Azs = (Azs) => {
        this.setState({ _Azs: Azs });
    }

    render() {

        return (
            <div>
                <center><h4>{this.props.header}</h4></center>
                <hr /><hr />
                <hr /><hr />
                <FILTER
                    data={this.state._Object}
                    update_Fuels={this.update_Fuels}
                    update_Azs={this.update_Azs}
                />
                <hr /><hr />
                <table>
                    <tbody>
                        <tr >
                            <td>
                                <W_main_level
                                    header='Отображение данных от уровнемеров'
                                    w_Width={this.props.w_Width}
                                    startDate={this.props.dateStart} endDate={this.props.dateStop}
                                    Rss={RSS_Tanks} isAZS={true} isFUEL={true}
                                    azs={this.state._Azs} fuels={this.state._Fuels}
                                    isHiFilter={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <W_main_trk
                                    header='Отображение данных с ТРК'
                                    w_Width={this.props.w_Width}
                                    startDate={this.props.dateStart} endDate={this.props.dateStop}
                                    RssDate={RSS} isAZS={true} isFUEL={true}
                                    azs={this.state._Azs} fuels={this.state._Fuels}
                                    isHiFilter={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <W_main_tco
                                    header='Отображение данных с ТСО'
                                    w_Width={this.props.w_Width}
                                    startDate={this.props.dateStart} endDate={this.props.dateStop}
                                    RssDate={RSS} isAZS={true} isFUEL={true}
                                    azs={this.state._Azs} fuels={this.state._Fuels}
                                    isHiFilter={true}
                                />
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        );
    }
}
