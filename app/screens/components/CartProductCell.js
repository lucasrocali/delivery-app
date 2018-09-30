import React from 'react';
import styled from "styled-components";
import { Text, Number, Caption, Cell, Left, Right } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';
import { MapPrice } from '../../constants/objects';
import { getCartProductTotal, getCartProductSubOptions } from '../../constants/functions';

const Touchable = styled.TouchableOpacity`

`

const Container = styled(Cell) `
    flex-direction: row;
`

const InfoView = styled(Left) ` 
    flex: 5;
`


type Props = {
    cart_product: Object,
    onPress: Function
}
export default CartProductCell = (props: Props) => {
    const { cart_product, onPress } = props
    const { product, quantity, selected_options } = cart_product
    const cart_product_total = getCartProductTotal(cart_product)
    const cart_product_sub_options = getCartProductSubOptions(cart_product)
    console.log(cart_product, cart_product_sub_options)
    return (
        <Touchable activeOpacity={onPress ? 0.7 : 1.0} onPress={onPress}>
            <Container>
                <InfoView>
                    <Text>{quantity + 'x ' + product.name}</Text>
                    {product.descp != '' && <Caption>{product.descp}</Caption>}
                    {cart_product_sub_options && cart_product_sub_options.map((so, i) => (
                        <Caption key={i}>{' - '.concat(so.name).concat(so.price == 0 ? '' : ' (' + so.price_text + ')')}</Caption>
                    ))}
                </InfoView>
                <Right>
                    <Number>{MapPrice(cart_product_total)}</Number>
                </Right>
            </Container>
        </Touchable>
    );
}