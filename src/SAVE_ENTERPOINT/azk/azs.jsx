import React, { Component } from 'react';
import OL_List from '../../core/OL_List.jsx'
import { makeCounter } from '../../core/core_Function.jsx';
import { Stage, Layer } from 'react-konva';
import Field from './Field.jsx'
import Alarm_Line from './Alarm_Line.jsx'
import AZS_Image from './AZS_Image.jsx'

import { get_DateRSS, get_Json_String, WS } from '../../core/core_Function.jsx';

import './azs.css';

import moment from 'moment';



var counter = makeCounter();

const _Debuge = true;
const _TestSignal = true;


export default class azs extends Component {
   constructor(props) {
      super(props);
      this.ON_Clisck = this.ON_Clisck.bind(this);

      this.start_ws = this.start_ws.bind(this);
      this.stop_ws = this.stop_ws.bind(this);
      this.OnOpen = this.OnOpen.bind(this);

      this.state = {
         Ws: WS,// this.props.WS,
         id: this.props.azs.id,
         name_azs: this.props.azs.nm,
         connection: null,
         N_Test: 1,
         data: null,
         messages: [],
         IsOpen: false,
      };
   }

   ON_Clisck(e) {
      if (e != null) {
         this.props.on_Click(e);

      }
   }


   start_ws(e) {
      if ((this.state.id != null && this.state.connection == null) || this.state.connection.readyState != 1) {

         this.state.connection = new WebSocket(this.state.Ws);
         this.state.connection.onopen = evt => { this.OnOpen(evt.data) }//{ this.add_messages(evt.data) }
         this.state.connection.onclose = evt => { this.add_messages(evt.data) }
         this.state.connection.onerror = evt => { this.add_messages(evt.data) }

         this.state.connection.onmessage = evt => {


            if (evt.data != null) {

               if (!_TestSignal) {
                  this.setState({ data: evt.data });
                  this.add_messages("\n" + evt.data);
               }
               else {
                  let r1 = (((this.state.N_Test + 1) % 4) == 0) ? 1 : (this.state.N_Test + 1) % 4;
                  let r2 = (((this.state.N_Test + 2) % 4) == 0) ? 1 : (this.state.N_Test + 2) % 4;
                  let r3 = (((this.state.N_Test + 3) % 4) == 0) ? 1 : (this.state.N_Test + 3) % 4;
                  this.state.N_Test = (((this.state.N_Test + 1) % 4) == 0) ? 1 : (this.state.N_Test + 1) % 4;

                  let Test_Val = '{"id":"f09de2cd-56e9-4f0e-a822-232e9a7c4d0c",' +
                     '"alarms":' +
                     '[{"tp":2,"stat":[' + r1 + ',' + this.state.N_Test + ']},' +
                     '{"tp":5,"stat":[' + r2 + ',' + r1 + ']},' +
                     '{"tp":6,"stat":[' + r3 + ',' + r2 + ']},' +
                     '{"tp":3,"stat":[' + r1 + ',' + r3 + ']}]}';


                  this.setState({ data: Test_Val })
                  this.add_messages("\n" + this.state.data);
               }
            }
         }
      }
   }
   OnOpen(e) {
      if (this.state.id != null && !this.state.IsOpen) {
         let MS = get_Json_String(this.state.id);
         this.state.connection.send(MS);
         counter.set(1);
         this.setState({ messages: "", IsOpen: true })
         this.add_messages("\n\tOnOpen(e)");
      }
   }
   stop_ws(e) {

      if (this.state.IsOpen) {//(this.state.connection.readyState == 1) {
         this.state.connection.close(1000, "Hello Web Sockets!");
         this.setState({ data: null, IsOpen: false });
         this.add_messages("\n\tstop_ws(e)");

      }

   }

   add_messages(e) {
      if (e != null) {
         this.setState({
            messages: this.state.messages.concat("\n[ №" +
               counter() + ";  " + moment().format('DD/MM/YYYY') + " ]\n " + e + "\n")
         });
      }
   }
   render() {
      let _W = 200;
      let _H = 130;

      let _W_Image = 60;
      let _H_Image = 70;

      let _X_s = 2;
      let _Y_s = 2;
      let _X_1 = _X_s + _W_Image;
      let _Y_1 = _Y_s + 1;

      return (
         <table className='tb_AZS' height={_H + 41}
            name={this.state.name_azs}>
            <tbody>
               <tr>
                  <th id={'tb' + this.props.id} className='th_AZS' height='12' colSpan='2'><h4>{this.state.name_azs}</h4></th>
               </tr>
               <tr>
                  {this.state.IsOpen
                     ? <td colSpan='2' align="center"><button className="Def_button" onClick={this.stop_ws}>стоп</button></td>
                     : <td colSpan='2' align="center"><button className="Def_button" onClick={this.start_ws}>старт</button></td>
                  }
               </tr>
               <tr>
                  <td>
                     <Stage className="t_Stage" width={_W} height={_H} x={_X_s} y={_Y_s} >
                        <Layer>
                           <Field _W={_W} _H={_H} obj_color='white' _X={_X_s} _Y={_Y_s} s_Width={0} />
                           <AZS_Image Image='/images/azk3.jpg' _W={_W_Image} _H={_H_Image} _X={_X_s + 1} _Y={_Y_1 + 25} />
                        </Layer>
                        <Alarm_Line _X={_X_1 + 2} _Y={_Y_1 + 2} _W={_W - _W_Image}
                           data={this.state.data}
                        />
                     </Stage>
                  </td>
                  {_Debuge &&
                     <td>
                        <textarea id="te_Mess" ref="te_Mess" className="te_Mess"
                           defaultValue={this.state.messages} />
                     </td>
                  }
               </tr>
               <tr>
                  <td colSpan='2' align="center">
                     <button id={'btn' + this.props.id}
                        name={this.state.name_azs}
                        className="Def_button"
                        id={this.state.id}

                        onClick={this.ON_Clisck} >Показать оборудование АЗС</button>
                  </td>
               </tr>
            </tbody>
         </table>
      );
   }
}
