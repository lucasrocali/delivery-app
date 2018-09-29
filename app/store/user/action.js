
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
        type: actionTypes.USER_LOADING,
        loading
    }
}

export function setSuccess(user) {
    return {
        type: actionTypes.AUTHENTICATE_SUCCESS,
        user
    }
}

export function loadAddress() {
    return {
        type: actionTypes.LOAD_ADDRESSES
    }
}

export function loadAddressSuccess(response) {
    return {
        type: actionTypes.LOAD_ADDRESSES_SUCCESS,
        response
    }
}
export function createAddress(address) {
    return {
        type: actionTypes.CREATE_ADDRESS,
        address
    }
}

export function setCreateAddressSuccess(response) {
    return {
        type: actionTypes.CREATE_ADDRESS_SUCCESS,
        response
    }
}