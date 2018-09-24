// @flow

import React, { Component } from 'react';
import { SectionList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/auth/action'
import styled from "styled-components";
import * as storeSelectors from '../store/stores/selector';
import colors from '../constants/colors';
import dimensions from '../constants/dimensions';
import spacing from '../constants/spacing';
import StoreCellBody from './components/StoreCellBody'
import { Title, Text, Cell } from './styled/index'
import { MapMenuSection } from '../constants/objects';
import ProductCell from './components/ProductCell';
import MenuCell from './components/MenuCell';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Image = styled.Image`
    background-color: ${colors.gray10};
    width: ${dimensions.width}
    height: ${dimensions.storeImgHeight};
`

const Header = styled.View` 

`

const HeaderBody = styled(Cell) `

`


type State = {

}

type Props = {
    store: object
}
/*
[
                            { title: 'Title1', data: ['item1', 'item2', 'item3', 'item1', 'item2', 'item3', 'item1', 'item2', 'item3'] },
                            { title: 'Title1', data: ['item1', 'item2', 'item3', 'item1', 'item2', 'item3', 'item1', 'item2', 'item3', 'item1', 'item2', 'item3'] }
                        ]*/
class Store extends Component<Props, State> {

    render() {
        const { store, navigation } = this.props
        return (
            <Container>
                <SectionList
                    sections={MapMenuSection(store)}
                    renderSectionHeader={({ section: menu }) =>
                        (<MenuCell menu={menu} />)
                    }
                    renderItem={({ item: product }, i) => (
                        (<ProductCell
                            product={product}
                            onPress={() => {
                                navigation.navigate({ key: 'Product', routeName: 'Product', params: { product: product } })
                            }}
                        />)
                    )}
                    stickySectionHeadersEnabled
                    ListHeaderComponent={
                        (<Header>
                            <Image source={{ uri: store.img_url }} />
                            <StoreCellBody store={store} />
                        </Header>)
                    }
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        store: storeSelectors.getStore(state)
    }),
    {}
)(Store)