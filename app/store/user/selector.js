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