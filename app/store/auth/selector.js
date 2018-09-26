export function getUser(state) {
    return state.auth_reducer.user;
}

export function getUserCredentials(state) {
    return state.auth_reducer && state.auth_reducer.user_credentials ? state.auth_reducer.user_credentials : null;
}

export function getAuthToken(state) {
    return state.auth_reducer.user && state.auth_reducer.user.auth_token ? state.auth_reducer.user.auth_token : '';
}