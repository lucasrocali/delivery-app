import * as actionTypes from './actionType'

export function selectStore(store) {
    return {
        type: actionTypes.SELECT_STORE,
        store
    }
}

export function handleNewProduct(store_id, cart_product) {
    return {
        type: actionTypes.HANDLE_NEW_PRODUCT,
        store_id,
        cart_product
    }
}

export function addToCart(cart_product) {
    return {
        type: actionTypes.ADD_TO_CART,
        cart_product
    }
}

export function removeProduct(cart_product_id) {
    return {
        type: actionTypes.REMOVE_PRODUCT,
        cart_product_id
    }
}