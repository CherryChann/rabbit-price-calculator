import { combineReducers } from 'redux';

import product from './product.js';
import location from './location.js';


const calculator = combineReducers({ 
    product,
    location
})
export default calculator;