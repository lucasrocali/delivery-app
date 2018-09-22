import styled from "styled-components";
import colors from '../../constants/colors';

export const Title = styled.Text`
    font-size: 16;
    color: ${colors.gray70}
    font-weight: bold;
`

export const Text = styled.Text`
    font-size: 16;
    color: ${colors.gray70}
    font-weight: 400;
`

export const Caption = styled.Text`
    margin-top: 5;
    font-size: 13;
    color: ${colors.gray40};
`

export const SectionHeader = styled.View` 
    flex-direction: row;
    padding-horizontal: 16;
    padding-vertical: 8;
`