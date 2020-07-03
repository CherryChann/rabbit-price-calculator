import { combineReducers } from 'redux';

import product from './product.js';
import location from './location.js';
import cart from './cart.js';


const calculator = combineReducers({ 
    product,
    location,
    cart
})
export default calculator;