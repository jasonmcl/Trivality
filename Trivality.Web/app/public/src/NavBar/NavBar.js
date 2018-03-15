import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';

class NavBar extends React.Component {
    render() {
        return (
            <div className="toggled" id="wrapper">
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <span className="sideLink">Title</span>
                        </li>
                        <li>
                            <Link to='/' className="sideLink" href=""><i className=""></i>Home</Link>
                        </li>
                        <li>
                            <Link to='/register' className="sideLink" href=""><i className=""></i>Accounts</Link>
                        </li>
                    </ul>
                </div>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;