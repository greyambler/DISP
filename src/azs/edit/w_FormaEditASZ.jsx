import React, { Component, PropTypes } from 'react';
import ReactTable from "react-table";
import { RSS_AZS_EDIT } from '../../core/core_Function.jsx';

import W_TableEditASZS from './w_TableEditASZS.jsx';
import W_row_tr from './row_TR.jsx';

export default class w_FormaEditASZ extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            _L_AZS: this.props._L_AZS,
            value: '',
            curent_mass_azs: null,
            //value:'',
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props._L_AZS != prevProps._L_AZS) {
            this.setState({ _L_AZS: this.props._L_AZS });
        }
    }

    SetCurentAZS = (row_azs) => {
        if (row_azs != null) {
            let Data = new Array();
            let _Obj_T_M = new Array();
            let i = 0;
            for (const key in row_azs.original) {
                if (!Array.isArray(key)) {
                    Data[i] = key;
                    i++;
                    if (row_azs.original.hasOwnProperty(key)) {
                        _Obj_T_M[key] = row_azs.original[key];
                    }
                }
            }
            Data.push(_Obj_T_M);
            this.setState({
                curent_mass_azs: Data,
                id: Data[10]['id'],
                iid: Data[10]['iid'],
                dispname: Data[10]['dispname'],
                th_code: Data[10]['th_code'],
                order_num: Data[10]['order_num'],
                shortname: Data[10]['shortname'],
                region_code: Data[10]['region_code'],
                region_name: Data[10]['region_name'],
                address: Data[10]['address'],
                telefon: Data[10]['telefon']
            });
        } else {
            this.setState({ curent_mass_azs: null });
        }
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    async handleSubmit(event) {
        let OB = {
            'id': this.state.id,
            'iid': this.state.iid,
            'dispname': this.state.dispname,
            'th_code': this.state.th_code,
            'order_num': this.state.order_num,
            'shortname': this.state.shortname,
            'region_code': this.state.region_code,
            'region_name': this.state.region_name,
            'address': this.state.address,
            'telefon': this.state.telefon
        }
        let ob = JSON.stringify(OB);
        //this.setState({value: OB});
        let _s = await this.put_Data(ob);
        event.preventDefault();
    }
    async put_Data(OB) {///Отправка формы
        let _body = OB;
        let rss = RSS_AZS_EDIT;
        var myRequest = new Request(rss);
        try {
            var response = await fetch(myRequest,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: _body,
                }
            );
            const Jsons = await response.json();
            if (response.ok) {
                alert("Команда получила ответ - " + Jsons.status);
            }
            else {
                throw Error(Jsons.message);
            }
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
    }
    render() {
        if (this.state._L_AZS != null) {
            return (
                <>
                    <W_TableEditASZS ListData={this.state._L_AZS} SetCurentAZS={this.SetCurentAZS} />

                    {this.state.curent_mass_azs != null &&
                        <div>
                            <form onSubmit={this.handleSubmit} >
                                <table>
                                    <tbody>

                                        {/*<W_row_tr name='id' type="guid" value={this.state.id} handleInputChange={this.handleInputChange} />*/}
                                        <W_row_tr name='iid' type="number" value={this.state.iid} handleInputChange={this.handleInputChange} />
                                        <W_row_tr name='dispname' type="text" value={this.state.dispname} handleInputChange={this.handleInputChange} />
                                        <W_row_tr name='th_code' type="number" value={this.state.th_code} handleInputChange={this.handleInputChange} />
                                        <W_row_tr name='order_num' type="number" value={this.state.order_num} handleInputChange={this.handleInputChange} />
                                        <W_row_tr name='shortname' type="text" value={this.state.shortname} handleInputChange={this.handleInputChange} />
                                        <W_row_tr name='region_code' type="number" value={this.state.region_code} handleInputChange={this.handleInputChange} />
                                        <W_row_tr name='region_name' type="text" value={this.state.region_name} handleInputChange={this.handleInputChange} />
                                        <W_row_tr name='address' type="text" value={this.state.address} handleInputChange={this.handleInputChange} />
                                        <W_row_tr name='telefon' type="text" value={this.state.telefon} handleInputChange={this.handleInputChange} />

                                    </tbody>
                                </table>

                                <br />
                                <input type="submit" value="Сохранить в БД" />
                            </form>
                        </div>
                    }
                </>
            );
        } else {
            return (
                <h4>Нет данных</h4>
            );
        }
    }
}