import * as actionTypes from './actionType'

export function selectStore(store) {
    return {
        type: actionTypes.SELECT_STORE,
        store
    }
}

export function addToCart(store_id, product, quantity, selected_options, cart_product_index) {
    return {
        type: actionTypes.ADD_TO_CART,
        store_id,
        product,
        quantity,
        selected_options,
        cart_product_index
    }
}