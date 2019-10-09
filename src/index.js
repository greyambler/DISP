import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';

//E
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
//E


import App from './App';

import './headMenu.css';
import './index.css';
import './pl_noz.css';
import './App.css';


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
