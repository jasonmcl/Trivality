import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from './Views/NavBar/NavBar';
import App from './Views/App/App';
import Accounts from './Views/AccountList/AccountList';
import Profile from './Views/Profile/Profile';

const Routes = () => (
    <Router>
        <div>
            <Switch>
                <NavBar>
                    <Route exact path="/" component={App}/>
                    <Route path="/accounts" component={Accounts}/>
                    <Route path="/profile" component={Profile}/>
                </NavBar>
            </Switch>
        </div>
    </Router>
);

export default Routes;