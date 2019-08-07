import React, { Component, PropTypes } from 'react';

import TreeDevice from './treeDevice.jsx';

import { RSS_Type_List } from '../../core/core_Function.jsx';

const _Debuge = false;

export default class w_main_tree extends React.Component {
    myRef = React.createRef();
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);

        this.state = {
            Obj: null,
        };
    }
    componentDidMount() {
        this.tick();
    }
    async tick() {
        let rss = RSS_Type_List;
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
                this.setState({ Obj: Jsons });
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

    render() {
        const _Objs = this.state.Obj;
        if (_Objs != null && _Objs.dvctyptree != undefined) {
            const _DVC_Tree =_Objs.dvctyptree;
            return (
                <div>
                    <h1><center>{this.props.header}</center></h1>
                    <hr /><hr />
                    <TreeDevice objects={_DVC_Tree}/>
                    <hr /><hr />

                </div>
            );

        } else {
            return (
                <div>
                    <center><h4>{this.props.header}</h4></center>
                    <hr /><hr />                    
                </div>
            );
        }
    }
}

/*


<TreeDevice objects={_Objects} Rss={this.state.Rss} />


*/
