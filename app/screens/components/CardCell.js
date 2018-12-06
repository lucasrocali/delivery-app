import React from 'react';
import styled from "styled-components";
import { Cell, Text, Caption } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';
import Ionicon from "react-native-vector-icons/Ionicons";

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
    checked: boolean,
    onPress: Function,
}
export default CardCell = (props: Props) => {
    const { card, checked, onPress } = props
    return (
        <Container>
            {typeof checked == 'boolean' &&
                <CheckView>
                    {checked &&
                        <Ionicon
                            name={'ios-checkmark'}
                            size={25}
                            color={colors.link}
                        />
                    }
                </CheckView>
            }
            <Touchable onPress={onPress}>
                <Text>{card.brand}</Text>
                <Caption>{card.display_number}</Caption>
            </Touchable>
        </Container>
    );
}