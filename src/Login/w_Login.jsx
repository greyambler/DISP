import React, { Component, PropTypes } from 'react';
import { RSS_LOGIN } from '../core/core_Function.jsx';

const _Debuge = false;

export default class w_Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            login: null,
            password: null,
        };
    }
    handleChange(event, nameField) {
        switch (nameField) {
            case "login": {
                this.setState({ login: event.target.value });
                break;
            } case "password": {
                this.setState({ password: event.target.value });
                break;
            }
        }
    }
    async handleSubmit(event) {
        this.props.authorize(event, this.state.login, this.state.password);
    }

    render() {
        return (
            <>
                <h1>Вы не авторизованы</h1>
                {/*<center><h2>W_login</h2></center>*/}
                <form onSubmit={this.handleSubmit}>
                    <table>
                        <tr>
                            <td width="70"><label for="loginField">Логин</label></td>
                            <td>
                                <input id="loginField" type="text"
                                    name="login"
                                    onChange={el => { this.handleChange(el, "login") }} />
                            </td>
                        </tr>
                        <tr>
                            <td><label for="passwordField">Пароль</label></td>
                            <td>
                                <input id="passwordField" type="password"
                                    name="password"
                                    onChange={el => { this.handleChange(el, "password") }} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input type="submit" value="Войти" /></td>
                        </tr>
                    </table>
                </form>
            </>
        );
    }
}
