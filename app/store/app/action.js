
import * as actionTypes from './actionType'

export function clearCredentials() {
    return {
        type: actionTypes.CLEAR_CREDENTIALS
    }
}
export function setCredentials(user_credentials) {
    return {
        type: actionTypes.SET_CREDENTIALS,
        user_credentials
    }
}

export function setErrorMsg(error_msg) {
    return {
        type: actionTypes.SET_ERROR_MSG,
        error_msg
    }
}

export function clearErrorMsg() {
    return setErrorMsg('')
}