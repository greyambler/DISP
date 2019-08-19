import React, { Component } from 'react';
import { get_FUEL, get_Objs, get_Status, get_State, get_StateGun, get_Pump, get_VIEW_VIDGs } from '../../core/core_Function.jsx';

//import W_CheckBox from '../control/viewListCheckBox.jsx';
import W_CheckBox from '../../control/w_List_ChBox.jsx';

import W_List_ChBoxTree from '../../control/w_List_ChBoxTree.jsx';

//import moment from 'moment';
//import { Array } from 'core-js';


const _Debuge = false;
const data = get_VTree_LEVEL();
/*[{ "label": "VP Accounting", "checked": true, "children": [{ "label": "iWay", "children": [{ "label": "Universidad de Especialidades del Espíritu Santo" }, { "label": "Marmara University" }, { "label": "Baghdad College of Pharmacy" }] }, { "label": "KDB", "children": [{ "label": "Latvian University of Agriculture" }, { "label": "Dublin Institute of Technology" }] }, { "label": "Justice", "children": [{ "label": "Baylor University" }, { "label": "Massachusetts College of Art" }, { "label": "Universidad Técnica Latinoamericana" }, { "label": "Saint Louis College" }, { "label": "Scott Christian University" }] }, { "label": "Utilization Review", "children": [{ "label": "University of Minnesota - Twin Cities Campus" }, { "label": "Moldova State Agricultural University" }, { "label": "Andrews University" }, { "label": "Usmanu Danfodiyo University Sokoto" }] }, { "label": "Norton Utilities", "children": [{ "label": "Universidad Autónoma del Caribe" }, { "label": "National University of Uzbekistan" }, { "label": "Ladoke Akintola University of Technology" }, { "label": "Kohat University of Science and Technology  (KUST)" }, { "label": "Hvanneyri Agricultural University" }] }] }];*/

let T = true;
//checked: true,
function get_VTree_LEVEL() {

    let _Data = {
        label: 'Выбрать все',
        value: 'selectAll',
        checked: true,
        expanded:true,
        children: [
            {
                label: 'виджет',
                value: 'vidget',
                expanded:true,
                children: [
                    {
                        label: 'Иконка',
                        value: 'icon_alarm'
                    },
                    {
                        label: 'Статус',
                        value: 'status_alarm'
                    },
                    {
                        label: 'Состояние',
                        value: 'state_alarm'
                    }
                ]
            },
            {
                label: 'данные',
                value: 'data',
                children: [
                    {
                        label: 'ТРК',
                        value: 'pump'
                    },
                    {
                        label: 'Cч.текщего налива',
                        value: 'Counter_Curent'
                    },
                    {
                        label: 'Вид НП',
                        value: 'fuel'
                    },
                    {
                        label: 'пистолет',
                        value: 'nozzle'
                    },
                    {
                        label: 'Дата',
                        value: 'date'
                    },
                    {
                        label: 'Время',
                        value: 'time'
                    },
                    {
                        label: 'Статус',
                        value: 'status'
                    },
                    {
                        label: 'Состояние',
                        value: 'state'
                    }
                ]

            }
        ]
    }
    return _Data;
    /*
     var col = {
        "id": 0,
        "azs": "АЗС",
        "pump": "ТРК",

        "Counter_Curent": "Cч.текщего налива",
        "fuel": "Вид НП",
        "nozzle": "пистолет",

        "date": "Дата",
        "time": "Время",
        "status": "Статус",
        "state": "Состояние"
    };

    {
                label: 'данные',
                value: 'data',
                children: [
                    {
                        label: 'НП',
                        value: 'anonymous'
                    }
                ]

            }
   
    */
}

export default class list_pl extends Component {
    constructor(props) {
        super(props);

        this.Get_AZS = this.Get_AZS.bind(this);
        this.state = {
            //PL: this.props._PL,
            VIEW_VIDG: null,

            stategun: null,
            pump: null,
            azs: null,
            ai: null,
            status: null,
            state: null,

            test: 'hello',
        }
    }
    componentDidMount() {
        this.Get_AZS();
    }

    Get_AZS(data) {
        let _View_Vidg = new Array();
        let t = 0;
        let _View_vidg = get_VIEW_VIDGs();
        for (let iterator of _View_vidg.VIEW_VIDG) {
            _View_Vidg[t] = { value: iterator.name, label: iterator.name, code: iterator.code };
            t++;
        }

        if (!_Debuge) {
            let _SGun = new Array();

            let _Pump = new Array();
            let _AZS = new Array();
            let _AI = new Array();
            let _TUS = new Array();
            let _TE = new Array();




            t = 0;
            let _Objs = get_Objs();
            for (let iterator of _Objs.obList) {
                _AZS[t] = { value: iterator.name, label: iterator.name };
                t++;
            }

            t = 0;
            let _StateGun = get_StateGun();
            for (let iterator of _StateGun.stategun) {
                _SGun[t] = { value: iterator.name, label: iterator.name, code: iterator.code };
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
            t = 0;
            let _Pamps = get_Pump();
            for (let iterator of _Pamps.pump) {
                _Pump[t] = { value: iterator.name, label: iterator.name };
                t++;
            }


            this.setState({ VIEW_VIDG: _View_Vidg, stategun: _SGun, azs: _AZS, pump: _Pump, ai: _AI, status: _TUS, state: _TE });
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
                            _AZS[t] = { value: iterator.id, label: iterator.azs };
                            t++;
                        }

                        if (_ai.indexOf(iterator.fuel) == -1) {
                            _ai[i] = iterator.fuel;
                            _AI[i] = { value: iterator.id, label: iterator.fuel };
                            i++;
                        }

                        if (_tus.indexOf(iterator.status) == -1) {
                            _tus[r] = iterator.status;
                            _TUS[r] = { value: iterator.id, label: iterator.status };
                            r++;
                        }

                        if (_te.indexOf(iterator.state) == -1) {
                            _te[s] = iterator.state;
                            _TE[s] = { value: iterator.id, label: iterator.state };
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
    /*  
    onChange = (currentNode, selectedNodes) => {
        this.setState({ test: 'something else' }, this.props.update_VV_TREE(selectedNodes));
        console.log('onChange::', currentNode, selectedNodes);
        T = !T;
    }*/

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

        //onChange={this.onChange} 
        //onChange={(currentNode, selectedNodes) => { this.props.update_VV_TREE(selectedNodes) }}
        return (
            <center>
                <table >
                    <tbody>
                        <tr>
                            <td style={r1}>TEST Вид</td>
                            <td style={r2}>
                                <W_List_ChBoxTree data={data}
                                    onChange={(currentNode, selectedNodes) => { this.props.update_VV_TREE(selectedNodes) }}
                                />
                            </td>

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

                            <td style={r1}>Состояние пистолета</td>
                            <td style={r2}><W_CheckBox list={this.state.stategun} update_Stategun={this.props.update_Stategun} type='stategun' /></td>

                            <td style={r1}>ТРК</td>
                            <td style={r2}><W_CheckBox list={this.state.pump} update_Pump={this.props.update_Pump} type='pump' /></td>

                            <td style={r1}>Статус</td>
                            <td style={r2}><W_CheckBox list={this.state.status} update_Status={this.props.update_Status} type='status' /></td>

                        </tr>
                    </tbody>
                </table>
            </center>
        );
    }
}


/*


                            <td style={r1}>Вид</td>
                            <td style={r2}><W_CheckBox list={this.state.VIEW_VIDG} update_VIEW_VIDG={this.props.update_VIEW_VIDG} type='VIEW_VIDG' /></td>


                                <td style={r1}>Состояние</td>
                                <td style={r2}><W_CheckBox list={this.state.state} update_State={this.props.update_State} type='state'/></td>



*/