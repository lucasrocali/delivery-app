import React from 'react';
import styled from "styled-components";
import { TouchableCell, Text, Caption } from '../styled/index';
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';
import { getCartTotal } from '../../constants/functions';

const Container = styled(TouchableCell) `
  
`;


type Props = {
    order: object
}
export default OrderCell = (props: Props) => {
    const { order } = props
    return (
        <Container>
            <Text>{order.store.name}</Text>
            <Caption>{order.address.street + ', ' + order.address.number}</Caption>
            <Caption>{order.total_text}</Caption>
        </Container>
    );
}