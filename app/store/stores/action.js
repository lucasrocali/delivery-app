// @flow

import * as actionTypes from './actionType'

export function loadCategories() {
    return {
        type: actionTypes.LOAD_CATEGORIES
    }
}

export function setLoading() {
    return {
        type: actionTypes.LOAD_CATEGORIES_LOADING
    }
}

export function setSuccess(response: Object) {
    return {
        type: actionTypes.LOAD_CATEGORIES_SUCCESS,
        response
    }
}

export function setError(error: Object) {
    return {
        type: actionTypes.LOAD_CATEGORIES_ERROR,
        error
    }
}

