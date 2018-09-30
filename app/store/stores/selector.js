export function getCategories(state) {
    return state.stores_reducer.categories;
}

export function getStore(state) {
    return state.stores_reducer.current_store;
}

export function getStores(state) {
    return state.stores_reducer.categories && state.stores_reducer.categories.length > 0 ? state.stores_reducer.categories[0].stores : [];
}