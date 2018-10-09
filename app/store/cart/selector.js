export function getCart(state) {
    return state.cart_reducer;
}

export function getCartStore(state) {
    return state.cart_reducer.store
}

export function getOpenedOrder(state) {
    return state.cart_reducer.opened_order
}

export function getCartLocation(state) {
    return state.cart_reducer.driver_location
}