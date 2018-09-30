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

type State = {

}

type Props = {

}
class Base extends Component<Props, State> {

    render() {
        const { toast_msg } = this.props
        return (
            <Container>
                <RootNavigation />
                <Toast
                    visible={toast_msg ? true : false}
                    position={Toast.positions.BOTTOM}
                    shadow={false}
                    animation={false}
                    hideOnPress={true}
                >{toast_msg}</Toast>
            </Container >
        );
    }
}

export default connect(
    state => ({
        toast_msg: appSelectors.getToastMsg(state),
    }),
    {}
)(Base)