// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Cell, Button, ButtonText } from './styled/index'
import colors from '../constants/colors'
import spacing from '../constants/spacing';
import { Formik } from 'formik';
import InputText from './components/InputText';

const Container = styled.ScrollView`
    flex: 1;
    padding-top:  ${spacing.large};
    background-color: ${colors.white};
`;

const LoginText = styled(ButtonText) `
    color: ${colors.white};
`

const Content = styled.View`
    flex: 1;
`

type State = {

}

type Props = {

}
class Login extends Component<Props, State> {

    render() {
        const { signup } = this.props
        return (
            <Container>
                <Formik
                    initialValues={{ name: '', email: '', password: '', password_confirmation: '' }}
                    onSubmit={values => {
                        signup(values)
                    }
                    }>
                    {({ handleChange, handleSubmit, values }) => (
                        <Content>
                            <InputText
                                onChangeText={handleChange('name')}
                                value={values.name}
                                label="Nome"
                                placeholder="Nome"
                            />
                            <InputText
                                onChangeText={handleChange('email')}
                                value={values.email}
                                label="Email"
                                placeholder="Email"
                            />
                            <InputText
                                onChangeText={handleChange('password')}
                                value={values.password}
                                label="Senha"
                                placeholder="Senha"
                            />
                            <InputText
                                onChangeText={handleChange('password_confirmation')}
                                value={values.password_confirmation}
                                label="Confirme a senha"
                                placeholder="Confirme a senha"
                            />
                            <Button onPress={handleSubmit} >
                                <LoginText>Cadastrar</LoginText>
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
    { signup }
)(Login)