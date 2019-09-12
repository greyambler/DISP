import React, { Component, PropTypes } from 'react';

import W_head from '../../control/w_head_link.jsx';
import W_prop_AZS from './w_prop_OBJ.jsx';
import W_lst_AZS_table from './w_lst_OBJ_table.jsx';

import { RSS_AZS_EDIT, Get_Val } from '../../core/core_Function.jsx';

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

export default class w_lst_AZS extends React.Component {
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        this.state = {
            isExistError: true,
            list_AZS: null,

            curentAZS_M: null,
            curentAZS: null,
            open: false,
            err: 'Ошибка! Сервер не ответил!',
        }
    }
    componentDidMount() {
        this.tick();
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
            if (response.ok) {
                const Jsons = await response.json();
                this.setState({ list_AZS: Jsons.object });
                this.setState({ isExistError: false })
                return "Ok";

            }
            else {
                throw Error(response.statusText);
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

    open_Modal(rowInfo) {
        if (rowInfo != null) {
            this.setState({ open: true });
        }
        else {
            this.setState({ open: false });
        }
    }
    close_Modal = () => this.setState({ open: false });

    render() {
        let ArCol = new Array();
        if (!this.state.isExistError) {
            ArCol = Get_ColumnsForTable(this.state.list_AZS[0]);
            let size = 'fullscreen';
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
                           open={this.state.open}  onClose={this.close_Modal} closeIcon>
                            <Modal.Header>АЗК</Modal.Header>
                            <Container>
                                {/*<W_table_modal Data={data} ID_ROW={this.state.IDCheck} />*/}
                            </Container>
                        </Modal>
                    
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <button onClick={el => { this.open_Modal(el,this.state.curentAZS) }} >добавить</button>
{/*                                    <input type="button" value="Редактировать" ></input>*/}
                                </td>
                                {this.state.curentAZS != null &&
                                    <>
                                        <td>
                                            <button>редактировать</button>
                                        </td>
                                        <td>
                                            <button>удалить</button>
                                        </td>
                                    </>
                                }
                                <td width='1005'></td>
                            </tr>
                        </tbody>
                    </table>
                    <W_prop_AZS _MASS={this.state.curentAZS_M}
                        _AZS={this.state.curentAZS} />
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
