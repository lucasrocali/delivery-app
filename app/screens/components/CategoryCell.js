import React from 'react';
import { FlatList } from 'react-native';
import styled from "styled-components";
import StoreCell from './StoreCell';
import colors from '../../constants/colors';
import { Title, ButtonText, SectionHeader, Left, Right, Placeholder } from '../styled/index'

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
                    {typeof category != 'string' ?
                        <Title>{category.name}</Title>
                        :
                        <Placeholder width={100} height={20} />
                    }
                </Left>
                <Right>
                    {typeof category != 'string' ?
                        <Button onPress={onMorePress}>
                            <ButtonText>Mais</ButtonText>
                        </Button>
                        :
                        <Placeholder width={30} height={20} />
                    }
                </Right>
            </SectionHeader>

            <FlatList
                horizontal
                data={typeof category != 'string' ? category.stores : ['ph1', 'ph2']}
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