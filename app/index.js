import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import RootNavigation from './navigation/RootNavigation';
import reducer from './reducers/index';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { navMiddleware } from './navigation/RootNavigation'
// import { composeWithDevTools } from 'redux-devtools-extension';
import { root } from './sagas/sagas';
console.disableYellowBox = true;
/*
TODO

-paginate/infinity list


*/

// const navigationMiddleware = createReactNavigationReduxMiddleware(
//     "root",
//     state => state.nav,
// );



// export const navReducer = createNavigationReducer(RootNavigation);
// console.log(navReducer)

// import reducers from './app/reducers/reducers'
// const rootReducer = combineReducers({
//     reducers,
//     nav: navReducer,
// });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware),
    applyMiddleware(logger),
    applyMiddleware(navMiddleware),
    // other store enhancers if any
);

sagaMiddleware.run(root);


// const AppNavigator = createStackNavigator(RootStack);

// const RootApp = reduxifyNavigator(RootNavigation, "root");

// const mapStateToProps = (state) => ({
//     state: state.nav,
// });

// const AppWithNavigationState = connect(mapStateToProps)(RootApp);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <RootNavigation />
            </Provider>
        );
    }
}