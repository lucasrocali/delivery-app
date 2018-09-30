// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigateTo } from '../store/app/action'
import * as appSelectors from '../store/app/selector';
import * as userSelectors from '../store/user/selector';
import * as cartSelectors from '../store/cart/selector';
import styled from "styled-components";
import { Title, Caption, Number } from '../screens/styled/index'
import RootNavigation from './RootNavigation';
import Toast from 'react-native-root-toast';
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
    height: 45;
    padding-horizontal: ${spacing.medium};
    padding-vertical: ${spacing.small};

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
const getBottomInfo = (user, selected_address, cart, navigateTo) => {
    console.log('getBottomInfo', selected_address, cart, )
    if (user && !user.id) {
        return {
            title: 'Faça login e selecione o endereço',
            number: '',
            evil_icon: 'user',
            onPress: () => navigateTo(screenNames.LoginStack)
        }
    } else if (cart && cart.order_products && cart.order_products.length > 0) {

        const order_products_count = cart.order_products.length

        return {
            title: `${order_products_count} ${order_products_count == 1 ? 'item' : 'itens'}`,
            number: MapPrice(getCartTotal(cart.order_products)),
            evil_icon: 'cart',
            onPress: () => navigateTo(screenNames.CartStack)
        }
    } else if (!selected_address) {

        return {
            title: 'Selecione o endereço',
            number: '',
            evil_icon: 'location',
            onPress: () => navigateTo(screenNames.AddressesStack)
        }

    } else if (selected_address) {

        return {
            title: `${selected_address.street}, ${selected_address.number}`,
            number: '',
            evil_icon: 'location',
            onPress: () => navigateTo(screenNames.AddressesStack)
        }

    }
    return null
}

class Base extends Component<Props, State> {

    render() {
        const { toast_msg, user, selected_address, cart, navigateTo } = this.props
        const bottom_info = getBottomInfo(user, selected_address, cart, navigateTo)
        console.log('MAIIN', this.props)
        return (
            <Container>
                <RootNavigation />
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
                <Toast
                    visible={toast_msg ? true : false}
                    position={-60}
                    shadow={false}
                    animation={false}
                    hideOnPress={true}
                >{toast_msg}</Toast>
            </Container >
        );
    }
}

export default connect(
    state => ({
        toast_msg: appSelectors.getToastMsg(state),
        user: userSelectors.getUser(state),
        selected_address: userSelectors.getSelectedAddress(state),
        cart: cartSelectors.getCart(state)
    }),
    { navigateTo }
)(Base)