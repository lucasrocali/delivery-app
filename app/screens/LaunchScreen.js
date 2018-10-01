// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autoLogin } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title } from './styled/index';
import colors from '../constants/colors';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

type State = {

}

type Props = {

}
class Launch extends Component<Props, State> {

    componentDidMount() {
        const { autoLogin } = this.props
        autoLogin()
    }

    render() {
        return (
            <Container>

            </Container>
        );
    }
}

export default connect(
    state => ({

    }),
    { autoLogin }
)(Launch)