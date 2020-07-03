import APIManager from './APIManager';
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';
export const FAILED_LOCATIONS = 'FAILED_LOCATIONS';

const requestLocations = () => { // to set loading status of location from initital state
    return {
        type: 'REQUEST_LOCATIONS',
        location: {
            isLoading: true
        }
    }
}


const receiveLocations = (data) => { // to set loading status and locations from API response from initital state
    return {
        type: 'RECEIVE_LOCATIONS',
        location: {
            isLoading: false,
            data: data
        }
    }
}

const failedLocations = (message) => { // to set error status from initital state
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
        APIManager.axios.get('/locations') // to call api end point to receive locations 
        .then(response => {
            if (response.status === 200) {
                let locations = response.data
                console.log(response, 'response from location api')
                dispatch(receiveLocations(locations)) // to store locations from response in state 
            } else {
                dispatch(failedLocations(APIManager.error.notfound))
            }
        }).catch(err => {
            console.log(err)
            dispatch(failedLocations(APIManager.error.network))
        });
    }
}

const shouldGetLocationsAgain = (state) => { // to check whether locations are already in state
    if (state.location.data.length) {
        return false;
    } else {
        return true;
    }
}

export const getLocationsIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldGetLocationsAgain(getState())) { // to check whether locations is already in state if not api will be called. if so, we will use state data
            return dispatch(fetchLocations())
        } else {
            return Promise.resolve()
        }
    }
}
