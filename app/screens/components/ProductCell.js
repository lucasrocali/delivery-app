import React from 'react';
import styled from "styled-components";
import { Text, Number, RiskNumber, Caption, Cell, Placeholder } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

import FastImage from 'react-native-fast-image'

const Touchable = styled.TouchableOpacity`

`

const Container = styled(Cell) `
    flex-direction: row;
`

const Row = styled.View`
    flex-direction: row;
`

const InfoView = styled.View`
    flex: 4;
`

const ImageView = styled.View`
    flex:1
`

const Image = styled(FastImage) `
    background-color: ${colors.gray5};
    width: 50;
    height: 50;
`

type Props = {
    product: Object,
    onPress: Function
}
export default Base = (props: Props) => {
    const { product, onPress } = props
    if (typeof product == 'string') {
        return (
            <Container>
                <InfoView>
                    <Placeholder width={70} height={20} />
                    <Placeholder width={120} height={10} />
                    <Placeholder width={110} height={10} />
                    <Placeholder width={30} height={15} />
                </InfoView>
                <Placeholder width={50} height={50} />
            </Container>
        );
    }
    return (
        <Touchable activeOpacity={onPress ? 0.7 : 1.0} onPress={onPress}>
            <Container>
                <InfoView>
                    <Text>{product.name}</Text>
                    {product.descp != '' && <Caption>{product.descp}</Caption>}
                    {product.promo_price < product.price ?
                        <Row>
                            <RiskNumber>{product.price_text}</RiskNumber>
                            <Number>{product.promo_price_text}</Number>
                        </Row>
                        :
                        <Number>{product.promo_price_text}</Number>
                    }
                </InfoView>
                <ImageView>
                    {product.img_url != '' && <Image source={{ uri: product.img_url }} />}
                </ImageView>
            </Container>
        </Touchable>
    );
}