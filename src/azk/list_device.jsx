import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import Azs from './azs.jsx'

import Device_PL from './Device_PL.jsx'
import Device_PUMP_Guns from './Device_PUMP_Guns.jsx'
import Device_TSO from './Device_TSO.jsx'

import { RSS, WS } from '../core/core_Function.jsx';

const _Debuge = false;

export default class list_azs extends Component {
    constructor(props) {
        super(props);
        this.Get_Device = this.Get_Device.bind(this);
        /*
        this.state = {
            id: this.props.List.id,
            List_Devce: this.props.List.dvc,
            name_azs: this.props.name,
            RSS: RSS,
            WS: WS,
        };
        */
    }
    /*
    componentDidUpdate(prevProps) {
        if (this.props.List != prevProps.List) {
            this.setState({id: this.props.List.id, List_Devce: this.props.List.dvc });
        }
        if (this.props.name != prevProps.name) {
            this.setState({ name_azs: this.props.name });
        }
    }
*/
    Get_Device(el) {
        if (el != null) {
            switch (el.typ) {
                case 'pl': return <Device_PL el={el} RSS={RSS} ListFuels={this.props.ListFuels} />;
                //case 'pump': return <Device_PUMP el={el} RSS={this.state.RSS} WS={this.state.WS} ListFuels={this.props.ListFuels}/>;
                /*case 'pump': return <Device_PUMP_Guns
                    el={el}
                    RSS={RSS}
                    WS={WS}
                    ListFuels={this.props.ListFuels} />;
                case 'tso': return <Device_TSO el={el} RSS={RSS} />;*/
                default: return null;
            }
        }
    }
    render() {
        return (
            <div>
                <center><h4>Оборудование на объекте {this.props.name_azs}</h4></center>
                <hr /> <hr />
                <ul className="hr">
                    {
                        this.props.List.map(el => (
                            <li key={'li ' + el.id}>
                                {this.Get_Device(el)}
                            </li>
                        ))
                    }
                    {_Debuge &&
                        <li>
                            <textarea value={RSS} className="te_Mess_1" />
                        </li>
                    }
                </ul>
            </div>
        );
    }
}
