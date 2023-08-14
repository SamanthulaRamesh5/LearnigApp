import {StyleSheet} from 'react-native';
import COLORS from '../../../assests/color';
import {HEIGHT, WIDTH} from '../../../locales/common';

const styles = StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  flatList: {
    marginTop: '8%',
    height:'75%',
  },
  item: {
    flexDirection: 'row',
    alignItems:'center'
  },
  itemText:{
    fontSize: 14,
    color: COLORS.blackCode,
    paddingLeft: '5%',
  },
  itemTextTitle: {
    fontSize: 16,
    color: COLORS.blackCode,
    marginLeft:10,
    fontWeight:'600'
  },
  itemSeparator: {
    height: 1,
    width: "85%",
    marginLeft:'5%',
    backgroundColor: COLORS.listSeparatorColor,
  },
  iconStyle: {
    height: 35,
    width: 25,
    marginLeft: 15,
  },
  iconBook:{
    justifyContent: 'center' ,
    paddingRight:20
 },
itemContainer:{
  marginBottom:10
},
});

export default styles;
