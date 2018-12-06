// @flow

import React, { Component } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCards, selectedCard } from '../store/user/action'
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
        const { user, loadCards } = this.props
        const { cards } = user
        if (!cards || cards && cards.length == 0) {
            loadCards()
        }
    }

    onRefresh = () => {
        const { loadCards } = this.props
        loadCards()
    }

    render() {
        const { user, selected_card_id, selectedCard, navigation } = this.props
        const { cards } = user
        return (
            <Container>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this.onRefresh}
                        />
                    }
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
                        <CardCell
                            card={card}
                            checked={card.id == selected_card_id}
                            onPress={() => selectedCard(card.id)}
                        />
                    )}
                />
            </Container>
        )
    }
}

export default connect(
    state => ({
        user: selectors.getUser(state),
        selected_card_id: selectors.getSelectedCardId(state)
    }),
    { loadCards, selectedCard }
)(Base)