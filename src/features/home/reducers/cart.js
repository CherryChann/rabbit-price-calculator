import intialState from '@state/cart';

/* to set and update state of cart according action type */

export default function cart(state = intialState, action) {
    switch (action.type) {
        case 'REQUEST_POST_CART':
            return Object.assign({}, state, {
                isLoading: action.cart.isLoading
            })
        case 'RECEIVE_POST_CART':
            return Object.assign({}, state, {
                isLoading: action.cart.isLoading,
                data: action.cart.data
            })
        case 'FAILED_POST_CART':
            return Object.assign({}, state, {
                isError: action.cart.isError,
                errorMessage: action.cart.message
            })
        default:
            return state
    }
}