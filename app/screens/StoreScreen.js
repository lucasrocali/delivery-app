// @flow

import React, { Component } from 'react';
import { SectionList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/auth/action'
import styled from "styled-components";
import * as storeSelectors from '../store/stores/selector';
import colors from '../constants/colors';
import dimensions from '../constants/dimensions';
import StoreCellBody from './components/StoreCellBody'
import { Title, Text, SectionHeader } from './styled/index'
import { MapMenuSection } from '../constants/objects';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Image = styled.Image`
    background-color: ${colors.gray10};
    width: ${dimensions.width}
    height: ${dimensions.storeImgHeight};
`

const Header = styled.View` 

`

const StoreSectionHeader = styled(SectionHeader) `
    border-bottom-width: 1;
    border-top-width: 1;
    border-color: ${colors.gray5};
    background-color: ${colors.white};
`

type State = {

}

type Props = {
    store: object
}
/*
[
                            { title: 'Title1', data: ['item1', 'item2', 'item3', 'item1', 'item2', 'item3', 'item1', 'item2', 'item3'] },
                            { title: 'Title1', data: ['item1', 'item2', 'item3', 'item1', 'item2', 'item3', 'item1', 'item2', 'item3', 'item1', 'item2', 'item3'] }
                        ]*/
class Store extends Component<Props, State> {

    render() {
        const { store } = this.props
        console.log(MapMenuSection(store))
        return (
            <Container>
                <SectionList
                    sections={MapMenuSection(store)}
                    renderSectionHeader={({ section: { title } }) =>
                        (<StoreSectionHeader><Title>{title}</Title></StoreSectionHeader>)
                    }
                    renderItem={({ item: product }, i) => (
                        (<SectionHeader><Text>{product.name}</Text></SectionHeader>)
                    )}
                    stickySectionHeadersEnabled
                    ListHeaderComponent={
                        (<Header>
                            <Image source={{ uri: store.img_url }} />
                            <StoreCellBody store={store} />
                        </Header>)
                    }
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        store: storeSelectors.getStore(state)
    }),
    {}
)(Store)