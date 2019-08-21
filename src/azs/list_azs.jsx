import React, { Component, PropTypes } from 'react';
import { WS } from '../core/core_Function.jsx';
import AZS from './azs.jsx'
import { Array } from 'core-js';

function get_Json_String(mstring) {
    var mS = [];
    mS[0] = mstring;
    const T_Json = JSON.stringify(mstring);
    return T_Json;

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

const _Debuge = false;
const _Debuge_Filter = true;

let timerId;

export default class list_azs extends Component {
    constructor(props) {
        super(props);

        this.Get_Id_Devices = this.Get_Id_Devices.bind(this);
        this.Get_All_Dev = this.Get_All_Dev.bind(this);

        /******** WS******************** */
        this.start_ws = this.start_ws.bind(this);
        this.stop_ws = this.stop_ws.bind(this);
        this.OnOpen = this.OnOpen.bind(this);
        this.restart = this.restart.bind(this);
        //        this.test = this.test.bind(this);
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
            /******** WS******************** */
           // List_Fields_Main: this.props.List_Fields_Main,
            //List_Fields_PL: this.props.List_Fields_PL,
        };
    }
    componentDidMount() {
        this.Get_Id_Devices();
    }
    componentDidUpdate(prevProps) {
        if (this.props.azs != prevProps.azs) {
            this.setState({ _Azs: this.props.azs }, this.Get_Id_Devices());
        }
        if (this.props.List_Fields_Main != prevProps.List_Fields_Main) {
            this.setState({ List_Fields_Main: this.props.List_Fields_Main }, this.restart());
        }
        if (this.props.List_Fields_PL != prevProps.List_Fields_PL) {
            this.setState({ List_Fields_PL: this.props.List_Fields_PL });
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


    restart() {
        if (this.state.connection != null && this.state.IsOpen) {
            this.state.connection.close(1000, "Hello Web Sockets!");
            this.setState({ IsOpen: false, connection: null, data: null });
            timerId = setInterval(() => this.start_ws(), 10000);
            //if (this.state.connection != null && this.state.IsOpen) {
            //clearInterval(timerId);
            //}
        }
        /*
        if (!this.state.IsOpen) {
            this.start_ws();
        }*/
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
            this.setState({ connection: null, data: null, IsOpen: false });
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
                                        (Is_View_Row(this.props.List_Fields_Main, el.id)) &&
                                        <td key={'li ' + el.id} style={tr_Style}>
                                            <AZS
                                                _List_Objs={this.props._List_Objs}
                                                w_Height={this.props.w_Height}

                                                AZS={el}
                                                RSS={this.props.RSS + '/' + el.id}
                                                key={'AZS ' + el.id}
                                                id={el.id}

                                                //                                                View_Icon={this.state._View_Icon}
                                                //                                                View_Data={this.state._View_Data}

                                                PL_0={this.props.PL_0} PL_Col={this.props.PL_Col}
                                                TRK_0={this.props.TRK_0} TRK_Col={this.props.TRK_Col}
                                                TCO_0={this.props.TCO_0} TCO_Col={this.props.TCO_Col}

                                                NOZZLE_0={this.props.NOZZLE_0} NOZZLE_Col={this.props.NOZZLE_Col}

                                                data={this.state.data}

                                                List_Fields_Main={this.props.List_Fields_Main}
                                                List_Fields_PL={this.props.List_Fields_PL}
                                                View_Filter_PL={this.props.View_Filter_PL}
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