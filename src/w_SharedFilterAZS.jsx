import React, { Component, PropTypes } from 'react';
import { RSS_Tanks, Get_RSS, RSS, ETALON_AZS } from './core/core_Function.jsx';
import W_main_AZS from './shared_FilterAZS/w_main_AZS.jsx';

const _Debuge = false;

export default class w_SharedFilterAZS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: 'Объекты.',
            _Object: null,
        }
    }
    componentDidMount() {
        this.tick();
    }
    async tick() {

        let rss = RSS;
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
    render() {
        //let rss = Get_RSS(RSS, this.props.dateStart, this.props.dateStop);

        return (
            <W_main_AZS _Object={this.state._Object}
                header={this.state.header} w_Width={this.props.w_Width}
                startDate={this.props.dateStart} endDate={this.props.dateStop}
            />
        );
    }
}
