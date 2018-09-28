import React from 'react';
import styled from "styled-components";
import { InputText } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';
import FloatingLabel from 'react-native-floating-labels';
import { Cell } from '../styled'

const InputCell = styled(Cell) `
    padding-vertical: 0;
`
type Props = {
    onChangeText: Function,
    value: string,
    label: string,
    placeholder: string
}
export default Base = (props: Props) => {
    const { onChangeText, value, label, placeholder } = props
    return (
        <InputCell>
            <FloatingLabel
                inputStyle={{ borderWidth: 0 }}
                onChangeText={onChangeText}
                value={value}
            >{label}</FloatingLabel>
        </InputCell>
    );
}