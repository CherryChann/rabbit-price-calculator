import intialState from '../../../State/location';

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
        default:
            return state
    }
}