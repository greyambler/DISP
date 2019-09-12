import React, { Component, PropTypes } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

const _Debuge = false;
function Get_ColumnsForTable(F_Item) {
    let ArCol = new Array();
    let t = 0;
    let KeyHead = '';
    if (F_Item != null) {
        for (var key in F_Item) {
            KeyHead = key;
            ArCol[t] = { Header: KeyHead, accessor: key };
            t++;
        }
    }
    return ArCol;
}

export default class w_lst_OBJ_table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ArCol: null,
            DATA: null,
        }
    }
    componentDidMount() {
        this.setState({ ArCol: this.props.ArCol, DATA: this.props.data, });

    }
    componentDidUpdate(prevProps) {
        if (this.props.ArCol != prevProps.ArCol) {
            this.setState({ ArCol: this.props.ArCol });
        }
        if (this.props.data != prevProps.data) {
            this.setState({ DATA: this.props.data });
        }
    }

    render() {
        if (this.state.ArCol != null && this.state.DATA != null) {
            return (
                <ReactTable
                    data={this.state.DATA}
                    columns={[
                        {
                            Header: this.props.header,
                            columns: this.state.ArCol
                        }
                    ]}
                    getTrProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: () => {
                                this.props.ChooseTableRow(rowInfo);
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
                />
            );
        } else {
            return <br />
        }
    }
}
