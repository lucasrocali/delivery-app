import * as actionTypes from './actionType'

const initialState = {
    user_credentials: {},
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CREDENTIALS:
            const { user_credentials } = action
            return {
                ...state,
                user_credentials
            }
        case actionTypes.CLEAR_CREDENTIALS:
            return {
                user_credentials: {}
            }
        default:
            return state
    }
}

