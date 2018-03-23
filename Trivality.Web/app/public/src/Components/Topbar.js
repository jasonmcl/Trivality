import React from 'react';
import RegisterLoginModal from './RegisterLoginModal';
import { Layout, Menu } from "antd";
const { Header } = Layout;

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisible: false
        }
    }

    showLoginModal = () => {
        this.setState({
            loginVisible: true
        })
    }

    hideLoginModal = () => {
        this.setState({
            loginVisible: false
        })
    }

    render() {
        return(
            <Header className="topbar-full">
                <Menu theme="dark" className="float-right topbar-menu" mode="horizontal" selectedKeys={['0']}>
                    {
                        !this.props.loggedIn ? 
                            <Menu.Item>
                                <a onClick={this.showLoginModal}>Log in/Register</a>
                                <RegisterLoginModal hideModal={this.hideLoginModal} visible={this.state.loginVisible} loginFinish={this.props.onLoginFinish}/>
                            </Menu.Item>
                        :
                            <Menu.Item>
                                <a onClick={this.props.onLogout}>Log out</a>
                            </Menu.Item>
                    }
                </Menu>
            </Header>
        );
    }
}

export default Topbar;