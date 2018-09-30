// @flow

import * as actionTypes from './actionType'

export function setLoading() {
    return {
        type: actionTypes.STORES_LOADING
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


export function loadStores() {
    return {
        type: actionTypes.LOAD_STORES,
    }
}

export function loadStoresSuccess(stores: Object) {
    return {
        type: actionTypes.LOAD_STORES_SUCCESS,
        stores
    }
}