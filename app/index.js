// @flow

import React from 'react';
import { Provider } from 'react-redux'
import RootNavigation from './navigation/RootNavigation';
import store from './store'
type State = {

}

type Props = {

}

export default class App extends React.Component<Props, State> {
    render() {
        return (
            <Provider store={store}>
                <RootNavigation />
            </Provider>
        );
    }
}