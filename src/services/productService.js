import APIManager from './APIManager'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const FAILED_PRODUCTS = 'FAILED_PRODUCTS';

const requestProducts = () => { // to set loading status of product from initital state
    return {
        type: 'REQUEST_PRODUCTS',
        product: {
            isLoading: true
        }
    }
}

const failedProducts = (message) => { // to set error status from initital state
    return {
        type: 'FAILED_PRODUCTS',
        product: {
            errorMessage: message,
            isError: true
        }
    }
}
const receiveProducts = (data) => { // to set loading status and products from API response from initital state
    return {
        type: 'RECEIVE_PRODUCTS',
        product: {
            isLoading: false,
            data: data
        }
    }
}

const fetchProducts = () => {
    return dispatch => {
        dispatch(requestProducts())
        APIManager.axios.get('/products') // to call api end point to receive products 
        .then(response => {
            if (response.status === 200) {
                let products = response.data
                console.log(response, 'response from api')
                dispatch(receiveProducts(products)) // to store products from response in state 
            } else {
                dispatch(failedProducts(APIManager.error.notfound))
            }
        }).catch(err => {
            console.log(err)
            dispatch(failedProducts(APIManager.error.network))
        });
    }
}

const shouldGetProductsAgain = (state) => { // to check whether products are already in state
    if (state.product.data.length) {
        return false;
    } else {
        return true;
    }
}

export const getProductsIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldGetProductsAgain(getState())) { // to check whether products are already in state if not api will be called. if so, we will use state data
            return dispatch(fetchProducts())
        } else {
            return Promise.resolve()
        }
    }
}
