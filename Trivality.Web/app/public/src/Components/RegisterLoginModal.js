import React from 'react';
import '../Styles/RegisterLoginModal.css';
import Register from './Register';
import Login from './Login';
import axios from 'axios';
import {Modal, Tabs, Button, Icon} from 'antd';
const TabPane = Tabs.TabPane;

class RegisterLoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "login",
            regInfo: {
                username: "",
                email: "",
                password: "",
                confirmPass: ""
            },
            loginInfo: {
                username: "",
                password: ""
            }
        }
    }

    handleTabClick = (tab) => {
        this.setState({
            activeTab: tab
        })
        this.clearFormValues();
    }

    handleInputChange = (e, type) => {
        let values = this.state[type];
        values[e.target.name] = e.target.value;
        this.setState({
            [type]: values
        });
    }

    handleSubmitClick = () => {
        if(this.state.activeTab === "register") {
            axios.post('/api/user/register', this.state.regInfo)
            .then(resp => {
                console.log(resp);
                // $("#" + this.props.id).modal('hide');
                this.props.hideModal();
                this.props.loginFinish();                
            })
        } else if(this.state.activeTab === "login") {
            console.log(this.state.loginInfo);
            axios.post("/api/user/login", this.state.loginInfo)
            .then(resp => {
                console.log(resp);
                this.props.hideModal();
                this.props.loginFinish();
            })
        }

        this.clearFormValues();
    }

    clearFormValues = () => {
        const regInfo = {
            username: "",
            email: "",
            password: "",
            confirmPass: ""
        };

        const loginInfo = {
            username: "",
            password: ""
        };

        this.setState({
            regInfo: regInfo,
            loginInfo: loginInfo
        });
    }

    handleCancel = () => {
        this.clearFormValues();
        this.props.hideModal();
    }

    handleFBClick = () => {
        console.log("FB clicked");
        FB.login(response => {
            if (response.status === "connected") {
                axios.get("https://graph.facebook.com/me?redirect=false&access_token=" + response.authResponse.accessToken + "&fields=email, name, picture")
                    .then(resp => {
                        axios.post("api/user/login/facebook", resp.data)
                            .then(resp => {
                                console.log(resp);
                                this.props.hideModal();
                                this.props.loginFinish();
                            });
                    });
            } else {
                console.log(response);
            }
        },{ scope: "public_profile, email" });
    }

    render() {
        const rlTabs = (
            <Tabs defaultActiveKey="login" onChange={this.handleTabClick}>
                <TabPane tab="Log in" key="login"><Login onInputChange={this.handleInputChange} formVal={this.state.loginInfo}/></TabPane>
                <TabPane tab="Register" key="register"><Register onInputChange={this.handleInputChange} formVal={this.state.regInfo}/></TabPane>
            </Tabs>
        );

        const footer = (
            <div>
                <Button onClick={this.handleFBClick} className="float-left btn-facebook"><Icon type="facebook" />Continue with Facebook</Button>
                <Button onClick={this.handleCancel}>Cancel</Button>
                <Button type="primary" onClick={this.handleSubmitClick}>Submit</Button>
            </div>
        );

        return(
            <div>
                <Modal title={rlTabs}
                    visible={this.props.visible}
                    onOk={this.handleSubmitClick}
                    confirmLoading={false}
                    onCancel={this.handleCancel}
                    bodyStyle={{padding:'0px'}}
                    maskStyle={{backgroundColor: 'rgba(34,34,34,0.75)'}}
                    footer = {footer}
                >
                </Modal>
            </div>
        );
    }
}

export default RegisterLoginModal;