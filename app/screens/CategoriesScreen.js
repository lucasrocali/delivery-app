// @flow

import React, { Component } from 'react';
import { FlatList, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCategories, loadStore } from '../store/stores/action'
import * as userSelectors from '../store/user/selector';
import * as cartSelectors from '../store/cart/selector';
import * as storeSelectors from '../store/stores/selector';
import CategoryCell from './components/CategoryCell';
import styled from "styled-components";
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import { Text, Caption } from './styled'
import { screenNames } from '../navigation/Routers';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const BottomView = styled.TouchableOpacity`
    padding-horizontal: ${spacing.medium};
    padding-vertical: ${spacing.medium};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.92;
    background-color: ${colors.link};
`
const BottomCaption = styled(Caption) `
    color: ${colors.white};
`

const BottomText = styled(Text) `
    color: ${colors.white};
`
type State = {

}

type Props = {
    loadCategories: Function
}
const getBottomInfo = (selected_address, cart, navigation) => {
    console.log('getBottomInfo', selected_address, cart, navigation)
    if (!selected_address) {
        return {
            title: 'Selecione o endereço',
            onPress: () => navigation.navigate({ key: screenNames.AddressesStack, routeName: screenNames.AddressesStack })
        }
    } else if (selected_address) {
        return {
            title: `${selected_address.street}, ${selected_address.number}`,
            onPress: () => navigation.navigate({ key: screenNames.AddressesStack, routeName: screenNames.AddressesStack })
        }
    }
    return null
}

class Categories extends Component<Props, State> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            button_visible: true,
        };
    }

    componentDidMount() {
        const { loadCategories } = this.props
        loadCategories()
    }

    _onScroll = (event) => {
        const CustomLayoutLinear = {
            duration: 100,
            create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
        }
        const currentOffset = event.nativeEvent.contentOffset.y
        const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
            ? 'down'
            : 'up'
        const button_visible = direction === 'up'
        if (button_visible !== this.state.button_visible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({ button_visible })
        }
        this._listViewOffset = currentOffset
    }

    render() {
        const { categories, selected_address, cart, navigation, loadStore } = this.props
        const { button_visible } = this.state
        const bottom_info = getBottomInfo(selected_address, cart, navigation)
        console.log('categories', categories)
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
                                navigation.navigate({ key: screenNames.Store, routeName: screenNames.Store, params: { title: store.name } })
                            }}
                        />
                    )}
                    scrollEventThrottle={1}
                    onScroll={this._onScroll}
                />
                {bottom_info && button_visible &&
                    <BottomView
                        activeOpacity={0.8}
                        onPress={bottom_info.onPress}
                    >
                        <BottomCaption>Entregar em:</BottomCaption>
                        <BottomText>{bottom_info.title}</BottomText>
                    </BottomView>
                }
            </Container>
        );
    }
}


export default connect(
    state => ({
        categories: storeSelectors.getCategories(state),
        selected_address: userSelectors.getSelectedAddress(state),
        cart: cartSelectors.getCart(state)
    }),
    { loadCategories, loadStore }
)(Categories)