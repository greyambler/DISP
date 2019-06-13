import React, { Fragment, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Treebeard } from 'react-treebeard';

import { get_Full_TreeBar, get_Rss } from '../core/core_Function.jsx';
import './treeDevice.css';

export default class treeDevice extends PureComponent {
    constructor(props) {
        super(props);
        this.notActiv_Node = this.notActiv_Node.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.state = {
            notactive: null,
            cursor: null,
            active: false,
            data: get_Full_TreeBar(this.props.objects),//get_Full_TreeBar(get_Rss())
        };
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

        return (
            <div className="tree_css">
                <Treebeard
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
    }
}
