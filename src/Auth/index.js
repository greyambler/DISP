import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { RSS_LOGIN, saveToken } from '../core/core_Function.jsx';


const { Provider, Consumer: AuthConsumer } = React.createContext({
    isAuthorized: localStorage.tokenData
});


class AuthProvider extends Component {
    state = {
        isAuthorized: (localStorage.tokenData) ? true : false,
        login: null,
        password: null,
        token: localStorage.tokenData,//Cookie.get('token'),
    };

    componentDidUpdate(prevProps) {
        if (this.props.password != prevProps.password) {
            this.setState({ password: this.props.password });
            this.setState({ token: localStorage.tokenData });
        }
        if (this.props.login != prevProps.login) {
            this.setState({ login: this.props.login });
            this.setState({ token: localStorage.tokenData });
        }
    }

    authorize = (event, login, passw) => {
        return this.Post_Data(event, login, passw);
    };

    async Post_Data(event, login, passw) {// Отправка формы
        //this.props.history.push("/");        

        let J_Post = {
            "username": login,//"admin",//login,
            "password": passw//"password"//passw
        }
        let _body = JSON.stringify(J_Post);
        //alert('Отправленное имя: ' + _body);
        let rss = RSS_LOGIN;
        //event.preventDefault();
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
                //event.preventDefault();
                saveToken(Jsons.token);
                this.setState({ login: login, password: passw, token: localStorage.tokenData });
                //let TTtokenData = localStorage.tokenData;
                //this.setState({ token: Jsons.token });
                //event.preventDefault();
                //event.stopPropagation()
                //this.props.history.push("/");

                //event.preventDefault()
                //event.preventDefault();
                //alert("Команда получила ответ - " + Jsons.status);
                return true;
            }
            else {
                saveToken(null);
                throw Error(Jsons.message);
            }
        }
        catch (error) {
            //this.props.history.push("/loginTest");
            console.log(error);
            alert(error);
        }
        return false;
    }



    render() {
        const { isAuthorized } = this.state;
        return (
            <Provider value={{
                isAuthorized,
                authorize: this.authorize,
            }} history={this.props.history}>
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
                        <WrappedComponent {...contextProps} {...this.props} history={this.props.history} />
                    )}
                </AuthConsumer>
            );
        }
    }
}

const AuthProviderWithRouter = withRouter(AuthProvider);

export { AuthProvider };

//export { AuthProviderWithRouter as AuthProvider };