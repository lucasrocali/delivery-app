import React from 'react';
import { FlatList } from 'react-native';
import styled from "styled-components";
import StoreCell from './StoreCell';
import colors from '../../constants/colors';
import { Title, ButtonText, SectionHeader, Left, Right } from '../styled/index'

const Container = styled.View`
    border-bottom-width: 1;
    border-color: ${colors.gray5};
    padding-vertical: 10;
`;

const Button = styled.TouchableOpacity`

`

const Header = styled.View`
    flex-direction: row;
    padding-horizontal: 16;
    padding-vertical: 8;
`

type Props = {
    category: object,
    onStorePress: Function,
    onMorePress: Function
}
export default CategoryCell = (props: Props) => {
    const { category, onStorePress, onMorePress } = props
    console.log('CategoryCell', category)
    return (
        <Container>
            <SectionHeader>
                <Left>
                    <Title>{category.name}</Title>
                </Left>
                <Right>
                    <Button onPress={onMorePress}>
                        <ButtonText>Mais</ButtonText>
                    </Button>
                </Right>
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