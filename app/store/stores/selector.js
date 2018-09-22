export function getCategories(state) {
    return state.storesReducer.categories;
}

export function getStore(state) {
    return state.storesReducer.current_store;
}
