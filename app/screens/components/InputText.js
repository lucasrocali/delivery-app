import React from 'react';
import styled from "styled-components";
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';
import FloatingLabel from 'react-native-floating-labels';
import { Cell } from '../styled'

const InputCell = styled(Cell) `
    flex: 1;
    padding-vertical: 0;
`
type Props = {
    onChangeText: Function,
    value: string,
    label: string,
    editable: boolean,
}
export default Base = (props: Props) => {
    const { onChangeText, value, label, editable, onTouchStart } = props
    return (
        <InputCell pointerEvents={typeof editable == 'boolean' && !editable ? 'none' : 'auto'}>
            <FloatingLabel
                inputStyle={{ borderWidth: 0 }}
                onChangeText={onChangeText}
                value={value}
                editable={typeof editable == 'boolean' ? editable : true}
                selectTextOnFocus={typeof editable == 'boolean' ? editable : true}
            >{label}</FloatingLabel>
        </InputCell>
    );
}