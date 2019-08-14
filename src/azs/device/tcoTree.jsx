import React, { Component } from 'react';
import { Stage, Layer, Rect, Text, Circle, Shape, Image } from 'react-konva';
import { RSS_Type_List, get_DVC_TREE, Get_Device, Get_MainHead, Get_Val, get_NameFuel } from '../../core/core_Function.jsx';
import AZS_Image from '../../control/AZS_Image.jsx'

import Tco_Item_Tree from '../../control/tco_Item_Tree.jsx';
import Tco_Dvc_Item_Tree from '../../control/tco_Dvc_Item_Tree.jsx';


const _Debuge = false;

function get_ICON_Fuel(TCO_0) {
    let NUM_STATE_TSO = Number(TCO_0[TCO_0.length - 1]['STATE_TSO']);

    let col = '/images/TCO_Error.png';
    if (!isNaN(NUM_STATE_TSO)) {
        switch (NUM_STATE_TSO) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11: col = '/images/TCO_Ok.png'; break;
            default: col = '/images/TCO_NoConect.png'; break;
        }
    }
    return col;
}

function Is_FindDEVICE(id, MassDev) {
    if (MassDev != null && MassDev != undefined) {

        let mass = MassDev[MassDev.length - 1];
        if (Array.isArray(mass)) {
            if (mass['id'] == id) {
                return mass;
            } else {
                return null;
            }
        }
    }
    return null;
}
function Get_Device_ID_WS(id, TCO) {
    let mass = null;
    if (TCO[0] != null && TCO[0] != undefined) {
        mass = Is_FindDEVICE(id, TCO[0]);

        if (mass == null && TCO[1] != null && TCO[1] != undefined) {
            for (const iterator of TCO[1]) {
                mass = Is_FindDEVICE(id, iterator);
                if (mass != null) {
                    //    return mass;
                    break;
                }
            }
        }
    }
    return mass;
}
function Is_View_Row(Data, Name_Row) {
    let row = false;
    if (Data != undefined) {
        for (const iterator of Data) {
            if (iterator == Name_Row) {
                row = true;
                break;
            }
        }
        let r = 0;
    }

    return row;
}


export default class tcoTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TCO: null,
            DeVal: null,
        }
    }
    componentDidMount() {
        this.setState({ TCO: this.props.TCO });
        this.setState({ DeVal: this.props.DeVal });

    }
    componentDidUpdate(prevProps) {
        if (this.props.TCO != prevProps.TCO) {
            this.setState({ TCO: this.props.TCO });
        }
        if (this.props.DeVal != prevProps.DeVal) {
            this.setState({ DeVal: this.props.DeVal }, this.full_Value);
        }
    }
    full_Value() {
        if (this.state.TCO != null) {


            if (this.state.DeVal != null && this.state.DeVal != undefined && this.state.DeVal.id != null) {

                let F_mass = Get_Device_ID_WS(this.state.DeVal.id, this.state.TCO);

                if (F_mass != null) {
                    for (const iterator of this.state.DeVal.values) {
                        if (iterator.comment != null && iterator.comment != undefined) {
                            F_mass[iterator.typ] = iterator.comment + ' [' + iterator.val + '] ';
                        } else {
                            F_mass[iterator.typ] = iterator.val;
                        }
                    }
                    this.setState({ TCO: this.state.TCO });
                }
                /*                
                                
                                                if (this.state.TCO[0] != null && this.state.TCO[0] != undefined) {
                                                    let mass = Is_FindDEVICE(this.state.DeVal.id, this.state.TCO[0]);
                                                    if (mass == null && this.state.TCO[1] != null && this.state.TCO[1] != undefined) {
                                                        for (const iterator of this.state.TCO[1]) {
                                                            mass = Is_FindDEVICE(this.state.DeVal.id, iterator);
                                                            if (mass != null) {
                                                                let r = 0;
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    if (mass != null) {
                                                        for (const iterator of this.state.DeVal.values) {
                                                            mass[iterator.typ] = iterator.val;
                                                        }
                                                       this.setState({ TCO: this.state.TCO }); 
                                                    }
                                                }
                                                */
            }
        }
    }
    render() {
        if (this.state.TCO != null) {

            let V_ID = Get_Val(this.state.TCO[0], "id")

            let _height = 60;
            let _width = (V_ID == 6) ? 110 : 110;
            let _dX = 2;
            let PL_width = _width + _dX + 0.4;
            let Icon_TCO = get_ICON_Fuel(this.state.TCO[0]);

            //id={(V_ID != 6) ? 'Li_Level' : 'li_Level'}>

            let MASS = this.state.TCO[0];
            let DEVICES = null;
            if (this.state.TCO[1] != null) {
                DEVICES = this.state.TCO[1];
            }
            let F = 2;
            let isKeyShow = false;
            //View_Fields={this.props.View_Fields}

            //{this.props.View_Icon &&
            //let r = Is_View_Row(this.props.View_Fields, 'icon_alarm');
            //{ Is_View_Row(this.props.View_Fields, 'icon_alarm') &&
            //id={(V_ID != 6) ? 'Li_Level_tco' : 'li_Level'}>
            return (
                <div>
                    <table
                        id={(V_ID != 6) ? 'Li_Level' : 'li_Level'}>
                        <tbody>

                            {Is_View_Row(this.props.View_Fields, 'icon_alarm') &&
                                <tr>
                                    <td colSpan='2'>
                                        <Stage width={PL_width} height={_height + 30} x={_dX} y={0}>
                                            <Layer key='1'>
                                                <AZS_Image Image={Icon_TCO} _W='65' _H='55' _X={0 + 4} _Y={0 + 14} />

                                                {this.state.TCO.id != 0 && /*this.state.TRK.status == 1 &&*/
                                                    <Text Text={get_NameFuel(this.state.TCO.fuel, this.props.fuels)} x='2' y='75' fill='black'
                                                        fontSize='14' fontFamily='Calibri' />
                                                }
                                            </Layer>
                                        </Stage>
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td colSpan='2'>
                                    <hr />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='2'>
                                    <hr />
                                </td>
                            </tr>
                            {
                                MASS.map((main, p) => (
                                    (Is_View_Row(this.props.View_Fields, 'data') || main == 'nm') &&
                                    <Tco_Item_Tree PROPERTYS={main} MASS_LIBRR={MASS} isKeyShow={isKeyShow} FirstPROPS={F} N={p}
                                    />
                                ))
                            }

                            {DEVICES != null &&
                                DEVICES.map(m_MASS => (
                                    m_MASS.map((main, p) => (
                                        (Is_View_Row(this.props.View_Fields, 'data')) &&
                                        <Tco_Dvc_Item_Tree PROPERTYS={main} MASS_LIBRR={m_MASS} isKeyShow={isKeyShow} FirstPROPS={F} N={p}
                                            IsHead={this.props.IsHead}
                                        />
                                    ))
                                ))
                            }

                        </tbody>
                    </table>
                </div>

            );
        }
        else {
            return <br />
        }
    }
}
