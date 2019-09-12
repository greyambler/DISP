import _ from 'lodash'
import React, { Component, PropTypes } from 'react';
import ReactTable from "react-table";

import Moment from 'moment';
import 'react-table/react-table.css'

import { Get_RSS, RSS_AZS, RSS_AZS_EDIT, Get_Val, createGuid } from '../../core/core_Function.jsx';
import { Button, Header, Image, Modal, Input, Container } from 'semantic-ui-react'

//
//import { thisExpression } from '@babel/types';


function Get_ColumnsForTable(F_Item) {
  let ArCol = new Array();
  let t = 0;
  let KeyHead = '';
  if (F_Item != null) {
    for (var key in F_Item) {
      KeyHead = key;
      /*switch (key) {
        case 'EventTime': KeyHead = 'Дата и время'; break;
        case 'EventName': KeyHead = 'Наименование события'; break;
        case 'EventType': KeyHead = 'Тип события'; break;
        case 'LogFileName': KeyHead = 'Источник данных'; break;
      }*/
      ArCol[t] = { Header: KeyHead, accessor: key };
      t++;
    }
  }
  return ArCol;
}
function Get_AZS_Obj_AZS(azs, Mass) {
  for (const key in azs) {
    if (azs.hasOwnProperty(key)) {
      azs[key] = Mass[Mass.length - 1][key];
    }
  }
  return JSON.stringify(azs);

}


const _Debuge = false;

export default class w_AZK_Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.put_Data = this.put_Data.bind(this);
    this.tick = this.tick.bind(this);
    this.tick_AZS = this.tick_AZS.bind(this);

    this.test_button = this.test_button.bind(this);

    this.state = {
      value: '',
      _List_AZS: null,

      curentAZS: null,
      curentAZS_M: null,

      new_AZS: null,

      _СurentAZS: null,
    };

  }
  handleChange(event, nameField) {

    this.state.curentAZS_M[this.state.curentAZS_M.length - 1][nameField] = event.target.value;
    this.setState({ curentAZS_M: this.state.curentAZS_M });
    event.preventDefault();

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
    //alert('Отправленное имя: ' + this.state.value);
    let _status1 = await this.put_Data(this.state.curentAZS_M, this.tick);

    //alert("Команда получила ответ - " + _status1);
    //let _status2 = await  this.tick();
    //alert("Команда получила ответ - " + _status2);
    //let PostJson = JSON.stringify(this.state.curentAZS);

    event.preventDefault();

  }
  async put_Data(OB) {///Отправка формы
    //let _body1 = Get_Obj_AZS(OB);

    let _body = Get_AZS_Obj_AZS(this.state.curentAZS, OB);
    //alert('Отправленное имя: ' + _body);

    let rss = RSS_AZS_EDIT;
    var myRequest = new Request(rss);
    try {
      var response = await fetch(myRequest,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: _body,
        }
      );
      if (response.ok) {
        const Jsons = await response.json();
        this.setState({ _ANS: Jsons });
        return Jsons.status;
        //alert("Команда получила ответ - " + Jsons.status);
      }
      else {
        throw Error(response.statusText);
      }
    }
    catch (error) {
      console.log(error);
      alert(error);
    }
    return "false";
  }

  componentDidMount() {
    this.tick();
  }
  async tick() {
    let rss = RSS_AZS_EDIT;//RSS_AZS;
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
        this.setState({ _List_AZS: Jsons.object });
        return "Ok";
        //this.setState({ _List_AZS: Jsons.obList });
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
    return "false";
  }

  async tick_AZS(id) {
    let rss = RSS_AZS_EDIT + "/" + id;//RSS_AZS;
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
        this.setState({ _СurentAZS: Jsons.object });
        return "Ok";
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
    return "false";
  }

  ChooseAZS(rowInfo) {
    if (rowInfo != null) {
      let _Obj_T = new Array();
      let _Obj_T_M = new Array();
      let i = 0;
      for (const key in rowInfo.original) {
        if (!Array.isArray(key)) {
          _Obj_T[i] = key;
          i++;
          if (rowInfo.original.hasOwnProperty(key)) {
            _Obj_T_M[key] = rowInfo.original[key];
          }
        }
      }
      _Obj_T.push(_Obj_T_M);
      this.setState({ curentAZS: rowInfo.original, curentAZS_M: _Obj_T });
    }
  }


  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  test_button(el, main){
    alert(main);
  }
  open(rowInfo) {
    if (rowInfo != null) {
      this.setState({ open: true });
      //this.tick_AZS(rowInfo.original.id);
    }
    else {
      this.setState({ open: false });
    }
  }
  close = () => this.setState({ open: false });

  render() {
    let ArCol = new Array();
    if (this.state._List_AZS != null) {
      ArCol = Get_ColumnsForTable(this.state._List_AZS[0])
      //let data = (this.state.Data_ID != null)?this.state.Data_ID.events:this.state.Data_ID;

      //let NM = (this.state.curentAZS != null) ? this.state.curentAZS.nm : "";

      let MASS = this.state.curentAZS_M;
      let size = 'fullscreen';
      return (
        <>
          <div>
            <table>
              <tbody>
                <tr>
                  <td colSpan='2'>
                    <ReactTable
                      onFilteredChange={this.Filter_DataExcel}
                      data={this.state._List_AZS}
                      columns={[
                        {
                          Header: "incidents",
                          columns: ArCol
                        }
                      ]}

                      getTrProps={(state, rowInfo, column, instance) => {
                        return {
                          onClick: () => {
                            this.ChooseAZS(rowInfo);
                          }
                        }
                      }}

                      defaultPageSize={10}

                      filterable={true}
                      show={false}
                      nextText={'>'}
                      previousText={'<'}
                      rowsText={'строк'}
                      width={150}

                      pageText={'стр.'}
                      ofText={'из'}
                      className="-striped -highlight"
                    >
                    </ReactTable>
                  </td>
                </tr>
              </tbody>
            </table>
            <Modal id="ModalTable" size={size} open={this.state.open} onClose={this.close} closeIcon>
              <Modal.Header>Данные от строке id = this.state.IDCheck</Modal.Header>
              <Container>
              {/*<W_table_modal Data={data} ID_ROW={this.state.IDCheck} />*/}
            </Container>
            </Modal>
          </div>

          {this.state.curentAZS_M != null &&
            <>
              <h4>Форма редактирования АЗС</h4>
              <hr />
              {/*<form onSubmit={this.handleSubmit} >*/}
              <table>
                <tbody>
                  {
                    MASS.map((main, p) => (
                      (main != "id" && main != "iid" && !Array.isArray(main)) &&
                      <tr key={'tr_' + createGuid()}>
                        <td key={'td_' + createGuid()}>{main}</td>
                        <td>{Get_Val(MASS, main)}</td>
                        {/*<button onClick={el => {this.test_button(el, main)}}>"Редактировать"</button>*/}

                        <input type="button" value="Редактировать" onClick={el => {this.open(el, Get_Val(MASS, main))}}></input>

                        {/* <td key={'td_' + createGuid()}>
                            <input type="text"
                              value={Get_Val(MASS, main)}
                              onChange={el => { this.handleChange(el, main) }}
                              size='100' />
                          </td>*/}
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <br />
              {/*<input type="submit" value="Отправить в БД" />
              </form>*/}

              <hr /><hr />
            </>
          }
        </>
      );
    } else {
      return (
        <>
          <div>
            <h3>Нет данных</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Имя:
           <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Отправить" />
          </form>
        </>
      );
    }
  }
}
