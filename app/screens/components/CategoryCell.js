import React from 'react';
import styled from "styled-components";
import { Text } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const Container = styled.TouchableOpacity`
    margin-vertical: ${spacing.tiny};
    margin-horizontal: ${spacing.tiny4};
    align-items: center;
`;

const Title = styled(Text) `
    text-align: center;
`

const Image = styled.Image`
    background-color: ${colors.gray10}; 
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