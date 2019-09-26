import React, { Component, PropTypes } from 'react';

import W_head from '../../control/w_head_link.jsx';
import W_prop_AZS from './w_prop_OBJ.jsx';
import W_lst_AZS_table from './w_lst_OBJ_table.jsx';
import F_azs_edit from './f_azs_edit.jsx';



import { RSS_AZS_EDIT, Get_Val, createGuid } from '../../core/core_Function.jsx';

import { Button, Header, Image, Modal, Input, Container } from 'semantic-ui-react';

//import 'semantic-ui-css/semantic.min.css';

import 'react-table/react-table.css'


const _Debuge = false;

function Get_ColumnsForTable(F_Item) {
    let ArCol = new Array();
    let t = 0;
    let KeyHead = '';
    if (F_Item != null) {
        for (var key in F_Item) {
            KeyHead = key;
            ArCol[t] = { Header: KeyHead, accessor: key };
            t++;
        }
    }
    return ArCol;
}
function Get_AZS_Obj_AZS(azs, Mass) {
    for (const key in azs) {
        if (azs.hasOwnProperty(key)) {
            azs[key] = Mass[Mass.length - 1][key];
        }
    }
    return JSON.stringify(azs);

}


export default class w_lst_AZS extends React.Component {
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);

        //this.put_Data = this.put_Data.bind(this);

        this.state = {
            isExistError: true,
            list_AZS: this.props._L_AZS,

            curentAZS_M: null,
            curentAZS: null,
            open: false,
            err: 'Ошибка! Сервер не ответил!',
        }
    }
    componentDidMount() {
        //this.tick();
    }
    componentDidUpdate(prevProps) {
        if (this.props._L_AZS != prevProps._L_AZS) {
            this.setState({ list_AZS: this.props._L_AZS });
        }
    }

    async tick() {
        let rss = RSS_AZS_EDIT;
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
            const Jsons = await response.json();
            if (response.ok) {

                this.setState({ list_AZS: Jsons.object });
                this.setState({ isExistError: false })
                return "Ok";

            }
            else {
                throw Error(Jsons.message);
            }
        }
        catch (error) {
            this.setState({ isExistError: true })
            console.log(error);
        }
        return "false";
    }

    ChooseTableRow = (NewRow) => {
        if (NewRow != null) {
            let _Obj_T = new Array();
            let _Obj_T_M = new Array();
            let i = 0;
            for (const key in NewRow.original) {
                if (!Array.isArray(key)) {
                    _Obj_T[i] = key;
                    i++;
                    if (NewRow.original.hasOwnProperty(key)) {
                        _Obj_T_M[key] = NewRow.original[key];
                    }
                }
            }
            _Obj_T.push(_Obj_T_M);
            this.setState({ curentAZS: NewRow.original, curentAZS_M: _Obj_T });
        }
    }
    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }
    open_Edit_Modal(rowInfo) {
        if (rowInfo != null) {
            this.setState({ open: true });
        }
        else {

            this.setState({ open: false, curentAZS_M: null, curentAZS: null });
        }
    }
    open_Add_Modal() {
        /*
        let NewAZS = {
            "id":"00000000-0000-0000-0000-000000000000",
            "iid": 777,
            "dispname": "Тестовая АЗК",
            "th_code": 107095,
            "order_num": 6,
            "shortname": "Тест",
            "region_code": 77,
            "region_name": "РН-Москва",
            "address": "Московская обл., Экспертек",
            "telefon": "77777"
        }
        */
        let NewAZS = {
            "id": "00000000-0000-0000-0000-000000000000",
            "iid": 0,
            "dispname": "",
            "th_code": 0,
            "order_num": 0,
            "shortname": "",
            "region_code": 0,
            "region_name": "",
            "address": "",
            "telefon": ""
        }

        if (NewAZS != null) {
            let _Obj_T = new Array();
            let _Obj_T_M = new Array();
            let i = 0;
            for (const key in NewAZS) {
                if (!Array.isArray(key)) {
                    _Obj_T[i] = key;
                    i++;
                    if (NewAZS.hasOwnProperty(key)) {
                        _Obj_T_M[key] = NewAZS[key];
                    }
                }
            }
            _Obj_T.push(_Obj_T_M);
            this.setState({ curentAZS: NewAZS, curentAZS_M: _Obj_T, open: true });
        }

    }
    async open_Delete_Modal(rowInfo) {
        if (this.state.curentAZS_M != null) {
            let _id = this.state.curentAZS_M[this.state.curentAZS_M.length - 1].id;
            if (_id) {
                let _s = await this.delet_AZS(_id);
                alert("Команда получила ответ - " + _s);
                this.tick();
            }
        }
    }

    close_Modal = () => this.setState({ open: false, curentAZS_M: null, curentAZS: null });

    async delet_AZS(OB) {//Удаление azs
        let _body = OB;
        //alert('Отправленное id: ' + _body);
        let rss = RSS_AZS_EDIT + "/" + _body;
        var myRequest = new Request(rss);
        try {
            var response = await fetch(myRequest,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const Jsons = await response.json();
            if (response.ok) {
                this.setState({ _ANS: Jsons });
                //alert("Команда получила ответ - " + Jsons.status);
                return Jsons.status;
            }
            else {
                throw Error(Jsons.message);
            }
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
        return "false";
    }

    render() {
        let ArCol = new Array();
        if (this.state.list_AZS != null) {
            ArCol = Get_ColumnsForTable(this.state.list_AZS[0]);
            let size = 'large';//'tiny';
            return (
                <>
                    <table>
                        <tbody>
                            <tr>
                                <W_head header={this.props.header} tooltip_text={""} />
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <W_lst_AZS_table// header="Свойства азк"
                                        data={this.state.list_AZS} ArCol={ArCol}
                                        ChooseTableRow={this.ChooseTableRow}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Modal id="ModalTable" size={size}
                        open={this.state.open} onClose={this.close_Modal} closeIcon>
                        <Modal.Header>АЗК</Modal.Header>
                        <Container>
                            <F_azs_edit Data={this.state.curentAZS_M} history={this.props.history} />
                        </Container>
                    </Modal>

                    <W_prop_AZS _MASS={this.state.curentAZS_M}
                        _AZS={this.state.curentAZS} />

                    <table>
                        <tbody>
                            <tr>
                                <td id='td_button'>
                                    <button id='_button' onClick={el => { this.open_Add_Modal(el, this.state.curentAZS) }}>добавить</button>
                                </td>
                                {this.state.curentAZS != null &&
                                    <>
                                        <td id='td_button'>
                                            <button id='_button' onClick={el => { this.open_Edit_Modal(el, this.state.curentAZS) }} >редактировать</button>
                                        </td>
                                        <td id='td_button'>
                                            <button id='_button' onClick={el => { this.open_Delete_Modal(el, this.state.curentAZS) }} >удалить</button>
                                        </td>
                                    </>
                                }
                                <td width='1005'></td>
                            </tr>
                        </tbody>
                    </table>

                </>
            );
        } else {
            return (
                <table>
                    <tbody>
                        <tr>
                            <W_head header={this.state.err} color='red' />
                        </tr>
                    </tbody>
                </table>
            );
        }
    }
}
