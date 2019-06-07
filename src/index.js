import React from 'react';
import ReactDOM from 'react-dom';

//E
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
//E

import App from './App';

import './index.css';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
