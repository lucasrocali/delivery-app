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
    order_product: Object,
    onPress: Function
}
export default CartProductCell = (props: Props) => {
    const { order_product, onPress } = props
    const { product, quantity, selected_options } = order_product
    const order_product_total = getCartProductTotal(order_product)
    const order_product_sub_options = getCartProductSubOptions(order_product)
    console.log(order_product, order_product_sub_options)
    return (
        <Touchable activeOpacity={onPress ? 0.7 : 1.0} onPress={onPress}>
            <Container>
                <InfoView>
                    <Text>{quantity + 'x ' + product.name}</Text>
                    {product.descp != '' && <Caption>{product.descp}</Caption>}
                    {order_product_sub_options && order_product_sub_options.map((so, i) => (
                        <Caption key={i}>{' - '.concat(so.name).concat(so.price == 0 ? '' : ' (' + so.price_text + ')')}</Caption>
                    ))}
                </InfoView>
                <Right>
                    <Number>{MapPrice(order_product_total)}</Number>
                </Right>
            </Container>
        </Touchable>
    );
}