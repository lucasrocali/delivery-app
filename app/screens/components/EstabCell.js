import React from 'react';
import styled from "styled-components";
import colors from '../../constants/colors';
import dimensions from '../../constants/dimensions';

export const Container = styled.View`
    background-color: ${colors.white};
    width: ${dimensions.estabCellWidth};
`;

export const Text = styled.Text`
    font-size: 20
`;

export const Image = styled.Image`
    background-color: ${colors.gray10};
    width: ${dimensions.estabCellWidth};
    height: ${dimensions.estabCellImgHeigth};
`

type Props = {

}
export default EstabCell = (props: Props) => {
    return (
        <Container>
            <Image />
            <Text>EstabCell</Text>
        </Container>
    );
}