import React, { Component, PropTypes } from 'react';
import { RSS_Tanks, Get_RSS, RSS } from '../core/core_Function.jsx';
import W_main_level from './level/w_main_level.jsx';

const _Debuge = false;

export default class w_LEVEL extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         header: 'Отображение данных от уровнемеров',         
      }
   }7

   render() {
      //let rss = Get_RSS(RSS, this.props.dateStart, this.props.dateStop);

      return (
         <W_main_level
            header={this.state.header} w_Width={this.props.w_Width}
            startDate={this.props.dateStart} endDate={this.props.dateStop}
            Rss={RSS_Tanks}
         />
      );
   }
}
