import React from 'react';
import styled from "styled-components";
import { Text } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';
import Ionicon from "react-native-vector-icons/Ionicons";

const Container = styled.TouchableOpacity`
    flex: ;
    margin-horizontal: 10;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

type Props = {

}
export default Base = (props: Props) => {
    const { onPress, icon_name } = props
    return (
        <Container
            onPress={onPress}>
            <Ionicon
                name={icon_name}
                size={25}
                color={colors.link}
                backgroundColor={"transparent"}
            />
        </Container>
    );
}