export function getCredentials(state) {
    return state.app_reducer.user_credentials;
}


export function getToastMsg(state) {
    return state.app_reducer.toast_msg
}

export function getSelectedCity(state) {
    return state.app_reducer.selected_city
}