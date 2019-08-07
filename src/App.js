

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


import { Link as S_Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import { RSS_Type_List } from './core/core_Function.jsx';

import MainWindow from './MainWindow.jsx';
import W_LEVEL from './w_LEVEL.jsx';

import W_AZK from './w_AZK.jsx';
import W_NOZZLE from './w_NOZZLE.jsx';

import W_TRK from './w_TRK.jsx';

import W_SharedFilter from './w_SharedFilter.jsx';
import W_AZS from './w_AZS.jsx';
import W_TestPOST from './w_TestPOST.jsx';
import W_TestTree from './w_TestTree.jsx';


import W_Test from './w_Test.jsx';

const _Debuge = true;

class Main extends Component {
  render() {
    /*
    if (_Debuge) {
      return (<W_TestTree w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
    } else 
    */{
      return (<W_AZS w_Height={this.props.w_Height} w_Width={this.props.w_Width} _List_Objs={this.props._List_Objs} />);
    }

    /*
    
    return (<W_SharedFilter w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
    
    return (<MainWindow />);
    return (<W_TestPOST w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);

    return (<W_SharedFilter w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);

    return (<W_AZS w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
    
    return (<W_Test w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);

    return (<W_TestPrototype w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
     return (<W_TRK w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
    return (<W_AZK w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
    return (<W_LEVEL w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
    return (<W_NOZZLE w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);*/

  }
}
class SharedFilter extends Component {
  render() {
    return (<W_SharedFilter w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}
class TestPOST extends Component {
  render() {
    return (<W_TestPOST w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}//
class TestTree extends Component {
  render() {
    return (<W_TestTree w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}//TestTree

class AZS extends Component {
  render() {
    return (<W_AZS w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}
class Test extends Component {
  render() {
    return (<W_Test w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}
class LEVEL_Main extends Component {
  render() {
    return (<W_LEVEL w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}
class TRK_Main extends Component {
  render() {
    return (<W_TRK w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}
class NOZZLE_Main extends Component {
  render() {
    return (<W_NOZZLE w_Height={this.props.w_Height} w_Width={this.props.w_Width} />);
  }
}
class AZK_Main extends Component {
  render() {
    return (<W_AZK w_Height={this.props.w_Height} w_Width={this.props.w_Width} _List_Objs={this.props._List_Objs} />);
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
  constructor(props) {
    super(props);

  }
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
            <li>
              <div>
                <table>
                  <tbody>
                    <tr className="header_Text_Table">
                      <td></td>
                      <td width='20%'>
                        <S_Link
                          activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} offset={-60}>резервуары</S_Link>
                      </td>
                      <td width='20%'>
                        <S_Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500} offset={-60}>трк</S_Link>
                      </td>
                      <td width='20%'>
                        <S_Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} offset={-60}>тсо</S_Link>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <ul className="submenu">
              {_Debuge &&
                <li><Link to="/"><center>Технические &gt;&gt;</center></Link>
                  <ul className="submenu">
                    <li><Link to="/Table" >Таблица</Link></li>

                    <li><Link to="/AZK_Main" >АЗК</Link></li>
                    <li><Link to="/Test" >Тестовый</Link></li>

                    <li><Link to="/NOZZLE_Main" >Счетчики</Link></li>

                    <li><Link to="/TestPOST" >Тест POST </Link></li>

                    <li><Link to="/TestTree" >Тест TREE </Link></li>
                  </ul>
                </li>


              }
              <li><Link to="/" >Главная</Link></li>
              <li><Link to="/SharedFilter" >Общий фильтр</Link></li>



              <li><Link to="/LEVEL_Main" >АСИ</Link></li>
              <li><Link to="/TRK_Main" >ТРК</Link></li>


              <li><Link to="/settings">Настройки</Link></li>
              <li><Link to="/help">Помощь</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

/*
<li><Link to="/SharedFilterAZS" >По объектам</Link></li>
<Route exact path="/SharedFilterAZS" render={() => <SharedFilterAZS w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />
*/
function refreshPage() {
  window.location.reload();
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      W_Width: window.innerWidth,
      W_Height: window.innerHeight,
      _List_Objs: null,
    }
  }
  handleResize(WindowSize, event) {
    this.setState({ W_Width: window.innerWidth, W_Height: window.innerHeight })
  }


  componentDidMount() {
    this.tick();
  }
  async tick() {
    let rss = RSS_Type_List;
    var myRequest = new Request(rss);
    try {
      var response = await fetch(myRequest,
        {
          method: 'GET',
          headers:
          {
            'Accept': 'application/json',
          },
        }
      );
      if (response.ok) {
        const Jsons = await response.json();
        this.setState({ _List_Objs: Jsons });
      }
      else {
        throw Error(response.statusText);
      }
      this.setState({ isExistError: false })
    }
    catch (error) {
      this.setState({ isExistError: true })
      console.log(error);
    }
  }

  render() {
    return (
      <Router>
        <Nav />
        <div className="content">
          <Switch>
            <Route exact path="/" render={() => <Main w_Height={this.state.W_Height} w_Width={this.state.W_Width}
              _List_Objs={this.state._List_Objs}
            />} />

            <Route exact path="/Test" render={() => <Test w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/SharedFilter" render={() => <SharedFilter w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/TestPOST" render={() => <TestPOST w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/TestTree" render={() => <TestTree w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/LEVEL_Main" render={() => <LEVEL_Main w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/TRK_Main" render={() => <TRK_Main w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/NOZZLE_Main" render={() => <NOZZLE_Main w_Height={this.state.W_Height} w_Width={this.state.W_Width} />} />

            <Route exact path="/AZK_Main" render={() => <AZK_Main w_Height={this.state.W_Height} w_Width={this.state.W_Width}

              _List_Objs={this.state._List_Objs}
            />} />

            <Route exact path="/settings" component={Settings} />
            <Route exact path="/help" component={Help} />
            <Route exact component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
