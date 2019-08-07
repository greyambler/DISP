import React, { Component, PropTypes } from 'react';

import { get_DateRSS, get_Rss_ID } from '../core/core_Function.jsx';

import Header from '../control/header.jsx';
import TreeDevice from '../control/treeDevice.jsx';
import List_azs from './list_azs.jsx';
import List_device from './list_device.jsx';




const _Debuge = false;


export default class w_main_azk extends React.Component {
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        this.get_Id_AZS = this.get_Id_AZS.bind(this);
        this.state = {
            Object: null,

            dvcs: null,
            nameAZS: null,
            Rss: this.props.Rss,
        }
    }
    componentDidMount() {
        this.tick();
        //this.timerID = setInterval(() => this.tick(), 30000);
    }
    componentDidUpdate(prevProps) {
        if (this.props.RssDate != prevProps.RssDate) {
            this.setState({ Rss: this.props.RssDate }, this.tick);
        }
    }
    async get_Id_AZS(e) {
        //this.setState({ dvcs: null, nameAZS: null });
        //if (!_Debuge) {
        if (e != null) {
            const Id = e.currentTarget.id;
            const name = e.currentTarget.name;

            var rss = this.props.Rss + Id;

            var myRequest = new Request(rss);
            try {
                var response = await fetch(myRequest);
                if (response.ok) {
                    const Jsons = await response.json();
                    this.setState({ dvcs: Jsons, nameAZS: name, test_mess: rss });
                }
                else {
                    throw Error(response.statusText);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        /*} else {

            this.setState({ dvcs: get_Rss_ID(e.currentTarget.id), nameAZS: e.currentTarget.name });

        }*/
    }
    async tick() {
        //if (!_Debuge) {

        let rss = this.state.Rss;
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
                this.setState({ Object: Jsons });
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
        /*} else {

            this.setState({ Object: get_DateRSS() });

        }*/
    }

    render() {
        const _Objects = this.state.Object;
        if (_Objects != null) {
            //_Objects.obList == undefined ? _Objects.obList : new Array();
            return (
                <div>
                    <center><h4>{this.props.header}</h4></center>
                    <hr />
                    <div className="WinNotTree">

                        <TreeDevice objects={_Objects} Rss={this.state.Rss} />

                        <Header objects={_Objects} />

                        <List_azs objects={_Objects} List={_Objects.obList} on_Click={this.get_Id_AZS} />

                    </div>
                </div>
            );
        } else {
            return <h4><center>Нет связи с сервером!!</center></h4>
        }
    }
}

/*

                        <TreeDevice objects={_Objects} Rss={this.state.Rss} />
                        <Header objects={_Objects} />
                        <List_azs objects={_Objects} List={_Objects.obList} on_Click={this.get_Id_AZS} />

{this.state.dvcs != null &&
                            <div>
                                <List_device
                                    List={this.state.dvcs.dvc}
                                    name={this.state.nameAZS}
                                    ListFuels={_Objects.fuel}
                                />
                            </div>
                        }



<Header objects={_Objects}/>

*/