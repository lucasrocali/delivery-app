// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/auth/action'
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

const SubmitText = styled(ButtonText) `
    color: ${colors.white};
`

const Content = styled.View`

`

type State = {

}

type Props = {

}
class Address extends Component<Props, State> {

    render() {
        // const { login } = this.props
        return (
            <Container>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => {
                        // login(values)
                    }
                    }>
                    {({ handleChange, handleSubmit, values }) => (
                        <Content>
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
                            <Button onPress={handleSubmit} >
                                <SubmitText>Login</SubmitText>
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
    {}
)(Address)