// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectedAddress } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Text, TouchableCell } from './styled/index';
import colors from '../constants/colors';
import AddressCell from './components/AddressCell';
import { screenNames } from '../navigation/Routers';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;


type State = {

}

type Props = {

}
class Addresses extends Component<Props, State> {

    render() {
        const { user, selected_address_id, selectedAddress, navigation } = this.props
        const { addresses } = user
        return (
            <Container>
                <FlatList
                    ListHeaderComponent={() => (
                        <TouchableCell
                            onPress={() => navigation.navigate({
                                key: screenNames.Address,
                                routeName: screenNames.Address
                            })}>
                            <Text>Novo endereço</Text>
                        </TouchableCell>
                    )}
                    data={addresses}
                    renderItem={({ item: address, index }) => (
                        <AddressCell
                            address={address}
                            checked={address.id == selected_address_id}
                            onPress={() => selectedAddress(address.id)}
                            onOptionsPress={() => navigation.navigate({
                                key: screenNames.Address,
                                routeName: screenNames.Address,
                                params: {
                                    address: address
                                }
                            })}
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
        selected_address_id: selectors.getSelectedAddressId(state)
    }),
    { selectedAddress }
)(Addresses)