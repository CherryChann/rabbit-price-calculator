import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Store/store.js';
import HomePage from './features/home/component/index';
const App = () => (
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={HomePage}></Route>
        </Router>
    </Provider>
)


export default App;