import './headMenu.css';
import './App.css';
import './pl_noz.css';

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import MainWindow from './MainWindow.jsx';
import W_LEVEL from './w_LEVEL.jsx';

import W_AZK from './w_AZK.jsx';
import W_NOZZLE from './w_NOZZLE.jsx';

import W_TestPrototype from './w_TestPrototype.jsx';


const _Debuge = true;

class Main extends Component {
  render() {
    return (<W_TestPrototype w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);

    /*return (<MainWindow />);
    return (<W_AZK w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
    return (<W_LEVEL w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
    return (<W_NOZZLE w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);*/
  }
}
class TestPrototype extends Component {
  render() {
    return (<W_TestPrototype w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}

class LEVEL_Main extends Component {
  render() {
    return (<W_LEVEL w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}

class NOZZLE_Main extends Component {
  render() {
    return (<W_NOZZLE w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}
class AZK_Main extends Component {
  render() {
    return (<W_AZK w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
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

                    <li><Link to="/AZK_Main" >АЗК</Link></li>
                  </ul>
                </li>


              }
              <li><Link to="/" >Главная</Link></li>
              <li><Link to="/TestPrototype" >Тестовый прототип</Link></li>
              <li><Link to="/LEVEL_Main" >АСИ</Link></li>
              <li><Link to="/NOZZLE_Main" >Счетчики</Link></li>
              
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
  constructor(props) {
    super(props);
    this.state = {
      W_Width: window.innerWidth,
      W_Height: window.innerHeight,
    }
  }

  handleResize(WindowSize, event) {
    this.setState({ W_Width: window.innerWidth, W_Height: window.innerHeight })
  }

  render() {
    return (
      <Router>
        <Nav />
        <div className="content">
          <Switch>
            <Route exact path="/" render={() => <Main w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/TestPrototype" render={() => <TestPrototype w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/LEVEL_Main" render={() => <LEVEL_Main w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/NOZZLE_Main" render={() => <NOZZLE_Main w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/AZK_Main" render={() => <AZK_Main w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/settings" component={Settings} />
            <Route exact path="/help" component={Help} />
            <Route exact component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
