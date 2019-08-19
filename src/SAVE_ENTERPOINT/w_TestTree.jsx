import React, { Component, PropTypes } from 'react';
import { Get_RSS, RSS } from '../core/core_Function.jsx';
import W_main_tree from './Test/TREE/w_main_treeHead.jsx';

const _Debuge = false;

export default class w_TestTree extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         header: 'Тестовая страница TREE',
      }
   }

   render() {
      //let rss = Get_RSS(RSS, this.props.dateStart, this.props.dateStop);
      let _height = this.props.w_Height - 150 + "px";
      //w_Height={_height} 
      return (
         <W_main_tree
            header={this.state.header} w_Width={this.props.w_Width}
            w_Height={_height} 
            startDate={this.props.dateStart} endDate={this.props.dateStop}
            _List_Objs={this.props._List_Objs}
         />
      );
   }
}
