import React from 'react';
import styled from "styled-components";
import { Cell, Text, Caption } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const Container = styled(Cell) `

`;

const Touchable = styled.TouchableOpacity`

`

type Props = {
    address: object,
    onPress: Function
}
export default AddressCell = (props: Props) => {
    const { address, onPress } = props
    return (
        <Container>
            {address &&
                <Touchable onPress={onPress}>
                    <Text>{address.name}</Text>
                    <Caption>{address.street + ', ' + address.neighborhood + ' - ' + address.city + ' - ' + address.state}</Caption>
                </Touchable>
            }
        </Container>
    );
}