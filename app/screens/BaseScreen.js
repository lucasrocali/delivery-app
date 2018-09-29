// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/user/action'
import * as selectors from '../store/user/selector';
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
class Base extends Component<Props, State> {

    render() {
        return (
            <Container>
                <Title>Base</Title>
            </Container>
        );
    }
}

export default connect(
    state => ({

    }),
    {}
)(Base)