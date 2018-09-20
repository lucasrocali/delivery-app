import React from 'react';
import styled from "styled-components";

export const Container = styled.View`

`;

export const Text = styled.Text`
    font-size: 20
`;

type Props = {

}
export default Base = (props: Props) => {
    return (
        <Container>
            <Text>Base</Text>
        </Container>
    );
}