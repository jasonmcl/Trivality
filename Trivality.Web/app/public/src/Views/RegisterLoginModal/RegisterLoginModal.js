import React from 'react';
import './RegisterLoginModal.css';
import Register from '../../Components/Register';
import Login from '../../Components/Login';
import axios from 'axios';
import {Modal, Tabs} from 'antd';
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

    render() {
        const rlTabs = (
            <Tabs defaultActiveKey="login" onChange={this.handleTabClick}>
                <TabPane tab="Log in" key="login"><Login onInputChange={this.handleInputChange} formVal={this.state.loginInfo}/></TabPane>
                <TabPane tab="Register" key="register"><Register onInputChange={this.handleInputChange} formVal={this.state.regInfo}/></TabPane>
            </Tabs>
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
                >
                </Modal>
            </div>
        );
    }
}

export default RegisterLoginModal;

/*
<div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header container-fluid">
                        <nav className="nav nav-tabs nav-fill">
                            <a className={"nav-item nav-link" + (this.state.activeTab==='login'?' active': '')} onClick={()=>this.handleTabClick('login')}>Log in</a>
                            <a className={"nav-item nav-link" + (this.state.activeTab==='register'?' active': '')} onClick={()=>this.handleTabClick('register')}>Register</a>
                        </nav>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        { 
                            this.state.activeTab === 'register' &&
                            <Register onInputChange={this.handleInputChange} formVal={this.state.regInfo} />
                        }
                        {
                            this.state.activeTab === 'login' &&
                            <Login onInputChange={this.handleInputChange} formVal={this.state.loginInfo} />
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button onClick={this.handleSubmitClick} type="button" className="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </div>
            </div>
*/