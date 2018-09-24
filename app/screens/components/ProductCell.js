import React from 'react';
import styled from "styled-components";
import { Text, Number, Caption, Cell } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const Touchable = styled.TouchableOpacity`

`

const ProductCell = styled(Cell) `
    flex-direction: row;
`

const InfoView = styled.View`
    flex: 4;
`

const ImageView = styled.View`
    flex:1
`

const Image = styled.Image`
    background-color: ${colors.gray5};
    width: 50;
    height: 50;
`

type Props = {
    product: object
}
export default Base = (props: Props) => {
    const { product } = props
    return (
        <Touchable activeOpacity={0.7}>
            <ProductCell>
                <InfoView>
                    <Text>{product.name}</Text>
                    {product.descp != '' && <Caption>{product.descp}</Caption>}
                    <Number>{product.price_text}</Number>
                </InfoView>
                <ImageView>
                    {product.img_url != '' && <Image source={{ uri: product.img_url }} />}
                </ImageView>
            </ProductCell>
        </Touchable>
    );
}