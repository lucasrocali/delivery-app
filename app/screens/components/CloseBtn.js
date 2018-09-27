import React from 'react';
import styled from "styled-components";
import { CloseView } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';
import Ionicon from "react-native-vector-icons/Ionicons";

const Container = styled.View`

`;

type Props = {
    onPress: Function
}
export default CloseBtn = (props: Props) => {
    const { onPress } = props
    return (
        <CloseView
            onPress={onPress}
        >
            <Ionicon
                name={"ios-close"}
                size={34}
                color={colors.link}
                backgroundColor={"transparent"}
            />
        </CloseView>
    );
}

