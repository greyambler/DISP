import React, { Component } from 'react';
import { get_VIEW_VIDGs, get_FUEL, get_Objs, get_Status, get_State, get_Text_Status_PL } from '../core/core_Function.jsx';

//import W_CheckBox from '../control/viewListCheckBox.jsx';
import W_CheckBox from '../control/w_List_ChBox.jsx';
//import W_CheckBoxM from '../control/w_List_ChBoxM.jsx';

import W_List_ChBoxTree from '../control/w_List_ChBoxTree.jsx';

//import moment from 'moment';
//import { Array } from 'core-js';


const _Debuge = false;


export default class filtersF extends Component {
    constructor(props) {
        super(props);

        this.Get_AZS = this.Get_AZS.bind(this);
        this.state = {
            ai: null,
            VIEW_VIDG: null,
            VIEW_VIDG_True: null,
        }
    }
    componentDidMount() {
        this.Get_AZS(this.props.fuels);
    }
    componentDidUpdate(prevProps) {
        if (this.props.fuels != prevProps.fuels) {
            this.Get_AZS(this.props.fuels);
        }
    }
    Get_AZS(FUELs) {
        let _View_Vidg = new Array();
        let _View_vidg = get_VIEW_VIDGs();

        for (let iterator of _View_vidg.VIEW_VIDG) {
            _View_Vidg.push({ value: iterator.name, label: iterator.name, code: iterator.code });
        }

        if (FUELs != null) {
            let i = 0;
            let _ai = new Array();
            let _AI = new Array();
            for (let iterator of FUELs) {
                _ai[i] = iterator.fuel;
                _AI[i] = { value: iterator.nm, label: iterator.fu, code: iterator.id };
                i++;
            }
            this.setState({ VIEW_VIDG: _View_Vidg, ai: _AI });

        } else {
            this.setState({ VIEW_VIDG: _View_Vidg, ai: null });
        }
    }

    render() {
        let r1 = {
            idth: 30,
            fontSize: 14,
            textAlign: 'center',
            /*
            paddingLeft: 20,
            //height: 15,
            textAlign: 'left',
            fontSize: 12,
            */
        }
        let r2 = {
            minWidth: 50,

            /*
            //color: 'black',
            //background: 'yellow',
            //fontSize: 20,
            //paddingLeft : 20,
            //height: 15,
            textAlign: 'left',
            fontSize: 12,
            */
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

                            <td style={r1} id='td_ID_Filter'>Вид</td>
                            <td style={r2} id='td_ID_Filter'><W_CheckBox
                                list={this.state.VIEW_VIDG}
                                update_VIEW_VIDG={this.props.update_VIEW_VIDG} type='VIEW_VIDG' />
                            </td>

                        </tr>
                    </tbody>
                </table>
            </center>
        );
    }
}
/*

                            <td style={r1} id='td_ID_Filter'>Вид НП</td>
                            <td style={r2} id='td_ID_Filter'><W_CheckBox list={this.state.ai} update_Fuels={this.props.update_Fuels} type='fuel' /></td>


                            <td style={r1}>АЗК</td>
                            <td style={r2}><W_CheckBox list={this.state.azs} update_Azs={this.props.update_Azs} type='azs' /></td>

*/
