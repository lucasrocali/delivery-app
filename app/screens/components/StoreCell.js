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
    border-bottom-width: 1;
    border-color: ${colors.gray5};
    overflow: hidden;
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
                {store.img_url ?
                    <Image full={full} source={{ uri: store.img_url }} />
                    :
                    <Placeholder width={full ? dimensions.estabCellFullWidth : dimensions.estabCellWidth} height={full ? dimensions.estabCellFullHeigth : dimensions.estabCellHeigth} />
                }
                <StoreCellBody store={store} />
            </Body>
        </ Container>
    );
}