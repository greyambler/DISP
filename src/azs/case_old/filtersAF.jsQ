import React, { Component } from 'react';
import { get_FUEL, get_Objs, get_Status, get_State, get_Text_Status_PL } from '../core/core_Function.jsx';

//import W_CheckBox from '../control/viewListCheckBox.jsx';
import W_CheckBox from '../control/w_List_ChBox.jsx';
//import W_CheckBoxM from '../control/w_List_ChBoxM.jsx';


//import moment from 'moment';
//import { Array } from 'core-js';


const _Debuge = false;



export default class filtersAF extends Component {
    constructor(props) {
        super(props);

        this.Get_AZS = this.Get_AZS.bind(this);
        this.state = {
            azs: null,
            ai: null,
        }
    }
    componentDidMount() {
        this.Get_AZS(this.props.fuels, this.props.azs);
    }
    componentDidUpdate(prevProps) {
        if (this.props.data != prevProps.data) {
            this.Get_AZS(this.props.data);
        }
    }
    Get_AZS(FUELs, AZSs) {
        if (AZSs != null) {

            let t = 0;
            let _azs = new Array();
            let _AZS = new Array();
            for (let iterator of AZSs) {
                _azs[t] = iterator.azs;
                _AZS[t] = { value: iterator.nm, label: iterator.nm, code: iterator.id };
                t++;
            }
            this.setState({ azs: _AZS });

        }
        if (FUELs != null) {

            let i = 0;
            let _ai = new Array();
            let _AI = new Array();
            for (let iterator of FUELs) {
                _ai[i] = iterator.fuel;
                _AI[i] = { value: iterator.nm, label: iterator.nm, code: iterator.id };
                i++;
            }
            this.setState({ ai: _AI });

        } else {
            this.setState({ azs: null, ai: null });
        }
    }

    render() {
        let r1 = {
            width: 40,
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
        /*
                                <td style={r1}>АЗК_New</td>
                                    <td style={r2}><W_CheckBoxM list={this.state.azs} update_Azs={this.props.update_Azs} type='azs' /></td>
        
        */


        return (
            <center>
                <table >
                    <tbody>
                        <tr>
                        <td style={r1}>Вид НП</td>
                            <td style={r2}><W_CheckBox list={this.state.ai} update_Fuels={this.props.update_Fuels} type='fuel' /></td>
                        </tr>
                    </tbody>
                </table>
            </center>
        );
    }
}
/*
                            <td style={r1}>АЗК</td>
                            <td style={r2}><W_CheckBox list={this.state.azs} update_Azs={this.props.update_Azs} type='azs' /></td>

*/
