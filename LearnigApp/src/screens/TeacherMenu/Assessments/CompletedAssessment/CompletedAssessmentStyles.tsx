import { StyleSheet } from "react-native";
import { JumpingTransition } from "react-native-reanimated";
import COLORS from "../../../../assests/color";
import { HEIGHT,WIDTH } from "../../../../locales/common";

export default StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  tabView:{
    flexDirection:"row",
    // justifyContent:"space-evenly",
    marginTop:"15%",
    marginHorizontal:"5%"  
  },
  tabStyles:{
    padding:"5%",
    borderWidth:1,
    borderRadius:5,
    borderColor:COLORS.border_color,
    color:COLORS.colorBlack,
    backgroundColor:COLORS.LIGHT_GREY,
    fontWeight:"300",
    fontSize:14

  },
  selectedtabStyles:{
    backgroundColor:COLORS.ThemeGreen,
    color:COLORS.white,
    borderColor:COLORS.border_color,
    borderWidth:1,
    borderRadius:5,
    padding:"5%",
    fontWeight:"300",
    fontSize:14

  },
  completedView:{
    borderWidth:1,
    borderTopEndRadius:5,
    borderTopStartRadius:5,
    padding:"5%",
    width:"35%",
  },
  notcompletedView:{
    borderWidth:1,
    borderTopEndRadius:5,
    borderTopStartRadius:5,
    padding:"5%",
    width:"40%",
  },
  flatlistMain: {
    height:'70%',
    marginLeft:'5%',
    marginRight:'4%',
    // marginTop:'8%',
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
    fontWeight:'400',
    color:COLORS.blackCode
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
  textStyle: {
    fontSize: 14,
    fontWeight:'300',
    lineHeight:17,
    color: COLORS.blackCode,
    flexWrap:'wrap',
  },
  flatlistRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  flatlistRowView1: {
    flexDirection: "row",
    padding: "4%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  column1View: {
    width: "34%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column1Data: {
    width: "34%",
    paddingHorizontal: "4%",
  },
  column2View: {
    width: "33%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column2Data: {
    width: "33%",
  },
  column1_View: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column1_Data: {
    width: "50%",
    paddingTop: "2%",
    paddingBottom: "2%",
  },
  column2_View: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column2_Data: {
    width: "50%",
  },
  column3View: {
    width: "33%",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "3%",
  },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
    color:COLORS.blackCode
  },
  noDataFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
