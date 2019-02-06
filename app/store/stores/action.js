// @flow

import * as actionTypes from './actionType'

export function setLoading(loading) {
    return {
        type: actionTypes.STORES_LOADING,
        loading
    }
}

export function setError(error: Object) {
    return {
        type: actionTypes.STORES_ERROR,
        error
    }
}

export function loadCategories() {
    return {
        type: actionTypes.LOAD_CATEGORIES
    }
}


export function loadCategoriesSuccess(categories: Array) {
    return {
        type: actionTypes.LOAD_CATEGORIES_SUCCESS,
        categories
    }
}

export function loadStore(store: Object) {
    return {
        type: actionTypes.LOAD_STORE,
        store
    }
}

export function loadStoreSuccess(store: Object) {
    return {
        type: actionTypes.LOAD_STORE_SUCCESS,
        store
    }
}


export function loadStores(category_id: string = '', searchingText: string = '') {
    return {
        type: actionTypes.LOAD_STORES,
        category_id,
        searchingText
    }
}

export function loadStoresSuccess(stores: Array) {
    return {
        type: actionTypes.LOAD_STORES_SUCCESS,
        stores
    }
}