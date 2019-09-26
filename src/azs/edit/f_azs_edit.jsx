import _ from 'lodash'
import React, { Component, PropTypes } from 'react';
import ReactTable from "react-table";

import { Get_RSS, RSS_AZS, RSS_AZS_EDIT, Get_Val, createGuid } from '../../core/core_Function.jsx';
import W_row_tr from './row_TR.jsx';

export default class f_azs_edit extends Component {
   constructor(props) {
      super(props);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
         id: this.props.Data[10]['id'],
         iid: this.props.Data[10]['iid'],
         dispname: this.props.Data[10]['dispname'],
         th_code: this.props.Data[10]['th_code'],
         order_num: this.props.Data[10]['order_num'],
         shortname: this.props.Data[10]['shortname'],
         region_code: this.props.Data[10]['region_code'],
         region_name: this.props.Data[10]['region_name'],
         address: this.props.Data[10]['address'],
         telefon: this.props.Data[10]['telefon'],

         _ANS: null,
      }
   }
   componentDidMount() {
      this.setState({

         id: this.props.Data[10]['id'],
         iid: this.props.Data[10]['iid'],
         dispname: this.props.Data[10]['dispname'],
         th_code: this.props.Data[10]['th_code'],
         order_num: this.props.Data[10]['order_num'],
         shortname: this.props.Data[10]['shortname'],
         region_code: this.props.Data[10]['region_code'],
         region_name: this.props.Data[10]['region_name'],
         address: this.props.Data[10]['address'],
         telefon: this.props.Data[10]['telefon'],
      });
   }
   componentDidUpdate(prevProps) {
      if (this.props.Data != prevProps.Data) {
         this.setState({
            id: this.props.Data[10]['id'],
            iid: this.props.Data[10]['iid'],
            dispname: this.props.Data[10]['dispname'],
            th_code: this.props.Data[10]['th_code'],
            order_num: this.props.Data[10]['order_num'],
            shortname: this.props.Data[10]['shortname'],
            region_code: this.props.Data[10]['region_code'],
            region_name: this.props.Data[10]['region_name'],
            address: this.props.Data[10]['address'],
            telefon: this.props.Data[10]['telefon'],
         });
      }
   }

   handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
         [name]: value
      });
   }
   async handleSubmit(event) {
      let r1 = 0;
      let OB = {
         'id': this.state.id,
         'iid': this.state.iid,
         'dispname': this.state.dispname,
         'th_code': this.state.th_code,
         'order_num': this.state.order_num,
         'shortname': this.state.shortname,
         'region_code': this.state.region_code,
         'region_name': this.state.region_name,
         'address': this.state.address,
         'telefon': this.state.telefon
      }

      let ob = JSON.stringify(OB);
      let _s = await this.put_Data(ob, event);
      //alert(_s);
      this.props.history.push("/AZK_Form");
      //history={this.props.history}


      event.preventDefault();

   }
   async put_Data(OB, event) {///Отправка формы
      let _body = OB;

      //alert('Отправленное имя: ' + _body);

      let rss = RSS_AZS_EDIT;
      this.props.history.push("/");

      var myRequest = new Request(rss);
      //event.preventDefault();
      try {
         let _ID = JSON.parse(OB).id;
         var response = await fetch(myRequest,
            {
               method: (_ID == "00000000-0000-0000-0000-000000000000") ? 'POST' : 'PUT',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: _body,
            }
         );
         const Jsons = await response.json();
         if (response.ok) {
            this.setState({ _ANS: Jsons });
            return Jsons.status;
            //alert("Команда получила ответ - " + Jsons.status);
         }
         else {
            throw Error(Jsons.message);
         }
      }
      catch (error) {
         console.log(error);
         alert(error);
      }
      return "false";
   }

   closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
      this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
   }


   cancelCourse = () => {
      this.setState({ inputVal: {} });
   }

   handleFormReset = () => {
      this.setState(() => this.initialState)
   }

   render() {

      if (this.props.Data != null) {
         return (
            <div>
               {/*<form onSubmit={this.handleSubmit} >*/}
               <form onSubmit={this.handleSubmit} onReset={this.handleFormReset}>
                  <table>
                     <tbody>

                        {/*<W_row_tr name='id' type="guid" value={this.state.id} handleInputChange={this.handleInputChange} />*/}
                        <W_row_tr name='iid' type="number" value={this.state.iid} handleInputChange={this.handleInputChange} />
                        <W_row_tr name='dispname' type="text" value={this.state.dispname} handleInputChange={this.handleInputChange} />
                        <W_row_tr name='th_code' type="number" value={this.state.th_code} handleInputChange={this.handleInputChange} />
                        <W_row_tr name='order_num' type="number" value={this.state.order_num} handleInputChange={this.handleInputChange} />
                        <W_row_tr name='shortname' type="text" value={this.state.shortname} handleInputChange={this.handleInputChange} />
                        <W_row_tr name='region_code' type="number" value={this.state.region_code} handleInputChange={this.handleInputChange} />
                        <W_row_tr name='region_name' type="text" value={this.state.region_name} handleInputChange={this.handleInputChange} />
                        <W_row_tr name='address' type="text" value={this.state.address} handleInputChange={this.handleInputChange} />
                        <W_row_tr name='telefon' type="text" value={this.state.telefon} handleInputChange={this.handleInputChange} />

                     </tbody>
                  </table>

                  <br />
                  <input
                     type="submit"
                     value="Submit"
                  />
                  <input
                     type="reset"
                     value="Reset"
                  />



                  {/* 
                  <input type="submit" value="Сохранить в БД" />


                  
                  <input type="submit" name="saveCourse" value="Create" />
                  <input type="button" name="cancelCourse" value="cancel" onClick={this.cancelCourse} />


             
                  <button type="submit" value="Submit">Submit</button>
                  <button type="reset" value="Reset">Reset</button>



                  <input type="submit" value="Сохранить в БД" />


                  <button type="cancel" ><a href="/AZK_Form">cancel</a></button>


                  <input type="cancel" ><a href="/AZK_Form">cancel</a></input>


                  <button type="cancel" onclick="return false">Отмена</button>
                  
                  <input type="reset" value="Reset">Reset</input>
                  <input type="cancel" onclick="javascript:window.location='http://stackoverflow.com';">Cancel</input>
                  <button type="cancel" onclick="window.location='http://stackoverflow.com';return false;">Cancel</button>
                  <input class="button" type="button" onclick="window.location.replace('your_url')" value="Cancel" />
                  */}
               </form>
            </div>
         );
      } else {
         return <div>
            <h3>Нет данных</h3>
         </div>
      }
   }
}

