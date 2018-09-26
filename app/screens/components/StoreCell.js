import React from 'react';
import styled from "styled-components";
import colors from '../../constants/colors';
import dimensions from '../../constants/dimensions';
import StoreCellBody from './StoreCellBody'

import FastImage from 'react-native-fast-image'

const Container = styled.TouchableOpacity`
    width: ${dimensions.estabCellWidth}
    background-color: ${colors.white};
    margin-vertical: 10;
    margin-horizontal: 10; 
    border-radius: 5;
    border-width: 1;
    border-color: ${colors.gray5};
    box-shadow: 10px 5px 5px ${colors.gray10};
    elevation: 1;
`

const Body = styled.View`
    overflow: hidden;
`

const Image = styled(FastImage)`
    background-color: ${colors.gray10};
    width: ${dimensions.estabCellWidth}
    height: ${dimensions.estabCellImgHeigth};
`

type Props = {
    store: object,
    onPress: Function
}
export default StoreCell = (props: Props) => {
    const { store, onPress } = props
    return (
        <Container activeOpacity={0.9} onPress={onPress}>
            <Body>
                <Image source={{ uri: store.img_url }} />
                <StoreCellBody store={store} />
            </Body>
        </ Container>
    );
}