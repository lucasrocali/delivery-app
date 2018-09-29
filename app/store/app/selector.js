export function getCredentials(state) {
    return state.app_reducer.user_credentials;
}


export function getErrorMsg(state) {
    return state.app_reducer.error_msg
}