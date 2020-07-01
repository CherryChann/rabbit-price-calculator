import intialState from '@state/location';

export default function location(state = intialState, action) {
    switch (action.type) {
        case 'REQUEST_LOCATIONS':
            return Object.assign({}, state, {
                isLoading: action.location.isLoading
            })
        case 'RECEIVE_LOCATIONS':
            return Object.assign({}, state, {
                isLoading: action.location.isLoading,
                data: action.location.data
            })
        case 'FAILED_LOCATIONS':
            return Object.assign({}, state, {
                isError: action.location.isError,
                errorMessage: action.location.message
            })
        default:
            return state
    }
}