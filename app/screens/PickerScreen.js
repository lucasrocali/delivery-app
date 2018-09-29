// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Text, Title, Cell } from './styled/index'
import colors from '../constants/colors'
import cities from '../constants/cidades.json';
import InputText from './components/InputText';
import _ from 'lodash';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Touchable = styled.TouchableOpacity` 

`

const InputView = styled.View`
    height: 70;
`

type State = {

}

type Props = {

}

const CleanText = (text) => {
    return text.toLowerCase().replace(/[áâã]/, "a").replace(/[éê]/, "e").replace(/[í]/, "i").replace(/[óõô]/, "o").replace(/[ùû]/, "u").replace(/[ç]/, "c")
}

const TextContainsSearchText = (text, search_text) => {
    return CleanText(text).includes(CleanText(search_text))
}

const WrapStates = () => {
    return cities.estados.map(estado => estado.nome)
}

const WrapCities = (state) => {
    const estados_macth = cities.estados.filter(estado => estado.nome == state)
    const estado = estados_macth && estados_macth.length > 0 ? estados_macth[0] : null
    console.log('WrapCities', estados_macth, estado, state)
    return estado && estado.cidades ? estado.cidades.map(city => city) : []
}

class Base extends Component<Props, State> {

    constructor(props, context) {
        super(props, context);
        const state = props.navigation.state && props.navigation.state.params ? props.navigation.state.params.state : null
        const data = state ? WrapCities(state) : WrapStates()
        this.state = {
            data: data,
            filtered_data: data,
        };
        this.handleSearchDelayed = _.throttle(this.handleSearch.bind(this), 500);
        this.onSelected = props.navigation.state && props.navigation.state.params ? props.navigation.state.params.onSelected : null
    }

    handleSearch(text) {
        const { data } = this.state
        const filtered_data = data.filter(data_text => TextContainsSearchText(data_text, text))
        this.setState({ filtered_data: filtered_data })
    }

    onItemPress(text) {
        const { navigation } = this.props
        const onSelected = navigation.state.params && navigation.state.params.onSelected ? navigation.state.params.onSelected : null
        onSelected && onSelected(text)
        navigation.goBack(null)
    }
    render() {
        const { filtered_data } = this.state
        console.log(this.state)
        return (
            <Container>
                <InputView>
                    <InputText
                        onChangeText={this.handleSearchDelayed}
                        value={this.state.search_text}
                        label="Busca"
                    />
                </InputView>
                <FlatList
                    style={{ flex: 1 }}
                    data={filtered_data}
                    renderItem={({ item: name, index }) => (
                        <Cell>
                            <Touchable
                                onPress={() => this.onItemPress(name)}
                            >
                                <Text>{name}</Text>
                            </Touchable>
                        </Cell>
                    )}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({

    }),
    {}
)(Base)