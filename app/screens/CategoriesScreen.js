// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCategories } from '../store/stores/action'
import * as selectors from '../store/stores/selector';
import EstabCell from './components/EstabCell';
import styled from "styled-components";

export const Container = styled.ScrollView`
    flex: 1;
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
                {[1, 2, 3, 4, 5].map((i) => <EstabCell key={i} />)}
            </Container>
        );
    }
}


export default connect(
    state => ({

    }),
    { loadCategories }
)(Categories)