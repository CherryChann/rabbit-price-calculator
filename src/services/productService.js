import APIManager from './APIManager'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const FAILED_PRODUCTS = 'FAILED_PRODUCTS';

const requestProducts = () => {
    return {
        type: 'REQUEST_PRODUCTS',
        product: {
            isLoading: true
        }
    }
}

const failedProducts = (message) =>{
    return {
        type: 'FAILED_PRODUCTS',
        product: {
            errorMessage: message,
            isError: true
        }
    }
}
const receiveProducts = (data) => {
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
        APIManager.axios.get('/products')
        .then(response => {
            if (response.status === 200) {
                let products = response.data
                console.log(response, 'response from api')
                dispatch(receiveProducts(products))
            } else {
                dispatch(failedProducts(APIManager.error.notfound))
            }
        }).catch(err => {
            console.log(err)
            dispatch(failedProducts(APIManager.error.network))
        });
    }
}

const shouldGetProductsAgain = (state) => {
    if (state.product.data.length) {
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
