import React, { Component, PropTypes } from 'react';
import { Get_Val } from '../core/core_Function.jsx';


export default class tco_Item_Tree extends Component {
    render() {
        let main = this.props.PROPERTYS;
        let MASS = this.props.MASS_LIBRR;
        let isKeyShow = this.props.isKeyShow;
        let F = this.props.FirstPROPS;
        let p = this.props.N;
        return (
            <>
                {
                    (!Array.isArray(main) && p >= F) &&
                    <>
                        <tr>
                            {isKeyShow &&
                                <td>
                                    {main}
                                </td>
                            }
                            {MASS.length - (1 + F) > 1 &&
                                <td colSpan='3'  id='td_ID'>
                                    {Get_Val(MASS, main)}
                                </td>
                            }
                        </tr>
                        <tr>
                            <td colSpan='3' >
                                <hr />
                            </td>
                        </tr>
                    </>
                }
            </>
        );
    }
}
