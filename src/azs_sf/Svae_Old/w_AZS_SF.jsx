import React from 'react';
import { Button, Header, Image, Modal, Input, Container } from 'semantic-ui-react';

import W_ModalError from './control/w_ModalError.jsx'
import W_ModalSucces from './control/w_ModalSucces.jsx'

const _Debuge = false;

function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 500));
}

export default class w_AZS_SF extends React.Component {
    constructor(props) {
        super(props);

        this.View_Modal_Err = this.View_Modal_Err.bind(this);
        this.View_Modal_Ok = this.View_Modal_Ok.bind(this);

        this.state = {
            loading: true,
            header: 'Объекты.',
            isExistError: true,

            openModal_Err: false,
            openModal_Ok: false,
        }
    }
    /***Modal_Alert */
    View_Modal_Err(stt) {
        this.setState({ openModal_Err: stt });
    }
    View_Modal_Ok(stt) {
        this.setState({ openModal_Ok: stt });
    }
    /***Modal_Alert */

    componentDidMount() {

        demoAsyncCall().then(() => this.setState({ loading: false }));
    }
    componentDidUpdate(prevProps) {
        if (this.props._List_Objs != prevProps._List_Objs) {
            this.setState({ _List_Objs: this.props._List_Objs }, this.Get_FieldsPL);
        }
    }



    render() {
        const { loading } = this.state;
        if (loading) {
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
        return (
            <>
                <h1>w_AZS_SF</h1>

                <button onClick={e => { this.View_Modal_Err(true) }}>Test err</button>
                <button onClick={e => { this.View_Modal_Ok(true) }}>Test ok</button>

                <W_ModalError openModal={this.state.openModal_Err} View_Modal={this.View_Modal_Err} />

                <W_ModalSucces openModal={this.state.openModal_Ok} View_Modal={this.View_Modal_Ok} />
            </>
        );

        /*
                return (
                    <>
                        <h1>w_AZS_SF</h1>
                        <button onClick={this.open_Modal}>Test</button>
                        <Modal size={size} open={this.state.openModal} onClose={this.close_Modal}>
                            <Modal.Header>
                                <center>
                                    <Image style={style_Im1} src='/images/24/No connection.png' />
                                </center>
                            </Modal.Header>
                            <center>
                            <div style={style_Text1}>Ошибка при выполнении команды</div>
                            </center>
                            
                            <Modal.Actions>
                                <center>
                                    <Button style={style_Btn1} onClick={this.close_Modal} negative>Ok</Button>
                                </center>
                            </Modal.Actions>
                        </Modal>
        
                    </>
                );
                */
    }
}
