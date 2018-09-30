// @flow
import type { Saga } from 'redux-saga';
import { call, takeEvery, takeLatest, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { NavigationActions } from "react-navigation";

import * as appActionTypes from "../store/app/actionType";
import * as userActionTypes from "../store/user/actionType";
import * as storesActionTypes from "../store/stores/actionType";

import * as appActions from "../store/app/action";
import * as userActions from "../store/user/action";
import * as storeActions from "../store/stores/action";
import * as cartActions from "../store/cart/action";

import * as appSelectors from '../store/app/selector'
import * as userSelectors from '../store/user/selector'
import * as realApi from "../api/"
import * as mockApi from "../api/mock.js"

const api = realApi
import { mainStack } from '../navigation/Routers';

const getToken = state => userSelectors.getAuthToken(state);
const getCredentials = state => appSelectors.getCredentials(state);
const getUser = state => userSelectors.getUser(state);

//{message: "Missing token"}
const getToastMsg = (response) => {
    return response && response.message ? response.message : null
}

const displayToastMsg = function* (action) {
    const { toast_msg } = action
    console.log('displayToastMsg', toast_msg)
    yield put(appActions.setToastMsg(toast_msg))
    yield delay(3000)
    yield put(appActions.clearToastMsg())
}

const autoLogin = function* (action) {
    try {
        const user_credentials = yield select(getCredentials)

        if (user_credentials && user_credentials.email) {

            const response = yield call(api.loginRequest, user_credentials)

            if (response && response.id && response.id > 0) {
                yield put(userActions.setSuccess(response))
            } else {
                yield put(appActions.clearCredentials())
            }

        }

        yield put(NavigationActions.navigate({ routeName: mainStack.Main.name }))

    } catch (error) {
        console.log(error);
        yield put(NavigationActions.navigate({ routeName: mainStack.Main.name }))
        //TODO: Handle Error
    }
};

const authenticate = function* (action) {
    try {
        yield put(userActions.setLoading(true))

        const { login, user_credentials } = action

        const response = yield call(login ? api.loginRequest : api.signupRequest, user_credentials)

        const toast_msg = getToastMsg(response)

        if (!toast_msg && response && response.id && response.id > 0) {

            yield put(appActions.setCredentials(user_credentials))

            yield put(userActions.setSuccess(response))

            yield put(NavigationActions.navigate({ routeName: mainStack.Main.name }))
        } else if (toast_msg) {
            yield put(appActions.displayToastMsg(toast_msg))
        } else {
            yield put(userActions.setLoading(false))
        }

        // handleError(response)
    } catch (error) {
        console.log(error);
        //TODO: Handle Error
        yield put(userActions.setLoading(false))
    }
};

const loadCategories = function* (action) {
    try {
        yield put(storeActions.setLoading())

        const response = yield call(api.getCategoriesRequest)

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

        const response = yield call(api.getStoreRequest, store.id)

        console.log(response)

        const store_response = response

        yield put(storeActions.loadStoreSuccess(store_response))
        yield put(cartActions.selectStore(store_response))
    } catch (error) {
        console.log(error);
        yield put(storeActions.setError(error))
    }
};

const createAddress = function* (action) {
    try {
        yield put(userActions.setLoading(true))

        const { address } = action

        const token = yield select(getToken)

        const response = yield call(api.postAddressRequest, token, address)

        const toast_msg = getToastMsg(response)

        if (toast_msg) {
            yield put(appActions.displayToastMsg(toast_msg))
        } else {
            yield put(userActions.setCreateAddressSuccess(response))
            yield put(userActions.loadAddress())
            yield put(NavigationActions.back())
        }


    } catch (error) {
        yield put(userActions.setLoading(false))
        console.log(error);
    }
};

const loadAddresses = function* (action) {
    try {
        yield put(userActions.setLoading(true))

        const token = yield select(getToken)

        const response = yield call(api.getAddressRequest, token)

        yield put(userActions.loadAddressSuccess(response))
    } catch (error) {
        console.log(error);
        yield put(userActions.setLoading(false))
    }
};

const loadAddressByZipCode = function* (action) {
    try {
        yield put(userActions.setLoading(true))

        const token = yield select(getToken)

        const { address } = action

        const response = yield call(api.getAddressByZipcodeRequest, token, address)

        yield put(userActions.loadAddressInfoSuccess(response))
    } catch (error) {
        console.log(error);
        yield put(userActions.setLoading(false))
    }
};

const navigate = function* (action) {
    try {
        const { route_name } = action
        yield put(NavigationActions.navigate({ routeName: route_name, key: route_name }))
    } catch (error) {
        console.log(error);
    }
};


export function* root(): Saga<void> {
    yield takeLatest(appActionTypes.DISPLAY_TOAST_MSG, displayToastMsg)
    yield takeLatest(appActionTypes.NAVIGATE, navigate)
    yield takeLatest(userActionTypes.AUTO_LOGIN, autoLogin)
    yield takeLatest(userActionTypes.AUTHENTICATE, authenticate)
    yield takeLatest(storesActionTypes.LOAD_CATEGORIES, loadCategories)
    yield takeLatest(storesActionTypes.LOAD_STORE, loadStore)
    yield takeLatest(userActionTypes.CREATE_ADDRESS, createAddress)
    yield takeLatest(userActionTypes.LOAD_ADDRESSES, loadAddresses)
    yield takeLatest(userActionTypes.LOAD_ADDRESS_INFO, loadAddressByZipCode)
};
