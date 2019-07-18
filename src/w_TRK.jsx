import React, { Component, PropTypes } from 'react';
import { Get_RSS , RSS} from './core/core_Function.jsx';
import W_main_trk from './trk/w_main_trk.jsx';

const _Debuge = false;

export default class w_TRK extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         header: 'Отображение данных с ТРК',
      }
   }

   render() {
      return (
         <W_main_trk
            header={this.state.header} w_Width={this.props.w_Width}
            startDate={this.props.dateStart} endDate={this.props.dateStop}
            RssDate={RSS}
         />
      );
   }
}
