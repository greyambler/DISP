import React, { Component } from 'react';
import { get_FUEL, get_Objs, get_Status, get_State, get_Text_Status_PL } from '../core/core_Function.jsx';

//import W_CheckBox from '../control/viewListCheckBox.jsx';
import W_CheckBox from '../control/w_List_ChBox.jsx';
//import W_CheckBoxM from '../control/w_List_ChBoxM.jsx';


//import moment from 'moment';
//import { Array } from 'core-js';


const _Debuge = false;



export default class list_pl extends Component {
    constructor(props) {
        super(props);
        this.Get_AZS = this.Get_AZS.bind(this);
        this.state = {
            azs: null,
            ai: null,
        }
    }
    componentDidMount() {
        this.Get_AZS(this.props.data);
    }
    componentDidUpdate(prevProps) {
        if (this.props.data != prevProps.data) {
            this.Get_AZS(this.props.data);
        }
    }
    Get_AZS(data) {
        if (_Debuge) {
            let _AZS = new Array();
            let _AI = new Array();

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


            this.setState({ azs: _AZS, ai: _AI });
        } else {
            if (data != null && data.obList != null && data.fuel != null) {
                let _azs = new Array();
                let _AZS = new Array();

                let _ai = new Array();
                let _AI = new Array();

                let t = 0;
                let i = 0;

                for (let iterator of data.obList) {
                    _azs[t] = iterator.azs;
                    _AZS[t] = { value: iterator.nm, label: iterator.nm, code: iterator.id };
                    t++;
                }
                for (let iterator of data.fuel) {
                    _ai[i] = iterator.fuel;
                    _AI[i] = { value: iterator.nm, label: iterator.nm, code: iterator.id };
                    i++;
                }
                this.setState({ azs: _AZS, ai: _AI });
            } else {
                this.setState({ azs: null, ai: null });
            }
        }


    }

    render() {
        let r1 = {
            width: 90,
            paddingLeft: 20,
            //height: 15,
            textAlign: 'left',
            fontSize: 12,
        }
        let r2 = {
            width: 120,
            //color: 'black',
            //background: 'yellow',
            //fontSize: 20,
            //paddingLeft : 20,
            //height: 15,
            textAlign: 'left',
            fontSize: 12,
        }
        return (
            <center>
                <table >
                    <tbody>
                        <tr>

                            <td style={r1}>АЗК</td>
                            <td style={r2}><W_CheckBox list={this.state.azs} update_Azs={this.props.update_Azs} type='azs' /></td>
                            <td style={r1}>Вид НП</td>
                            <td style={r2}><W_CheckBox list={this.state.ai} update_Fuels={this.props.update_Fuels} type='fuel' /></td>

                        </tr>
                    </tbody>
                </table>
            </center>
        );
    }
}
