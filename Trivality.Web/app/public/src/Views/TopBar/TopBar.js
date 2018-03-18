import React from 'react';
import {Link} from 'react-router-dom'
import './TopBar.css';
import RLModal from '../RegisterLoginModal/RegisterLoginModal';

class TopBar extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark topBar fixed-top">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto topbar-hide">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/accounts" className="nav-link">Accounts</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a data-toggle="modal" data-target="#rlmodal" className="nav-link">Login/Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <RLModal id="rlmodal"/>
            </nav>
        );
    }
}

export default TopBar;