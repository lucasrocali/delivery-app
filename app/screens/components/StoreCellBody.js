import React from 'react';
import styled from "styled-components";
import colors from '../../constants/colors';
import dimensions from '../../constants/dimensions';
import spacing from '../../constants/spacing';
import { Title, Caption, Cell, Left, Right, Placeholder } from '../styled/index'



const Tag = styled.Text`
    margin-top: 5;
    font-size: 13;
    color: ${colors.gray70};
`

const Body = styled(Cell) `
    background-color: ${colors.white}
`

const Row = styled.View`
    flex-direction: row;
`

const OpenFlag = styled.View`
    padding-horizontal: ${spacing.small};
    border-radius: 10;
    border-width: 1;
    border-color: ${colors.gray40};
`

const OpenText = styled(Caption) `
    color: ${props => props.open ? colors.link2 : colors.gray40};
`

type Props = {
    store: object
}
export default StoreCellBody = (props: Props) => {
    const { store } = props
    if (typeof store == 'string') {
        return (
            <Body>
                <Placeholder width={70} height={15} />
                <Row>
                    <Left>
                        <Placeholder width={30} height={10} />
                    </Left>
                    <Right>
                        <Placeholder width={30} height={10} />
                    </Right>
                </Row>
            </Body>
        );
    }
    return (
        <Body>
            <Title>{store.name}</Title>
            <Row>
                <Left>
                    {/* <Caption>{store.price_type}</Caption> */}
                    <Caption>{store.delivery_estimation_text}</Caption>
                    <Caption>{`Entrega: ${store.delivery_price_text}`}</Caption>
                </Left>
                <Right>
                    <OpenFlag>
                        <OpenText open>Aberto</OpenText>
                    </OpenFlag>
                    {/* <Caption>{store.delivery_estimation}</Caption> */}
                </Right>
            </Row>
        </Body>
    );
}