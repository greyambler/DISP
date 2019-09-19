import React, { Component, PropTypes } from 'react';
import ReactTable from "react-table";
import { AZS_List_Error } from '../core/core_Function.jsx';



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


export default class listErr_AZS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            _MeasList: null,
        }
    }
    componentDidMount() {
        this.setState({ id: this.props.azs_id }, this.tick);
    }
    componentDidUpdate(prevProps) {
        if (this.props.azs_id != prevProps.azs_id) {
            this.setState({ id: this.props.id }, this.tick);
        }
    }
    async tick() {///Получение устройств по ID AZS
        if (this.state.id != 0) {
            let rss = AZS_List_Error + '/' + this.state.id;
            var myRequest = new Request(rss);
            try {
                var response = await fetch(myRequest,
                    {
                        method: 'GET',
                        headers:
                        {
                            'Accept': 'application/json',
                        },
                    }
                );
                if (response.ok) {
                    const Jsons = await response.json();
                    this.setState({ _MeasList: Jsons.MeasList });
                }
                else {
                    throw Error(response.statusText);
                }
                this.setState({ isExistError: false })
            }
            catch (error) {
                this.setState({ isExistError: true })
                console.log(error);
            }
        }
    }

    render() {
        
        let ArCol = new Array();
        if (this.state._MeasList != null) {
            ArCol = Get_ColumnsForTable(this.state._MeasList[0])
            return (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan='2'>
                                    <ReactTable
                                        onFilteredChange={this.Filter_DataExcel}
                                        data={this.state._MeasList}
                                        columns={[
                                            {
                                                Header: "incidents",
                                                columns: ArCol
                                            }
                                        ]}
                                        defaultPageSize={20}

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
        } else 
        {
            return (<center><h1>Нет данных.</h1></center>);
        }
    }
}