// @flow

import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigateTo } from '../store/app/action'
import { loadCategories, loadStore, loadStores } from '../store/stores/action'
import * as storeSelectors from '../store/stores/selector';
import CategoryCell from './components/CategoryCell';
import styled from "styled-components";
import colors from '../constants/colors';
import { screenNames } from '../navigation/Routers'

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Header = styled.View`
    height: 100;
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

    renderHeader() {
        const { categories, loadStore, loadStores, navigateTo, navigation } = this.props
        return (
            <Header>
                <FlatList
                    data={categories.length > 0 ? categories : ['ph1', 'ph2', 'ph1', 'ph2']}
                    horizontal
                    ListHeaderComponent={(<View width={10} />)}
                    renderItem={({ item: category }, i) => (
                        <CategoryCell
                            key={i}
                            category={category}
                            onPress={(store) => {
                                loadStores(category.id)
                            }}
                        />
                    )}
                />
            </Header>
        );
    }

    render() {
        const { stores, loadStore, loading, navigation } = this.props
        console.log('render categories', stores)
        return (
            <Container>
                <FlatList
                    data={loading ? ['ph', 'ph', 'ph'] : stores}
                    ListHeaderComponent={this.renderHeader()}
                    renderItem={({ item }, i) => (
                        <StoreCell
                            key={i}
                            full
                            store={item}
                            onPress={() => {
                                loadStore(item)
                                navigation.navigate(screenNames.Store)
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
        stores: storeSelectors.getStores(state),
        loading: storeSelectors.isLoading(state)
    }),
    { loadCategories, loadStore, loadStores, navigateTo }
)(Categories)