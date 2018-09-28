
import * as actionTypes from './actionType'

export function autoLogin() {
    return {
        type: actionTypes.AUTO_LOGIN
    }
}

export function login(user_credentials) {
    return {
        type: actionTypes.AUTHENTICATE,
        login: true,
        user_credentials
    }
}

export function signup(user_credentials) {
    return {
        type: actionTypes.AUTHENTICATE,
        login: false,
        user_credentials

    }
}

export function logout() {
    return {
        type: actionTypes.LOGOUT
    }
}

export function setLoading(loading) {
    return {
        type: actionTypes.AUTHENTICATE_LOADING,
        loading
    }
}

export function setSuccess(user) {
    return {
        type: actionTypes.AUTHENTICATE_SUCCESS,
        user
    }
}