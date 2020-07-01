import { applyMiddleware, createStore, compose} from 'redux';
import loggerMiddleware from 'redux-logger'; // to log the redux state
import thunkMiddleware from 'redux-thunk'; // to let dispatch function
import calculatorReducer from '../features/home/reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)(createStore)(calculatorReducer);

export default store;