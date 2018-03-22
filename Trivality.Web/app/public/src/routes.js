import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NavBar from './Views/NavBar/NavBar';
import App from './Views/App/App';
import Accounts from './Views/AccountList/AccountList';
import Profile from './Views/Profile/Profile';
import QuizStart from './Views/QuizStart/QuizStart';
import Webscrape from './Views/Webscrape/Webscrape';

const Routes = () => (
    <Router>
        <NavBar>
            <Route exact path="/" component={App}/>
            <Route path="/accounts" component={Accounts}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/quizstart" component={QuizStart} />
            <Route path="/webscrape" component={Webscrape} />
        </NavBar>
    </Router>
);

export default Routes;