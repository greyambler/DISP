import React, { Component } from 'react';
import OL_List from '../core/OL_List.jsx'
import Azs from './azs.jsx'

const _Debuge = false;

export default class list_azs extends Component {
   constructor(props) {
      super(props);
      this.ON_Clisck = this.ON_Clisck.bind(this);
   }

   ON_Clisck(e) {
      if (e != null) {
         this.props.on_Click(e);

         const Id = e.currentTarget.id;
         const name = e.currentTarget.name;
         for (const iterator of this.props.List) {

            var elem = document.getElementById('tb' + iterator.id);

            if (elem != null && Id == iterator.id) {
               elem.className = "th_AZS_Choose";
            } else {
               elem.className = "th_AZS";
            }
         }
      }
   }

   render() {
      if (this.props.List != undefined) {
         return (
            <ul className="hr">
               <center className='TBL' ><h4>Объекты</h4></center>
               <hr /><hr />
               {
                  this.props.List.map(el => (
                     <li key={'li ' + el.id}>
                        <Azs azs={el}
                           key={'AZS_View ' + el.id}
                           id={el.id}
                           on_Click={this.ON_Clisck}
                        />
                     </li>
                  ))
               }
            </ul>
         );
      } else {
         return <br />
      }
   }
}
