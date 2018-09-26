// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/auth/action'
import * as selectors from '../store/auth/selector';
import styled from "styled-components";
import { Title } from './styled/index'

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

type State = {

}

type Props = {

}
class Login extends Component<Props, State> {

    render() {
        return (
            <Container>
                <Title>Login</Title>
            </Container>
        );
    }
}

export default connect(
    state => ({

    }),
    {}
)(Login)