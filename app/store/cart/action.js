import * as actionTypes from './actionType'

export function selectStore(store) {
    return {
        type: actionTypes.SELECT_STORE,
        store
    }
}

export function handleNewProduct(store_id, cart_product, remove = false) {
    return {
        type: actionTypes.HANDLE_NEW_PRODUCT,
        store_id,
        cart_product,
        remove
    }
}

export function addToCart(cart_product, remove = false) {
    return {
        type: actionTypes.ADD_TO_CART,
        cart_product,
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