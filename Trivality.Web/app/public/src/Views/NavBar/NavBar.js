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
            current: '1',
            loginVisible: false,
            loggedIn: false,
            user: {}
        }
    }

    componentDidMount = () => {
        this.getCurrUser();
    }

    getCurrUser = () => {
        axios.get('/api/user/current')
        .then(resp => {
            const user = resp.data.item;
            console.log(user);
            let loggedIn = user.id != 0;
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
      <div>
        <Layout>
            <Sider className='sidebar-full' collapsible="true" style={{height: '100vh'}}>
                <div className="logo" />
                <Menu className='sidebar-menu' theme="dark" selectedKeys={[this.state.current]} onClick={this.handleClick}>
                    <Menu.Item key="1">
                        <NavLink to="/">
                            <Icon type="home"/>
                            <span className="nav-text">Home</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to='/accounts' className="nav-text">
                            <Icon type="user"/>
                            <span className="nav-text">Accounts</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to='/profile'>
                            <Icon type="profile" />
                            <span className="nav-text">Profile</span>
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
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(NavBar);

/*
<div className="toggled" id="wrapper">
                <div id="sidebar-wrapper" className="navbar-expand-lg">
                    <ul className="sidebar-nav">
                        <li>
                            <NavLink exact to='/' className="sideLink" activeClassName="active" href=""><i className=""></i>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/accounts' className="sideLink" activeClassName="active" href=""><i className=""></i>Accounts</NavLink>
                        </li>
                        <li>
                            <NavLink to='/accounts1' className="sideLink" activeClassName="active" href=""><i className=""></i>Accounts</NavLink>
                        </li>
                        <li>
                            <NavLink to='/accounts2' className="sideLink" activeClassName="active" href=""><i className=""></i>Accounts</NavLink>
                        </li>
                        <li>
                            <NavLink to='/accounts3' className="sideLink" activeClassName="active" href=""><i className=""></i>Accounts</NavLink>
                        </li>
                        <li>
                            <NavLink to='/accounts4' className="sideLink" activeClassName="active" href=""><i className=""></i>Accounts</NavLink>
                        </li>
                        <li>
                            <NavLink to='/accounts5' className="sideLink" activeClassName="active" href=""><i className=""></i>Accounts</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <TopBar/>
                </div>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>
            </div>
*/
