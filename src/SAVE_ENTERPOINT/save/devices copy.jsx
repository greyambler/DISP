import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { WS } from '../core/core_Function.jsx';

import { Array } from 'core-js';

import Pl from './device/pl.jsx'
import TRK from './device/trk.jsx'
import TCO from './device/tco.jsx'

const _Debuge = false;

function get_ZeroColumn_PL() {
    var col = {
        "id": 0,
        "typ": 'pl',
        "nm": "Название",

        /*
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
*/

    };
    let M = new Array();
    M.push(col)
    return M;
}

function get_ZeroColumn_PL_0(ValF) {
    let M = null;
    if (ValF != null) {
        M = new Array();
        M.push(ValF)
    }
    return M;
}

function get_ZeroColumn_TRK() {
    var col = {
        "id": 0,
        "typ": "trk",
        "nm": "Название",/*
        "azs": "АЗС",
        

        "Counter_Curent": "Cч.текщего налива",
        "fuel": "Вид НП",
        "nozzle": "пистолет",

        "date": "Дата",
        "time": "Время",
        "status": "Статус",
        "state": "Состояние"
        */
    };
    let M = new Array();
    M.push(col)
    return M;
}
function get_ZeroColumn_TCO() {
    var col = {

        "id": 0,
        "typ": 'tco',
        "nm": "Название",/*
        "azs": "АЗС",
        

        "iSelf": "ТУ Банка(iSelf)",
        "fr": "Фискальный регистратор",
        "validator": "Валидатор",

        "topSection": "Верхний отсек",
        "lowerSection": "Нижний отсек",
        "safe": "Сейф",
        "MFK": "Статус МФК",

        "date": "Дата",
        "time": "Время",
        "status": "Статус",
        "state": "Состояние"
        */
    };
    let M = new Array();
    M.push(col)
    return M;
}

export default class azs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rss: this.props.RSS,
            AZS: this.props.AZS,
            _Objects: null,
            _dvc: null,
            _pl: null,
            _trk: get_ZeroColumn_TRK(),
            _tco: get_ZeroColumn_TCO(),
        }
    }

    componentDidMount() {
        this.setState({ _pl: get_ZeroColumn_PL_0(this.props.PL_0) });
        this.tick();
    }

    componentDidUpdate(prevProps) {
        if (this.props.AZS != prevProps.AZS) {
            this.setState({ AZS: this.props.AZS });
        }
        if (this.props.RSS != prevProps.RSS) {
            this.setState({ Rss: this.props.RSS });
        }
        if (this.props.PL_0 != prevProps.PL_0) {
            this.setState({ _pl: get_ZeroColumn_PL_0(this.props.PL_0) });
        }

    }

    async tick() {
        let rss = this.state.Rss;
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
                this.setState({ _Objects: Jsons, _dvc: Jsons.dvc });
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
    render() {
        
        let PLs = null;
        let Trk = null;
        let Tco = null;
        if (this.state._dvc != null) {
            PLs = new Array();
            Trk = new Array();
            Tco = new Array();
            if (this.props.id != 0) {
                let Need_ID = new Array();
                for (const iterator of this.state._dvc) {
                    Need_ID.push(iterator.id);

                    if (iterator.typ == 'pl') {
                        
                        PLs.push(iterator);
                    }
                    if (iterator.typ == 'pump') {
                        
                        Trk.push(iterator);
                    }
                    if (iterator.typ == 'tso') {   
                        Tco.push(iterator);
                    }

                }
                if(Need_ID.length > 0){
                    //this.props.update_List_ID(Need_ID);
                }

            }
            
        }
        let Li_Style = {
            //'margin-left': '10px',
            //'max-width': '30px',
            //'border': '2px solid blue',
            //'max-width': '10px',
            'margin-right': '20px',

        }
        let li_Style = {
            //'margin-left': '10px',
            'min-width': '800px',
            //'max-width': '30px',

            //'border': '1px solid red',
            //'background': 'red',
            'margin-right': '40px',
        }
        let td_Style = {
            'vertical-align': 'top',
            //'max-width': '30px',
        }


        if (this.state.AZS != null && this.props.id == 0) {
            //<table style={li_Style}></table>
            return (
                <div >
                    <table>
                        <tbody>
                            <tr>
                                <td style={td_Style} >
                                    <center>{this.state.AZS.nm}</center>
                                    <hr /><hr />
                                </td>
                            </tr>

                            {this.state._pl != null &&
                                <tr>
                                    <td>
                                        <center ><h4>Резервуары</h4></center>
                                        {
                                            this.state._pl.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <Pl PL={el}
                                                        key={'PL ' + el.id}
                                                        id={el.id}
                                                        View_Icon={true}
                                                        View_Data={true}

                                                        PL_Col={this.props.PL_Col}
                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            }

                            {this.state._trk != null &&
                                <tr>
                                    <td>
                                        <center ><h4>ТРК</h4></center>
                                        {
                                            this.state._trk.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <TRK TRK={el}
                                                        key={'Trk ' + el.id}
                                                        id={el.id}
                                                        View_Icon={true}
                                                        View_Data={true}


                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            }

                            {this.state._tco != null &&
                                <tr>
                                    <td>
                                        <center ><h4>ТСО</h4></center>
                                        {
                                            this.state._tco.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <TCO TCO={el}
                                                        key={'Tco ' + el.id}
                                                        id={el.id}
                                                        View_Icon={true}
                                                        View_Data={true}
                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>
            );
        }
        else if (this.state.AZS != null && this.props.id != 0 && this.state._dvc != null) {
            //<table style={Li_Style}></table>
            return (
                <div >
                    <table>
                        <tbody>
                            <tr>
                                <td style={td_Style} >
                                    <center>{this.state.AZS.nm}</center>
                                    <hr /><hr />
                                </td>
                            </tr>

                            {PLs != null &&
                                <tr>
                                    <td>
                                        <center ><h4>Резервуары</h4></center>
                                        {
                                            PLs.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <Pl PL={el}
                                                        key={'PL ' + el.id}
                                                        id={el.id}
                                                        View_Icon={true}
                                                        View_Data={true}

                                                        PL_Col={this.props.PL_Col}
                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            }

                            {Trk != null &&
                                <tr>
                                    <td>
                                        <center ><h4>ТРК</h4></center>
                                        {
                                            Trk.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <TRK TRK={el}
                                                        key={'Trk ' + el.id}
                                                        id={el.id}
                                                        View_Icon={true}
                                                        View_Data={true}
                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            }

                            {Tco != null &&
                                <tr>
                                    <td>
                                        <center ><h4>ТСО</h4></center>
                                        {
                                            Tco.map(el => (
                                                <td key={'li ' + el.id}>
                                                    <TCO TCO={el}
                                                        key={'Tco ' + el.id}
                                                        id={el.id}
                                                        View_Icon={true}
                                                        View_Data={true}
                                                    />
                                                </td>
                                            ))
                                        }
                                    </td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>
            );
        } else {
            return <br />;
        }
    }
}
