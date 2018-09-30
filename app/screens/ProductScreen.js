// @flow

import React, { Component } from 'react';
import { SectionList } from 'react-native';
import PropTypes from 'prop-types';
import OptionCell from './components/OptionCell';
import SubOptionCell from './components/SubOptionCell';
import ProductCell from './components/ProductCell';
import colors from '../constants/colors';
import { connect } from 'react-redux';
import { addToCart } from '../store/cart/action'
import * as selectors from '../store/stores/selector';
import styled from "styled-components";
import { Title, TitleH4, Cell, Left, Right, InputText } from './styled/index'
import Ionicon from "react-native-vector-icons/Ionicons";
import spacing from '../constants/spacing';
import { MapOptionsSection } from '../constants/objects'
import { getCartProductTotal } from '../constants/functions';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Header = styled.View`

`

const OptionsList = styled(SectionList) `
    margin-bottom: 80;
`

const InfoView = styled(Cell) `
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Touchable = styled.TouchableOpacity`
    margin-horizontal: ${spacing.small}
`

const OptionSectionHeader = styled(Cell) `
    background-color: ${colors.white};
`

const LightTitle = styled(TitleH4) `
    color: ${colors.white};
`

const AddButton = styled.TouchableOpacity`
    flex-direction: row;
    height: 60;
    background-color: ${colors.link};
    position: absolute;
    bottom: ${spacing.small};
    left: ${spacing.small};
    right: ${spacing.small};
    padding-horizontal: ${spacing.small};
    align-items: center;
    border-radius: 5;
`

const canAdd = (product, quantity, selected_options) => {
    let can = true
    product.options.map((option) => can = can && (option.min == 0 || selected_options[option.id] && selected_options[option.id].length >= option.min))
    return can
}

type State = {

}

type Props = {

}

class Product extends Component<Props, State> {

    constructor(props, context) {
        super(props, context);
        const { quantity, selected_options, cart_product_index } = props.navigation.state.params
        this.state = {
            selected_options: selected_options ? selected_options : {},
            quantity: quantity ? quantity : 1,
            cart_product_index: typeof cart_product_index == 'number' ? cart_product_index : -1
        };
    }

    render() {
        console.log('render product', this.props)
        const { store_id, product } = this.props.navigation.state.params
        const { selected_options, quantity, cart_product_index } = this.state
        const { addToCart, navigation } = this.props
        const canAddProduct = canAdd(product, quantity, selected_options)
        console.log(this.state)
        return (
            <Container>
                <OptionsList
                    sections={MapOptionsSection(product)}
                    renderSectionHeader={({ section: option }) =>
                        (<OptionCell
                            option={option}
                            selected_count={selected_options[option.id] ? selected_options[option.id].length : 0}
                        />)
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
                            <InfoView>
                                <Touchable disabled={quantity == 1} onPress={() => this.setState({ quantity: quantity - 1 })}>
                                    <Ionicon
                                        name={'ios-remove'}
                                        size={25}
                                        color={colors.link}
                                    />
                                </Touchable>
                                <Title>{quantity}</Title>
                                <Touchable onPress={() => this.setState({ quantity: quantity + 1 })}>
                                    <Ionicon
                                        name={'ios-add'}
                                        size={25}
                                        color={colors.link}
                                    />
                                </Touchable>
                            </InfoView>
                            <InfoView>
                                <InputText
                                    placeholder={'Observação'}
                                    onChangeText={(text) => console.log('text', text)}
                                />
                            </InfoView>
                        </Header>)
                    }
                />
                <AddButton
                    style={{ opacity: canAddProduct ? 1.0 : 0.4 }}
                    activeOpacity={0.8}
                    disabled={!canAddProduct}
                    onPress={() => {
                        addToCart(store_id, product, quantity, selected_options, cart_product_index)
                        navigation.goBack(null)
                    }} >
                    <Left>
                        <LightTitle>{'Adicionar ' + quantity}</LightTitle>
                    </Left>

                    <Right>
                        <LightTitle>{'R$ ' + getCartProductTotal({ product: product, quantity: quantity, selected_options: selected_options })}</LightTitle>
                    </Right>
                </AddButton>
            </Container>
        );
    }
}

export default connect(
    state => ({

    }),
    { addToCart }
)(Product)