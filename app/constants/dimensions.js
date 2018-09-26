import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
export default {
    width: width,
    height: height,
    toolbarHeight: 65,
    estabCellWidth: width * 0.85,
    estabCellHeigth: width * 0.85 * 0.5,
    estabCellImgHeigth: width * 0.85 * 0.5,
    storeImgHeight: width * 0.5,
    storeImgViewHeight: width * 0.5 + 40
}