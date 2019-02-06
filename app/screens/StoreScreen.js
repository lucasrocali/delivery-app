// @flow

import React, { Component } from 'react';
import { SectionList, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/user/action'
import styled from "styled-components";
import * as storeSelectors from '../store/stores/selector';
import colors from '../constants/colors';
import dimensions from '../constants/dimensions';
import spacing from '../constants/spacing';
import StoreCellBody from './components/StoreCellBody'
import { Title, Text, Cell, CloseView, Placeholder } from './styled/index'
import { MapMenuSection } from '../constants/objects';
import ProductCell from './components/ProductCell';
import MenuCell from './components/MenuCell';
import CloseBtn from './components/CloseBtn';
import { screenNames } from '../navigation/Routers';

import FastImage from 'react-native-fast-image'
// import { Transition } from 'react-navigation-fluid-transitions'

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Image = styled(FastImage) `
    background-color: ${colors.gray10};
    width: ${dimensions.width}
    height: ${dimensions.storeImgHeight};
    justify-content: flex-end;
`

const Header = styled.View`
    padding-top: 8;
    background-color: ${colors.white};
    height: ${dimensions.toolbarHeight};
    align-items: center;
    justify-content: center;
    border-bottom-width: 1;
    border-color: ${colors.gray10};
    padding-horizontal: ${spacing.small};
`
const SectionHeader = styled.View` 
    height: ${dimensions.storeImgViewHeight};
`

const HeaderBody = styled.View`
    position: absolute;
    bottom:0;
    left: ${spacing.small};
    right: ${spacing.small};
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
        const { onScroll = () => { } } = this.props;
        const menu_sections = MapMenuSection(store)
        const placeholder_sections = [{ name: '', data: ['ph', 'ph', 'ph', 'ph',] }, { name: '', data: ['ph', 'ph', 'ph', 'ph',] }]
        return (
            <Container>
                <SectionList
                    sections={menu_sections.length > 0 ? menu_sections : placeholder_sections}
                    renderSectionHeader={({ section: menu }) =>
                        (<MenuCell menu={menu} />)
                    }
                    renderItem={({ item: product }, i) => (
                        (<ProductCell
                            product={product}
                            // store={store}
                            onPress={() => {
                                navigation.navigate({ key: screenNames.ProductStack, routeName: screenNames.ProductStack, params: { store: store, order_product: { product: product }, title: store.name } })
                            }}
                        />)
                    )}
                    ListHeaderComponent={() => (
                        <SectionHeader>
                            {/* <Transition appear={'top'}> */}
                            {store.img_url ?
                                <Image source={{ uri: store.img_url }} />
                                :
                                <Placeholder width={dimensions.width} height={dimensions.storeImgHeight} />
                            }
                            {/* </Transition> */}

                            <HeaderBody>
                                {/* <Transition appear={'bottom'}> */}
                                <StoreCellBody store={store} />
                                {/* </Transition> */}
                            </HeaderBody>
                            <CloseBtn onPress={() => navigation.goBack(null)} />
                        </SectionHeader>
                    )}
                    stickySectionHeadersEnabled={true}
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