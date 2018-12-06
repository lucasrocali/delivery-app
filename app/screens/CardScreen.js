// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCard } from '../store/user/action'
import * as userSelectors from '../store/user/selector';
import styled from "styled-components";
import { Title, Cell, Button, ButtonText, Caption } from './styled/index'
import colors from '../constants/colors'
import spacing from '../constants/spacing';
import { Formik } from 'formik';
import InputText from './components/InputText';
import { screenNames } from '../navigation/Routers';

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

const Input = styled(InputText) `
    flex: 1;
`

const Row = styled.View`
    flex: 1;
    flex-direction: row;
`


const Touchable = styled.TouchableOpacity`
    flex: 1;
`

type State = {

}

type Props = {

}

class Card extends Component<Props, State> {

    render() {
        const { createCard } = this.props
        return (
            <Container>
                <Formik
                    initialValues={{ number: '', first_name: '', last_name: '', month: '', year: '', verification_value: '' }}
                    onSubmit={values => {
                        createCard(values)
                    }
                    }>
                    {({ handleChange, handleSubmit, values, setFieldValue }) => (
                        <Content>
                            <Input
                                onChangeText={handleChange('number')}
                                value={values.number}
                                label="Numero"
                            />
                            <Row>
                                <Input
                                    onChangeText={handleChange('first_name')}
                                    value={values.first_name}
                                    label="Nome"
                                />
                                <Input
                                    onChangeText={handleChange('last_name')}
                                    value={values.last_name}
                                    label="Sobrenome"
                                />
                            </Row>
                            <Row>
                                <Input
                                    onChangeText={handleChange('month')}
                                    value={values.month}
                                    label="Mês"
                                />
                                <Input
                                    onChangeText={handleChange('year')}
                                    value={values.year}
                                    label="Ano"
                                />
                            </Row>
                            <Input
                                onChangeText={handleChange('verification_value')}
                                value={values.verification_value}
                                label="CVV"
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
    { createCard }
)(Card)