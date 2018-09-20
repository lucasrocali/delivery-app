import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../actions'
import * as selectors from '../reducers/reducers';
import { Container, Text } from './styled'

class Base extends Component {

    render() {
        return (
            <Container>
                <Text>Base</Text>
            </Container>
        );
    }
}

Base.propTypes = {

}

export default connect(
    state => ({

    }),
    {}
)(Base)