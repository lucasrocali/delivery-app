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
const getOrders = state => userSelectors.getOrders(state)
const getCurrentAddress = state => userSelectors.getSelectedAddress(state)
const getCurrentCard = state => userSelectors.getSelectedCard(state)
const getOpenedOrder = state => cartSelectors.getOpenedOrder(state)
const getSelectedCategoryId = state => storeSelectors.getSelectedCategoryId(state)

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

const initApp = function* () {

    yield call(handleOpenedOrder)

    yield put(userActions.loadCards())
}

const handleOpenedOrder = function* () {

    const orders = yield select(getOrders)

    console.log('handleOpenedOrder')
    const opened_orders = orders.filter(order => order.status != 'Entregue')
    const opened_order = opened_orders.length > 0 ? opened_orders[0] : null

    if (opened_order) {
        yield put(cartActions.setOpenedOrder(opened_order))

        yield put(cartActions.syncOpenedOrder())
    }
}


const autoLogin = function* (action) {
    try {
        yield put(NavigationActions.navigate({ routeName: mainStack.Main.name }))

        const user_credentials = yield select(getCredentials)

        if (user_credentials && user_credentials.email) {

            const response = yield call(api.loginRequest, user_credentials)

            if (response && response.id) {
                yield put(userActions.setSuccess(response))

                yield call(initApp)
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

            yield call(initApp)

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
        yield put(storeActions.setLoading(true))

        const response = yield call(api.getCategoriesRequest)

        console.log(response)

        const categories = response

        yield put(storeActions.setLoading(false))

        yield put(storeActions.loadCategoriesSuccess(categories))

        let first_category_id = null

        if (categories && categories.length > 0) {
            first_category_id = categories[0].id
        }

        yield put(storeActions.loadStores(first_category_id))
    } catch (error) {
        console.log(error);
        yield put(storeActions.setError(error))
    }
};

const loadStores = function* (action) {
    try {
        yield put(storeActions.setLoading(true))

        const category_id = yield select(getSelectedCategoryId)

        console.log('category_id', category_id)

        const data = {
            category_id
        }

        const response = yield call(api.getStoresRequest, data)

        console.log(response)

        const stores = response

        yield put(storeActions.setLoading(false))

        if (stores && typeof stores == 'object' && stores.length >= 0) {
            yield put(storeActions.loadStoresSuccess(stores))
        }

    } catch (error) {
        console.log(error);
        yield put(storeActions.setError(error))
    }
};

const loadStore = function* (action) {
    try {

        console.log('SELECT_STORE', action)
        const { store } = action

        const currentStore = yield select(getCurrentStore)

        if (!currentStore.full) {

            yield put(storeActions.setLoading())

            const response = yield call(api.getStoreRequest, store.id)

            console.log(response)

            const store_response = response

            yield put(storeActions.loadStoreSuccess(store_response))


        }
        yield put(cartActions.selectStore(store))

    } catch (error) {
        console.log(error);
        yield put(storeActions.setError(error))
    }
};

const createAddress = function* (action) {
    try {
        yield put(userActions.setLoading(true))

        const { address, updateOrders } = action

        const token = yield select(getToken)

        const response = yield call(api.postAddressRequest, token, address)

        const toast_msg = getToastMsg(response)

        if (toast_msg) {
            yield put(appActions.displayToastMsg(toast_msg))
        } else {
            yield put(userActions.setCreateAddressSuccess(response))

            if (updateOrders) {
                yield put(userActions.loadOrders())
                // yield put(NavigationActions.back())
            } else {
                yield put(userActions.loadAddress())
                yield put(NavigationActions.back())
            }

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

            if (cartStore && cartStore.id == store_id) {
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

        yield call(handleOpenedOrder)

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

const loadCards = function* (action) {
    try {
        yield put(userActions.setLoading(true))

        const token = yield select(getToken)

        const response = yield call(api.getCardsRequest, token)

        yield put(userActions.loadCardsSuccess(response))

    } catch (error) {
        console.log(error);
        yield put(userActions.setLoading(false))
    }
};

const createCard = function* (action) {
    try {
        yield put(userActions.setLoading(true))

        const { card } = action

        const token = yield select(getToken)

        const response = yield call(api.postCardRequest, token, card)

        const toast_msg = getToastMsg(response)

        yield put(userActions.setLoading(false))

        if (toast_msg) {
            yield put(appActions.displayToastMsg(toast_msg))
        } else {
            yield put(userActions.setCreateCardSuccess(response))

            yield put(userActions.loadCards())
            yield put(NavigationActions.back())
        }

    } catch (error) {
        yield put(userActions.setLoading(false))
        console.log(error);
    }
};

var ordersTask
var driverTask

export const syncOrderLocation = response => ({
    type: cartActionTypes.SYNC_DRIVER_SUCCESS,
    response
})

export const syncOrderStatus = response => ({
    type: cartActionTypes.HANDLE_SYNC_ORDER_SUCCESS,
    response
})

const handleSyncOrderSuccess = function* (action) {
    try {
        const updated_order = action.response
        yield put(cartActions.syncOrderSuccess(updated_order))

        console.log('a', updated_order.order_statuses, updated_order.order_statuses.length, updated_order.order_statuses.length > 0 && updated_order.order_statuses[0].status == 'Entregue', updated_order.order_statuses.length > 0 && updated_order.order_statuses[updated_order.order_statuses.length - 1].status)
        if (updated_order.order_statuses && updated_order.order_statuses.length > 0 && updated_order.order_statuses[0].status == 'Entregue') {
            yield put(cartActions.setOpenedOrder(null))
        }

        if (updated_order.driver_id) {
            if (driverTask) {
                yield cancel(driverTask)
            }

            const order = yield select(getOpenedOrder)

            if (order) {

                console.log(`drivers/${order.driver_id}`)
                ordersTask = yield fork(
                    reduxSagaFirebase.database.sync,
                    `drivers/${order.driver_id}`,
                    { successActionCreator: syncOrderLocation }
                );
            }
        }
    } catch (error) {
        console.log(error);
        // yield put({ type: LOAD_MENU.ERROR, error })
    }
}

const handleSyncOrder = function* (action) {
    console.log('syncOrders')
    try {

        if (ordersTask) {
            yield cancel(ordersTask)
        }

        const order = yield select(getOpenedOrder)

        console.log(order)
        if (order) {

            console.log(`orders/${order.store.id}/${order.token}`)
            ordersTask = yield fork(
                reduxSagaFirebase.database.sync,
                `orders/${order.store.id}/${order.token}`,
                { successActionCreator: syncOrderStatus }
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

        const card = yield select(getCurrentCard)

        const token = yield select(getToken)

        const mapped_cart = MapCart(cart, address, card)

        console.log('mapped_cart ==> ', mapped_cart)

        const response = yield call(api.postOrderRequest, token, mapped_cart)

        yield put(cartActions.placeOrderLoading(false))

        const toast_msg = getToastMsg(response)


        if (toast_msg) {
            yield put(appActions.displayToastMsg(toast_msg))
        } else {
            yield put(cartActions.clearCart())

            const opened_order = response

            yield put(cartActions.setOpenedOrder(opened_order))

            yield put(cartActions.syncOpenedOrder())

            yield put(NavigationActions.navigate({ routeName: screenNames.OrderStack, key: screenNames.OrderStack }))
        }


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
    yield takeLatest(userActionTypes.LOAD_ORDERS, loadOrders)
    yield takeLatest(userActionTypes.LOAD_ORDER, loadOrder)
    yield takeLatest(userActionTypes.LOAD_ADDRESS_INFO, loadAddressByZipCode)
    yield takeLatest(cartActionTypes.HANDLE_NEW_PRODUCT, handleNewProduct)
    yield takeLatest(cartActionTypes.PLACE_ORDER, placeOrder)
    yield takeLatest(cartActionTypes.SYNC_ORDER, handleSyncOrder)
    yield takeLatest(cartActionTypes.HANDLE_SYNC_ORDER_SUCCESS, handleSyncOrderSuccess)
    yield takeLatest(userActionTypes.LOAD_CARDS, loadCards)
    yield takeLatest(userActionTypes.CREATE_CARD, createCard)
    yield takeLatest(storesActionTypes.LOAD_STORES, loadStores)
};
