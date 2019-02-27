import React from 'react';
import styled from "styled-components";
import { TitleH3, Text, Number, RiskNumber, Caption, Cell, Placeholder, Left, Right, Horizontal } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';
import { MapPrice } from '../../constants/objects';
import Ionicon from "react-native-vector-icons/Ionicons";

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
    flex: 1;
    padding-horizontal: ${spacing.small};
`

const ImageView = styled.View`

`

const Image = styled(FastImage) `
    background-color: ${colors.gray5};
    width: 90;
    height: 120;
    border-radius: 10;
`

const LargeNumber = styled(Number) `
    font-size: 16;
    font-weight: 100;
`

const OpenFlag = styled.View`
    padding-horizontal: ${spacing.small};
    border-radius: 10;
    border-width: 1;
    border-color: ${colors.gray40};
`

const OpenText = styled(Caption) `
    color: ${props => props.open ? colors.link : colors.gray40};
`

type Props = {
    product: Object,
    store: Object,
    onPress: Function
}
export default ProductCell = (props: Props) => {
    const { product, store, onPress } = props
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
                <ImageView>
                    {product.img_url && <Image source={{ uri: product.img_url }} />}
                </ImageView>
                <InfoView>
                    <TitleH3>{product.name}</TitleH3>
                    {store && store.name != '' && (
                        <Horizontal>
                            <Ionicon
                                name={'ios-home'}
                                size={15}
                                color={colors.gray40}
                            />
                            <Caption> {store.name}</Caption>
                        </Horizontal>)}
                    {store && store.delivery_estimation != '' && (
                        <Horizontal>
                            <Ionicon
                                name={'ios-timer'}
                                size={15}
                                color={colors.gray40}
                            />
                            <Caption> {store.delivery_estimation_text}</Caption>
                        </Horizontal>
                    )}
                    {product.descp != '' && <Caption>{product.descp}</Caption>}
                    {product.promo_price < product.price ?
                        <Row>
                            <RiskNumber>{product.price_text}</RiskNumber>
                            <Number>{product.promo_price_text}</Number>
                        </Row>
                        :
                        <Number>{product.promo_price_text}</Number>
                    }
                    {store && store.delivery_price != '' && <Caption>{'Entrega ' + MapPrice(store.delivery_price)}</Caption>}
                </InfoView>
            </Container>
        </Touchable>
    );
}