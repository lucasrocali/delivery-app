
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

export function loadOrders() {
    return {
        type: actionTypes.LOAD_ORDERS
    }
}

export function loaOrdersSuccess(response) {
    return {
        type: actionTypes.LOAD_ORDERS_SUCCESS,
        response
    }
}

export function createAddress(address, updateOrders = false) {
    return {
        type: actionTypes.CREATE_ADDRESS,
        address,
        updateOrders
    }
}

export function setCreateAddressSuccess(response) {
    return {
        type: actionTypes.CREATE_ADDRESS_SUCCESS,
        response
    }
}

export function loadAddressInfo(address) {
    return {
        type: actionTypes.LOAD_ADDRESS_INFO,
        address
    }
}

export function loadAddressInfoSuccess(response) {
    return {
        type: actionTypes.LOAD_ADDRESS_INFO_SUCCESS,
        response
    }
}

export function selectedAddress(address_id) {
    return {
        type: actionTypes.SELECTED_ADDRESS,
        address_id
    }
}

export function loadOrder(id) {
    return {
        type: actionTypes.LOAD_ORDERS,
        id
    }
}

export function loadOrderSuccess(response) {
    return {
        type: actionTypes.LOAD_ORDER_SUCCESS,
        response
    }
}

export function selectedOrder(selected_order_id) {
    return {
        type: actionTypes.SELECTED_ORDER,
        selected_order_id
    }
}

export function loadCards() {
    return {
        type: actionTypes.LOAD_CARDS
    }
}

export function loadCardsSuccess(response) {
    return {
        type: actionTypes.LOAD_CARDS_SUCCESS,
        response
    }
}

export function createCard(card) {
    return {
        type: actionTypes.CREATE_CARD,
        card
    }
}

export function setCreateCardSuccess(response) {
    return {
        type: actionTypes.CREATE_CARD_SUCCESS,
        response
    }
}
