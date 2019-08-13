import React, { Component, PropTypes } from 'react';
import TreeDevice from './treeDevice.jsx';

import { RSS_Type_List, get_DVC_TREE, Get_Device, Get_MainHead, Get_Val } from '../../core/core_Function.jsx';

import Tco_Item_Tree from '../../control/tco_Item_Tree.jsx';
import Tco_Dvc_Item_Tree from '../../control/tco_Dvc_Item_Tree.jsx';
import W_CheckBox from '../../control/w_List_ChBox.jsx';
import W_List_ChBoxTree from '../../control/w_List_ChBoxTree.jsx';

//import Writ_Keys from '/writ_Keys.jsx';

const _Debuge = false;
export default class w_main_tree extends React.Component {
    //myRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            TCO: null,
        };
    }
    componentDidMount() {
        this.setState({ TCO: Get_Device("tso") });

    }
    render() {
        if (this.state.TCO != null) {
            let MASS = Get_MainHead(this.state.TCO);
            let DEVICES = new Array();
            for (const item of this.state.TCO.dvctyptree) {
                DEVICES.push(Get_MainHead(item));
            }
            let F = 2;
            let isKeyShow = false;


            let r1 = {
                width: 90,
                paddingLeft: 20,
                //height: 15,
                textAlign: 'left',
                fontSize: 12,
            }
            let r2 = {
                width: 120,
                //color: 'black',
                //background: 'yellow',
                //fontSize: 20,
                //paddingLeft : 20,
                //height: 15,
                textAlign: 'left',
                fontSize: 12,
            }
            return (
                <div>
                    <table>
                        <tbody>
                            <tr>

                                <td style={r1}>Статус</td>
                                <td style={r2}><W_CheckBox list={this.state.status} update_Status={this.props.update_Status} type='status' /></td>

                            </tr>
                            <tr>
                                <td style={r2}>
                                {/*
                                    <W_List_ChBoxTree data={data}
                                        onChange={(currentNode, selectedNodes) => { this.props.update_VV_TREE(selectedNodes) }}
                                    />
                                */}
                                </td>
                            </tr>

                            {/*
                                MASS.map((main, p) => (
                                    <Tco_Item_Tree PROPERTYS={main} MASS_LIBRR={MASS} isKeyShow={isKeyShow} FirstPROPS={F} N={p} />
                                ))
                            */}

                            {
                                DEVICES.map(MASS => (
                                    MASS.map((main, p) => (
                                        <Tco_Dvc_Item_Tree PROPERTYS={main} MASS_LIBRR={MASS} isKeyShow={isKeyShow} FirstPROPS={F} N={p} 
                                            IsHead={true}
                                        />
                                    ))
                                ))
                            }
<hr/>
<hr/>
<hr/>
<hr/>
<hr/>
                            {/*
                                DEVICES.map(MASS => (
                                    MASS.map((main, p) => (
                                        <>
                                            {(!Array.isArray(main) && p >= F) &&
                                                <>
                                                    <tr>
                                                        {isKeyShow &&
                                                            <td >
                                                                {main}
                                                                {MASS.length - (1 + p) >= 2 &&
                                                                    <hr />
                                                                }
                                                            </td>
                                                        }
                                                        {this.props.IsHead &&
                                                            p == F && MASS.length - (1 + p) > 1 &&
                                                            <td id='td_ID' rowSpan={MASS.length - (1 + p)}
                                                                >
                                                                {Get_Val(MASS, "nm")}
                                                            </td>
                                                        }

                                                        {MASS.length - (1 + F) > 1 ?
                                                            (
                                                                <td colSpan='2'>
                                                                    {Get_Val(MASS, main)}
                                                                    {MASS.length - (1 + p) >= 2 &&
                                                                        <hr />
                                                                    }
                                                                </td>
                                                            ) : (
                                                                <td colSpan='2'>
                                                                    {Get_Val(MASS, main)}

                                                                </td>

                                                            )
                                                        }
                                                    </tr>

                                                    {MASS.length - (1 + p) == 1 &&
                                                        <tr>
                                                            <td colSpan='2'>
                                                                <hr />
                                                            </td>
                                                        </tr>
                                                    }
                                                </>
                                            }
                                        </>
                                    ))
                                ))
                            */}
                            {<tr>
                                <td colSpan='2'>
                                    <br />
                                </td>
                            </tr>}

                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <h1> Нет массива</h1>
            );
        }
    }
}
