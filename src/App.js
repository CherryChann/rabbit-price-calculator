import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store/store.js';
import HomePage from './features/home/component/index';
import SuccessPage from './features/successPage/component/index';

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

const App = () => (
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={HomePage}></Route>
            <Route exact path="/success" component={SuccessPage}></Route>
        </Router>
    </Provider>
)


export default App;