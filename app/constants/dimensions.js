import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
export default {
    estabCellWidth: width * 0.9,
    estabCellHeigth: width * 0.9 * 0.5,
    estabCellImgHeigth: width * 0.9 * 0.5
}