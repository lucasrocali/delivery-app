// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/user/action'
import * as cartSelectors from '../store/cart/selector';
import * as userSelectors from '../store/user/selector';
import colors from '../constants/colors';
import styled from "styled-components";
import StoreCellBody from './components/StoreCellBody';
import CartProductCell from './components/CartProductCell'
import AddressCell from './components/AddressCell';
import RoundedButton from './components/RoundedButton';
import { Text, Title, Cell, TitleH3, TitleH2, Caption, TitleH4, PaddedView, Row, Left, Right, TouchableCell } from './styled/index';
import { screenNames } from '../navigation/Routers';
import { getCartTotal } from '../constants/functions';
import { MapPrice } from '../constants/objects';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Header = styled.View`

`

const View = styled.View`

`

const CartList = styled(FlatList) `
    margin-bottom: 80;
`

const TextView = styled(PaddedView) `
    padding-bottom: 0;
`

const AddMoreBtn = styled(TouchableCell) `
    align-items: center;
    justify-content: center;
`

type State = {

}

type Props = {

}
class Cart extends Component<Props, State> {

    render() {
        const { cart, selected_address, navigation } = this.props
        // console.log(JSON.stringify(cart))
        const { store, cart_products } = cart
        const cart_total = getCartTotal(cart_products)
        console.log(cart, store, cart_products)
        return (
            <Container>
                <CartList
                    data={cart_products}
                    ListHeaderComponent={() => (
                        <Header>

                            {selected_address &&
                                <View>
                                    <TextView>
                                        <Title>{'Entregar em:'}</Title>
                                    </TextView>
                                    <AddressCell address={selected_address} />
                                </View>

                            }
                            {store &&
                                <Cell>
                                    <TitleH2>{store.name}</TitleH2>
                                    <Caption>{store.delivery_estimation}</Caption>
                                </Cell>
                            }

                        </Header>
                    )}
                    ListFooterComponent={() => (
                        <View>
                            {store &&
                                <View>
                                    <AddMoreBtn
                                        onPress={() => navigation.navigate({ key: screenNames.Store, routeName: screenNames.Store, params: { title: store.name } })}
                                    >
                                        <Caption>Adicionar mais itens</Caption>
                                    </AddMoreBtn>
                                    <Cell>
                                        <Row>
                                            <Left>
                                                <Caption>Subtotal</Caption>
                                            </Left>
                                            <Right>
                                                <Caption>{MapPrice(cart_total)}</Caption>
                                            </Right>
                                        </Row>
                                        {store &&
                                            <Row>
                                                <Left>
                                                    <Caption>Taxa de entrega</Caption>
                                                </Left>
                                                <Right>
                                                    <Caption>{MapPrice(store.delivery_price)}</Caption>
                                                </Right>
                                            </Row>
                                        }
                                        <Row>
                                            <Left>
                                                <Title>Total</Title>
                                            </Left>
                                            <Right>
                                                <Title>{MapPrice(cart_total)}</Title>
                                            </Right>
                                        </Row>
                                    </Cell>
                                </View>
                            }
                        </View>
                    )}
                    renderItem={({ item: cart_product, index }) => (
                        <CartProductCell
                            cart_product={cart_product}
                            onPress={() => navigation.navigate({
                                key: screenNames.ProductStack,
                                routeName: screenNames.ProductStack,
                                params: {
                                    store_id: store.id,
                                    cart_product: cart_product,
                                    title: store.name
                                }
                            })}
                        />
                    )}
                />
                <RoundedButton
                    leftText={'Finalizar pedido'}
                    rightText={MapPrice(cart_total)}
                    disabled={cart_products.length == 0}
                    onPress={() => console.log('finalizar')}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        cart: cartSelectors.getCart(state),
        selected_address: userSelectors.getSelectedAddress(state)
    }),
    {}
)(Cart)