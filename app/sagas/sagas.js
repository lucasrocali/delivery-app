
import { call, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as authActionTypes from "../store/auth/actionType";
import * as storesActionTypes from "../store/stores/actionType";
import { loginRequest, getCategoriesRequest } from "../api/"
// import { loginRequest, getCategoriesRequest } from "../api/mock.js"

const getToken = state => state.reducers.authentication.auth_token;
const getSearch = state => state.reducers.search;

const authenticate = function* (action) {
    try {
        yield put({ type: AUTHENTIFICATION })

        const login = action.payload.login
        const user_credentials = action.payload.user

        if (login) {

            const response = yield call(loginRequest, user_credentials)

            yield put({ type: AUTHENTIFICATION, response })

        } else {

            const response = yield call(signupRequest, user_credentials)

            yield put({ type: AUTHENTIFICATION, response })
        }


    } catch (error) {
        console.log(error);
        yield put({ type: AUTHENTIFICATION, error })
    }
};

const getGroups = function* (action) {
    try {
        yield put({ type: GET_GROUPS.LOADING })

        const response = yield call(getCategoriesRequest, token)

        yield put({ type: GET_GROUPS.SUCCESS, response })
    } catch (error) {
        console.log(error);
        yield put({ type: GET_GROUPS.ERROR, error })
    }
};


export const root = function* () {
    yield takeLatest(AUTHENTIFICATION, authenticate)
};