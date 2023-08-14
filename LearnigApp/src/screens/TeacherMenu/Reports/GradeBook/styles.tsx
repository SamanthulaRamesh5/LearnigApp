import { StyleSheet } from "react-native";
import COLORS from "../../../../assests/color";
import { HEIGHT, WIDTH } from "../../../../locales/common";

export default StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 17,
    color: COLORS.blackCode,
    flexWrap: "wrap",
  },
  flatlistMain: {
    height: "90%",
    marginTop: "3%",
    padding: "1%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
  },
  flatlistHeading: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    paddingHorizontal: "2%",
    paddingVertical: "2%",
  },
  tableHeadingTxt: {
    fontSize: 14,
    fontWeight: "500",
    flexWrap: "wrap",
    lineHeight: 17,
    width: "70%",
    height: "1%",
  },
  flatlisrRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
    paddingHorizontal: "2%",
    paddingVertical: "2%",
  },
  column1View: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column1Icon: {
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
  },
  column1Data: {
    flex: 1,
  },
  column2View: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column2Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  column2Data: {
    flex: 1,
  },
  column3View: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column4View: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column5View: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column6View: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column7View: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column3Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "8%",
  },
  column4Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  column3Data: {
    flex: 1,
  },
  column4Data: {
    flex: 1,
  },
  column6Data: {
    flex: 1,
  },
  column7Data: {
    flex: 1,
  },
  noDataText: {
    color: COLORS.Black,
    alignSelf: "center",
    marginTop: "20%",
    fontSize: 16,
    fontWeight: "400",
  },
  noDataFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.blackCode,
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  DropdownView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "5%",
    marginTop: "5%",
  },
  classDropdownView: {
    width: "100%",
  },
  subTextStyle: {
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.blackCode,
  },
  dropdown: {
    height: 48,
    borderColor: COLORS.InputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    paddingLeft: 10,
    fontWeight: "300",
    color: COLORS.blackCode,
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingLeft: 10,
    fontWeight: "300",
    color: COLORS.blackCode,
    textTransform: "capitalize",
  },
});
