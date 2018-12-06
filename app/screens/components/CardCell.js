import React from 'react';
import styled from "styled-components";
import { Cell, Text, Caption } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const Container = styled(Cell) `
    align-items: center;
    flex-direction: row;
`;

const Touchable = styled.TouchableOpacity`
    flex: 1
`
const CheckView = styled.View`
    width: 20;
    align-items: flex-start;
`
const IconView = styled.TouchableOpacity`
    padding-horizontal: ${spacing.tiny4}
`

type Props = {
    card: object,
    onPress: Function,
}
export default CardCell = (props: Props) => {
    const { card, onPress } = props
    return (
        <Container>
            <Touchable onPress={onPress}>
                <Text>{card.brand}</Text>
                <Caption>{card.display_number}</Caption>
            </Touchable>
        </Container>
    );
}