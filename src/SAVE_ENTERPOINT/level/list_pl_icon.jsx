import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { WS } from '../../core/core_Function.jsx';

import Pl from './pl_icon.jsx'
import { Array } from 'core-js';

const _Debuge = false;

//let S = 0;

function get_Color(Int) {
    var col = 'while';
    switch (Int) {
        case 1: col = 'green'; break;
        case 2: col = 'yellow'; break;
        case 3: col = 'red'; break;
        default: col = 'grey'; break;
    }
    return col;
}
function get_Text(Int) {
    var col = ' ';
    switch (Int) {
        case 2: col = 'резервуар'; break;
        case 3: col = 'ТРК'; break;
        case 5: col = 'ИБП'; break;
        case 6: col = 'терминал сам.'; break;//'терминал самообслуживания'; break;
        default: col = ' '; break;
    }
    return col;
}
function get_ZeroColumn(_pl_first) {
    var col = {
        "id": 0,
        "Available_volume": "Доступный объём",
        //"CURENT_VOLUME": "Текущий объём",
        "TOTAL_WATER": "Подтоварная вода",
        "WATER_LEVEL": "Подтоварная вода",
        "azs": "АЗС",
        "storage_space": "Резервуар №",
        //"temperature": "Температура",
        //"density": "Плотность",
        //"date": "Дата",
        //"time": "Время",
        "TP_STATUS": "Статус",
        "TP_ALARM": "Состояние",
        //"status": "Статус",
        //"state": "Состояние",
        "fuel": "Вид НП",

        "PRODUCT_LEVEL": "Уровень продукта",
        "TOTAL_OBSERVED_VOLUME": "Общий_объем",
        //"TOTAL_GROSS_STANDARD_VOLUME": "TOTAL_GROSS_STANDARD_VOLUME",
        "AVERAGE_TEMP": "Температура",
        "OBSERVED_DENSITY": "Плотность",
        //"WATER_VOLUME": "WATER_VOLUME",
        "LAST_READING_DATE": "Дата",
        "LAST_READING_TIME": "Время"


    };


    // пример выгружаемого объекта:
    // {
    //  "id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c",
    //  "TP_STATUS":2,
    //  "TP_ALARM":123,
    //  ... далее поля, в зависимости от DATA_MASK:
    //  "PRODUCT_LEVEL":0.1,
    //  "TOTAL_OBSERVED_VOLUME":0.1,
    //  "TOTAL_GROSS_STANDARD_VOLUME":0.1,
    //  "AVERAGE_TEMP":0.1,
    //  "OBSERVED_DENSITY":0.1,
    //  "LAST_READING_DATE":"2019/12/28",
    //  "LAST_READING_TIME":"22:08:54",
    //  "WATER_VOLUME":0.1,
    //  ... на поле WATER_LEVEL отсутствует флаг в DATA_MASK
    //  "WATER_LEVEL":0.1
    // }



    return col;
}
function get_Json_String(mstring) {
    var mS = [];
    mS[0] = mstring;
    const T_Json = JSON.stringify(mstring);
    return T_Json;

}


export default class list_pl extends Component {
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
                    this.props.update_Pls(evt.data);
                    this.setState({ data: evt.data })// Рабочий
                    //his.add_messages("\n" + evt.data);
                }
            }
        }
    }
    OnOpen(e) {
        if (this.props.pls[0].id != null && !this.state.IsOpen) {

            let Mass_Id = new Array();
            let t = 0;
            for (let index = 0; index < this.props.pls.length; index++) {
                if (this.props.pls[index].id != 0) {
                    Mass_Id[t] = this.props.pls[index].id.toString();
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
        if (this.props.pls_Mass == undefined) {
            if (this.props.pls != null) {
                if (this.props.pls.length > 0 && this.props.pls[0].id != 0) {
                    let _PL_0 = get_ZeroColumn();
                    this.props.pls.splice(0, -1, _PL_0);
                }
                let Li_Level = {
                    width: this.props.pls.length * 140 + 'px',

                    //color: 'black',
                    //background: 'burlywood',
                }
                return (
                    <div className='prokrutka_pl_Icon'>
                        <center>
                            <ul className="hr" style={Li_Level}>
                                <center className='TBL' ><h4>Резервуары</h4></center>
                                <hr /><hr />
                                <center>
                                    {
                                        this.props.pls.map(el => (
                                            <li key={'li ' + el.id}>
                                                <Pl PL={el}
                                                    key={'PL ' + el.id}
                                                    id={el.id}
                                                    View_Icon={this.props.View_Icon}
                                                    View_Data={this.props.View_Data}
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
            if (this.props.pls_Mass != null) {
                if (this.props.pls_Mass.length > 0 && this.props.pls_Mass[0][0].id != 0) {
                    let N = new Array();
                    N.push(get_ZeroColumn());
                    this.props.pls_Mass.splice(0, -1, N);
                    //let _PL_0 = get_ZeroColumn();
                    //this.props.pls_Mass[0].splice(0, -1, _PL_0);
                }
                /*let ColAll = 0;
                for (const iterator of this.props.pls_Mass) {
                    ColAll = ColAll + iterator.length;
                }
                let Li_Level = { width: ColAll * 110 + 'px', }
                */
                let Li_Level = { width: 6 * 120 + 'px', }
                let li_Level = { width: 180 + 'px'}
                //let l_i_Level = { width: 180 + 'px', border: '3px solid rgb(0, 141, 141)' }
                return (
                    <div className='prokrutka_pl_Icon' >
                        <left>
                            <ul className="hr">
                                <center className='TBL' ><h4>Резервуары</h4></center>
                                <hr /><hr />
                                <left>
                                    {
                                        this.props.pls_Mass.map(pls_el => (
                                            <td>
                                                <div>
                                                    <table style={(pls_el[0].id != 0) ? Li_Level : li_Level}>
                                                        <tbody>
                                                            <tr >
                                                                {
                                                                    pls_el.map(el => (
                                                                        <li key={'pls_li_' + el.id}>
                                                                            <Pl PL={el}
                                                                                key={'PL_' + el.id}
                                                                                id={el.id}
                                                                                View_Icon={this.props.View_Icon}
                                                                                View_Data={this.props.View_Data}
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