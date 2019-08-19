import React, { Component, PropTypes } from 'react';
import { Get_RSS , RSS} from '../core/core_Function.jsx';
import W_main_nozzle from './nozzle/w_main_nozzle.jsx';

const _Debuge = false;

export default class w_NOZZLE extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         header: 'Отображение данных от счетчиков',
      }
   }

   render() {
      //let rss = Get_RSS(RSS, this.props.dateStart, this.props.dateStop);

      return (
         <W_main_nozzle
            header={this.state.header} w_Width={this.props.w_Width}
            startDate={this.props.dateStart} endDate={this.props.dateStop}
            RssDate={RSS}
         />
      );
   }
}
