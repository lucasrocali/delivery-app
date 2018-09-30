import * as actionTypes from './actionType';
import * as userActionTypes from '../user/actionType';

const initialState = {
    user_credentials: {},
    toast_msg: null
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
        case userActionTypes.LOGOUT:
            return {
                user_credentials: {},
            }
        case actionTypes.SET_TOAST_MSG:
            const { toast_msg } = action
            return {
                ...state,
                toast_msg
            }
        default:
            return state
    }
}

