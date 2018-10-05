// @flow

import React, { Component } from 'react';
import { FlatList, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigateTo } from '../store/app/action'
import { loadCategories, loadStore } from '../store/stores/action'
import * as storeSelectors from '../store/stores/selector';
import CategoryCell from './components/CategoryCell';
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
    loadCategories: Function
}

class Categories extends Component<Props, State> {

    componentDidMount() {
        const { loadCategories } = this.props
        loadCategories()
    }

    render() {
        const { categories, loadStore, navigateTo, navigation } = this.props
        return (
            <Container>
                <FlatList
                    data={categories}
                    renderItem={({ item: category }, i) => (
                        <CategoryCell
                            key={i}
                            category={category}
                            onStorePress={(store) => {
                                loadStore(store)
                                navigation.navigate(screenNames.Store)
                                // navigateTo(screenNames.Store, { title: store.name })
                            }}
                            onMorePress={() => {
                                navigation.navigate(screenNames.Stores)
                                // navigateTo(screenNames.Stores)
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
        categories: storeSelectors.getCategories(state),
    }),
    { loadCategories, loadStore, navigateTo }
)(Categories)