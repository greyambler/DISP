import React, { Component, PropTypes } from 'react';
import { Get_Val, Is_Text_MORE } from '../core/core_Function.jsx';
/*
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
}
*/


export default class tco_Item_Tree extends Component {
    render() {
        let main = this.props.PROPERTYS;
        let MASS = this.props.MASS_LIBRR;
        let isKeyShow = this.props.isKeyShow;
        let F = this.props.FirstPROPS;
        let p = this.props.N;

        if(MASS[MASS.length - 1][main].crit != undefined){
            let r = 0;
        }
        let style = {
            background: 'white',
        }
        if (MASS[MASS.length - 1][main].crit != undefined) {
            switch (MASS[MASS.length - 1][main].crit.toString()) {
                case '0': {
                    style = {
                        background: 'white',
                    }
                    break;
                }
                case '1': {
                    style = {
                        background: 'white',
                    }

                    break;
                }
                case '2': {
                    style = {
                        background: 'yellow',
                    }

                    break;
                }
                case '3': {
                    style = {
                        background: 'hotpink',
                    }

                    break;
                }
            }
        }



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
                                <td colSpan='3' id={Is_Text_MORE(MASS, main) ? 'td_ID' : 'td_ID_MinFont'}
                                    style={style}
                                    title={Get_Val(MASS, main, true)}>
                                    {Get_Val(MASS, main, false)}
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
