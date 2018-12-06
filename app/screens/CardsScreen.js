// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCards } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Text, TouchableCell } from './styled/index';
import colors from '../constants/colors';
import { screenNames } from '../navigation/Routers';
import CardCell from './components/CardCell';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

type State = {

}

type Props = {

}
class Base extends Component<Props, State> {

    componentDidMount() {
        const { loadCards } = this.props
        loadCards()
    }

    render() {
        const { user, navigation } = this.props
        const { cards } = user
        return (
            <Container>
                <FlatList
                    ListHeaderComponent={() => (
                        <TouchableCell
                            onPress={() => navigation.navigate({
                                key: screenNames.Card,
                                routeName: screenNames.Card
                            })}>
                            <Text>Novo cartão</Text>
                        </TouchableCell>
                    )}
                    data={cards}
                    renderItem={({ item: card, index }) => (
                        <CardCell card={card} />
                    )}
                />
            </Container>
        )
    }
}

export default connect(
    state => ({
        user: selectors.getUser(state),
    }),
    { loadCards }
)(Base)