// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/auth/action'
import * as selectors from '../store/auth/selector';
import styled from "styled-components";
import { Title, Text, Cell, ButtonText } from './styled/index';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import Ionicon from "react-native-vector-icons/Ionicons";
import CloseBtn from './components/CloseBtn';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
    align-items: center;
    justify-content: center;
`;

const Touchable = styled.TouchableOpacity`

`

const SocialBtn = styled(Touchable) `
    margin-vertical: ${spacing.tiny}
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 40;
    width: 80%;
    border-radius: 6;
`

const FacebookBtn = styled(SocialBtn) `
    background-color: ${colors.facebook};
`

const GoogleBtn = styled(SocialBtn) `
    background-color: ${colors.google};
`
const BtnText = styled(Text) `
    color: ${colors.white};
    margin-left: ${spacing.small};
`

const ManualBtn = styled(Touchable) `
    margin-vertical: ${spacing.small};
`

const RegisterBtn = styled(Touchable) `
    margin-top: ${spacing.small};
    margin-bottom: ${spacing.large};
`
const BottomView = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
`

type State = {

}

type Props = {

}
class SocialLogin extends Component<Props, State> {

    render() {
        const { navigation } = this.props
        return (
            <Container>
                <CloseBtn onPress={() => navigation.goBack(null)} />
                <FacebookBtn>
                    <Ionicon
                        name={'logo-facebook'}
                        size={20}
                        color={colors.white}
                        backgroundColor={"transparent"}
                    />
                    <BtnText>Facebook</BtnText>
                </FacebookBtn>
                <GoogleBtn>
                    <Ionicon
                        name={'logo-google'}
                        size={20}
                        color={colors.white}
                        backgroundColor={"transparent"}
                    />
                    <BtnText>Google</BtnText>
                </GoogleBtn>
                <BottomView>
                    <ManualBtn onPress={() => navigation.navigate({ routeName: 'Login' })}>
                        <ButtonText>Login com email e senha</ButtonText>
                    </ManualBtn>
                    <RegisterBtn>
                        <ButtonText>Registrar</ButtonText>
                    </RegisterBtn>
                </BottomView>
            </Container>
        );
    }
}

export default connect(
    state => ({

    }),
    {}
)(SocialLogin)