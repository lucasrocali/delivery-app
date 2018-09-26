// @flow

import React from 'react';
import { Provider } from 'react-redux'
import RootNavigation from './navigation/RootNavigation';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
type State = {

}

type Props = {

}

export default class App extends React.Component<Props, State> {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <RootNavigation />
                </PersistGate>
            </Provider>
        );
    }
}