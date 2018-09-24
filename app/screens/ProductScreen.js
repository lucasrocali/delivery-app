// @flow

import React, { Component } from 'react';
import { SectionList } from 'react-native';
import PropTypes from 'prop-types';
import OptionCell from './components/OptionCell';
import SubOptionCell from './components/SubOptionCell';
import ProductCell from './components/ProductCell';
import colors from '../constants/colors';
import { connect } from 'react-redux';
import { } from '../store/stores/action'
import * as selectors from '../store/stores/selector';
import styled from "styled-components";
import { Title, Cell } from './styled/index'
import Ionicon from "react-native-vector-icons/Ionicons";
import spacing from '../constants/spacing';
import { MapOptionsSection } from '../constants/objects'

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Header = styled.View`

`

const InfoView = styled(Cell) `
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Touchable = styled.TouchableOpacity`
    margin-horizontal: ${spacing.small}
`

const Comment = styled.TextInput`

`

const OptionSectionHeader = styled(Cell) `
    background-color: ${colors.white};
`


type State = {

}

type Props = {

}

const product = {
    "id": 1,
    "name": "P1",
    "descp": "",
    "foo": "product",
    "price": 10,
    "promo_price": 10,
    "price_text": "R$ 10",
    "img_url": "",
    "options": [
        {
            "id": 50,
            "name": "O1",
            "foo": "option",
            "min": 0,
            "max": 0,
            "sub_options": [
                {
                    "id": 51,
                    "name": "SO1",
                    "foo": "sub_option",
                    "price": "5",
                    "price_text": " + R$5,00"
                },
                {
                    "id": 52,
                    "name": "SO2",
                    "foo": "sub_option",
                    "price": "",
                    "price_text": ""
                }
            ]
        },
        {
            "id": 503,
            "name": "O1",
            "foo": "option",
            "min": 0,
            "max": 0,
            "sub_options": [
                {
                    "id": 513,
                    "name": "SO1",
                    "foo": "sub_option",
                    "price": "3",
                    "price_text": " + R$3,00"
                },
                {
                    "id": 525,
                    "name": "SO2",
                    "foo": "sub_option",
                    "price": "2",
                    "price_text": " + R$2,00"
                }
            ]
        }
    ]
}

class Product extends Component<Props, State> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected_options: {},
            quantity: 1
        };
    }

    render() {
        // const { product } = this.props.navigation.state.params
        const { selected_options } = this.state
        console.log(this.state)
        return (
            <Container>
                <SectionList
                    sections={MapOptionsSection(product)}
                    renderSectionHeader={({ section: option }) =>
                        (<OptionCell option={option} />)
                    }
                    renderItem={({ item: sub_option, section: option }, i) => (
                        (<SubOptionCell
                            sub_option={sub_option}
                            checked={selected_options && selected_options[option.id] && selected_options[option.id].includes(sub_option)}
                            onPress={() => {

                                if (!selected_options[option.id]) {
                                    selected_options[option.id] = []
                                }

                                if (!selected_options[option.id].includes(sub_option)) {
                                    if (selected_options[option.id].length == option.max) {
                                        selected_options[option.id].shift()
                                    }
                                    selected_options[option.id].push(sub_option)
                                } else {
                                    selected_options[option.id] = selected_options[option.id].filter(function (obj) {
                                        return obj.id !== sub_option.id;
                                    });
                                }

                                this.setState({ selected_options: selected_options })
                            }}
                        />)
                    )}
                    stickySectionHeadersEnabled
                    ListHeaderComponent={
                        (<Header>
                            <ProductCell
                                product={product}
                            />
                            <Title>Total: </Title>
                            <InfoView>
                                <Touchable disabled={this.state.quantity == 0} onPress={() => this.setState({ quantity: this.state.quantity - 1 })}>
                                    <Ionicon
                                        name={'ios-remove'}
                                        size={25}
                                        color={colors.link}
                                    />
                                </Touchable>
                                <Title>{this.state.quantity}</Title>
                                <Touchable onPress={() => this.setState({ quantity: this.state.quantity + 1 })}>
                                    <Ionicon
                                        name={'ios-add'}
                                        size={25}
                                        color={colors.link}
                                    />
                                </Touchable>
                            </InfoView>
                            <InfoView>
                                <Comment
                                    placeholder={'Observação'}
                                    onChangeText={(text) => console.log('text', text)}
                                />
                            </InfoView>
                        </Header>)
                    }
                />
            </Container>
        );
    }
}

export default connect(
    state => ({

    }),
    {}
)(Product)