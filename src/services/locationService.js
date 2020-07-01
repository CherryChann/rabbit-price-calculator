import APIManager from './APIManager'
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';


export const requestLocations = () => {
    return {
        type: 'REQUEST_LOCATIONS',
        LOCATIONS: {
            isLoading: true
        }
    }
}


const receiveLocations = (data) => {
    return {
        type: 'RECEIVE_LOCATIONS',
        LOCATIONS: {
            isLoading: false,
            data: data
        }
    }
}

const fetchLocations = () => {
    return dispatch => {
        dispatch(requestLocations())
        APIManager.axios.get('/LOCATIONS')
        .then(response => response.json())
        .then(json => dispatch(receiveLocations(json)))
    }
}

export default receiveLocations;

const shouldGetLocationsAgain = (state) => {
    if (state.locations.data.length) {
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
