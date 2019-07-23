import React, { Component, PropTypes } from 'react';
import { RSS_Tanks, Get_RSS, RSS , ETALON_AZS} from './core/core_Function.jsx';
import W_main_level from './shared_Filter/w_main_test.jsx';

const _Debuge = false;

export default class w_SharedFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: 'Тестовый прототип.',
        }
    }
    
    render() {
        //let rss = Get_RSS(RSS, this.props.dateStart, this.props.dateStop);

        return (
            <W_main_level
                header={this.state.header} w_Width={this.props.w_Width}
                startDate={this.props.dateStart} endDate={this.props.dateStop}
                Rss={RSS} 
            />
        );
    }
}
