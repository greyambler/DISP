import React, { Component, PropTypes } from 'react';
import { Link } from "react-router-dom";
import Tooltip from 'react-tooltip-lite';
import { throws } from 'assert';
//import { Tooltip } from 'bizcharts';

export default class w_head_link extends Component {

   render() {
      let StyleHead = {
         textAlign: "center",
         color: "black",
         fontSize: '12px',
      }
      if (this.props.color == 'red') {
         StyleHead = {
            textAlign: "center",
            color: "red",
            fontSize: '12px',
         }
      }
      switch (this.props.equal) {
         case 'left':
            {
               StyleHead = {
                  textAlign: "left",
                  paddingLeft: "10px",
                  fontSize: '12px',
                  color: "black",
               }
               if (this.props.color == 'red') {
                  StyleHead = {
                     textAlign: "left",
                     paddingLeft: "10px",
                     color: "red",
                     fontSize: '12px',
                  }
               }

               break;
            }
         case 'right':
            {
               StyleHead = {
                  textAlign: "right",
                  paddingRight: "10px",
                  fontSize: '12px',
                  color: "black",
               }
               if (this.props.color == 'red') {
                  StyleHead = {
                     textAlign: "right",
                     paddingRight: "10px",
                     color: "red",
                     fontSize: '12px',
                  }
               }
               break;
            }
         default: break;
      }
      if (this.props.tooltip_text != "") {
         return (
            <th style={StyleHead}>
               <Tooltip content={this.props.tooltip_text}
                  direction="right"
                  tagName="span"
                  className="target">
                  <Link to={this.props.AhrefBack} style={StyleHead}>
                     {this.props.header}
                  </Link>
               </Tooltip>
            </th>
         );
         }else {
            return (
               <th style={StyleHead}>

                  <Link to={this.props.AhrefBack} style={StyleHead}>
                     {this.props.header}
                  </Link>

               </th>
            );
         }
      }
   }
/*
            <Link to="/ChFirst" style={StyleHead}>
               {this.props.header}
            </Link>


*/