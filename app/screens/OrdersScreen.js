// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadOrders, selectedOrder } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Text, TouchableCell } from './styled/index';
import colors from '../constants/colors';
import { screenNames } from '../navigation/Routers';
import OrderCell from './components/OrderCell';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;


type State = {

}

type Props = {

}
class Orders extends Component<Props, State> {

    componentDidMount() {
        const { loadOrders } = this.props
        loadOrders()
    }

    render() {
        const { user, selectedOrder, navigation } = this.props
        const { orders } = user
        return (
            <Container>
                <FlatList
                    data={orders}
                    renderItem={({ item: order, index }) => (
                        <OrderCell
                            order={order}
                            onPress={() => {
                                selectedOrder(order.id)
                                navigation.navigate(screenNames.Order, { order_id: order.id })
                            }}
                        />
                    )}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        user: selectors.getUser(state),
    }),
    { loadOrders, selectedOrder }
)(Orders)