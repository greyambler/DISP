import React, { Component, PropTypes } from 'react';
import { RSS_LOGIN } from './core/core_Function.jsx';

const _Debuge = false;

//let TOKEN =null;


export default class w_Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Post_Data = this.Post_Data.bind(this);
        this.state = {
            value: '',

            login: null,
            password: null,
            _ANS: null,
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
        let J_Post = {
            "username": this.state.login,
            "password": this.state.password
        }
        //TOKEN = JSON.stringify(J_Post);
        //event.preventDefault();

        /*    
            for (const key of this.state.curentAZS_M) {
              if (nameField == key) {
                this.state.curentAZS_M[this.state.curentAZS_M.length - 1][nameField] = event.target.value;
                this.setState({ curentAZS_M: this.state.curentAZS_M });
                break;
              }
            }    
            */
    }
    async handleSubmit(event) {
        let _st = 0;
        //alert('Отправленное имя: ' + this.state.login + ', password: ' + this.state.password);
        let _anser = await this.Post_Data(event);

        event.preventDefault();
        //this.props.history.push('/');

        let r=0;
    }
    async Post_Data(event) {///Отправка формы
        //let _body1 = Get_Obj_AZS(OB);
        //alert("TOKEN - " + TOKEN);
        let J_Post = {
            "username": this.state.login,
            "password": this.state.password
        }
        /*
        "username":"admin",
        "password":"password"
        */

        let _body = JSON.stringify(J_Post);//Get_AZS_Obj_AZS(this.state.curentAZS, OB);
        //alert('Отправленное имя: ' + _body);
        
        let rss = RSS_LOGIN;
        
        var myRequest = new Request(rss);
        event.preventDefault();
        try {
            var response = await fetch(myRequest,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: _body,
                }
                
            );
            
            const Jsons = await response.json();
            if (response.ok) {
                
                this.setState({ _ANS: Jsons });
                //return Jsons.status;
                //alert("Команда получила ответ - " + Jsons.status);
            }
            else {
                let r=0;
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
        return (
            <>
                <center><h2>W_login</h2></center>
                {/*<form method="post" action="http://172.23.16.18:8080/dprest-1.0-SNAPSHOT/webresources/ru.expertek.dp.dpfacade.dic.edit/user/login/">*/}
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
