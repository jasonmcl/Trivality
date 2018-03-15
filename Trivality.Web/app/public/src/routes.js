import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from './NavBar/NavBar';
import App from './App';
import Register from './Register';

const Routes = () => (
    <Router>
        <div>
            <NavBar>
                <Route exact path="/" component={App}/>
                <Route path="/register" component={Register}/>
            </NavBar>
        </div>
    </Router>
);

export default Routes;