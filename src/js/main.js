// main.js
import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute, hashHistory } from 'react-router'
import App from 'components/app'

render((
    <Router history={ hashHistory }
        location="hash">
        <Route path="/"
            component={ App }></Route>
    </Router>
    ), document.getElementById('main'))
