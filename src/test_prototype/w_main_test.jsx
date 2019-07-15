import React, { Component, PropTypes } from 'react';

import { RSS_Tanks, RSS } from '../core/core_Function.jsx';

import W_main_nozzle from '../nozzle/w_main_nozzle.jsx';
import W_main_level from '../level/w_main_level.jsx';

import { get_PL } from '../core/core_Function.jsx';

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
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <W_main_nozzle

                                    header='Отображение данных от счетчиков'
                                    w_Width={this.props.w_Width}
                                    startDate={this.props.dateStart} endDate={this.props.dateStop}
                                    RssDate={RSS} isAZS={true} isFUEL={true}
                                    azs={this.state._Azs} fuels={this.state._Fuels}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
