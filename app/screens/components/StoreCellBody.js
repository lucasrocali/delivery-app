import React from 'react';
import styled from "styled-components";
import colors from '../../constants/colors';
import dimensions from '../../constants/dimensions';
import { Title, Caption, Cell } from '../styled/index'



const Tag = styled.Text`
    margin-top: 5;
    font-size: 13;
    color: ${colors.gray70};
`

const Body = styled(Cell) `
    
`

const Row = styled.View`
    flex-direction: row;
`

const Left = styled.View`
    flex:1;
    justify-content: flex-start;
`
const Right = styled.View`
    flex:1;
    align-items: flex-end;
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