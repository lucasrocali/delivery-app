import React from 'react';
import styled from "styled-components";
import { ActivityIndicator } from 'react-native';
import { TitleH4, Left, Right, TextLight } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const LightTitle = styled(TextLight) `
    color: ${colors.white};
`

const AddButton = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${colors.link};
    padding-vertical: ${spacing.small};
    padding-horizontal: ${spacing.small};
    margin-vertical: ${spacing.small};
    margin-horizontal: ${spacing.small};
    align-items: center;
    justify-content: center;
    border-radius: 5;
`
type Props = {
    leftText: string,
    rightText: string,
    loading: boolean,
    disabled: boolean,
    onPress: Function
}
export default Base = (props: Props) => {
    const { leftText, rightText, loading, disabled, onPress } = props
    return (
        <AddButton
            style={{ opacity: disabled ? 0.4 : 1.0 }}
            activeOpacity={0.8}
            disabled={disabled}
            onPress={onPress} >
            {loading &&
                <ActivityIndicator size="small" color="white" />
            }
            {!loading &&
                <Left>
                    <LightTitle>{leftText}</LightTitle>
                </Left>
            }
            {!loading &&
                <Right>
                    <LightTitle>{rightText}</LightTitle>
                </Right>
            }
        </AddButton>
    );
}