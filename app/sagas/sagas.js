// @flow
import type { Saga } from 'redux-saga';
import { call, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { NavigationActions } from "react-navigation";

import * as authActionTypes from "../store/auth/actionType";
import * as storesActionTypes from "../store/stores/actionType";

import * as authActions from "../store/auth/action";
import * as storeActions from "../store/stores/action";
import * as cartActions from "../store/cart/action";

import * as authSelectors from '../store/auth/selector'
import { loginRequest, signupRequest, getCategoriesRequest, getStoreRequest } from "../api/"
// import { loginRequest, signupRequest, getCategoriesRequest, getStoreRequest } from "../api/mock.js"

const getToken = state => authSelectors.getAuthToken(state);
const getUserCredentials = state => authSelectors.getUserCredentials(state);
const getUser = state => authSelectors.getUser(state);

const autoLogin = function* (action) {
    try {
        const user_credentials = yield select(getUserCredentials)

        if (user_credentials) {
            yield put(authActions.login(user_credentials))
        } else {
            console.log('autoLogin', NavigationActions)
            yield put(NavigationActions.navigate({ routeName: 'Main' }))
            // NavigationActions.navigate({ routeName: 'Main', key: 'Main' })
        }



    } catch (error) {
        console.log(error);
        //TODO: Handle Error
    }
};

const authenticate = function* (action) {
    try {
        yield put(authActions.setLoading(true))

        const { login, user_credentials } = action

        const user = yield call(login ? loginRequest : signupRequest, user_credentials)

        if (user && user.id && user.id > 0) {
            yield put(authActions.setSuccess(user))
        } else {
            yield put(authActions.setLoading(false))
        }


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
