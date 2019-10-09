import React from 'react';
import { Button, Header, Image, Modal, Input, Container } from 'semantic-ui-react';

export default class w_ModalError extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            openModal: this.props.openModal,
            View_Modal: this.props.View_Modal,
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.openModal != prevProps.openModal) {
            this.setState({ openModal: this.props.openModal });
        }
    }
    render() {
        let size = 'mini';//'tiny';//'mini';//'large';//'tiny';
        let style_Im01 = {
            //position: 'absolute',
            width: '64px',
            height: '64px',
            left: '277px',
            top: '54px',
            background: '#DE0417',
            boxShadow: '0px 0px 20px rgba(222, 4, 23, 0.5)',
        }
        let style_Image = {
            //position: 'absolute',
            width: '34px',
            height: '34px',
            //left: '277px',
            top: '7px',
        }
        let style_btn = {
            //position: 'absolute',
            width: '120px',
            height: '34px',
            left: '0%',
            right: '0%',
            top: '0%',
            bottom: '0%',
            background: '#DE0417',
            borderRadius: '4px',
        }
        let style_Text = {
            //position: 'absolute',
            //width: '312px',
            height: '49px',
            //left: '152px',
            //top: '142px',
            top: '42px',
            fontFamily: 'Neusa Next Pro',
            fontSize: '16px',
            lineHeight: '108.2 %',
            /* or 19px */
            color: '#4B5767',
        }
        // <Modal size={size} open={this.state.openModal} onClose={this.close_Modal} closeIcon>
        return (
            <Modal size={size} open={this.state.openModal}>
                <Modal.Header>
                    <center>
                        <Image style={style_Image} src='/images/24/No connection.png' />
                    </center>
                </Modal.Header>
                <center>
                    <div style={style_Text}>Ошибка при выполнении команды</div>
                </center>

                <Modal.Actions>
                    <center>
                        <Button style={style_btn} onClick={e => { this.props.View_Modal(false) }} negative>Ok</Button>
                    </center>
                </Modal.Actions>
            </Modal>
        );
    }
}
