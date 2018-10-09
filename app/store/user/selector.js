export function getUser(state) {
    return state.user_reducer.user;
}

export function getAuthToken(state) {
    return state.user_reducer.user && state.user_reducer.user.auth_token ? state.user_reducer.user.auth_token : '';
}

export function getSearchAddress(state) {
    return state.user_reducer.search_address;
}

export function getSelectedAddressId(state) {
    return state.user_reducer.selected_address_id;
}

export function getSelectedAddress(state) {
    const { selected_address_id, user } = state.user_reducer
    const { addresses } = user
    const match_addresses = addresses && addresses.length > 0 ? addresses.filter(address => address.id == selected_address_id) : null
    return match_addresses && match_addresses.length > 0 ? match_addresses[0] : null
}

export function getOrders(state) {
    return state.user_reducer && state.user_reducer.user && state.user_reducer.user.orders ? state.user_reducer.user.orders : []
}
// export function getOpenedOrder(state) {
//     const { user } = state.user_reducer
//     const { orders } = user
//     const openedOrders = orders.filter(order => order.status != 'Entregue')
//     return openedOrders.length > 0 ? openedOrders[0] : null
// }

export function getSelectedOrder(state) {
    const { selected_order_id, user } = state.user_reducer
    const { orders } = user
    const match_orders = orders && orders.length > 0 ? orders.filter(order => order.id == selected_order_id) : null
    return match_orders && match_orders.length > 0 ? match_orders[0] : null
} 