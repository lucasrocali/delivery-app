// @flow
import type { Saga } from 'redux-saga';
import { call, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as authActionTypes from "../store/auth/actionType";
import * as storesActionTypes from "../store/stores/actionType";
import * as storeActions from "../store/stores/action";
// import { loginRequest, signupRequest, getCategoriesRequest, getStoreRequest } from "../api/"
import { loginRequest, signupRequest, getCategoriesRequest, getStoreRequest } from "../api/mock.js"

const getToken = state => state.reducers.authentication.auth_token;
const getSearch = state => state.reducers.search;

const authenticate = function* (action) {
    try {
        yield put({ type: authActionTypes.AUTHENTIFICATION })

        const login = action.payload.login
        const user_credentials = action.payload.user

        if (login) {

            const response = yield call(loginRequest, user_credentials)

            yield put({ type: authActionTypes.AUTHENTIFICATION, response })

        } else {

            const response = yield call(signupRequest, user_credentials)

            yield put({ type: authActionTypes.AUTHENTIFICATION, response })
        }


    } catch (error) {
        console.log(error);
        yield put({ type: authActionTypes.AUTHENTIFICATION, error })
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

        const response = yield call(getStoreRequest)

        console.log(response)

        const store = response

        yield put(storeActions.loadStoreSuccess(store))
    } catch (error) {
        console.log(error);
        yield put(storeActions.setError(error))
    }
};

export function* root(): Saga<void> {
    yield takeLatest(authActionTypes.AUTHENTIFICATION, authenticate)
    yield takeLatest(storesActionTypes.LOAD_CATEGORIES, loadCategories)
    yield takeLatest(storesActionTypes.LOAD_STORE, loadStore)
};
