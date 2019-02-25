import React from 'react';
import styled from "styled-components";
import { Cell, Text, Caption, Left, Right } from '../styled/index';
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const Container = styled.View`
    flex-direction: row;
`
const ContentCell = styled(Cell) `
    flex: 1;
    flex-direction: row;
    border-bottom-width: 0;
`;

const BallContent = styled.View` 
    padding-left: ${spacing.small};
    justify-content: center;
`

const Line = styled.View`
    top: ${props => props.first ? 20 : 0};
    bottom: ${props => props.last ? 20 : 0};
    right: 10;
    background-color: ${colors.link2};
    width: 1;
    position: absolute;
`

const Ball = styled.View`
    width: 20;
    height: 20;
    border-radius: 10;
    background-color: ${colors.link2};
`


type Props = {
    order_status: object,
}
export default OrderStatusCell = (props: Props) => {
    const { order_status, first, last } = props
    return (
        <Container>
            <BallContent>
                <Line first={first} last={last} />
                <Ball />
            </BallContent>
            <ContentCell>
                <Left>
                    <Text>{order_status.status}</Text>
                </Left>
                <Right>
                    <Caption>{order_status.updated_at}</Caption>
                </Right>
            </ContentCell>
        </Container>
    );
}