// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../store/auth/action'
import * as selectors from '../store/auth/selector';
import styled from "styled-components";
import { Title, Cell, Button, ButtonText } from './styled/index'
import colors from '../constants/colors'
import spacing from '../constants/spacing';
import { Formik } from 'formik';
import InputText from './components/InputText';

const Container = styled.View`
    flex: 1;
    padding-top:  ${spacing.large};
    background-color: ${colors.white};
`;

const LoginText = styled(ButtonText) `
    color: ${colors.white};
`

const Content = styled.View`

`

type State = {

}

type Props = {

}
class Login extends Component<Props, State> {

    render() {
        const { login } = this.props
        return (
            <Container>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => {
                        login(values)
                    }
                    }>
                    {({ handleChange, handleSubmit, values }) => (
                        <Content>
                            <Cell>
                                <InputText
                                    onChangeText={handleChange('email')}
                                    value={values.email}
                                    label="Email"
                                    placeholder="Email"
                                />
                            </Cell>
                            <Cell>
                                <InputText
                                    onChangeText={handleChange('password')}
                                    value={values.password}
                                    label="Senha"
                                    placeholder="Senha"
                                />
                            </Cell>
                            <Button onPress={handleSubmit} >
                                <LoginText>Login</LoginText>
                            </Button>
                        </Content>
                    )}
                </Formik>

            </Container>
        );
    }
}

export default connect(
    state => ({

    }),
    { login }
)(Login)