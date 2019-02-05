// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { autoLogin } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title } from './styled/index';
import colors from '../constants/colors';
import dimensions from '../constants/dimensions';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.link};
    align-items: center;
    justify-content: center;
`;

const Image = styled.Image` 
    width: ${dimensions.width * 0.7}
`

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
                <Image source={require('./assets/logo_white.png')} resizeMode={'contain'} />
            </Container>
        );
    }
}

export default connect(
    state => ({

    }),
    { autoLogin }
)(Launch)