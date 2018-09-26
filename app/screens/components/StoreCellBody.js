import React from 'react';
import styled from "styled-components";
import colors from '../../constants/colors';
import dimensions from '../../constants/dimensions';
import { Title, Caption, Cell, Left, Right } from '../styled/index'



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

type Props = {
    store: object
}
export default StoreCellBody = (props: Props) => {
    const { store } = props
    return (
        <Body>
            <Title>{store.name}</Title>
            <Row>
                <Left>
                    <Caption>{store.price_type}</Caption>
                </Left>
                <Right>
                    <Caption>{store.delivery_estimation}</Caption>
                </Right>
            </Row>
        </Body>
    );
}