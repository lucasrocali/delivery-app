import React from 'react';
import styled from "styled-components";
import { TitleH4, Cell, Caption, Left, Right } from '../styled/index';
import type { Option } from '../../constants/objects';
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const Container = styled(Cell) `
    flex-direction: row;
    background-color: ${colors.white};
`;

const optionDescp = (option) => {
    if (option.min == 0) return ""
    if (option.min == 1) return "Escolha 1 opção"
    return "Escolha " + option.min + " opções"
}

type Props = {
    option: Option,
    selected_count: number
}
export default OptionCell = (props: Props) => {
    const { option, selected_count } = props
    console.log(option)
    return (
        <Container>
            <Left>
                <TitleH4>{option.name}</TitleH4>
                <Caption>{optionDescp(option)}</Caption>
            </Left>
            <Right>
                <Caption>{selected_count + ' / ' + option.max}</Caption>
            </Right>
        </Container>
    );
}