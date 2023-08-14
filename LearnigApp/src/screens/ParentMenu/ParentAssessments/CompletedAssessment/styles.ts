import { StyleSheet } from "react-native";
import COLORS from "../../../../assests/color";
import { HEIGHT,WIDTH } from "../../../../locales/common";

export default StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  flatList: {
    marginTop: '8%',
    height:'75%',
  },
  textStyle: {
    fontSize: 14,
    fontWeight:'400',
    lineHeight:17,
    color: COLORS.blackCode,
    flexWrap:'wrap',
  },
  item: {
    paddingVertical: '5%',
    paddingHorizontal:'2%',
    marginLeft: '5%',
    width:'85%',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  itemText:{
    fontSize: 14,
    lineHeight:17,
    color: COLORS.blackCode,
    paddingLeft: '7%',
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
  flatlistMain: {
    height:'70%',
    margin:'4%',
    marginTop:'8%',
    padding:'3%', 
    flexDirection:'column', 
    borderWidth:1, 
    borderColor: COLORS.InputBorderColor, 
    alignItems:'center',
  },
  flatlistHeading: {
    flexDirection: 'row', 
    alignItems:'center',
    backgroundColor:COLORS.lightGrey, 
    padding:'4%', 
    // height:80,
  },
  tableHeadingTxt: {
    fontSize:14, 
    fontWeight:'500',
  },
  flatlisrRowView: {
    flexDirection: 'row', 
    alignItems:'center', 
    // height: 70,
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.listSeparatorColor,
    padding:'4%', 
  },
  scoreView: { 
    width:'33%' , 
    height:60 , 
    alignItems:'center', 
    justifyContent:'center',
  },
});
