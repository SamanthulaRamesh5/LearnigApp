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
  studentCountText: {
    fontSize: 14,
    fontWeight:'400',
    lineHeight:17,
    color: COLORS.Pink,
    flexWrap:'wrap',
  },
  totalstudentCountText: {
    fontSize: 14,
    fontWeight:'400',
    lineHeight:17,
    color: COLORS.blackCode,
    flexWrap:'wrap',
  },
  textStyle: {
    fontSize: 14,
    fontWeight:'400',
    lineHeight:17,
    paddingRight:'2%',
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
    width:'100%',
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
  endAssignmentView:{
    flex: 1,
          alignSelf: "flex-end",
          marginTop: "5%",
          marginRight: "3%",
          marginBottom: "6%",
  },
  flatlistRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: COLORS.listSeparatorColor,
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
  column1View: {
    width: "34%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column1Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "40%",
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
  column2Icon: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "3%",
    justifyContent: "space-evenly",
  },
  column2Data: {
    width: "33%",
    paddingLeft: "2%",
  },
  column3View: {
    width: "33%",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "3%",
  },
  column3Icon: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "13%",
    justifyContent: "space-between",
  },
});
