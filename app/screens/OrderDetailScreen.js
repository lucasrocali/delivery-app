// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { } from '../store/user/action'
import * as selectors from '../store/user/selector';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import styled from "styled-components";
import OrderCell from './components/OrderCell';
import StoreCellBody from './components/StoreCellBody';
import CartProductCell from './components/CartProductCell'
import AddressCell from './components/AddressCell';
import CardCell from './components/CardCell';
import { Text, Title, Cell, TitleH3, TitleH2, Caption, TitleH4, PaddedView, Row, Left, Right, TouchableCell, LinkText } from './styled/index';
import { MapPrice } from '../constants/objects';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Header = styled.View`

`
const View = styled.View`
    background-color: ${colors.white}
`

const AddressView = styled.View`
    background-color: ${colors.link};
    border-bottom-left-radius: 20;
    border-bottom-right-radius: 20;
`

const CartList = styled(FlatList) `

`

const TotalRow = styled(Row) `
    margin-top: ${spacing.tiny4};
`


type State = {

}

type Props = {

}
class OrderDetail extends Component<Props, State> {

    render() {
        const { order } = this.props.navigation.state.params
        // console.log(JSON.stringify(cart))
        const { store, address, total: cart_total, order_products } = order
        // const order_products = []
        console.log('product_total orderdetail', store, order_products)
        return (
            <Container>
                <CartList
                    data={order_products}
                    ListHeaderComponent={() => (
                        <OrderCell
                            order={order}
                        />
                    )}
                    ListFooterComponent={() => (
                        <View>
                            {store ?
                                <View>
                                    <Cell>
                                        {store && store.delivery_price ?
                                            <TotalRow>
                                                <Left>
                                                    <Caption>Taxa de entrega</Caption>
                                                </Left>
                                                <Right>
                                                    <Caption>{MapPrice(store.delivery_price)}</Caption>
                                                </Right>
                                            </TotalRow>
                                            : <View />}
                                        <TotalRow>
                                            <Left>
                                                <Caption>Total</Caption>
                                            </Left>
                                            <Right>
                                                <Caption>{MapPrice(cart_total + store.delivery_price)}</Caption>
                                            </Right>
                                        </TotalRow>
                                    </Cell>
                                </View>
                                : <View />}
                        </View>
                    )}
                    renderItem={({ item: order_product, index }) => (
                        <CartProductCell
                            order_product={order_product}
                            hideMenu
                        />
                    )}
                />
            </Container>
        )
    }
}

export default connect(
    state => ({

    }),
    {}
)(OrderDetail)