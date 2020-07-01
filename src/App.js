import React, { Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from './features/home/component/index';
const App = () => (
    <Router>
        <Route exact path="/" component={HomePage}></Route>
    </Router>
)


export default App;