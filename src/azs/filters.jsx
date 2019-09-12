import React, { Component } from 'react';
import W_List_ChBoxTree from '../control/w_List_ChBoxTree.jsx';

const _Debuge = false;

export default class filters extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let r1 = {
            width: 0,
        }
        if (this.props.text_head != "") {
            r1 = {
                width: 30,
                paddingRight: 10,
                paddingLeft: 10,
                textAlign: 'left',
                fontSize: '12px',
            }
        }
        let r2 = {
            textAlign: 'left',
            //fontSize: '14px',
            verticalAlign: 'top',
            minWidth: '240px',
        }
        return (
            <center>
                <table>
                    <tbody>
                        <tr>
                            <td style={r1}>
                                {this.props.text_head}
                            </td>
                            <td style={r2}>
                                <W_List_ChBoxTree data={this.props.dataFilter}
                                    onChange={(currentNode, selectedNodes) => { this.props.update_VIEW(selectedNodes) }}
                                />
                            </td>

                        </tr>
                    </tbody>
                </table>
            </center>
        );
    }
}

