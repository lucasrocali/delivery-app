// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { login } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Text, Cell, ButtonText } from './styled/index';
import colors from '../constants/colors';
import spacing from '../constants/spacing';
import Ionicon from "react-native-vector-icons/Ionicons";
import CloseBtn from './components/CloseBtn';
import GoogleSignIn from 'react-native-google-sign-in';
import { LoginButton, LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk'
import { facebookId, googleClientIdIOS, googleClientIdAndroid, googleClientIdAndroidProd } from '../constants/constants';
import { screenNames } from '../navigation/Routers';

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

    handleFacebookLogin = () => {
        const { login } = this.props
        // Attempt a login using the Facebook login dialog asking for default permissions and email.
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
            (result) => {
                if (result.isCancelled) {
                    alert('Login cancelled');
                } else {
                    // Create response callback.
                    const responseInfoCallback = (error, result) => {
                        if (error) {
                            console.log(error);
                            alert('Error fetching data: ' + error.toString());
                        } else {
                            console.log(result)
                            login({
                                name: result.name,
                                email: result.email,
                                login_type: 'Facebook',
                                img_url: result.picture && result.picture.data ? result.picture.data.url : '',
                                social_id: result.id
                            })
                        }
                    }
                    // Create a graph request asking for user email and names with a callback to handle the response.
                    const infoRequest = new GraphRequest('/me', {
                        parameters: {
                            fields: {
                                string: 'id,name,email,picture.type(large)'
                            }
                        }
                    },
                        responseInfoCallback
                    );
                    // Start the graph request.
                    new GraphRequestManager().addRequest(infoRequest).start()
                }
            },
            function (error) {
                alert('Login fail with error: ' + error);
            }
        );
    }


    handleGoogleLogin = async () => {
        const { login } = this.props
        console.log(Platform.OS === 'ios' ? 'googleClientIdIOS' : __DEV__ ? 'googleClientIdAndroid' : 'googleClientIdAndroidProd')
        await GoogleSignIn.configure({
            clientID: Platform.OS === 'ios' ? googleClientIdIOS : __DEV__ ? googleClientIdAndroid : googleClientIdAndroidProd,
            scopes: ['openid', 'email', 'profile'],
            shouldFetchBasicProfile: true,
        });

        GoogleSignIn.signInPromise()
            .then((user) => {
                console.log("handleGoogleLogin")
                console.log(user);
                login({
                    name: user.name,
                    email: user.email,
                    login_type: 'Google',
                    img_url: user.photoUrl1280 ? user.photoUrl1280 : user.photoUrl640 ? user.photoUrl640 : user.photoUrl320 ? user.photoUrl320 : '',
                    social_id: user.userID
                })
            })
            .catch((err) => {
                console.log('WRONG SIGNIN', err);
            })
            .done();
    }

    render() {
        const { navigation } = this.props
        return (
            <Container>
                <CloseBtn onPress={() => navigation.goBack(null)} />
                <FacebookBtn onPress={this.handleFacebookLogin.bind(this)}>
                    <Ionicon
                        name={'logo-facebook'}
                        size={20}
                        color={colors.white}
                        backgroundColor={"transparent"}
                    />
                    <BtnText>Facebook</BtnText>
                </FacebookBtn>
                <GoogleBtn onPress={this.handleGoogleLogin.bind(this)}>
                    <Ionicon
                        name={'logo-google'}
                        size={20}
                        color={colors.white}
                        backgroundColor={"transparent"}
                    />
                    <BtnText>Google</BtnText>
                </GoogleBtn>
                <BottomView>
                    <ManualBtn onPress={() => navigation.navigate({ routeName: screenNames.Login, key: screenNames.Login })}>
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
    { login }
)(SocialLogin)