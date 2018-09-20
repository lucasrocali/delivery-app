

import { root } from './../sagas/sagas';
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import reducer from './reducers';
import { navMiddleware } from './../navigation/RootNavigation'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger, navMiddleware),
    // other store enhancers if any
);

sagaMiddleware.run(root);

export default store;