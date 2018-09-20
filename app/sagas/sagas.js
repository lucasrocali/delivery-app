
import { call, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { AUTHENTIFICATION } from "../actions/";
// import { loginRequest, getGroupsRequest } from "../api/"
import { loginRequest, getGroupsRequest } from "../api/mock.js"
import * as selectors from '../reducers/reducers';

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


export const root = function* () {
    yield takeLatest(AUTHENTIFICATION, authenticate)
};