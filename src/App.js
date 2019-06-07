import React, { Component, PropTypes } from 'react';
//import 'react-dates/initialize';
//import 'react-dates/lib/css/_datepicker.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import './headMenu.css';

const _Debuge = true;

class Main extends Component {
  render() {
    return <center><h2>Main</h2></center>;
  }
}
class Help extends Component {
  render() {
    return <center><h2>Помощь</h2></center>;
  }
}
class Settings extends Component {
  render() {
    return <center><h2>Настройки</h2></center>;
  }
}

class NotFound extends Component {
  render() {
    return <center><h2>Ресурс не найден</h2></center>;
  }
}


class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className="topmenu">
          <li>
            <div className="header_Inner">
              <Link to="/">
                <div className='headermenu'>Меню</div>
              </Link>
              <div className="header_Text">
                <Link to="/">
                  <h3>Диспетчерская ИС.</h3>
                </Link>
              </div>
              <table className="header_Left">
                <tbody>
                  <tr>
                    <td>
                      <button className='btn_Reload' type="button" onClick={refreshPage}>
                        <img className="header_Img" src={'../images/Repeat1.png'} alt="React"
                          width="20" height="20" />
                      </button>
                    </td>
                    <td>
                      <Link to="/settings">
                        <img className="header_Img" src={'../images/Work.png'} alt="React"
                          width="20" height="20" />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ul className="submenu">
              {_Debuge &&
                <li><Link to="/"><center>Технические &gt;&gt;</center></Link>
                  <ul className="submenu">
                    <li><Link to="/Table" >Таблица</Link></li>
                  </ul>
                </li>
              }
              <li><Link to="/" >Главная</Link></li>
              <li><Link to="/settings">Настройки</Link></li>
              <li><Link to="/help">Помощь</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

function refreshPage() {
  window.location.reload();
}

export default class App extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <div className="content">
          <Switch>
            <Route exact path="/" render={() => <Main />} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/help" component={Help} />
            <Route exact component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
