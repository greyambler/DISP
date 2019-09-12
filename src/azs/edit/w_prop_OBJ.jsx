import React, { Component, PropTypes } from 'react';
import { Get_Val, createGuid } from '../../core/core_Function.jsx';

const _Debuge = false;

export default class w_prop_OBJ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _AZS: this.props._AZS,
            _MASS: this.props._MASS,
        }
    }
    componentDidMount() {
        this.setState({ _AZS: this.props._AZS, _MASS: this.props._MASS, });

    }
    componentDidUpdate(prevProps) {
        if (this.props._AZS != prevProps._AZS) {
            this.setState({ _AZS: this.props._AZS });
        }
        if (this.props._MASS != prevProps._MASS) {
            this.setState({ _MASS: this.props._MASS });
        }
    }

    render() {
        if (this.state._MASS != null && this.state._AZS != null) {
            return (
                <>
                    <h4>Свойства азк</h4>
                    <hr />
                    <table>
                        <tbody>
                            {
                                this.state._MASS.map((main, p) => (
                                    (main != "id" && main != "iid" && !Array.isArray(main)) &&
                                    <tr key={'tr_' + createGuid()}>
                                        <td key={'td_' + createGuid()}>{main}</td>
                                        <td>{Get_Val(this.state._MASS, main)}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <br />
                    <hr /> <hr />
                </>
            );
        } else {
            return <br/>
        }
    }
}
