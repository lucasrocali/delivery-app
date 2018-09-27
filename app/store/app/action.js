
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