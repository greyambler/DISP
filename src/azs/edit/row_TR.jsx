import React, { Component, PropTypes } from 'react';


export default class row_TR extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let style_td_name = {
            verticalAlign: 'center',
            height: '30px',
            width: "90px",
        }
        let style_td_value = {
            verticalAlign: 'center',
            height: '30px',
            width: "50px",
        }
        let style_td_input = {
            verticalAlign: 'center',
            height: '30px',
            width: "300px",
        }
        let style_input = {

            width: '100%',

        }
        return (
            <tr>
                <td style={style_td_name}>{this.props.name}</td>
                {/*<td style={style_td_value}>{this.props.value}</td> */}
                <td style={style_td_input}>
                    <input type={this.props.type} style={style_input}
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.props.handleInputChange}
                    />
                </td>
            </tr>
        );
    }
}