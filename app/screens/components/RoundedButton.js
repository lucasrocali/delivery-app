import React from 'react';
import styled from "styled-components";
import { TitleH4, Left, Right } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const LightTitle = styled(TitleH4) `
    color: ${colors.white};
`

const AddButton = styled.TouchableOpacity`
    flex-direction: row;
    height: 60;
    background-color: ${colors.link};
    position: absolute;
    bottom: ${spacing.small};
    left: ${spacing.small};
    right: ${spacing.small};
    padding-horizontal: ${spacing.small};
    align-items: center;
    border-radius: 5;
`
type Props = {
    leftText: string,
    rightText: string,
    disabled: boolean,
    onPress: Function
}
export default Base = (props: Props) => {
    const { leftText, rightText, disabled, onPress } = props
    return (
        <AddButton
            style={{ opacity: disabled ? 0.4 : 1.0 }}
            activeOpacity={0.8}
            disabled={disabled}
            onPress={onPress} >
            <Left>
                <LightTitle>{leftText}</LightTitle>
            </Left>

            <Right>
                <LightTitle>{rightText}</LightTitle>
            </Right>
        </AddButton>
    );
}