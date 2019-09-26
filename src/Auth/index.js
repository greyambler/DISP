import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { RSS_LOGIN, saveToken } from '../core/core_Function.jsx';


const { Provider, Consumer: AuthConsumer } = React.createContext({
    isAuthorized: false
});


class AuthProvider extends Component {
    state = {
        isAuthorized: (localStorage.tokenData) ? true : false,
        login: null,
        password: null,
        token: localStorage.tokenData,//Cookie.get('token'),
    };
    authorize = (event, login, passw) => {
        
        this.setState({ login: login, password: passw });
        
        let r = this.Post_Data(event, login, passw);

        //alert('AuthProvider ' + login + " " + passw);
        
        this.setState({ isAuthorized: (localStorage.tokenData) ? true : false}//true }
            , () => {
                this.props.history.push("/")
            })
            
    };

    async Post_Data(event, login, passw) {// Отправка формы

        let J_Post = {
            "username": "admin",//login,
            "password": "password"//passw
        }
        /*
        "username":"admin",
        "password":"password"
        */
        let _body = JSON.stringify(J_Post);
        //alert('Отправленное имя: ' + _body);
        let rss = RSS_LOGIN;
        event.preventDefault();
        var myRequest = new Request(rss);
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
                let rrr = JSON.stringify(Jsons.token);
                saveToken(Jsons.token);
                let TTtokenData = localStorage.tokenData;
                //this.setState({ token: Jsons.token });
                return Jsons.token;
                //alert("Команда получила ответ - " + Jsons.status);
            }
            else {
                throw Error(Jsons.message);
            }
        }
        catch (error) {
            saveToken(null);
            console.log(error);
            alert(error);
        }
        return "false";
    }



    render() {
        const { isAuthorized } = this.state;
        return (
            <Provider value={{
                isAuthorized,
                authorize: this.authorize,
            }}>
                {this.props.children}
            </Provider>
        );
    }
}


export function withAuth(WrappedComponent) {
    return class AuthHOC extends Component {
        render() {
            return (
                <AuthConsumer>
                    {contextProps => (
                        <WrappedComponent {...contextProps} {...this.props} />
                    )}
                </AuthConsumer>
            );
        }
    }
}

const AuthProviderWithRouter = withRouter(AuthProvider);

export { AuthProvider };

//export { AuthProviderWithRouter as AuthProvider };