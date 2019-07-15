import React, { Component } from 'react';
import { get_FUEL, get_Objs, get_Status, get_State, get_Text_Status_PL } from '../core/core_Function.jsx';

//import W_CheckBox from '../control/viewListCheckBox.jsx';
import W_CheckBox from '../control/w_List_ChBox.jsx';

//import moment from 'moment';
//import { Array } from 'core-js';


const _Debuge = false;



export default class list_pl extends Component {
    constructor(props) {
        super(props);

        this.Get_AZS = this.Get_AZS.bind(this);
        this.state = {
            //PL: this.props._PL,
            azs: null,
            ai: null,
            status: null,
            state: null,
        }
    }
    componentDidMount() {
        this.Get_AZS(this.props.pls);
    }

    Get_AZS(data) {
        if (_Debuge) {
            let _AZS = new Array();
            let _AI = new Array();
            let _TUS = new Array();
            let _TE = new Array();


            let t = 0;
            let _Objs = get_Objs();
            for (let iterator of _Objs.obList) {
                _AZS[t] = { value: iterator.name, label: iterator.name };
                t++;
            }
            t = 0;
            let _Fuels = get_FUEL();
            for (let iterator of _Fuels.fuel) {
                _AI[t] = { value: iterator.name, label: iterator.name };
                t++;
            }

            t = 0;
            let _Status = get_Status();
            for (let iterator of _Status.status) {
                _TUS[t] = { value: iterator.name, label: iterator.name, code: iterator.code };
                t++;
            }
            t = 0;
            let _State = get_State();
            for (let iterator of _State.state) {
                _TE[t] = { value: iterator.code, label: iterator.name };
                t++;
            }

            this.setState({ azs: _AZS, ai: _AI, status: _TUS, state: _TE });
        } else {
            if (data != null) {
                let _azs = new Array();
                let _AZS = new Array();

                let _ai = new Array();
                let _AI = new Array();

                let _tus = new Array();
                let _TUS = new Array();

                let _te = new Array();
                let _TE = new Array();


                let t = 0;
                let i = 0;
                let r = 0;
                let s = 0;
                for (let iterator of data) {
                    if (iterator.azs != 'АЗС') {
                        if (_azs.indexOf(iterator.azs) == -1) {
                            _azs[t] = iterator.azs;
                            _AZS[t] = { value: iterator.azs, label: iterator.azs, code: iterator.id };
                            t++;
                        }

                        if (_ai.indexOf(iterator.fuel) == -1) {
                            _ai[i] = iterator.fuel;
                            _AI[i] = { value: iterator.fuel, label: iterator.fuel, code: iterator.id };
                            i++;
                        }

                        if (_tus.indexOf(iterator.status) == -1) {
                            _tus[r] = iterator.status;
                            //_TUS[r] = { value: iterator.id, label: get_Text_Status_PL(iterator.status), code: iterator.status };
                            _TUS[r] = { value: iterator.id, label: iterator.status, code: iterator.status };
                            r++;
                        }

                        if (_te.indexOf(iterator.state) == -1) {
                            _te[s] = iterator.state;
                            _TE[s] = { value: iterator.state, label: iterator.state, code: iterator.id };
                            s++;
                        }
                    }
                }
                this.setState({ azs: _AZS, ai: _AI, status: _TUS, state: _TE, });
            } else {
                this.setState({ azs: null, ai: null, status: null, state: null, });
            }
        }
    }

    render() {
        let r1 = {
            width: 90,
            paddingLeft: 20,
            //height: 15,
            textAlign: 'left',
            fontSize: 11,
        }
        let r2 = {
            width: 120,
            //color: 'black',
            //background: 'yellow',
            //fontSize: 20,
            //paddingLeft : 20,
            //height: 15,
            textAlign: 'left',
            fontSize: 11,
        }

        return (
            <center>
                <table >
                    <tbody>
                        <tr>
                            {!this.props.isAZS &&
                                <td style={r1}>АЗК</td>
                            }
                            {!this.props.isAZS &&
                                <td style={r2}><W_CheckBox list={this.state.azs} update_Azs={this.props.update_Azs} type='azs' /></td>
                            }
                            {!this.props.isFUEL &&
                            <td style={r1}>Вид НП</td>
                            }
                            {!this.props.isFUEL &&
                            <td style={r2}><W_CheckBox list={this.state.ai} update_Fuels={this.props.update_Fuels} type='fuel' /></td>
                            }
                            <td style={r1}>Статус</td>
                            <td style={r2}><W_CheckBox list={this.state.status} update_Status={this.props.update_Status} type='status' /></td>
                            <td style={r1}>Состояние</td>
                            <td style={r2}><W_CheckBox list={this.state.state} update_State={this.props.update_State} type='state' /></td>

                        </tr>
                    </tbody>
                </table>
            </center>
        );
    }
}
