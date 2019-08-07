import React, { Component } from 'react';

import OL_List from '../core/OL_List.jsx'
import Text_A from '../core/Text_A.jsx'

const _Debuge = false;

export default class header extends Component {
   constructor(props) {
      super(props);
   }

   render() {
      let Objest = this.props.objects;
      let Ob_Mass = new Array();
      Ob_Mass[0] = Objest.obList != undefined ? Objest.obList : new Array();
      Ob_Mass[1] = Objest.fuel;
      Ob_Mass[2] = Objest.tpList;

      return (
         <div>
            <table>
               <tbody>
                  <tr  className='TBL'> 
                  <th colSpan='3'><h3>Справочники</h3></th>
                  </tr>
                  <tr>
                     <th className='TBL'>АЗС (obList)</th>
                     <th className='TBL'>Топливо (Fuel)</th>
                     <th className='TBL'>Оборудование (TpList)</th>
                     {_Debuge &&
                        <th>Ответ с сервера</th>
                     }
                  </tr>
                  <tr>
                     <td>
                        <OL_List ListVal={Objest.obList} type={'ObList'} id="Ob_List_Class" />
                     </td>
                     <td>
                        <OL_List ListVal={Objest.fuel} type={'Fuel'} id="Fuel_Class" />
                     </td>
                     <td>
                        <OL_List ListVal={Objest.tpList} type={'TpList'} id="Tp_List_Class" />
                     </td>
                     {_Debuge &&
                        <td>
                           <Text_A Ob_Mass={Ob_Mass} />
                        </td>
                     }
                  </tr>
               </tbody>
            </table>
            <hr /><hr />
         </div>
      );
   }
}