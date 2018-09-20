// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCategories } from '../store/stores/action'
import * as selectors from '../store/stores/selector';
import styled from "styled-components";

export const Container = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Text = styled.Text`
    font-size: 20
`;

type State = {

}

type Props = {
    loadCategories: Function
}
class Categories extends Component<Props, State> {

    render() {
        return (
            <Container
                onPress={() => this.props.loadCategories()}
            >
                <Text>Categories</Text>
            </Container>
        );
    }
}


export default connect(
    state => ({

    }),
    { loadCategories }
)(Categories)