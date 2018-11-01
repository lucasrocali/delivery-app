import React from 'react';
import styled from "styled-components";
import { TitleH4, Cell, Placeholder } from '../styled/index'
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
    if (menu == '') {
        return (
            <Container>
                <Placeholder width={70} height={15} />
            </Container>
        )
    }
    return (
        <Container>
            <TitleH4>{menu.name}</TitleH4>
        </Container>
    );
}