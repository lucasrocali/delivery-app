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
import { TextLight, ButtonText } from './styled'
import spacing from '../constants/spacing';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Header = styled.View`
    background-color: ${colors.white};
`;

const SectionTitle = styled(TextLight) `
    margin-left: ${spacing.small};
    margin-top: ${spacing.tiny};
`

const CategoryContent = styled.View` 
    border-bottom-width: ${spacing.tiny};
    border-color: ${colors.gray5}
`

const SearchContent = styled.View`
    flex-direction: row;
    border-bottom-width: ${spacing.tiny};
    border-color: ${colors.gray5};
    align-items: center;
    padding-horizontal: ${spacing.small};

`

const InputText = styled.TextInput`
    flex: 1;
    height: 40;
    margin-right: ${spacing.small};
    margin-vertical: ${spacing.small};
    padding-left: ${spacing.small};
    border-radius: 8;
    border-width: 1;
    border-color: ${colors.link2};
`
const SearchBtn = styled.TouchableOpacity`

`

const SearchText = styled(ButtonText) `
    color: ${colors.link2};
`

type State = {

}

type Props = {
    loadCategories: Function
}

class Categories extends Component<Props, State> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            currentCategory: null,
            searchingText: '',
            searching: false
        };
    }

    componentDidMount() {
        const { loadCategories } = this.props
        loadCategories()
    }

    renderHeader() {
        const { categories, loadStore, loadStores, navigateTo, navigation } = this.props
        const { currentCategory, searching, searchingText } = this.state
        return (
            <Header>
                <SearchContent>
                    <InputText
                        onChangeText={(value) => this.setState({ searchingText: value })}
                        value={searchingText}
                        placeholder="Busque por restaurante"
                        underlineColorAndroid='transparent'
                    />
                    <SearchBtn
                        activeOpacity={0.8}
                        onPress={() => {
                            if (searching) {
                                this.setState({ searching: false, searchingText: '' })
                                loadStores('', '')
                            } else {
                                this.setState({ searching: true })
                                loadStores('', searchingText)
                            }

                        }}
                    >
                        <SearchText>{searching ? 'Limpar' : 'Buscar'}</SearchText>
                    </SearchBtn>
                </SearchContent>
                {!searching &&
                    <CategoryContent>
                        <SectionTitle>{'CATEGORIAS'.concat(currentCategory ? ` - ${currentCategory.name}` : '')}</SectionTitle>
                        <FlatList
                            data={categories.length > 0 ? categories : ['ph1', 'ph2', 'ph1', 'ph2']}
                            horizontal
                            ListHeaderComponent={(<View width={10} />)}
                            renderItem={({ item: category }, i) => (
                                <CategoryCell
                                    key={i}
                                    category={category}
                                    onPress={(store) => {
                                        if (this.state.currentCategory != category) {
                                            this.setState({ currentCategory: category })
                                            loadStores(category.id)
                                        } else {
                                            this.setState({ currentCategory: null })
                                            loadStores()
                                        }

                                    }}
                                />
                            )}
                        />
                    </CategoryContent>
                }
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