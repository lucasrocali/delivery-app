// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { placeOrder } from '../store/cart/action'
import * as cartSelectors from '../store/cart/selector';
import * as userSelectors from '../store/user/selector';
import colors from '../constants/colors';
import styled from "styled-components";
import StoreCellBody from './components/StoreCellBody';
import CartProductCell from './components/CartProductCell'
import AddressCell from './components/AddressCell';
import CardCell from './components/CardCell';
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
        const { cart, loading, selected_address, selected_card, placeOrder, navigation } = this.props
        // console.log(JSON.stringify(cart))
        const { store, order_products } = cart
        const cart_total = getCartTotal(order_products)
        console.log(cart, store, order_products)
        return (
            <Container>
                <CartList
                    data={order_products}
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

                            {selected_card &&
                                <View>
                                    <TextView>
                                        <Title>{'Pagamento:'}</Title>
                                    </TextView>
                                    <CardCell
                                        card={selected_card}
                                        onPress={() => navigation.navigate({
                                            key: screenNames.CardsStack,
                                            routeName: screenNames.CardsStack
                                        })}
                                    />
                                </View>
                            }
                        </View>
                    )}
                    renderItem={({ item: order_product, index }) => (
                        <CartProductCell
                            order_product={order_product}
                            onPress={() => navigation.navigate({
                                key: screenNames.ProductStack,
                                routeName: screenNames.ProductStack,
                                params: {
                                    store_id: store.id,
                                    order_product: order_product,
                                    title: store.name
                                }
                            })}
                        />
                    )}
                />
                <RoundedButton
                    leftText={'Finalizar pedido'}
                    loading={loading}
                    rightText={MapPrice(cart_total)}
                    disabled={order_products.length == 0 || loading}
                    onPress={() => placeOrder()}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        cart: cartSelectors.getCart(state),
        selected_address: userSelectors.getSelectedAddress(state),
        selected_card: userSelectors.getSelectedCard(state),
        loading: cartSelectors.isCartLoaing(state)
    }),
    { placeOrder }
)(Cart)