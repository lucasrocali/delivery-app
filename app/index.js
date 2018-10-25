// @flow

import React from 'react';
import { Provider } from 'react-redux'
import RootNavigation from './navigation';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import codePush from "react-native-code-push";

type State = {

}

type Props = {

}

class App extends React.Component<Props, State> {
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
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
export default codePush(codePushOptions)(App);