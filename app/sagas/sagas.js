// @flow
import type { Saga } from 'redux-saga';
import { call, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { NavigationActions } from "react-navigation";

import * as authActionTypes from "../store/auth/actionType";
import * as storesActionTypes from "../store/stores/actionType";

import * as appActions from "../store/app/action";
import * as authActions from "../store/auth/action";
import * as storeActions from "../store/stores/action";
import * as cartActions from "../store/cart/action";

import * as appSelectors from '../store/app/selector'
import * as authSelectors from '../store/auth/selector'
import { loginRequest, signupRequest, getCategoriesRequest, getStoreRequest } from "../api/"
// import { loginRequest, signupRequest, getCategoriesRequest, getStoreRequest } from "../api/mock.js"

const getToken = state => authSelectors.getAuthToken(state);
const getCredentials = state => appSelectors.getCredentials(state);
const getUser = state => authSelectors.getUser(state);

const handleError = (response) => {

}

const autoLogin = function* (action) {
    try {
        const user_credentials = yield select(getCredentials)

        if (user_credentials && user_credentials.email) {

            const response = yield call(loginRequest, user_credentials)

            if (response && response.id && response.id > 0) {
                yield put(authActions.setSuccess(response))
            } else {
                yield put(appActions.clearCredentials())
            }

        }

        yield put(NavigationActions.navigate({ routeName: 'Main' }))

    } catch (error) {
        console.log(error);
        yield put(NavigationActions.navigate({ routeName: 'Main' }))
        //TODO: Handle Error
    }
};

const authenticate = function* (action) {
    try {
        yield put(authActions.setLoading(true))

        const { login, user_credentials } = action

        const response = yield call(login ? loginRequest : signupRequest, user_credentials)

        if (response && response.id && response.id > 0) {

            yield put(appActions.setCredentials(user_credentials))

            yield put(authActions.setSuccess(response))

            yield put(NavigationActions.navigate({ routeName: 'Main' }))
        } else {
            yield put(authActions.setLoading(false))
        }

        handleError(response)
    } catch (error) {
        console.log(error);
        //TODO: Handle Error
        yield put(authActions.setLoading(false))
    }
};

const loadCategories = function* (action) {
    try {
        yield put(storeActions.setLoading())

        const response = yield call(getCategoriesRequest)

        console.log(response)

        const categories = response

        yield put(storeActions.loadCategoriesSuccess(categories))
    } catch (error) {
        console.log(error);
        yield put(storeActions.setError(error))
    }
};

const loadStore = function* (action) {
    try {
        yield put(storeActions.setLoading())

        const { store } = action

        const response = yield call(getStoreRequest, store.id)

        console.log(response)

        const store_response = response

        yield put(storeActions.loadStoreSuccess(store_response))
        yield put(cartActions.selectStore(store_response))
    } catch (error) {
        console.log(error);
        yield put(storeActions.setError(error))
    }
};

export function* root(): Saga<void> {
    yield takeLatest(authActionTypes.AUTO_LOGIN, autoLogin)
    yield takeLatest(authActionTypes.AUTHENTICATE, authenticate)
    yield takeLatest(storesActionTypes.LOAD_CATEGORIES, loadCategories)
    yield takeLatest(storesActionTypes.LOAD_STORE, loadStore)
};
