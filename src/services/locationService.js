import APIManager from './APIManager'
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';
export const FAILED_LOCATIONS = 'FAILED_LOCATIONS';

export const requestLocations = () => {
    return {
        type: 'REQUEST_LOCATIONS',
        location: {
            isLoading: true
        }
    }
}


const receiveLocations = (data) => {
    return {
        type: 'RECEIVE_LOCATIONS',
        location: {
            isLoading: false,
            data: data
        }
    }
}
export const failedLocations = (message) => {
    return {
        type: 'FAILED_LOCATIONS',
        location: {
            errorMessage: message,
            isError: true
        }
    }
}
const fetchLocations = () => {
    return dispatch => {
        dispatch(requestLocations())
        APIManager.axios.get('/locations')
        .then(response => {
            if (response.status === 200) {
                let locations = response.data
                console.log(response, 'response from location api')
                dispatch(receiveLocations(locations))
            } else {
                dispatch(failedLocations(APIManager.error.notfound))
            }
        }).catch(err => {
            console.log(err)
            dispatch(failedLocations(APIManager.error.network))
        });
    }
}

export default receiveLocations;

const shouldGetLocationsAgain = (state) => {
    if (state.location.data.length) {
        return false;
    } else {
        return true;
    }
}

export const getLocationsIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldGetLocationsAgain(getState())) {
            return dispatch(fetchLocations())
        } else {
            return Promise.resolve()
        }
    }
}
