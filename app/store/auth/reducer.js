import * as actionTypes from './actionType'

const initial_uthentication = {
    loading: false,
    message: "",
    success: false,
    user: {}
}

const initialState = {
    authentication: initial_uthentication,
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTHENTIFICATION:

            return {
                ...state,
                authentication: initial_uthentication
            }
        default:
            return state
    }
}

