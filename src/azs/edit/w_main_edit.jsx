import React, { Component, PropTypes } from 'react';
import W_AZK_Form from './w_AZK_Form.jsx';
import W_lst_AZS from './w_lst_AZS.jsx';
import W_head from '../../control/w_head_link.jsx';
import { RSS_AZS_EDIT, saveToken } from '../../core/core_Function.jsx';
import W_FormaEditASZ from './w_FormaEditASZ.jsx';

const _Debuge = false;

export default class w_main_edit extends React.Component {
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);

        this.state = {
            isExistError: true,
            _L_AZS: null,
            err: 'Ошибка! Сервер не ответил!',
            token: localStorage.tokenData//Cookie.get('token'),
        };
    }
    componentDidMount() {
        this.tick();
    }
/*
    componentDidUpdate(prevProps) {
        if (this.props._L_AZS != prevProps._L_AZS) {
            this.setState({ list_AZS: this.props._L_AZS });
        }
    }
*/
    async tick() {
        let rss = RSS_AZS_EDIT;//RSS_AZS;
        let token = localStorage.tokenData;
        var myRequest = new Request(rss);
        try {
            var response = await fetch(myRequest,
                {
                    method: 'GET',
                    headers:
                    {
                        'Authorization': "Bearer" + token,
                        'Accept': 'application/json'
                    },
                }
            );

            if (response.ok) {
                const Jsons = await response.json();
                this.setState({ _L_AZS: Jsons.object });
                this.setState({ isExistError: false })
            } else if (response.status == 401) {
                let error = "Получен статус " + response.status + ".\nВы запросили страницу не будучи авторизованы!"
                alert(error);
                saveToken(null);
                this.props.history.push('/loginTest');
                throw Error(error);
            }
            else {
                throw Error(response.statusText);
            }
        }
        catch (error) {
            this.setState({ isExistError: true })
            alert(error);
            console.log(error);
        }
    }

    render() {
        if (!this.state.isExistError) {
            return (
                <>
                    <W_lst_AZS header="Список АЗК" w_Height={this.props.w_Height}
                        w_Width={this.props.w_Width} _L_AZS={this.state._L_AZS}
                        history={this.props.history} />
                    <hr /><hr /><hr /><hr /><hr /><hr /><hr />
                    {/*
                <W_FormaEditASZ w_Height={this.props.w_Height} w_Width={this.props.w_Width} _L_AZS={this.state._L_AZS} />

                <hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr />

                <W_AZK_Form w_Height={this.props.w_Height} w_Width={this.props.w_Width} _List_Objs={this.props._List_Objs} />

                <hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr />
*/}
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