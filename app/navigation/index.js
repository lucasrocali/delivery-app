// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appSelectors from '../store/app/selector';
import styled from "styled-components";
import { Title } from '../screens/styled/index'
import RootNavigation from './RootNavigation';
import Toast from 'react-native-root-toast';

const Container = styled.View`
    flex: 1;
`;

const BottomView = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`

type State = {

}

type Props = {

}
class Base extends Component<Props, State> {

    render() {
        const { error_msg } = this.props
        return (
            <Container>
                <RootNavigation />
                <Toast
                    visible={error_msg ? true : false}
                    position={Toast.positions.BOTTOM}
                    shadow={false}
                    animation={false}
                    hideOnPress={true}
                >{error_msg}</Toast>;
            </Container>
        );
    }
}

export default connect(
    state => ({
        error_msg: appSelectors.getErrorMsg(state)
    }),
    {}
)(Base)