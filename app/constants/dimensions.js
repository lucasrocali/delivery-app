import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const storeNormalPct = 0.85
const storeFullPct = 1.0
export default {
    width: width,
    height: height,
    toolbarHeight: 65,
    estabCellWidth: width * storeNormalPct,
    estabCellHeigth: width * storeNormalPct * 0.5,
    estabCellFullWidth: width * storeFullPct,
    estabCellFullHeigth: width * storeFullPct * 0.5,
    storeImgHeight: width * 0.5,
    storeImgViewHeight: width * 0.5 + 40
}