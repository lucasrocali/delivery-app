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
    address: object,
    checked: boolean,
    onPress: Function,
    onOptionsPress: Function,
}
export default AddressCell = (props: Props) => {
    const { address, checked, onPress, onOptionsPress } = props
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
            {address &&
                <Touchable onPress={onPress}>
                    <Text>{address.street + ', ' + address.number}</Text>
                    <Caption>{address.neighborhood + ' - ' + address.city + ' - ' + address.state}</Caption>
                </Touchable>
            }
            {onOptionsPress &&
                <IconView onPress={onOptionsPress}>
                    <Ionicon
                        name={'ios-more'}
                        size={25}
                        color={colors.gray30}
                    />
                </IconView>
            }
        </Container>
    );
}