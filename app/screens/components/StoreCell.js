import React from 'react';
import styled from "styled-components";
import colors from '../../constants/colors';
import dimensions from '../../constants/dimensions';
import StoreCellBody from './StoreCellBody';
import { Placeholder } from '../../screens/styled';

import FastImage from 'react-native-fast-image'

const Container = styled.TouchableOpacity`
    width: ${props => props.full ? dimensions.estabCellFullWidth : dimensions.estabCellWidth}
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

const Image = styled(FastImage) `
    background-color: ${colors.gray5};
    width: ${props => props.full ? dimensions.estabCellFullWidth : dimensions.estabCellWidth}
    height: ${props => props.full ? dimensions.estabCellFullHeigth : dimensions.estabCellHeigth};
`

type Props = {
    store: object,
    full: boolean,
    onPress: Function
}
export default StoreCell = (props: Props) => {
    const { store, full, onPress } = props
    return (
        <Container full={full} activeOpacity={0.9} onPress={onPress}>
            <Body>
                <Image full={full} source={{ uri: store.img_url }} />
                <StoreCellBody store={store} />
            </Body>
        </ Container>
    );
}