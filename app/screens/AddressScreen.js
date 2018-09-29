// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAddress, loadAddressInfo } from '../store/user/action'
import * as userSelectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Cell, Button, ButtonText, Caption } from './styled/index'
import colors from '../constants/colors'
import spacing from '../constants/spacing';
import { Formik } from 'formik';
import InputText from './components/InputText';
import { stacks } from '../navigation/Routers';

const Container = styled.ScrollView`
    flex: 1;
    background-color: ${colors.white};
`;

const SubmitText = styled(ButtonText) `
    color: ${colors.white};
`

const Content = styled.View`
    flex: 1;
`

const AddressInput = styled(InputText) `
    flex: 1;
`

const Row = styled.View`
    flex: 1;
    flex-direction: row;
`

const SearchButton = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-vertical: ${spacing.medium};
`

const Touchable = styled.TouchableOpacity`
    flex: 1;
`

type State = {

}

type Props = {

}
const MapSearchAddress = (address) => {
    return {
        zipcode: address ? address.zipcode : '',
        street: address ? address.street : '',
        number: address ? address.number : '',
        complement: address ? address.complement : '',
        neighborhood: address ? address.neighborhood : '',
        reference: address ? address.reference : ''
    }
}
class Address extends Component<Props, State> {

    constructor(props, context) {
        super(props, context);
        const address = props.navigation.state.params && props.navigation.state.params.address ? props.navigation.state.params.address : null
        this.state = {
            state: address ? address.state : '',
            city: address ? address.city : '',
        };
        this.initialValues = MapSearchAddress(address)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.search_address && nextProps.search_address.state && nextProps.search_address.city) {
            this.setState({ state: nextProps.search_address.state, city: nextProps.search_address.city })
            this.initialValues = MapSearchAddress(nextProps.search_address)
        }
    }

    onSelectedState = (state) => {
        this.setState({ state: state })
    }

    onSelectedCity = (city) => {
        this.setState({ city: city })
    }
    render() {
        const { navigation, createAddress, loadAddressInfo } = this.props
        const address = navigation.state.params && navigation.state.params.address ? navigation.state.params.address : null
        const { state, city } = this.state
        console.log('formik', this.props, this.state, this.initialValues)
        return (
            <Container>
                <Formik

                    ref={el => (this.form = el)}
                    initialValues={this.initialValues}
                    enableReinitialize
                    onSubmit={values => {
                        const new_address = address && address.id ? {
                            id: address.id,
                            ...values,
                            state,
                            city
                        } : {
                                ...values,
                                state,
                                city
                            }
                        console.log('values', values, new_address)
                        createAddress(new_address)
                        // navigation.goBack(null)

                    }
                    }>
                    {({ handleChange, handleSubmit, values, setFieldValue }) => (
                        <Content>
                            <Row>
                                <AddressInput
                                    onChangeText={handleChange('zipcode')}
                                    value={values.zipcode}
                                    label="Cep"
                                />
                                <SearchButton
                                    onPress={() => {
                                        loadAddressInfo({ zip: values.zipcode })
                                    }}
                                >
                                    <Caption>Buscar Endereço</Caption>
                                </SearchButton>
                            </Row>
                            <AddressInput
                                onChangeText={handleChange('street')}
                                value={values.street}
                                label="Rua"
                            />

                            <Row>
                                <AddressInput
                                    onChangeText={handleChange('number')}
                                    value={values.number}
                                    label="Número"
                                />
                                <AddressInput
                                    onChangeText={handleChange('complement')}
                                    value={values.complement}
                                    label="Complemento"
                                />
                            </Row>
                            <AddressInput
                                onChangeText={handleChange('neighborhood')}
                                value={values.neighborhood}
                                label="Bairro"
                            />

                            <Touchable
                                onPress={() => navigation.navigate({
                                    key: stacks.PickerStack.name,
                                    routeName: stacks.PickerStack.name,
                                    params: {
                                        onSelected: this.onSelectedState,
                                        title: 'Selecione o estado'
                                    }
                                })}
                            >
                                <AddressInput
                                    onChangeText={handleChange('state')}
                                    value={state}
                                    label="Estado"
                                    editable={false}
                                />

                            </Touchable>


                            <Touchable
                                onPress={() => values.state != '' && navigation.navigate({
                                    key: stacks.PickerStack.name,
                                    routeName: stacks.PickerStack.name,
                                    params: {
                                        state: state,
                                        onSelected: this.onSelectedCity,
                                        title: 'Selecione a cidade'
                                    }
                                })}
                            >
                                <AddressInput
                                    onChangeText={handleChange('city')}
                                    value={city}
                                    label="Cidade"
                                    editable={false}
                                />
                            </Touchable>

                            <AddressInput
                                onChangeText={handleChange('reference')}
                                value={values.reference}
                                label="Referencia"
                            />
                            <SearchButton
                                onPress={() => {
                                    loadAddressInfo({
                                        uf: state,
                                        city: city,
                                        neighborhood: values.neighborhood,
                                        street: values.street,
                                    })
                                }}
                            >
                                <Caption>Buscar Cep</Caption>
                            </SearchButton>
                            <Button onPress={handleSubmit} >
                                <SubmitText>Salvar</SubmitText>
                            </Button>
                        </Content>
                    )}
                </Formik>

            </Container>
        );
    }
}

export default connect(
    state => ({
        search_address: userSelectors.getSearchAddress(state)
    }),
    { createAddress, loadAddressInfo }
)(Address)