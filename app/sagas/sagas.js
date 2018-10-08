// @flow
import type { Saga } from 'redux-saga';
import { call, takeEvery, takeLatest, put, select, fork, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { NavigationActions } from "react-navigation";

import * as appActionTypes from "../store/app/actionType";
import * as userActionTypes from "../store/user/actionType";
import * as storesActionTypes from "../store/stores/actionType";
import * as cartActionTypes from "../store/cart/actionType";

import * as appActions from "../store/app/action";
import * as userActions from "../store/user/action";
import * as storeActions from "../store/stores/action";
import * as cartActions from "../store/cart/action";

import * as appSelectors from '../store/app/selector'
import * as userSelectors from '../store/user/selector'
import * as cartSelectors from '../store/cart/selector'
import * as storeSelectors from '../store/stores/selector'

import * as realApi from "../api/"
import * as mockApi from "../api/mock.js"

import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

import { MapCart } from '../constants/objects';

const api = realApi
import { mainStack, screenNames } from '../navigation/Routers';

const getToken = state => userSelectors.getAuthToken(state);
const getCredentials = state => appSelectors.getCredentials(state);
const getUser = state => userSelectors.getUser(state);
const getCurrentStore = state => storeSelectors.getStore(state)
const getCartStore = state => cartSelectors.getCartStore(state)
const getCart = state => cartSelectors.getCart(state)
const getCurrentAddress = state => userSelectors.getSelectedAddress(state)
const getOpenedOrder = state => userSelectors.getOpenedOrder(state)

const myFirebaseApp = firebase.initializeApp({
    apiKey: "rzn1ccZZOWRGMngPP5pnTRBMN10cDgjw2a0s2ep5",
    authDomain: "delivery-1538030350234.firebaseapp.com",
    databaseURL: "https://delivery-1538030350234.firebaseio.com",
});

const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp)

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
        yield put(NavigationActions.navigate({ routeName: mainStack.Main.name }))

        const user_credentials = yield select(getCredentials)

        if (user_credentials && user_credentials.email) {

            const response = yield call(api.loginRequest, user_credentials)

            if (response && response.id) {
                yield put(userActions.setSuccess(response))
            } else {
                yield put(appActions.clearCredentials())
            }

        }

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

        if (!toast_msg && response && response.id) {

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
        console.log('auth error', error);
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

const loadStores = function* (action) {
    try {
        yield put(storeActions.setLoading())

        const response = yield call(api.getStoresRequest)

        console.log(response)

        const stores = response

        yield put(storeActions.loadStoresSuccess(stores))
    } catch (error) {
        console.log(error);
        yield put(storeActions.setError(error))
    }
};

const loadStore = function* (action) {
    try {

        const { store } = action

        const currentStore = yield select(getCurrentStore)

        if (!currentStore.full) {

            yield put(storeActions.setLoading())

            const response = yield call(api.getStoreRequest, store.id)

            console.log(response)

            const store_response = response

            yield put(storeActions.loadStoreSuccess(store_response))
            yield put(cartActions.selectStore(store_response))

        }

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
        const { route_name, params } = action
        yield put(NavigationActions.navigate({ routeName: route_name, key: route_name }))
    } catch (error) {
        console.log(error);
    }
};

const handleNewProduct = function* (action) {
    try {
        const { store_id, order_product, remove } = action

        const cartStore = yield select(getCartStore)

        const address = yield select(getCurrentAddress)

        if (address) {

            if (cartStore.id == store_id) {
                yield put(cartActions.addToCart(order_product, remove))
                if (remove) {
                    yield put(appActions.displayToastMsg('Item removido do carrinho'))
                } else {
                    yield put(appActions.displayToastMsg('Item adicionado ao carrinho'))
                }

                yield put(NavigationActions.back())
            } else {
                yield put(appActions.displayToastMsg('Carrinho aberto em outra loja'))
            }
        } else {
            yield put(appActions.displayToastMsg('Selecione seu endereço'))
        }
        // yield put(NavigationActions.navigate({ routeName: route_name, key: route_name }))
    } catch (error) {
        console.log(error);
    }
};

const loadOrders = function* (action) {
    try {
        yield put(userActions.setLoading(true))

        const token = yield select(getToken)

        const response = yield call(api.getOrdersRequest, token)

        yield put(userActions.loaOrdersSuccess(response))

        //TEMP
        yield put(userActions.syncOpenedOrder())
    } catch (error) {
        console.log(error);
        yield put(userActions.setLoading(false))
    }
};

const loadOrder = function* (action) {
    try {
        yield put(userActions.setLoading(true))

        const token = yield select(getToken)

        const { id } = action

        const response = yield call(api.getOrderRequest, token, id)

        yield put(userActions.loadOrderSuccess(response))

    } catch (error) {
        console.log(error);
        yield put(userActions.setLoading(false))
    }
};

var ordersTask

export const syncOrder = response => ({
    type: userActionTypes.SYNC_ORDER_SUCCESS,
    response
})

const handleSyncOrder = function* (action) {
    console.log('syncOrders')
    try {

        if (ordersTask) {
            yield cancel(ordersTask)
        }

        const token = yield select(getToken)
        const order = yield select(getOpenedOrder)

        console.log(order)
        if (order) {

            console.log(`orders/${order.store.id}/${order.token}`)
            ordersTask = yield fork(
                reduxSagaFirebase.database.sync,
                `orders/${order.store.id}/${order.token}`,
                { successActionCreator: syncOrder }
            );
        }

    } catch (error) {
        console.log(error);
        // yield put({ type: LOAD_MENU.ERROR, error })
    }
};

const placeOrder = function* (action) {
    try {
        yield put(cartActions.placeOrderLoading(true))

        const cart = yield select(getCart)

        const address = yield select(getCurrentAddress)

        const token = yield select(getToken)

        const mapped_cart = MapCart(cart, address)

        console.log('mapped_cart ==> ', mapped_cart)

        const response = yield call(api.postOrderRequest, token, mapped_cart)

        const toast_msg = getToastMsg(response)

        if (toast_msg) {
            yield put(appActions.displayToastMsg(toast_msg))
        } else {
            yield put(cartActions.clearCart())

            yield put(userActions.syncOpenedOrder())

            yield put(NavigationActions.navigate({ routeName: screenNames.OrdersStack, key: screenNames.OrdersStack }))
        }


    } catch (error) {
        yield put(userActions.setLoading(false))
        console.log(error);
    }
};


export function* root(): Saga<void> {
    yield takeLatest(appActionTypes.DISPLAY_TOAST_MSG, displayToastMsg)
    yield takeLatest(appActionTypes.NAVIGATE, navigate)
    yield takeLatest(userActionTypes.AUTO_LOGIN, autoLogin)
    yield takeLatest(userActionTypes.AUTHENTICATE, authenticate)
    yield takeLatest(storesActionTypes.LOAD_STORES, loadCategories)
    yield takeLatest(storesActionTypes.LOAD_CATEGORIES, loadCategories)
    yield takeLatest(storesActionTypes.LOAD_STORE, loadStore)
    yield takeLatest(userActionTypes.CREATE_ADDRESS, createAddress)
    yield takeLatest(userActionTypes.LOAD_ADDRESSES, loadAddresses)
    yield takeLatest(userActionTypes.LOAD_ORDERS, loadOrders)
    yield takeLatest(userActionTypes.LOAD_ORDER, loadOrder)
    yield takeLatest(userActionTypes.LOAD_ADDRESS_INFO, loadAddressByZipCode)
    yield takeLatest(cartActionTypes.HANDLE_NEW_PRODUCT, handleNewProduct)
    yield takeLatest(cartActionTypes.PLACE_ORDER, placeOrder)
    yield takeLatest(userActionTypes.SYNC_ORDER, handleSyncOrder)
};
