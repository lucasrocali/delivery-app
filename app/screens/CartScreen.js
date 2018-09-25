// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/auth/action'
import * as cartSelectors from '../store/cart/selector';
import colors from '../constants/colors';
import styled from "styled-components";
import StoreCellBody from './components/StoreCellBody';
import CartProductCell from './components/CartProductCell'
import { Text, Title, Cell, TitleH3, TitleH2, Caption, TitleH4 } from './styled/index';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Header = styled.View`

`

type State = {

}

type Props = {

}
class Cart extends Component<Props, State> {

    render() {
        const { cart, navigation } = this.props
        // console.log(JSON.stringify(cart))
        const { store, cart_products } = cart
        console.log(cart, store, cart_products)
        return (
            <Container>
                <FlatList
                    data={cart_products}
                    ListHeaderComponent={() => (
                        <Header>
                            {store &&
                                <Cell>
                                    <TitleH2>{store.name}</TitleH2>
                                    <Caption>{store.delivery_estimation}</Caption>
                                </Cell>
                            }
                            <Cell>
                                <Text>{'Entregar em'}</Text>
                                <TitleH4>{'Av. São Gabriel, 661'}</TitleH4>
                                <TitleH4>{'Itaim Bibi - São Paulo'}</TitleH4>
                            </Cell>

                        </Header>
                    )}
                    ListFooterComponent={() => <Title>Footer</Title>}
                    renderItem={({ item: cart_product, index }) => (
                        <CartProductCell
                            cart_product={cart_product}
                            onPress={() => navigation.navigate({
                                key: 'Product',
                                routeName: 'Product',
                                params: {
                                    store_id: store.id,
                                    product: cart_product.product,
                                    quantity: cart_product.quantity,
                                    selected_options: cart_product.selected_options,
                                    cart_product_index: index,
                                    title: store.name
                                }
                            })}
                        />
                    )}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        cart: cartSelectors.getCart(state),

    }),
    {}
)(Cart)