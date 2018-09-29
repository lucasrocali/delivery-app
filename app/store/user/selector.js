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