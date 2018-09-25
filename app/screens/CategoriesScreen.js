// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCategories, loadStore } from '../store/stores/action'
import * as storeSelectors from '../store/stores/selector';
import CategoryCell from './components/CategoryCell';
import styled from "styled-components";
import colors from '../constants/colors';

const Container = styled.ScrollView`
    flex: 1;
    background-color: ${colors.white};
`;

const Text = styled.Text`
    font-size: 20
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
        const { categories, navigation, loadStore } = this.props
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
                                navigation.navigate({ key: 'Store', routeName: 'Store', params: { title: store.name } })
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
        categories: storeSelectors.getCategories(state)
    }),
    { loadCategories, loadStore }
)(Categories)