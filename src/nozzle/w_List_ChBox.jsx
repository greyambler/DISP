import React, { Component } from 'react';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';


export default class w_List_ChBox extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = selectedOption => {
        let t = 0;
        let mas = new Array();
        if (this.props.type == 'status') {
            for (const iterator of this.props.list) {
                if (selectedOption.indexOf(iterator) == -1) {
                    mas[t] = iterator.code;
                    t++;
                }
            }
            if (mas.length == 0) {
                this.props.update_Status(null);
            } else {
                this.props.update_Status(mas);
            }
        }
        t = 0;
        mas = new Array();
        if (this.props.type == 'stategun') {
            for (const iterator of this.props.list) {
                if (selectedOption.indexOf(iterator) == -1) {
                    mas[t] = iterator.code;
                    t++;
                }
            }
            if (mas.length == 0) {
                this.props.update_Stategun(null);
            } else {
                this.props.update_Stategun(mas);
            }
        }


        t = 0;
        mas = new Array();
        if (this.props.type == 'fuel') {
            for (const iterator of this.props.list) {
                if (selectedOption.indexOf(iterator) == -1) {
                    mas[t] = iterator.value.toUpperCase();
                    t++;
                }
            }
            if (mas.length == 0) {
                this.props.update_Fuels(null);
            } else {
                this.props.update_Fuels(mas);
            }
        }
        t = 0;
        mas = new Array();
        if (this.props.type == 'azs') {
            for (const iterator of this.props.list) {
                if (selectedOption.indexOf(iterator) == -1) {
                    mas[t] = iterator.value.toUpperCase();
                    t++;
                }
            }
            if (mas.length == 0) {
                this.props.update_Azs(null);
            } else {
                this.props.update_Azs(mas);
            }
        }
        t = 0;
        mas = new Array();
        if (this.props.type == 'state') {
            for (const iterator of this.props.list) {
                if (selectedOption.indexOf(iterator) == -1) {
                    mas[t] = iterator.value;
                    t++;
                }
            }
            if (mas.length == 0) {
                this.props.update_State(null);
            } else {
                this.props.update_State(mas);
            }
        }
    };

    render() {
        if (this.props.list != null) {
            return (
                <ReactMultiSelectCheckboxes
                    width='100%'
                    defaultValue={this.props.list}
                    options={this.props.list}
                    isMulti
                    onChange={this.handleChange}
                />
            );
        } else {
            return <br />;
        }
    }
}
