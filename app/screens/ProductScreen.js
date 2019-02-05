// @flow

import React, { Component } from 'react';
import { SectionList } from 'react-native';
import PropTypes from 'prop-types';
import OptionCell from './components/OptionCell';
import SubOptionCell from './components/SubOptionCell';
import ProductCell from './components/ProductCell';
import RoundedButton from './components/RoundedButton'
import colors from '../constants/colors';
import { connect } from 'react-redux';
import { handleNewProduct } from '../store/cart/action'
import * as selectors from '../store/stores/selector';
import styled from "styled-components";
import { Title, TitleH4, Cell, Left, Right, InputText, TouchableCell, Caption } from './styled/index'
import Ionicon from "react-native-vector-icons/Ionicons";
import spacing from '../constants/spacing';
import { MapOptionsSection } from '../constants/objects'
import { getCartProductTotal } from '../constants/functions';
import { MapPrice } from '../constants/objects';

const Container = styled.View`
    flex: 1;
    background-color: ${colors.white};
`;

const Header = styled.View`

`

const OptionsList = styled(SectionList) `

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

const View = styled.View`

`
const RemoveBtn = styled(TouchableCell) `
    align-items: center;
    justify-content: center;
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
        const { order_product } = props.navigation.state.params
        this.state = {
            selected_options: order_product && order_product.selected_options ? order_product.selected_options : {},
            quantity: order_product && order_product.quantity ? order_product.quantity : 1,
            order_product_id: order_product && typeof order_product.id == 'number' ? order_product.id : null
        };
    }

    render() {

        const { store, order_product } = this.props.navigation.state.params
        const { product } = order_product
        const { selected_options, quantity, order_product_id } = this.state
        const { handleNewProduct, navigation } = this.props
        const canAddProduct = canAdd(product, quantity, selected_options)
        const order_product_total = getCartProductTotal({ product: product, quantity: quantity, selected_options: selected_options })
        console.log('render product == >', this.props, order_product_id)
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
                                store={store}
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
                    ListFooterComponent={(
                        <View>
                            {order_product_id >= 0 &&
                                <RemoveBtn
                                    onPress={() => handleNewProduct(store.id, { id: order_product_id, product: product, quantity: quantity, selected_options: selected_options }, true)}
                                >
                                    <Caption>Remover item</Caption>
                                </RemoveBtn>
                            }
                        </View>
                    )}
                />
                <RoundedButton
                    leftText={'Adicionar ' + quantity}
                    rightText={MapPrice(order_product_total)}
                    disabled={!canAddProduct}
                    onPress={() => {
                        handleNewProduct(store.id, { id: order_product_id, product: product, quantity: quantity, selected_options: selected_options })
                    }}
                />
            </Container >
        );
    }
}

export default connect(
    state => ({

    }),
    { handleNewProduct }
)(Product)