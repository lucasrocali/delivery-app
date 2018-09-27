export function getUser(state) {
    return state.auth_reducer.user;
}

export function getAuthToken(state) {
    return state.auth_reducer.user && state.auth_reducer.user.auth_token ? state.auth_reducer.user.auth_token : '';
}