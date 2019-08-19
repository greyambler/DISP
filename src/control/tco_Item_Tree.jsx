import React, { Component, PropTypes } from 'react';
import { Get_Val } from '../core/core_Function.jsx';

function Is_Text_MORE(MASS, main) {
    let text = Get_Val(MASS, main);
    let n = Number(MASS[MASS.length - 1]['id']);
    if (MASS != null && MASS != undefined && isNaN(n))// && MASS[MASS.length - 1]['id'].length > 10) 
    {
        if (text.length > 12) {
            return false;
        }
    }
    return true;
}


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
                                <td colSpan='3' id={Is_Text_MORE(MASS, main) ? 'td_ID' : 'td_ID_MinFont'}>
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
