import React, { Component, PropTypes } from 'react';

import { get_DateRSS, get_Rss_ID } from '../core/core_Function.jsx';

import Header from '../control/header.jsx';
import TreeDevice from '../control/treeDevice.jsx';

import List_pl from './list_pl.jsx'

const _Debuge = true;

export default class w_main_azk extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <center><h4>{this.props.header}</h4></center>
                <hr /><hr />
                <List_pl />
            </div>
        );
    }
}

/*

<Header objects={_Objects}/>

*/