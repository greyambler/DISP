import React, { Component, PropTypes } from 'react';
import ReactTable from "react-table";
import { RSS_AZS_EDIT } from '../../core/core_Function.jsx';


function Get_ColumnsForTable(F_Item) {

    let ArCol = new Array();
    if (F_Item != null) {
        let t = 0;
        let KeyHead = '';
        if (F_Item != null) {
            for (var key in F_Item) {
                KeyHead = key;
                ArCol[t] = { Header: KeyHead, accessor: key };
                t++;
            }
        }
    }
    return ArCol;
}



export default class w_TableEditASZS extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ListData: this.props.ListData,
        };
    }
    componentDidMount() {
        this.setState({ ListData: this.props.ListData });
    }
    componentDidUpdate(prevProps) {
        if (this.props.ListData != prevProps.ListData) {
            this.setState({ ListData: this.props.ListData });
        }
    }
    ChooseAZS(rowInfo) {
        if (rowInfo != null) {
            let _Obj_T = new Array();
            let _Obj_T_M = new Array();
            let i = 0;
            for (const key in rowInfo.original) {
                if (!Array.isArray(key)) {
                    _Obj_T[i] = key;
                    i++;
                    if (rowInfo.original.hasOwnProperty(key)) {
                        _Obj_T_M[key] = rowInfo.original[key];
                    }
                }
            }
            _Obj_T.push(_Obj_T_M);
            this.props.SetCurentAZS(_Obj_T)
            //this.setState({ curentAZS: rowInfo.original, curentAZS_M: _Obj_T });
        }
    }
    render() {
        let ArCol = new Array();
        if (this.state.ListData != null) {
            ArCol = Get_ColumnsForTable(this.state.ListData[0])
            let MASS = this.state.curentAZS_M;
            return (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan='2'>
                                    <ReactTable
                                        onFilteredChange={this.Filter_DataExcel}
                                        data={this.state.ListData}
                                        columns={[
                                            {
                                                Header: "incidents",
                                                columns: ArCol
                                            }
                                        ]}
                                        getTrProps={(state, rowInfo, column, instance) => {
                                            return {
                                                onClick: () => {
                                                    this.props.SetCurentAZS(rowInfo);
                                                }
                                            }
                                        }}
                                        defaultPageSize={10}
                                        filterable={true}
                                        show={false}
                                        nextText={'>'}
                                        previousText={'<'}
                                        rowsText={'строк'}
                                        width={150}

                                        pageText={'стр.'}
                                        ofText={'из'}
                                        className="-striped -highlight"
                                    >
                                    </ReactTable>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <h4>Нет данных</h4>
            );
        }
    }
}