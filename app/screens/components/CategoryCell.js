import React from 'react';
import styled from "styled-components";
import { Caption2 } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';
import FastImage from 'react-native-fast-image'

const Container = styled.TouchableOpacity`
    margin-vertical: ${spacing.tiny};
    margin-horizontal: ${spacing.tiny4};
    align-items: center;
`;

const Title = styled(Caption2) `
    text-align: center;
`

const Image = styled(FastImage) `
    background-color: ${colors.gray5}; 
    width: 100;
    height: 60;
    border-radius: 12;
`

type Props = {
    category: {
        name: string,
        img_url: string
    },
    onPress: Function
}
export default Base = (props: Props) => {
    const { category, onPress } = props
    return (
        <Container activeOpacity={0.9} onPress={onPress}>
            <Image source={{ uri: category.img_url }} />
            <Title>{category.name}</Title>
        </Container>
    );
}