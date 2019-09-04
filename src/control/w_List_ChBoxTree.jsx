import React, { Component } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select';
import isEqual from 'lodash/isEqual'
import 'react-dropdown-tree-select/dist/styles.css'

export default class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (!isEqual(nextProps.data, this.state.data)) {
            this.setState({ data: nextProps.data })
        }
    }

    shouldComponentUpdate = (nextProps) => {
        return !isEqual(nextProps.data, this.state.data)
    }

    render() {

        const { data, ...rest } = this.props;

        return (
            <DropdownTreeSelect

                //simpleSelect={true}
                
                //showDropdown='initial'
                data={this.state.data}
                //showPartiallySelected={true}
                {...rest}
            />
        );

    }
}
