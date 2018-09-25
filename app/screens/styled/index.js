import styled from "styled-components";
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

export const Title = styled.Text`
    margin-top: 5;
    font-size: 16;
    color: ${colors.gray70}
    font-weight: bold;
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

export const Text = styled.Text`
    margin-top: 3;
    font-size: 16;
    color: ${colors.gray70}
    font-weight: 400;
`

export const Text1 = styled.Text`
    margin-top: 3;
    font-size: 14;
    color: ${colors.gray70}
    font-weight: 400;
`

export const Caption = styled.Text`
    margin-top: 5;
    font-size: 13;
    color: ${colors.gray40};
    font-weight: 200;
`

export const Number = styled.Text`
    margin-top: ${spacing.tiny};
    font-size: 13;
    color: ${colors.gray50}
    font-weight: 200;
`

export const ButtonText = styled.Text` 
    font-size: 16;
    color: ${colors.link};
    font-weight: 600;
`

export const Cell = styled.View` 
    padding-horizontal: ${spacing.small};
    padding-vertical: ${spacing.medium};
    border-bottom-width: 1;
    border-color: ${colors.gray5};
    margin-horizontal: ${spacing.small};
`

export const SectionHeader = styled(Cell) ` 
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