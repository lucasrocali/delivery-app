// @flow

import React, { Component } from 'react';
import { SectionList, View } from 'react-native';
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

import FastImage from 'react-native-fast-image'
import Ionicon from "react-native-vector-icons/Ionicons";
import { Transition } from 'react-navigation-fluid-transitions'

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
const CloseView = styled.TouchableOpacity`
    position: absolute;
    top: ${spacing.large};
    left: ${spacing.small};
    background-color: ${colors.white};
    width: 34;
    height: 34;
    border-radius: 17;
    align-items: center;
    justify-content: center;
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
                                navigation.navigate({ key: 'Product', routeName: 'Product', params: { store_id: store.id, product: product, title: store.name } })
                            }}
                        />)
                    )}
                    ListHeaderComponent={() => (
                        <SectionHeader>
                            <Transition appear={'top'}>
                                <Image source={{ uri: store.img_url }} />
                            </Transition>

                            <HeaderBody>
                                <Transition appear={'bottom'}>
                                    <StoreCellBody store={store} />
                                </Transition>
                            </HeaderBody>
                            <CloseView
                                onPress={() => navigation.goBack(null)}
                            >
                                <Ionicon
                                    name={"ios-close"}
                                    size={34}
                                    color={colors.link}
                                    backgroundColor={"transparent"}
                                />
                            </CloseView>
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