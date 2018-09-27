

import { root } from './../sagas/sagas';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import reducer from './reducers';
import { navMiddleware } from './../navigation/RootNavigation'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['app_reducer']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware, logger, navMiddleware),
    // other store enhancers if any
);

sagaMiddleware.run(root);

export const persistor = persistStore(store)