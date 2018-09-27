import React from 'react';
import styled from "styled-components";
import { InputText } from '../styled/index'
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

type Props = {
    onChangeText: Function,
    value: string,
    label: string,
    placeholder: string
}
export default Base = (props: Props) => {
    const { onChangeText, value, label, placeholder } = props
    return (
        <InputText
            onChangeText={onChangeText}
            value={value}
            label={label}
            placeholder={placeholder}
        />
    );
}