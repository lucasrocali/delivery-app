import * as actionTypes from './actionType'

export function selectStore(store) {
    return {
        type: actionTypes.SELECT_STORE,
        store
    }
}

export function handleNewProduct(store_id, cart_product, cart_product_index) {
    return {
        type: actionTypes.HANDLE_NEW_PRODUCT,
        store_id,
        cart_product,
        cart_product_index
    }
}

export function addToCart(cart_product, cart_product_index) {
    return {
        type: actionTypes.ADD_TO_CART,
        cart_product,
        cart_product_index
    }
}