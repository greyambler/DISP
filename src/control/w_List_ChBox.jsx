import React from 'react';
import MultiSelect from "@khanacademy/react-multi-select";


export default class w_List_ChBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        }
    }

    componentDidMount() {
        this.setState({ selected: this.props.list });
    }
    componentDidUpdate(prevProps) {
        if (this.props.list != prevProps.list) {
            this.setState({ selected: this.props.list });
        }
    }

    handleChange = selectedOption => {
        this.setState({ selected: selectedOption });

        let t = 0;
        let mas = new Array();
        if (this.props.type == 'status') {
            for (const iterator of this.props.list) {
                if (selectedOption.indexOf(iterator.value) == -1) {
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
                if (selectedOption.indexOf(iterator.value) == -1) {
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
                if (selectedOption.indexOf(iterator.value) == -1) {
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
                if (selectedOption.indexOf(iterator.value) == -1) {
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
        if (this.props.type == 'pump') {
            for (const iterator of this.props.list) {
                if (selectedOption.indexOf(iterator.value) == -1) {
                    mas[t] = iterator.value.toUpperCase();
                    t++;
                }
            }
            if (mas.length == 0) {
                this.props.update_Pump(null);
            } else {
                this.props.update_Pump(mas);
            }
        }
        t = 0;
        mas = new Array();
        if (this.props.type == 'state') {
            for (const iterator of this.props.list) {
                if (selectedOption.indexOf(iterator.value) == -1) {
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
        t = 0;
        mas = new Array();
        if (this.props.type == 'VIEW_VIDG') {
            for (const iterator of this.props.list) {
                if (selectedOption.indexOf(iterator.value) == -1) {
                    mas[t] = iterator.value;
                    t++;
                }
            }
            if (mas.length == 0) {
                this.props.update_VIEW_VIDG(null);
            } else {
                this.props.update_VIEW_VIDG(mas);
            }
        }

    };
    render() {
        if (this.props.list != null && this.state.selected) {
            //const { selected } = this.state;
            //onSelectedChanged={selected => this.setState({ selected })}
            //onSelectedChanged={this.handleChange}

            return (
                <MultiSelect
                    options={this.props.list}
                    selected={this.state.selected}
                    onSelectedChanged={this.handleChange}
                    overrideStrings={{
                        selectSomeItems: "Выберите ...",
                        allItemsAreSelected: "Все выбрано",
                        selectAll: "Выбрать все",
                        search: "Поиск",
                    }}
                />
            );
        } else {
            return <br />;
        }
    }
}

