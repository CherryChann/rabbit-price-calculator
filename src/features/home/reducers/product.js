import intialState from '../State/productState';

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
        default:
            return state
    }
}