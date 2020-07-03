import intialState from '@state/product';

/* to set and update state of product according action type */

export default function product(state = intialState, action) {
    switch (action.type) {
        case 'REQUEST_PRODUCTS':
            return Object.assign({}, state, {
                isLoading: action.product.isLoading
            })
        case 'RECEIVE_PRODUCTS':
            return Object.assign({}, state, {
                isLoading: action.product.isLoading,
                data: action.product.data
            })
        case 'FAILED_LOCATIONS':
            return Object.assign({}, state, {
                isError: action.product.isError,
                errorMessage: action.product.message
            })
        default:
            return state
    }
}