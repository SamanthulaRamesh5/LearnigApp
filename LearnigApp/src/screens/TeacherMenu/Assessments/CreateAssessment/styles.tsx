import { StyleSheet } from "react-native";
import COLORS from "../../../../assests/color";
import { HEIGHT, WIDTH } from "../../../../locales/common";

export default StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  marginView: {
    marginLeft: 10,
  },

  studentListBorderView: {
    width: WIDTH - 50,
    height: WIDTH / 10,
    borderColor: COLORS.leftBorder,
    justifyContent: "center",
    borderLeftWidth: 3,
    marginVertical: 20,
    marginLeft: 15,
  },

  headerTextStyle: {
    marginLeft: 12,
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.blackCode,
  },

  column2IconCheckBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "9%",
  },
  column3IconCheckBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "10%",
  },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
  },

  handleMargin: {
    marginTop: 24,
  },
  calenderiewForMargin: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },

  borderView: {
    height: 40,
    borderRadius: 4,
    borderColor: COLORS.transparentGrey,
    borderWidth: 1,
    borderLeftColor: COLORS.orange,
    borderLeftWidth: 2,
  },
  icon: {
    width: 20,
    height: 20,
    alignSelf: "center",
    viewBox: "0 0 100 100",
  },
  textStyle: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    color: COLORS.blackCode,
  },
  textPrintedStyle: {
    fontWeight: "400",
    fontSize: 14,
    alignSelf: "center",
    lineHeight: 19,
    paddingLeft: "6%",
    color: COLORS.blackCode,
  },
  textStyleClickable: {
    fontWeight: "400",
    fontSize: 14,
    alignSelf: "center",
    lineHeight: 19,
    color: COLORS.ThemeGreen,
    textDecorationLine: "underline",
  },
  subTextStyle: {
    fontWeight: "300",
    fontSize: 12,
    paddingLeft: 7,
    paddingTop: 25,
    lineHeight: 17,
    color: COLORS.blackCode,
  },
  subjectText: {
    fontWeight: "300",
    fontSize: 12,
    paddingLeft: 7,
    paddingTop: 16,
    color: COLORS.blackCode,
  },
  dateText: {
    fontWeight: "300",
    fontSize: 12,
    paddingTop: 16,
    color: COLORS.blackCode,
  },
  subView: {
    width: "95%",
    height: 60,
    flexDirection: "row",
    borderColor: COLORS.transparentGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 3,
    paddingHorizontal: 10,
    borderBottomColor: COLORS.blackCode,
    borderLeftWidth: 3,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 40,
    width: "92%",
    marginLeft: 8,
    borderColor: COLORS.InputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 12,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 20,
    top: 5,
    zIndex: 999,
    paddingHorizontal: 5,
    fontSize: 13,
  },
  placeholderStyle: {
    fontSize: 14,
    paddingLeft: 5,
    fontWeight: "300",
    color: COLORS.blackCode,
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingLeft: 5,
    fontWeight: "300",
    color: COLORS.blackCode,
  },
  flatlistMain: {
    // height: "70%",
    margin: "4%",
    marginTop: "4%",
    padding: "3%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    alignItems: "center",
  },
  flatlistHeading: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    padding: "5%",
    marginLeft: "2%",
    marginTop: "4%",
    marginRight: "5%",
    // height:80,
  },
  tableHeadingTxt: {
    fontSize: 14,
    fontWeight: "400",
  },
  flatlisrRowView: {
    flexDirection: "row",
    alignItems: "center",
    // height: 70,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
    padding: "4%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  flatlisrRowViewSecond: {
    flexDirection: "row",
    alignItems: "center",
    // height: 70,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
    padding: "5%",
    marginLeft: "2%",
    // marginRight: "5%",
  },
  column1View: {
    width: "37%",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: "2%",
  },
  column1ViewCheckBox: {
    width: "20%",
    flexDirection: "row",
  },
  column1Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "45%",
  },
  column1Data: {
    width: "34%",
    // paddingRight:'7%',
  },
  column1DataCheckBox: {
    width: "20%",
  },
  column2DataCheckBox: {
    width: "40%",
  },
  column3DataCheckBox: {
    width: "40%",
  },

  column2View: {
    width: "32%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "7%",
  },
  column2ViewCheckBox: {
    width: "40%",
    flexDirection: "row",
  },
  column3ViewCheckBox: {
    width: "40%",
    flexDirection: "row",
  },
  column2Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "9%",
  },
  column2Data: {
    width: "34%",

    // paddingLeft: '2%',
  },
  column3View: {
    width: "32%",
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: "7%",
  },
  column3Data: {
    width: "32%",
    paddingLeft: "4%",
  },
  buttonView: {
    marginTop: 38,
    width: "70%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    width: "50%",
  },
  buttonStyle: {
    backgroundColor: COLORS.ThemeGreen,
    borderRadius: 5,
    height: 40,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: 16,
  },
  dateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "3%",
    marginTop: "8%",
    // borderWidth:1
  },
  dtPickerView: {
    flexDirection: "row",
    marginTop: "5%",
    marginHorizontal: "4%",
  },
  startDtMainView: {
    flexDirection: "column",
    flex: 1,
  },

  dateViewInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "3%",
    // marginTop:'8%',
    borderWidth: 1,
    borderColor: COLORS.bgGrey,
    padding: "5%",
  },
  dtView1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dtTitle: {
    fontSize: 12,
    color: COLORS.colorBlack,
    margin: "3%",
  },
  dtTxt: {
    fontSize: 12,
    color: COLORS.colorBlack,
    fontWeight: "400",
    // marginLeft:"5%"
  },
  calender: {
    marginLeft: "30%",
    alignSelf: "flex-end",
  },
  textInputViewStyle: {
    borderWidth: 1,
    borderColor: COLORS.bgGrey,
    marginRight: "6%",
    marginLeft: "2%",
    padding: "3%",
    marginTop: "2%",
  },
  textInputStyle: {
    fontSize: 12,
    color: COLORS.colorBlack,
  },
  errorView: {
    paddingHorizontal: 10,
  },
  errorText: {
    fontWeight: "400",
    fontSize: 12,
    padding: 10,
    lineHeight: 19,
    color: COLORS.red,
  },
  startDateView: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.InputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 8,
    padding: 8,
  },
  startDateText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.blackCode,
  },
  endDtMainView: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
  },
});
