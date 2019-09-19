import React, { Component, PropTypes } from 'react';
import { Get_Val, Is_Text_MORE } from '../core/core_Function.jsx';

/*
function Get_Val(mas, key, isFull) {
    let R = "";
    let len = mas.length;
    if (len > 0) {
        R = mas[len - 1][key];
    }   
    R = isFull 
    ? R 
    : (R.length > 36)? R.substr(0, 36): R; 
    return R;
}



function Is_Text_MORE(MASS, main) {
    let text = Get_Val(MASS, main,true);
    let n = Number(MASS[MASS.length - 1]['id']);
    if (MASS != null && MASS != undefined && isNaN(n))// && MASS[MASS.length - 1]['id'].length > 10) 
    {
        if (text.length > 10) {
            return false;
        }
    }
    return true;
}*/

export default class tco_Dvc_Item_Tree extends Component {
    render() {
        let main = this.props.PROPERTYS;
        let MASS = this.props.MASS_LIBRR;
        let isKeyShow = this.props.isKeyShow;
        let p = this.props.N;
        let F = this.props.FirstPROPS;
        if (MASS[MASS.length - 1].id == "-----") {
            let r = 0;
        }
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
                                <td rowSpan={MASS.length - (1 + p)} id={Is_Text_MORE(MASS, main) ? 'td_ID' : 'td_ID_MinFont'}
                                //id='TD_DEV'
                                    title={Get_Val(MASS, "nm", true)}>

                                    {Get_Val(MASS, "nm", false)}

                                </td>
                            }

                            {
                                MASS.length - (1 + F) > 1 ?
                                    (
                                        <td colSpan='2' id={Is_Text_MORE(MASS, main) ? 'td_ID' : 'td_ID_MinFont'}
                                            title={Get_Val(MASS, main, true)}>
                                            {F < p &&
                                                <hr />
                                            }
                                            {Get_Val(MASS, main, false)}

                                        </td>

                                    ) : (
                                        <td colSpan='3' id={Is_Text_MORE(MASS, main) ? 'td_ID' : 'td_ID_MinFont'}
                                            title={Get_Val(MASS, main, true)}>
                                            {Get_Val(MASS, main, false)}
                                        </td>
                                    )
                            }
                        </tr>

                        {
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
