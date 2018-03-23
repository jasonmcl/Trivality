import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import FullLayout from './Views/FullLayout';
import App from './Views/App';
import Accounts from './Views/AccountList';
import Profile from './Views/Profile';
import QuizStart from './Views/QuizStart';
import Webscrape from './Views/Webscrape';

const Routes = () => (
    <Router>
        <FullLayout>
            <Route exact path="/" component={App}/>
            <Route path="/accounts" component={Accounts}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/quizstart" component={QuizStart} />
            <Route path="/webscrape" component={Webscrape} />
        </FullLayout>
    </Router>
);

export default Routes;