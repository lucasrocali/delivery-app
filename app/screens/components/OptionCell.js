import React from 'react';
import styled from "styled-components";
import { Title, Cell, Caption } from '../styled/index';
import type { Option } from '../../constants/objects';
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const Container = styled(Cell) `
    flex-direction: row;
    background-color: ${colors.white};
`;

const Left = styled.View`
    flex:1;
    justify-content: flex-start;
`
const Right = styled.View`
    flex:1;
    align-items: flex-end;
`

type Props = {
    option: Option
}
export default OptionCell = (props: Props) => {
    const { option } = props
    console.log(option)
    return (
        <Container>
            <Left>
                <Title>{option.name}</Title>
            </Left>
            <Right>
                <Caption>{option.min + ' / ' + option.max}</Caption>
            </Right>
        </Container>
    );
}