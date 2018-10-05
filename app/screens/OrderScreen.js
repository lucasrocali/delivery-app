// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import colors from '../constants/colors';
import { Text, Caption, Cell } from './styled/index';
import OrderStatusCell from './components/OrderStatusCell';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white}
`;

const Header = styled(Cell) ``


type State = {

}

type Props = {

}
class Base extends Component<Props, State> {

    render() {
        const { order } = this.props
        return (
            <Container>
                <FlatList
                    data={order.order_statuses}
                    renderItem={({ item: order_status, index }) => (
                        <OrderStatusCell
                            order_status={order_status}
                        />
                    )}
                    ListHeaderComponent={() => (
                        <Header>
                            <Text>{'#' + order.token + ' ' + order.store.name}</Text>
                            <Caption>{order.address.street + ', ' + order.address.number}</Caption>
                            <Caption>{order.total_text}</Caption>
                        </Header>
                    )}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        order: selectors.getSelectedOrder(state)
    }),
    {}
)(Base)