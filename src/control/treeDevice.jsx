import React, { Fragment, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Treebeard } from 'react-treebeard';

//import { get_Full_TreeBar, get_Rss } from '../core/core_Function.jsx';
import './treeDevice.css';


function IsNotExit_ID(data, ID) {
    for (const iterator of data) {
        if (iterator.id == ID) {
            return false;
            break;
        }
    }
    return true;
}
/*
function Get_Prop(data) {
    let children = null;
    for (const item of data) {
        children = new Array();
        let t = 0;
        children[t] = { id: item.id, key: item.id, name: item.typ, type: item.typ, children: null };
        t++;

    }
    return children;
}
function Get_Children_ID(data, ID) {
    let children = null;
    for (const iterator of data) {
        if (iterator.id == ID) {

            children = new Array();
            let t = 0;
            for (const item of iterator.dvc) {
                
                let CH = null;
                if (item.prop.length > 0) {
                    CH = Get_Prop(item.prop);
                }
                
                children[t] = { id: item.id, key: item.id, name: item.nm, type: item.typ, children: CH };
                t++;
            }
        }
    }
    return children;
}

const dec ={
    Container: (props) => {
        return (
            <div onClick={props.onClick}>
                <img src='./images/oil_1.png' width="18" height="25"/>
                {props.node.name}
            </div>
        );
    }
}
*/

export default class treeDevice extends PureComponent {
    constructor(props) {
        super(props);

        this.get_Full_TreeBar = this.get_Full_TreeBar.bind(this);
        this.get_Child = this.get_Child.bind(this);
        this.get_Child_ID = this.get_Child_ID.bind(this);
        this.get_Rss_ID = this.get_Rss_ID.bind(this);
        this.Get_Children_ID = this.Get_Children_ID.bind(this);

        this.notActiv_Node = this.notActiv_Node.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.state = {
            Rss: this.props.Rss,
            Objects: this.props.objects,
            notactive: null,
            cursor: null,
            active: false,
            data: null,//this.get_Full_TreeBar(this.props.objects),//get_Full_TreeBar(get_Rss())
            MASS_DVC: new Array(),
        };
    }
    
    componentDidMount() {
        this.get_Full_TreeBar();
        //this.tick();
        //this.timerID = setInterval(() => this.tick(), 30000);
    }

    get_Full_TreeBar() {
        let J_Rss = this.state.Objects;//JSON.parse(_Json);
        let IsOnlyAZS = false;
        let D_Tree = null;

        if (!IsOnlyAZS) {
            let Fuels = { 'name': 'Топливо', "key": "Tree_ObLists", "children": this.get_Child(J_Rss.fuel), 'toggled': true };
            //new d_tree_TreeBar('Топливо', get_ListChildTreeBar(J_Rss.fuel, 'fuel'), 'fuel', false);
            let TpList = { 'name': 'Оборудование', "key": "Tree_ObLists", "children": this.get_Child(J_Rss.tpList), 'toggled': true };
            //new d_tree_TreeBar('Оборудование', get_ListChildTreeBar(J_Rss.tpList, 'tpList'), 'tpList', false);
            let ObLists = { 'name': 'АЗК', "key": "Tree_ObLists", "children": this.get_Child(J_Rss.obList), 'toggled': true };
            //new d_tree_TreeBar('АЗК', get_ListChildTreeBar(J_Rss.obList, 'obList'), 'obList', false);
            D_Tree = { 'name': 'Справочники', "key": "Tree_root", "children": [Fuels, ObLists, TpList], 'toggled': true };
            //new d_tree_TreeBar('Справочники', [Fuels, ObLists, TpList], 'root', true);

        } else {
            let ObLists = { 'name': 'АЗК', "key": "Tree_ObLists", "children": this.get_Child(J_Rss.obList), 'toggled': true };
            D_Tree = { 'name': 'Справочники', "key": "Tree_root", "children": [ObLists], 'toggled': true };
        }
        this.setState({ data: D_Tree });
    }

    get_Child(list) {
        let children = Array();
        let t = 0;
        for (const item of list) {
            let J_Rss_ID = this.get_Child_ID(item.id);
            children[t] = { id: item.id, key: item.id, name: item.nm, fu: item.fu, children: J_Rss_ID };
            t++;
        }
        if (children.length == 0) {
            children = null;
        }
        return children;
    }
    get_Child_ID(_ID) {
        let children = null;
        if (IsNotExit_ID(this.state.MASS_DVC, _ID)) {
            this.get_Rss_ID(_ID);
        }
        children = this.Get_Children_ID(this.state.MASS_DVC, _ID);
        return children;
    }

    Get_Children_ID(data, ID) {
        let children = null;
        for (const iterator of data) {
            if (iterator.id == ID) {
                children = this.get_Child(iterator.dvc)
            }
        }
        return children;
    }
    async get_Rss_ID(_ID) {

        let rss = this.state.Rss + _ID;
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
                if (IsNotExit_ID(this.state.MASS_DVC, Jsons.id)) {
                    let mass_div = [{ 'id': Jsons.id, 'dvc': Jsons.dvc }];
                    for (const iterator of this.state.MASS_DVC) {
                        mass_div.splice(0, -1, iterator);
                    }
                    this.setState({ MASS_DVC: mass_div }, this.get_Full_TreeBar);
                }
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

    notActiv_Node() {
        if (this.state.cursor != null) {
            this.state.cursor.active = false;
        }
    }

    onToggle(node, toggled) {
        const { cursor, notactive, data } = this.state;

        if (cursor) {
            this.setState({ notactive: cursor, active: false }, this.notActiv_Node());
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState({ cursor: node, data: Object.assign({}, data) });
    }

    render() {
        const { data } = this.state;
        if (data != null) {
            return (
                <div className="tree_css" key='Treebeard_div'>
                    <Treebeard key='Treebeard_W'
                        data={data}
                        onToggle={this.onToggle}

                        style={{
                            /*
                            tree: {
                                base: { background: 'white', fontSize: '11px', fontWeight: 'bold' },
                                node: {
                                    activeLink: { color: 'brown', background: 'rgb(0, 141, 141)' },
                                }
                            }*/

                            tree: {
                                base: {
                                    background: 'white',
                                    listStyle: 'none',
                                    backgroundColor: '#21252B',
                                    margin: 0,
                                    padding: 0,
                                    color: 'red',
                                    fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
                                    fontSize: '11px'
                                },
                                node: {
                                    base: {
                                        position: 'relative'
                                    },
                                    link: {
                                        cursor: 'pointer',
                                        position: 'relative',
                                        padding: '0px 5px',
                                        display: 'block'
                                    },
                                    activeLink: {
                                        background: 'rgb(0, 141, 141)'
                                    },
                                    toggle: {
                                        base: {
                                            position: 'relative',
                                            display: 'inline-block',
                                            verticalAlign: 'top',
                                            marginLeft: '-5px',
                                            height: '24px',
                                            width: '24px'
                                        },
                                        wrapper: {
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            margin: '-7px 0 0 -7px',
                                            height: '14px'
                                        },
                                        height: 14,
                                        width: 14,
                                        arrow: {
                                            fill: '#9DA5AB',
                                            strokeWidth: 0
                                        }
                                    },
                                    header: {
                                        base: {
                                            display: 'inline-block',
                                            verticalAlign: 'top',
                                            color: '#9DA5AB'
                                        },
                                        connector: {
                                            width: '2px',
                                            height: '12px',
                                            borderLeft: 'solid 2px black',
                                            borderBottom: 'solid 2px black',
                                            position: 'absolute',
                                            top: '0px',
                                            left: '-21px'
                                        },
                                        title: {
                                            lineHeight: '24px',
                                            verticalAlign: 'middle',
                                            color: 'black',
                                        }
                                    },
                                    subtree: {
                                        listStyle: 'none',
                                        paddingLeft: '19px'
                                    },
                                    loading: {
                                        color: '#E2C089'
                                    }
                                }
                            }
                        }}


                    />

                </div>
            );
        } else {
            return <br />
        }
    }
}
