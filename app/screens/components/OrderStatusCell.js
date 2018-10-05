import React from 'react';
import styled from "styled-components";
import { Cell, Text, Caption, Left, Right } from '../styled/index';
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const Container = styled(Cell) `
    flex-direction: row;
`;


type Props = {
    order_status: object,
}
export default OrderCell = (props: Props) => {
    const { order_status } = props
    return (
        <Container>
            <Left>
                <Text>{order_status.status}</Text>
            </Left>
            <Right>
                <Caption>{order_status.updated_at}</Caption>
            </Right>
        </Container>
    );
}