import { StyleSheet } from "react-native";
import COLORS from "../../../assests/color";
import { HEIGHT, WIDTH } from "../../../locales/common";

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
  item: {
    paddingVertical: '5%',
    paddingHorizontal:'2%',
    marginLeft: '5%',
    width:'85%',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  // itemText: {
  //   fontSize: 14,
  //   lineHeight:17,
  //   color: COLORS.blackCode,
  //   paddingLeft: '7%',
  // },
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
  dateView: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    alignItems:'center',
    justifyContent:'space-between',
    borderColor: COLORS.InputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 12,
    padding:'4%',
  },
  calender: {
    // margin: 8,
    alignSelf: "flex-end",
  },
  buttonView: {
    marginTop: 38,
    width: '70%',
    alignSelf:'center',
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between'
  },
  button:{
    width:'50%',
  },
  marginView: {
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  handleMargin: {
    marginTop: 24,
  },
  itemText: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "400",
    color: COLORS.blackCode,
    paddingLeft: "7%",
  },
  flatListMain: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  mainRenderView: {
    width: "34%",
    borderColor: COLORS.transparentGrey,
    borderLeftWidth: 3,
    height: 55,
    justifyContent: "center",
  },
  fromView: {
    width: "33%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  toView: {
    width: "33%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  headerFirst: {
    margin: "4%",
    padding: "3%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    alignItems: "center",
  },
  rowWiseView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    padding: "4%",
    height: 65,
  },
  performanceView: {
    width: "34%",
  },
  fromHeaderView: {
    width: "33%",
    alignItems: "center",
  },
  ToHeaderView: {
    width: "33%",
    paddingLeft: 25,
    alignItems: "center",
  },
  emptyList:{
    textAlign:'center'
  }
});