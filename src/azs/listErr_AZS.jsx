import React, { Component, PropTypes } from 'react';
import ReactTable from "react-table";
import { AZS_List_Error, Get_RSS } from '../core/core_Function.jsx';
import { Stage, Layer, Rect, Text, Circle, Shape, Image, Ellipse } from 'react-konva';
import AZS_Image from '../control/AZS_Image.jsx'

import moment from 'moment';



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
function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500));
}

export default class listErr_AZS extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,


            isExistError: true,
            id: null,
            _MeasList: null,

            err: 'Ошибка! Сервер не ответил!',
        }
    }
    componentDidMount() {
        this.setState({ id: this.props.azs_id }, this.tick);

        demoAsyncCall().then(() => this.setState({ loading: false }));
    }
    componentDidUpdate(prevProps) {
        if (this.props.azs_id != prevProps.azs_id) {
            this.setState({ id: this.props.id }, this.tick);
        }
    }
    async tick() {///Получение устройств по ID AZS
        if (this.state.id != 0) {

            let endDate = new Date();
            let end = moment();
            let start = moment().add(-14, "day");

            //const startPast_Week = moment().startOf('week').isoWeekday(1).add(-7, 'day');
            //const endPast_Week = moment().startOf('week').isoWeekday(0);


            let rss_datу = Get_RSS(AZS_List_Error + '/' + this.state.id + '/meases', start, end);
            rss_datу = rss_datу + '&crit=1';

            let rss = AZS_List_Error + '/' + this.state.id + '/meases?from=2019-09-11T15:00:00&to=2019-09-13T16:00:00';
            var myRequest = new Request(rss_datу);
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
        const { loading } = this.state;
        if (loading && this.state._MeasList == null) {
            //            return null; // render null when app is not ready
            let stayle_1 = {
                marginTop: '130px',
            }
            return (
                <div align="center">
                    <center><h1>Запрос данных.</h1></center>
                    <img src='images/anim_engine.gif' style={stayle_1} />
                </div>
            );
        }

        let ArCol = new Array();
        if (!this.state.isExistError) {
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
        } else {
            return (<center><h1>Нет данных.</h1></center>);
        }
    }
}