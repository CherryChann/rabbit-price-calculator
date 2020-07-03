import APIManager from './APIManager';
export const REQUEST_POST_CART = 'REQUEST_POST_CART';
export const RECEIVE_POST_CART = 'RECEIVE_POST_CART';
export const FAILED_POST_CART = 'FAILED_POST_CART';

const requestPostCart = () => {
    return {
        type: 'REQUEST_POST_CART',
        cart: {
            isLoading: true
        }
    }
}


const receivePostCart = (data) => {
    return {
        type: 'RECEIVE_POST_CART',
        cart: {
            isLoading: false,
            data: data,
            redirectTo: 'success'
        }
    }
}
const failedPostCart = (message) => {
    return {
        type: 'FAILED_POST_CART',
        cart: {
            errorMessage: message,
            isError: true
        }
    }
}

export const postCart = (data, history) => {
    return dispatch => {
        dispatch(requestPostCart())
        APIManager.axios.post('/cart', data)
        .then(response => {
            if (response.status === 201) {
                let cart = response.data
                history.push('/success');
                dispatch(receivePostCart(cart))
            } else {
                dispatch(failedPostCart(APIManager.error.notfound))
            }
        }).catch(err => {
            console.log(err)
            dispatch(failedPostCart(APIManager.error.network))
        });
    }
}
