import React from 'react';
import { FlatList } from 'react-native';
import styled from "styled-components";
import StoreCell from './StoreCell';
import colors from '../../constants/colors';
import { Title, SectionHeader } from '../styled/index'

const Container = styled.View`
    border-bottom-width: 1;
    border-color: ${colors.gray5};
    padding-vertical: 10;
`;

const Button = styled.TouchableOpacity`

`

const ButtonText = styled.Text` 
    font-size: 16;
    color: ${colors.link};
    font-weight: 600;
`
const Header = styled.View`
    flex-direction: row;
    padding-horizontal: 16;
    padding-vertical: 8;
`

const HeaderLeft = styled.View`
    flex:1;
    justify-content: flex-start;
`
const HeaderRight = styled.View`
    flex:1;
    align-items: flex-end;
`

type Props = {
    category: object,
    onStorePress: Function
}
export default CategoryCell = (props: Props) => {
    const { category, onStorePress } = props
    return (
        <Container>
            <SectionHeader>
                <HeaderLeft>
                    <Title>{category.name}</Title>
                </HeaderLeft>
                <HeaderRight>
                    <Button>
                        <ButtonText>Mais</ButtonText>
                    </Button>
                </HeaderRight>
            </SectionHeader>

            <FlatList
                horizontal
                data={category.stores}
                renderItem={({ item: store }, i) => (
                    <StoreCell
                        key={i}
                        store={store}
                        onPress={() => onStorePress(store)}
                    />
                )}
            />

        </Container>
    );
}