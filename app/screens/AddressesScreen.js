// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/auth/action'
import * as selectors from '../store/auth/selector';
import styled from "styled-components";
import { Title } from './styled/index';
import colors from '../constants/colors';
import AddressCell from './components/AddressCell';
import { screens } from '../navigation/Routers';

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
        const { user, navigation } = this.props
        const { addresses } = user
        return (
            <Container>
                <FlatList
                    data={addresses}
                    renderItem={({ item: address, index }) => (
                        <AddressCell
                            address={address}
                            onPress={() => navigation.navigate({ key: screens.Address.name, routeName: screens.Address.name })}
                        />
                    )}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        user: selectors.getUser(state)
    }),
    {}
)(Addresses)