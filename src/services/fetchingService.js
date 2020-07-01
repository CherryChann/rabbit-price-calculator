export const getProducts = () => {
    return dispatch => {
        return APIManager.axios.get('/product', {
        }).then(response => {
            console.log(response, 'Response from api');
            if (response.status === 200) {
                return response;
            } else {
                dispatch(APIManager.error.notfound)
            }
        }).catch(err => {
            console.log(err)
            dispatch(APIManager.error.network)
        });
    }

}

export const getLocations = () => {
    return dispatch => {
        return APIManager.axios.get('/location', {
        }).then(response => {
            console.log(response, 'Response from api');
            if (response.status === 200) {
                return response;
            } else {
                dispatch(APIManager.error.notfound)
            }
        }).catch(err => {
            console.log(err)
            dispatch(APIManager.error.network)
        });
    }
}
