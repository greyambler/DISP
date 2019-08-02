import React, { Component, PropTypes } from 'react';
import { Get_RSS, RSS } from './core/core_Function.jsx';
import W_main_post from './Test/w_main_post.jsx';

const _Debuge = false;

export default class w_TestPOST extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         header: 'Тестовая страница POST',
      }
   }

   render() {
      //let rss = Get_RSS(RSS, this.props.dateStart, this.props.dateStop);
      let _height = this.props.w_Height - 150 + "px";
      //w_Height={_height} 
      return (
         <W_main_post
            header={this.state.header} w_Width={this.props.w_Width}
            w_Height={_height} 
            startDate={this.props.dateStart} endDate={this.props.dateStop}
         />
      );
   }
}
