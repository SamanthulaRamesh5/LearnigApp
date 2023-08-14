import { StyleSheet } from 'react-native'
import COLORS from '../../../assests/color'
import { HEIGHT, WIDTH } from '../../../locales/common'

const styles = StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  flatList: {
    marginTop: '2%',
    height: '75%',
  },
  item: {
    flexDirection: 'row',
    alignItems:'center'
  },
  itemContainer:{
    marginBottom:10,
    marginLeft: 10
  },
  itemText: {
    fontSize: 14,
    lineHeight: 17,
    color: COLORS.blackCode,
    paddingLeft: '5%',
  },
  itemTextTitle: {
    color: COLORS.blackCode,
    marginLeft:15,
    marginBottom: 5,
    fontWeight:'600'
  },
  iconBook:{
     justifyContent: 'center' ,
     paddingRight:20
  },
  iconStyle: {
    height: 35,
    width: 25,
    marginLeft: 15,
  },
})

export default styles
