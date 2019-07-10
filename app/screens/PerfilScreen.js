// @flow

import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigateTo } from '../store/app/action';
import colors from '../constants/colors';
import { logout } from '../store/user/action';
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Caption, Text, TextLight, Cell } from './styled/index';
import { screenNames } from '../navigation/Routers';
import spacing from '../constants/spacing';
import Ionicon from "react-native-vector-icons/Ionicons";

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Content = styled.View`
`

const PerfilView = styled(Cell) `
    flex-direction: row;
`

const Image = styled.Image` 
    width: 50;
    height: 50;
    border-radius: 25;
    background-color: ${colors.gray10};
    margin-right: ${spacing.small};
    margin-vertical: ${spacing.small};
`

const Vertical = styled.View`
    justify-content: center;
`

const Touchable = styled.TouchableOpacity`
    flex-direction: row;    
`

const IconView = styled.View`
    width: 30;
    height: 30;
    margin-right: ${spacing.small};
    align-items: center;
    justify-content: center;
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
        const { user, navigateTo } = this.props
        return (
            <Container>
                {user && user.email ?
                    <Content>
                        <PerfilView>
                            <Image />
                            <Vertical>
                                <Title>{user.name && user.name}</Title>
                                <Caption>{user.email}</Caption>
                            </Vertical>
                        </PerfilView>
                        <Cell>
                            <Touchable onPress={() => navigateTo(screenNames.AddressesStack)} >
                                <IconView>
                                    <Ionicon
                                        name={'ios-pin'}
                                        size={25}
                                        color={colors.black}
                                        backgroundColor={"transparent"}
                                    />
                                </IconView>
                                <TextLight>Endereços</TextLight>
                            </Touchable>
                        </Cell>
                        <Cell>
                            <Touchable onPress={() => navigateTo(screenNames.OrdersStack)} >
                                <IconView>
                                    <Ionicon
                                        name={'ios-clipboard'}
                                        size={25}
                                        color={colors.black}
                                        backgroundColor={"transparent"}
                                    />
                                </IconView>
                                <TextLight>Pedidos</TextLight>
                            </Touchable>
                        </Cell>
                        {/* <Cell>
                            <Touchable onPress={() => navigateTo(screenNames.CardsStack)} >
                                <IconView>
                                    <Ionicon
                                        name={'ios-card'}
                                        size={25}
                                        color={colors.black}
                                        backgroundColor={"transparent"}
                                    />
                                </IconView>
                                <TextLight>Cartões</TextLight>
                            </Touchable>
                        </Cell> */}
                        <Cell>
                            <Touchable onPress={this.handlePress}>
                                <IconView>
                                    <Ionicon
                                        name={'ios-log-out'}
                                        size={25}
                                        color={colors.black}
                                        backgroundColor={"transparent"}
                                    />
                                </IconView>
                                <TextLight>Logout</TextLight>
                            </Touchable>
                        </Cell>
                    </Content>
                    :
                    <Content>
                        <Cell>
                            <Touchable onPress={() => navigateTo(screenNames.LoginStack)}>
                                <IconView>
                                    <Ionicon
                                        name={'ios-log-in'}
                                        size={25}
                                        color={colors.black}
                                        backgroundColor={"transparent"}
                                    />
                                </IconView>
                                <TextLight>Login</TextLight>
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
    { logout, navigateTo }
)(Perfil)