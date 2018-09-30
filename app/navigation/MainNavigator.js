// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Caption, Number } from '../screens/styled/index'
import { TabNavigator } from './Routers'
import * as userSelectors from '../store/user/selector';
import * as cartSelectors from '../store/cart/selector';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import { screenNames } from '../navigation/Routers';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { getCartTotal } from '../constants/functions';
import { MapPrice } from '../constants/objects';

const Container = styled.View`
    flex: 1;
`;


const BottomView = styled.TouchableOpacity`
    flex-direction: row;
    padding-horizontal: ${spacing.medium};
    padding-vertical: ${spacing.medium};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.92;
    background-color: ${colors.link};
`

const BottomText = styled(Caption) `
    flex: 1;
    padding-left: ${spacing.medium};
    color: ${colors.white};
`

const ValueText = styled(Number) `
    color: ${colors.white};
`

type State = {

}

type Props = {

}
const getBottomInfo = (user, selected_address, cart, navigation) => {
    console.log('getBottomInfo', selected_address, cart, navigation)
    if (user && !user.id) {
        return {
            title: 'Faça login e selecione o endereço',
            number: '',
            evil_icon: 'user',
            onPress: () => navigation.navigate({ key: screenNames.LoginStack, routeName: screenNames.LoginStack })
        }
    } else if (cart && cart.cart_products && cart.cart_products.length > 0) {

        const cart_products_count = cart.cart_products.length

        return {
            title: `${cart_products_count} ${cart_products_count == 1 ? 'item' : 'itens'}`,
            number: MapPrice(getCartTotal(cart.cart_products)),
            evil_icon: 'cart',
            onPress: () => navigation.navigate({ key: screenNames.Cart, routeName: screenNames.Cart })
        }
    } else if (!selected_address) {

        return {
            title: 'Selecione o endereço',
            number: '',
            evil_icon: 'location',
            onPress: () => navigation.navigate({ key: screenNames.AddressesStack, routeName: screenNames.AddressesStack })
        }

    } else if (selected_address) {

        return {
            title: `${selected_address.street}, ${selected_address.number}`,
            number: '',
            evil_icon: 'location',
            onPress: () => navigation.navigate({ key: screenNames.AddressesStack, routeName: screenNames.AddressesStack })
        }

    }
    return null
}


class Base extends Component<Props, State> {

    render() {
        const { user, selected_address, cart, navigation } = this.props
        const bottom_info = getBottomInfo(user, selected_address, cart, navigation)
        console.log('MAIIN', this.props)
        return (
            <Container>
                <TabNavigator
                    foo='bar'
                />
                {bottom_info &&
                    <BottomView
                        activeOpacity={0.8}
                        onPress={bottom_info.onPress}
                    >
                        <EvilIcons
                            name={bottom_info.evil_icon}
                            size={25}
                            color={colors.white}
                        />
                        <BottomText>{bottom_info.title}</BottomText>
                        <ValueText>{bottom_info.number}</ValueText>
                    </BottomView>
                }
            </Container>
        );
    }
}

export default connect(
    state => ({
        user: userSelectors.getUser(state),
        selected_address: userSelectors.getSelectedAddress(state),
        cart: cartSelectors.getCart(state)
    }),
    {}
)(Base)