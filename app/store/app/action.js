
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

export function setToastMsg(toast_msg) {
    return {
        type: actionTypes.SET_TOAST_MSG,
        toast_msg
    }
}

export function clearToastMsg() {
    return setToastMsg('')
}

export function navigateTo(route_name) {
    return {
        type: actionTypes.NAVIGATE,
        route_name
    }
}

export function displayToastMsg(toast_msg) {
    return {
        type: actionTypes.DISPLAY_TOAST_MSG,
        toast_msg
    }
}