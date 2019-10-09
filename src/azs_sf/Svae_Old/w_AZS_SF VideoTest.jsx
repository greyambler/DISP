import React from 'react';
import { Button, Header, Image, Modal, Input, Container } from 'semantic-ui-react';
import FilePlayer from './FilePlayer.jsx';






//import { Get_Val, saveToken } from './core/core_Function.jsx';
//import W_main_azs from './azs/w_main_azs.jsx';

const _Debuge = false;

function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 500));
}

export default class w_AZS_SF extends React.Component {
    constructor(props) {
        super(props);
        this.open_Modal = this.open_Modal.bind(this);
        this.close_Modal = this.close_Modal.bind(this);

        this.state = {
            loading: true,
            header: 'Объекты.',
            isExistError: true,

            openModal: false,


            rtsp1: 'rtsp://10.64.184.39:554/user=admin_password=tlJwpbo6_channel=1_stream=0.spd?real_stream',
            rtsp2: 'rtsp://10.64.184.40:554/user=admin_password=tlJwpbo6_channel=1_stream=0.spd?real_stream',

        }
    }
    /***Modal_Alert */

    open_Modal() {
        this.setState({ openModal: true });
    }
    close_Modal() {
        this.setState({ openModal: false });
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
        if (loading) { // && this.state._MeasList == null) {
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

        let size = 'mini';//'large';//'tiny';

        //let r = ReactPlayer.canPlay(this.state.rtsp2);

        return (
            <>
<FilePlayer/>
                <video src={this.state.rtsp1}>
                    Your browser does not support the VIDEO tag and/or RTP streams.
</video>

                {/*url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                <div>w_AZS_SF</div>
                <button onClick={() => {
                    this.open_Modal();
                    //alert("Hello world!");
                }}>Test</button>

                <div className='player-wrapper'>
                    <ReactPlayer
                        className='react-player'
                        url='rtsp://10.64.184.40:554/user=admin_password=tlJwpbo6_channel=1_stream=0.spd?real_stream'
                        width='100%'
                        height='100%'
                    />
                </div>
*/}

                {/*
                <Modal size={size} open={this.state.openModal} onClose={this.close_Modal} closeIcon>
                    <Modal.Header><center><Image src='/images/24/No connection.png' /></center></Modal.Header><Modal.Content>
                        <p>Ошибка при выполнении команды</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative>No</Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content='Yes'
                            onClick={this.close_Modal}
                        />
                    </Modal.Actions>
                </Modal>
                */}
            </>
        );
    }
}
