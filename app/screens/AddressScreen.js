// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { } from '../store/user/action'
import * as selectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Cell, Button, ButtonText } from './styled/index'
import colors from '../constants/colors'
import spacing from '../constants/spacing';
import { Formik } from 'formik';
import InputText from './components/InputText';
import { stacks } from '../navigation/Routers';

const Container = styled.ScrollView`
    flex: 1;
    padding-top:  ${spacing.large};
    background-color: ${colors.white};
`;

const SubmitText = styled(ButtonText) `
    color: ${colors.white};
`

const Content = styled.View`

`

const Row = styled.View`
    flex-direction: row;
`

const Touchable = styled.TouchableOpacity`
    flex: 1;
    overflow: hidden;
`

type State = {

}

type Props = {

}
class Address extends Component<Props, State> {

    constructor(props, context) {
        super(props, context);
        this.state = {
            state: '',
            city: ''
        };
    }
    onSelectedState = (state) => {
        console.log('onSelectedState')
        this.setState({ state: state })
    }

    onSelectedCity = (city) => {
        console.log('onSelectedCity')
        this.setState({ city: city })
    }
    render() {
        const { navigation } = this.props
        const { state, city } = this.state
        console.log('formik', this.props, this.state)
        return (
            <Container>
                <Formik
                    ref={el => (this.form = el)}
                    initialValues={{
                        name: '',
                        zipcode: '',
                        street: '',
                        number: '',
                        complement: '',
                        neighborhood: '',
                        reference: ''
                    }}
                    onSubmit={values => {
                        console.log('values', values, {
                            ...values,
                            state,
                            city
                        })
                        // login(values)

                    }
                    }>
                    {({ handleChange, handleSubmit, values }) => (
                        <Content>
                            <Row>
                                <InputText
                                    onChangeText={handleChange('name')}
                                    value={values.name}
                                    label="Nome"
                                />
                                <InputText
                                    onChangeText={handleChange('zipcode')}
                                    value={values.zipcode}
                                    label="Cep"
                                />
                            </Row>
                            <InputText
                                onChangeText={handleChange('street')}
                                value={values.street}
                                label="Rua"
                            />
                            <Row>
                                <InputText
                                    onChangeText={handleChange('number')}
                                    value={values.number}
                                    label="Número"
                                />
                                <InputText
                                    onChangeText={handleChange('complement')}
                                    value={values.complement}
                                    label="Complemento"
                                />
                            </Row>
                            <InputText
                                onChangeText={handleChange('neighborhood')}
                                value={values.neighborhood}
                                label="Bairro"
                            />
                            <Row>
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
                                    <InputText
                                        onChangeText={handleChange('state')}
                                        value={state}
                                        label="Estado"
                                        editable={false}
                                    />

                                </Touchable>
                            </Row>
                            <Row>
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
                                    <InputText
                                        onChangeText={handleChange('city')}
                                        value={city}
                                        label="Cidade"
                                        editable={false}
                                    />
                                </Touchable>
                            </Row>
                            <InputText
                                onChangeText={handleChange('reference')}
                                value={values.reference}
                                label="Referencia"
                            />
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

    }),
    {}
)(Address)