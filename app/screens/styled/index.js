import styled from "styled-components";
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

export const Title = styled.Text`
    margin-vertical: ${spacing.tiny2};
    font-size: 16;
    color: ${colors.gray70}
    font-weight: 400;
`
export const TitleH1 = styled(Title) `
    font-size: 28;
`

export const TitleH2 = styled(Title) `
    font-size: 24;
`

export const TitleH3 = styled(Title) `
    font-size: 20;
`

export const TitleH4 = styled(Title) `
    font-size: 18;
`

export const TextLight = styled.Text`
    margin-vertical: ${spacing.tiny2};
    font-size: 16;
    color: ${props => props.light ? colors.white : colors.gray70}
    font-weight: 200;
`

export const Text = styled.Text`
    margin-vertical: ${spacing.tiny2};
    font-size: 16;
    color: ${props => props.light ? colors.white : colors.gray70}
`

export const Text1 = styled.Text`
    margin-vertical: ${spacing.tiny2};
    font-size: 14;
    color: ${props => props.light ? colors.white : colors.gray70}
    font-weight: 400;
`

export const Caption = styled.Text`
    margin-vertical: ${spacing.tiny2};
    font-size: 14;
    color: ${props => props.light ? colors.white : colors.gray40}
    font-weight: 100;
`

export const Number = styled.Text`
    margin-vertical: ${spacing.tiny2};
    font-size: 13;
    color: ${colors.link}
    font-weight: 200;
    margin-right: 3;
    
`

export const LinkText = styled.Text`
    margin-vertical: ${spacing.tiny2};
    font-size: 14;
    color: ${colors.link}
    font-weight: 400;
`


export const RiskNumber = styled(Number) `
    text-decoration-line:line-through;
`

export const ButtonText = styled.Text` 
    font-size: 16;
    color: ${colors.gray30};
    font-weight: 400;
`

export const PaddedView = styled.View`
    padding-horizontal: ${spacing.large};
    padding-vertical: ${spacing.medium};
`

export const Cell = styled(PaddedView) ` 
    border-bottom-width: 1;
    border-color: ${colors.gray5};
`

export const TouchableCell = styled.TouchableOpacity`
    padding-horizontal: ${spacing.small};
    padding-vertical: ${spacing.medium};
    border-bottom-width: 1;
    border-color: ${colors.gray5};
    margin-horizontal: ${spacing.small};
`

export const SectionHeader = styled(Cell) ` 
    flex-direction: row;
`

export const Row = styled.View`
    flex-direction: row;
`
export const Left = styled.View`
    flex:1;
    justify-content: flex-start;
`
export const Right = styled.View`
    flex:1;
    align-items: flex-end;
`

export const Horizontal = styled.View`
    flex-direction: row;
    align-items: center;
`

export const CloseView = styled.TouchableOpacity`
    position: absolute;
    top: ${spacing.large};
    left: ${spacing.small};
    background-color: ${colors.white};
    width: 34;
    height: 34;
    border-radius: 17;
    align-items: center;
    justify-content: center;
`

export const InputText = styled.TextInput`

`

export const Button = styled.TouchableOpacity`
    margin-vertical: ${spacing.medium};
    margin-horizontal: ${spacing.medium};
    background-color: ${colors.link};
    padding-horizontal: ${spacing.small};
    padding-vertical: ${spacing.small};
    align-items: center;
    justify-content: center;
    border-radius: 6;
`

export const Placeholder = styled.View` 
    width: ${props => props.width ? props.width : 50};
    height: ${props => props.height ? props.height : 20};
    background-color: ${colors.gray5};
    margin-horizontal: ${spacing.tiny2};
    margin-vertical: ${spacing.tiny2};
`
// TitleH4: {
//     fontSize: 34,
//     lineHeight: 41,
//     ...systemWeights.regular,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(34) : undefined,
//     color: colors[color]
//   },
//   title1: {
//     fontSize: 28,
//     lineHeight: 34,
//     ...systemWeights.regular,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(28) : undefined,
//     color: colors[color]
//   },
//   title2: {
//     fontSize: 22,
//     lineHeight: 28,
//     ...systemWeights.regular,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(22) : undefined,
//     color: colors[color]
//   },
//   title3: {
//     fontSize: 20,
//     lineHeight: 25,
//     ...systemWeights.regular,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(20) : undefined,
//     color: colors[color]
//   },
//   headline: {
//     fontSize: 17,
//     lineHeight: 22,
//     ...systemWeights.semibold,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(17) : undefined,
//     color: colors[color]
//   },
//   body: {
//     fontSize: 17,
//     lineHeight: 22,
//     ...systemWeights.regular,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(17) : undefined,
//     color: colors[color]
//   },
//   callout: {
//     fontSize: 16,
//     lineHeight: 21,
//     ...systemWeights.regular,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(16) : undefined,
//     color: colors[color]
//   },
//   subhead: {
//     fontSize: 15,
//     lineHeight: 20,
//     ...systemWeights.regular,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(15) : undefined,
//     color: colors[color]
//   },
//   footnote: {
//     fontSize: 13,
//     lineHeight: 18,
//     ...systemWeights.regular,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(13) : undefined,
//     color: colors[color]
//   },
//   caption1: {
//     fontSize: 12,
//     lineHeight: 16,
//     ...systemWeights.regular,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(12) : undefined,
//     color: colors[color]
//   },
//   caption2: {
//     fontSize: 11,
//     lineHeight: 13,
//     ...systemWeights.regular,
//     letterSpacing: Platform.OS === "ios" ? sanFranciscoSpacing(11) : undefined,
//     color: colors[color]
//   }