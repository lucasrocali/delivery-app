// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigateTo } from '../store/app/action'
import { loadStores, loadStore } from '../store/stores/action'
import * as storeSelectors from '../store/stores/selector';
import StoreCell from './components/StoreCell';
import styled from "styled-components";
import colors from '../constants/colors';
import { screenNames } from '../navigation/Routers'

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

type State = {

}

type Props = {
    loadStores: Function
}

class Stores extends Component<Props, State> {

    componentDidMount() {
        const { loadStores } = this.props
        loadStores()
    }

    render() {
        const { stores, loadStore, navigateTo } = this.props
        return (
            <Container>
                <FlatList
                    data={stores}
                    renderItem={({ item: store }, i) => (
                        <StoreCell
                            key={i}
                            full
                            store={store}
                            onPress={(store) => {
                                loadStore(store)
                                navigateTo(screenNames.Store, { title: store.name })
                            }}
                        />
                    )}
                />
            </Container>
        );
    }
}


export default connect(
    state => ({
        stores: storeSelectors.getStores(state),
    }),
    { loadStores, loadStore, navigateTo }
)(Stores)