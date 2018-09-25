import React from 'react';
import styled from "styled-components";
import { Text, Number, Caption, Cell } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';
import Ionicon from "react-native-vector-icons/Ionicons";

const Touchable = styled.TouchableOpacity`

`

const Container = styled(Cell) `
    flex-direction: row;
`

const InfoView = styled.View`
    flex: 4;
`

const AddView = styled.View`
    flex:1;
    height: 25;
    justify-content: center;
    align-items: flex-end;
`

type Props = {
    sub_option: Object,
    checked: boolean,
    onPress: Function
}
export default Base = (props: Props) => {
    const { sub_option, checked, onPress } = props
    return (
        <Touchable activeOpacity={onPress ? 0.7 : 1.0} onPress={onPress}>
            <Container>
                <InfoView>
                    <Text>{sub_option.name}</Text>
                    {sub_option.price_text != "" && <Number>{sub_option.price_text}</Number>}
                </InfoView>
                <AddView>
                    {checked &&
                        <Ionicon
                            name={'ios-checkmark'}
                            size={25}
                            color={colors.link}
                        />
                    }
                </AddView>
            </Container>
        </Touchable>
    );
}