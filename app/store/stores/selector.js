export function getCategories(state) {
    return state.stores_reducer.categories;
}

export function getStore(state) {
    return state.stores_reducer.current_store;
}
