// @flow

import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colors from '../constants/colors';
import { logout } from '../store/user/action';
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Caption, Text, Cell } from './styled/index';
import { screenNames } from '../navigation/Routers';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Content = styled.View`
`

const PerfilView = styled(Cell) `
    align-items: center;
    justify-content: center;
`

const Touchable = styled.TouchableOpacity`

`

type State = {

}

type Props = {
    user: object
}
class Perfil extends Component<Props, State> {

    handlePress = () => {
        const { logout } = this.props
        Alert.alert(
            'Logout',
            'Tem certeza que deseja sair?',
            [
                { text: 'Fazer Logout', onPress: () => logout() },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { user, navigation } = this.props
        return (
            <Container>
                {user && user.name && user.email &&
                    <Content>
                        <PerfilView>
                            <Title>{user.name}</Title>
                            <Caption>{user.email}</Caption>
                        </PerfilView>
                        <Cell>
                            <Touchable onPress={() => navigation.navigate({
                                key: screenNames.AddressesStack,
                                routeName: screenNames.AddressesStack
                            })} >
                                <Text>Endereços</Text>
                            </Touchable>
                        </Cell>
                        <Cell>
                            <Touchable onPress={this.handlePress}>
                                <Text>Logout</Text>
                            </Touchable>
                        </Cell>
                    </Content>
                }

            </Container>
        );
    }
}

export default connect(
    state => ({
        user: selectors.getUser(state)
    }),
    { logout }
)(Perfil)