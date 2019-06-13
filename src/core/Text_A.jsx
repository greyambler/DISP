import React from 'react';
import OL_List from './OL_List.jsx'

export default class Text_A extends React.Component {
   //{"id":"2","nm":"резервуар"}
   render() {
      var messa = '';
      if (this.props.Ob_Mass != null) {
         for (const iterator of this.props.Ob_Mass) {
            var t = new OL_List(iterator);
            messa = messa + t.Get_str();
         }
      }
      return (
         <textarea className="te_Mess"
            defaultValue={messa} />
      );
   }
}