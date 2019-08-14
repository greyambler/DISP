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

export default class tco_Dvc_Item_Tree extends Component {
    render() {
        let main = this.props.PROPERTYS;
        let MASS = this.props.MASS_LIBRR;
        let isKeyShow = this.props.isKeyShow;
        let p = this.props.N;
        let F = this.props.FirstPROPS;
        return (
            <>
                {(!Array.isArray(main) && p >= F) &&
                    <>
                        <tr>
                            {
                                isKeyShow &&
                                <td>
                                    {main}
                                    {MASS.length - (1 + p) >= 2 &&
                                        <hr />
                                    }
                                </td>
                            }
                            {
                                this.props.IsHead &&
                                p == F && MASS.length - (1 + p) > 1 &&
                                <td rowSpan={MASS.length - (1 + p)} id='TD_DEV'>

                                    {Get_Val(MASS, "nm")}

                                </td>
                            }

                            {
                                MASS.length - (1 + F) > 1 ?
                                    (
                                        <td colSpan='2' id={Is_Text_MORE(MASS, main) ? 'td_ID' : 'td_ID_MinFont'}>
                                            {F < p &&
                                                <hr />
                                            }
                                            {Get_Val(MASS, main)}

                                        </td>

                                    ) : (
                                        <td colSpan='3' id={Is_Text_MORE(MASS, main) ? 'td_ID' : 'td_ID_MinFont'}>
                                            {Get_Val(MASS, main)}
                                        </td>
                                    )
                            }
                        </tr>

                        {/**/
                            MASS.length - (1 + p) == 1 &&
                            <tr>
                                <td colSpan='2' >
                                    <hr />
                                </td>
                            </tr>
                        }
                    </>
                }
            </>);
    }
}
