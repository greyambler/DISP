import React from "react";
import { Redirect } from "react-router-dom";
import { withAuth } from "../Auth";

import W_Login from "./w_Login.jsx";



export default withAuth(({ isAuthorized, authorize, login, password, history }) =>
    isAuthorized
        ?
        <Redirect to='/' />
        :
        <W_Login authorize={authorize} login={login} password={password} history={history} />
);

/*
        <flex-wrap>
            <panel>
                <h1>Вы не авторизованы</h1>
                <button onClick={authorize}>Авторизоваться</button>
            </panel>
        </flex-wrap>
*/