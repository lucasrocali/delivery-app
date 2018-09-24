import React from 'react';
import styled from "styled-components";
import { Text, Cell } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const Container = styled(Cell) `
    background-color: ${colors.white}
`;

type Props = {
    menu: Object
}
export default MenuCell = (props: Props) => {
    const { menu } = props
    return (
        <Container>
            <Text>{menu.name}</Text>
        </Container>
    );
}