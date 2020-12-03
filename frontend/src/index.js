import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Dashboard from './components/dashboardAlt'
import Upload from './components/upload';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
   <Router>
        <div>
        <Switch>
            <Route exact path="/" component={Upload} />
            <Route exact path="/dashboard/:id" component={Dashboard} />
        </Switch>
        </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
