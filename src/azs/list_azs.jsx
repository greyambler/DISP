import React, { Component, PropTypes } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { WS, compare_azs } from '../core/core_Function.jsx';
import AZS from './azs.jsx'

import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


import { Array } from 'core-js';
import moment from 'moment';

function IsExistID(id, mass) {
    for (const iterator of mass) {
        if (iterator == id) {
            return true;
        }
    }
    return false;
}
function get_Json_String(mstring) {
    var mS = [];
    mS[0] = mstring;
    const T_Json = JSON.stringify(mstring);
    return T_Json;

}

function get_Mass_View(mas_Vidg, ASZ_M) {
    let View_Fields = new Array();
    for (const nameView of mas_Vidg) {

        if (nameView.value == 'selectAll') {
            View_Fields.push('vidget');

            View_Fields.push("azs");

            View_Fields.push('data');

            View_Fields.push('icon_alarm');
            View_Fields.push('status_alarm');
            View_Fields.push('state_alarm');

            View_Fields.push('pump');
            View_Fields.push('Counter_Curent');
            View_Fields.push('fuel');
            View_Fields.push('nozzle');
            View_Fields.push('date');
            View_Fields.push('time');
            View_Fields.push('status');
            View_Fields.push('state');
        }

        if (nameView.value == 'vidget') {
            View_Fields.push('vidget');
            View_Fields.push('icon_alarm');
            View_Fields.push('status_alarm');
            View_Fields.push('state_alarm');
        }


        if (nameView.value == 'data') {
            View_Fields.push('data');
            View_Fields.push('pump');
            View_Fields.push('Counter_Curent');
            View_Fields.push('fuel');
            View_Fields.push('nozzle');
            View_Fields.push('date');
            View_Fields.push('time');
            View_Fields.push('status');
            View_Fields.push('state');
        }

        if (nameView.value == 'icon_alarm') { View_Fields.push('icon_alarm'); }
        if (nameView.value == 'status_alarm') { View_Fields.push('status_alarm'); }
        if (nameView.value == 'state_alarm') { View_Fields.push('state_alarm'); }
        if (nameView.value == 'pump') { View_Fields.push('pump'); }
        if (nameView.value == 'Counter_Curent') { View_Fields.push('Counter_Curent'); }
        if (nameView.value == 'fuel') { View_Fields.push('fuel'); }
        if (nameView.value == 'nozzle') { View_Fields.push('nozzle'); }
        if (nameView.value == 'date') { View_Fields.push('date'); }
        if (nameView.value == 'time') { View_Fields.push('time'); }
        if (nameView.value == 'status') { View_Fields.push('status'); }
        if (nameView.value == 'state') { View_Fields.push('state'); }
    }

    return View_Fields;
}

function Is_View_Row(Data, Name_Row) {
    let row = false;
    if (Data != undefined) {
        for (const iterator of Data) {
            if (iterator == Name_Row) {
                row = true;
                break;
            }
        }
        let r = 0;
    }

    return row;
}

function Delete_Azs(data, dataF) {
    var indices = [];
    if (data != null && dataF != null) {
        var indices = [];
        let t = 0;
        for (let index = 0; index < data.length; index++) {

            if (dataF.indexOf(data[index].azs.toUpperCase()) == -1) {
                indices[t] = data[index];
                t++;
            }
        }
    }
    return indices;
}


const _Debuge = false;
const _Debuge_Filter = true;

export default class list_azs extends Component {
    constructor(props) {
        super(props);

        this.Get_Id_Devices = this.Get_Id_Devices.bind(this);
        this.Get_All_Dev = this.Get_All_Dev.bind(this);

        /******** WS******************** */
        this.start_ws = this.start_ws.bind(this);
        this.stop_ws = this.stop_ws.bind(this);
        this.OnOpen = this.OnOpen.bind(this);
        /******** WS******************** */

        this.state = {
            _Azs: this.props.azs,
            _m_ID: new Array(),

            /******** WS******************** */
            Ws: WS,
            connection: null,
            messages: [],
            data: null,
            IsOpen: false,
        };
    }
    componentDidMount() {
        this.Get_Id_Devices();
    }
    componentDidUpdate(prevProps) {
        if (this.props.azs != prevProps.azs) {
            this.setState({ _Azs: this.props.azs }, this.Get_Id_Devices());
        }
    }
    componentWillUnmount() {
        this.stop_ws();
    }

    async Get_Id_Devices() {
        if (this.state._Azs != null) {
            for (const iterator of this.state._Azs) {
                let r = await this.tick(this.props.RSS + '/' + iterator.id);
                this.Get_All_Dev(r);
            }
            //this.setState({ _M_ID: this.state._m_ID });            
            //his.props.update_ID_DevS(this.state._m_ID);

            this.start_ws();
        }
    }
    Get_All_Dev(dvc) {
        let Need_ID = this.state._m_ID;
        if (dvc != null) {
            for (const iterator of dvc) {
                Need_ID.push(iterator.id);
                let r = 0;
            }
        }
        this.setState({ _m_ID: Need_ID });
        //return Need_ID;
    }
    async tick(RSS) {
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
                return Jsons.dvc;
                //return this.Get_All_Dev(Jsons.dvc);

                //this.setState({ _m_ID: this.Get_All_Dev(Jsons.dvc) });
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

    /******** WS******************** */
    start_ws(e) {
        if (this.state.connection == null) {

            this.state.connection = new WebSocket(this.state.Ws);
            this.state.connection.onopen = evt => { this.OnOpen(evt.data) }//{ this.add_messages(evt.data) }
            this.state.connection.onclose = evt => { this.add_messages(evt.data) }
            this.state.connection.onerror = evt => { this.add_messages(evt.data) }

            this.state.connection.onmessage = evt => {

                if (evt.data != null) {

                    //this.update_Dev(evt.data);
                    try {

                        if (evt.data != "") {
                            this.setState({ data: JSON.parse(evt.data) })// Рабочий
                            //this.add_messages("\n" + evt.data);
                            //console.log('***JSON*********************' + evt.data);
                        }
                    } catch (error) {
                        console.log('******WS******************' + error);
                        console.log('******WS******************' + evt.data);
                    }
                }
            }
        }
    }
    OnOpen(e) {
        if (this.state._m_ID.length > 0 && !this.state.IsOpen) {
            let MS = get_Json_String(this.state._m_ID);
            this.state.connection.send(MS);
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
    /******** WS******************** */

    render() {
        if (this.props.azs_Mass != null) {
            let tr_Style = {
                'verticalAlign': 'top',
            }
            return (
                <div>
                    <table className="tableDevice">
                        <tbody>
                            <tr>
                                {
                                    this.props.azs_Mass.map(el => (

                                        <td key={'li ' + el.id} style={tr_Style}>
                                            <AZS
                                                _List_Objs={this.props._List_Objs}
                                                w_Height={this.props.w_Height}

                                                AZS={el}
                                                RSS={this.props.RSS + '/' + el.id}
                                                key={'AZS ' + el.id}
                                                id={el.id}

                                                View_Icon={this.state._View_Icon}
                                                View_Data={this.state._View_Data}

                                                PL_0={this.props.PL_0} PL_Col={this.props.PL_Col}
                                                TRK_0={this.props.TRK_0} TRK_Col={this.props.TRK_Col}
                                                TCO_0={this.props.TCO_0} TCO_Col={this.props.TCO_Col}

                                                NOZZLE_0={this.props.NOZZLE_0} NOZZLE_Col={this.props.NOZZLE_Col}

                                                data={this.state.data}

                                                View_Fields={this.props.View_Fields}
                                                
                                            />
                                        </td>
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div>
                    <center><h4>{this.props.header}</h4></center>
                    <hr /><hr />
                    <h4><center>Нет связи с сервером!!</center></h4>
                </div>
            );
        }
    }
}