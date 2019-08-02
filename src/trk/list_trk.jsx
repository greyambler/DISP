import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';

import {WS, get_Trk, get_Azs, get_Azs_Trk } from '../core/core_Function.jsx';

import Trk from './trk.jsx'

const _Debuge = false;


function get_ZeroColumn_TRK() {
    var col = {
        "id": 0,
        "typ": "ТРК",
        "nm": "Название ТРК",
    };
    return col;
}
function get_ZeroColumn() {
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
    return col;
}

function get_Json_String(mstring) {
    var mS = [];
    mS[0] = mstring;
    const T_Json = JSON.stringify(mstring);
    return T_Json;

}

export default class list_trk extends Component {
    constructor(props) {
        super(props);

        this.start_ws = this.start_ws.bind(this);
        this.stop_ws = this.stop_ws.bind(this);
        this.OnOpen = this.OnOpen.bind(this);

        this.state = {
            Ws: WS,
            connection: null,
            messages: [],
            data: null,
            IsOpen: false,
        };
    }

    componentDidMount() {
        this.start_ws();
    }
    componentWillUnmount(){
        this.stop_ws();
    }

    start_ws(e) {
        if (this.state.connection == null) {

            this.state.connection = new WebSocket(this.state.Ws);
            this.state.connection.onopen = evt => { this.OnOpen(evt.data) }//{ this.add_messages(evt.data) }
            this.state.connection.onclose = evt => { this.add_messages(evt.data) }
            this.state.connection.onerror = evt => { this.add_messages(evt.data) }

            this.state.connection.onmessage = evt => {

                if (evt.data != null) {
                    this.props.update_Trk(evt.data);
                    this.setState({ data: evt.data })// Рабочий
                    //his.add_messages("\n" + evt.data);
                }
            }
        }
    }
    OnOpen(e) {
        if (this.props.trk[0].id != null && !this.state.IsOpen) {

            let Mass_Id = new Array();
            let t = 0;
            for (let index = 0; index < this.props.trk.length; index++) {
                if (this.props.trk[index].id != 0) {
                    Mass_Id[t] = this.props.trk[index].id.toString();
                    t++;
                }
            }

            let MS = get_Json_String(Mass_Id);
            this.state.connection.send(MS);
            //counter.set(1);
            this.setState({ messages: "", IsOpen: true })
            //this.add_messages("\n\tOnOpen(e)");
        }
    }
    stop_ws(e) {
        if (this.state.IsOpen) {//(this.state.connection.readyState == 1) {
            this.state.connection.close(1000, "Hello Web Sockets!");
            this.setState({ data: null, IsOpen: false });
            //this.add_messages("\n\tstop_ws(e)");
        }
    }
    add_messages(e) {
        if (e != null) {
            this.setState({
                messages: this.state.messages.concat("\n[ №" +
                    " " + " ]\n " + e + "\n")
            });
        }
    }
    render() {
        if (this.props.trk_Mass == undefined) {
            if (this.props.trk != null) {
                if (this.props.trk.length > 0 && this.props.trk[0].id != 0) {
                    let _TRK_0 = get_ZeroColumn();
                    this.props.trk.splice(0, -1, _TRK_0);
                }

                let Li_Style = {
                    width: this.props.trk.length * 120 + 'px',
                    //color: 'black',
                    //background: 'burlywood',
                }

                return (
                    <div className='prokrutka_trk'>
                        <center>
                            <ul className="hr" style={Li_Style}>
                                <center className='TBL' ><h4>ТРК</h4></center>
                                <hr /><hr />
                                <center>
                                    {
                                        this.props.trk.map(el => (
                                            <li key={'li ' + el.id}>
                                                <Trk TRK={el}
                                                    key={'Trk ' + el.id}
                                                    id={el.id}
                                                    View_Icon={this.props.View_Icon}
                                                    View_Data={this.props.View_Data}

                                                    View_Fields={this.props.View_Fields}
                                                />
                                            </li>
                                        ))
                                    }
                                </center>
                            </ul>
                        </center>
                    </div>
                );
            } else {
                return <br />;
            }
        } else {
            if (this.props.trk_Mass != null) {
                if (this.props.trk_Mass.length > 0 && this.props.trk_Mass[0][0].id != 0) {
                    let N = new Array();
                    N.push(get_ZeroColumn());
                    this.props.trk_Mass.splice(0, -1, N);
                    //let _PL_0 = get_ZeroColumn();
                    //this.props.trk_Mass[0].splice(0, -1, _PL_0);
                }
                /*
                let ColAll = 0;
                for (const iterator of this.props.trk_Mass) {
                    ColAll = ColAll + iterator.length;
                }

                let Li_Level = { width: ColAll * 130 + 'px', }
                */
                let Li_Level = { width: 6 * 120 + 'px', }
                let li_Level = { width: 180 + 'px' }
                return (
                    <div className='prokrutka_trk'>
                        <left>
                            <ul className="hr">
                                <center className='TBL' ><h4>ТРК</h4></center>
                                <hr /><hr />
                                <left>
                                    {
                                        this.props.trk_Mass.map(trk_el => (
                                            <td>
                                                <div>
                                                    <table style={(trk_el[0].id != 0) ? Li_Level : li_Level}>
                                                        <tbody>
                                                            <tr>
                                                                {
                                                                    trk_el.map(el => (
                                                                        <li key={'trk_li_' + el.id}>
                                                                            <Trk TRK={el}
                                                                                key={'Trk_' + el.id}
                                                                                id={el.id}
                                                                                View_Icon={this.props.View_Icon}
                                                                                View_Data={this.props.View_Data}
                                                                                View_Fields={this.props.View_Fields}
                                                                            />
                                                                        </li>
                                                                    ))
                                                                }
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        ))
                                    }
                                </left>
                            </ul>
                        </left>
                    </div>
                );
            } else {
                return <br />;
            }
        }

    }

}
/*

{
                                        this.props.trk.map(el => (
                                            <li key={'li ' + el.id}>
                                                <Trk TRK={el}
                                                    key={'PL ' + el.id}
                                                    id={el.id}
                                                    View_Icon={this.props.View_Icon}
                                                    View_Data={this.props.View_Data}
                                                />
                                            </li>
                                        ))
                                    }

*/