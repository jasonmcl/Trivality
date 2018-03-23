import React from "react";
import Topbar from '../Components/Topbar';
import Sidebar from '../Components/Sidebar';
import "../Styles/NavBar.css";
import { Layout } from "antd";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
const { Content } = Layout;

class FullLayout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
            //console.log(user);
            let loggedIn = user.id !== 0;
            this.setState({
                loggedIn: loggedIn,
                user: user
            })
        })
    }

    handleLoginFinish = () => {
        this.getCurrUser();
        if(this.props.location.pathName === '/profile'){
            this.props.history.push('/');
        }
    }

    handleLogout = () => {
        axios.get('/api/user/logout')
        .then(resp => {
            console.log(resp);
            this.getCurrUser();
            this.props.history.push('/');
        })
    }

    render() {
        return (
            <Layout style={{height: "100vh"}}>
                <Sidebar />
                <Layout>
                    <Topbar loggedIn={this.state.loggedIn} onLoginFinish={this.handleLoginFinish} onLogout={this.handleLogout} />
                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(FullLayout);