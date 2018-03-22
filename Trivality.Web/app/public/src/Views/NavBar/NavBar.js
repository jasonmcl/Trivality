import React from "react";
import { NavLink } from "react-router-dom";
//import TopBar from '../TopBar/TopBar';
import RegisterLoginModal from '../RegisterLoginModal/RegisterLoginModal';
import "./NavBar.css";
import { Layout, Menu, Icon } from "antd";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
const { Header, Content, Footer, Sider } = Layout;

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            current: '/',
            loginVisible: false,
            loggedIn: false,
            user: {}
        }
    }

    componentDidMount = () => {
        this.getCurrUser();
        this.setState({
            current: this.props.location.pathname
        })
    }

    getCurrUser = () => {
        axios.get('/api/user/current')
        .then(resp => {
            const user = resp.data.item;
            console.log(user);
            let loggedIn = user.id !== 0;
            this.setState({
                loggedIn: loggedIn,
                user: user
            })
        })
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    handleClick = e => {
        this.setState({
            current: e.key
        })
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

    handleLoginFinish = () => {
        this.getCurrUser();
    }

    handleLogout = () => {
        axios.get('/api/user/logout')
        .then(resp => {
            console.log(resp);
            this.getCurrUser();
        })
    }

  render() {
    return (
        <Layout style={{height: "100vh"}}>
            <Sider className='sidebar-full' collapsible="true" >
                <div className="logo" />
                <Menu className='sidebar-menu' theme="dark" selectedKeys={[this.state.current]} onClick={this.handleClick}>
                    <Menu.Item key="/">
                        <NavLink to="/">
                            <Icon type="home"/>
                            <span className="nav-text">Home</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/accounts">
                        <NavLink to='/accounts' className="nav-text">
                            <Icon type="user"/>
                            <span className="nav-text">Accounts</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/profile">
                        <NavLink to='/profile'>
                            <Icon type="profile" />
                            <span className="nav-text">Profile</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/quizstart">
                        <NavLink to='/quizstart'>
                            <Icon type="question-circle" />
                            <span className="nav-text">Start Quiz</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/webscrape">
                        <NavLink to='/webscrape'>
                            <Icon type="copy" />
                            <span className="nav-text">Webscrape</span>
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="topbar-full">
                    <Menu theme="dark" className="float-right topbar-menu" mode="horizontal" selectedKeys={['0']}>
                        {
                            !this.state.loggedIn ? 
                                <Menu.Item>
                                    <a onClick={this.showLoginModal}>Log in/Register</a>
                                    <RegisterLoginModal hideModal={this.hideLoginModal} visible={this.state.loginVisible} loginFinish={this.handleLoginFinish}/>
                                </Menu.Item>
                            :
                                <Menu.Item>
                                    <a onClick={this.handleLogout}>Log out</a>
                                </Menu.Item>
                        }
                    </Menu>
                </Header>
                <Content>{this.props.children}</Content>
            </Layout>
        </Layout>
    );
  }
}

export default withRouter(NavBar);