import React, { Component, PropTypes } from 'react';
import { Get_RSS,RSS } from '../core/core_Function.jsx';
import W_main_azk from './azk/w_main_azk.jsx';

const _Debuge = false;

export default class w_AZK extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         header: 'Конфигурация объектов',
      }
   }

   render() {
      //let rss = Get_RSS(RSS, this.props.dateStart, this.props.dateStop);

      return (
         <W_main_azk
            header={this.state.header} w_Width={this.props.w_Width}
            startDate={this.props.dateStart} endDate={this.props.dateStop}
            Rss={RSS}
         />
      );
   }
}
