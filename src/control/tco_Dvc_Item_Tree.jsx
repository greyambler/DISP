import React, { Component, PropTypes } from 'react';
import { Get_Val } from '../core/core_Function.jsx';

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
                                <td rowSpan={MASS.length - (1 + p)}>

                                    {Get_Val(MASS, "nm")}

                                </td>
                            }
                            {
                                MASS.length - (1 + F) > 1 ?
                                    (
                                        <td colSpan='2' id='td_ID'>
                                            {Get_Val(MASS, main)}
                                            {/*MASS.length - (1 + p) >= 2 &&
                                                <hr />
                                            */}
                                        </td>
                                    ) : (
                                        <td colSpan='3' id='td_ID' >
                                            {Get_Val(MASS, main)}
                                        </td>
                                    )
                            }
                        </tr>

                        {/*
                            MASS.length - (1 + p) == 1 &&
                            <tr>
                                <td colSpan='2' >
                                    <hr />
                                </td>
                            </tr>
                        */}
                    </>
                }
            </>);
    }
}
