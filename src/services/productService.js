import APIManager from './APIManager'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';


export const requestProducts = () => {
    return {
        type: 'REQUEST_PRODUCTS',
        products: {
            isLoading: true
        }
    }
}


const receiveProducts = (data) => {
    return {
        type: 'RECEIVE_PRODUCTS',
        products: {
            isLoading: false,
            data: data
        }
    }
}

const fetchProducts = () => {
    return dispatch => {
        dispatch(requestProducts())
        APIManager.axios.get('/products')
        .then(response => response.json())
        .then(json => dispatch(receiveProducts(json)))
    }
}

export default receiveProducts;

const shouldGetProductsAgain = (state) => {
    if (state.products.data.length) {
        return false;
    } else {
        return true;
    }
}

export const getProductsIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldGetProductsAgain(getState())) {
            return dispatch(fetchProducts())
        } else {
            return Promise.resolve()
        }
    }
}
