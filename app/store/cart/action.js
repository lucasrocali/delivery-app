import * as actionTypes from './actionType'

export function selectStore(store) {
    return {
        type: actionTypes.SELECT_STORE,
        store
    }
}

export function handleNewProduct(store_id, order_product, remove = false) {
    return {
        type: actionTypes.HANDLE_NEW_PRODUCT,
        store_id,
        order_product,
        remove
    }
}

export function addToCart(order_product, remove = false) {
    return {
        type: actionTypes.ADD_TO_CART,
        order_product,
        remove
    }
}

export function placeOrder() {
    return {
        type: actionTypes.PLACE_ORDER
    }
}

export function placeOrderLoading(loading) {
    return {
        type: actionTypes.PLACE_ORDER_LOADING,
        loading
    }
}

export function clearCart() {
    return {
        type: actionTypes.CLEAR_CART
    }
}

export function setOpenedOrder(order) {
    return {
        type: actionTypes.SET_OPENED_ORDER,
        order
    }
}


export function syncOpenedOrder() {
    return {
        type: actionTypes.SYNC_ORDER
    }
}

export function syncOrderSuccess(response) {
    return {
        type: actionTypes.SYNC_ORDER_SUCCESS,
        response
    }
}
