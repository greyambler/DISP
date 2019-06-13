import React from 'react';


export default class OL_List extends React.Component {
   constructor(props) {
      super(props);
      this.state = { List: this.props.obList };
   }
/*
   componentDidUpdate(prevProps) {
      //this.setState({ 'List': prevProps.ListVal });
   }
*/
   Get_str() {
      let Mes = '';
      for (const iterator of this.props) {
         Mes = Mes + 'id - ' + iterator.id + '\tnm - ' + iterator.nm + "\n";
      }
      return Mes;
   }

   render() {
      let _OL = {
         verticalAlign: 'top',
         paddingLeft: 30,
      }

      const List = this.props.ListVal;
      if (List != null) {
         return (
            <ol style={_OL}>
               {
                  List.map(el => (
                     <li key={el.id}>{el.nm}</li>
                  ))
               }
            </ol>
         );
      }
      else if (this.state.List != null) {
         return (
            <ol style={_OL}>
               {
                  this.state.List.map(el => (
                     <li key={el.id}>{el.nm}</li>
                  ))
               }
            </ol>
         );
      }
   }
};
