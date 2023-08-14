import { StyleSheet } from "react-native";
import COLORS from "../../../assests/color";
import { HEIGHT, WIDTH } from "../../../locales/common";

export default StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  marginView: {
    marginLeft: 10,
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
    fontWeight: "600",
    fontSize: 14,
    padding: 10,
    lineHeight: 19,
    color: COLORS.blackCode,
  },
  subTextStyle: {
    fontWeight: "300",
    fontSize: 12,
    paddingLeft: 5,
    paddingTop: 25,
    lineHeight: 17,
    color: COLORS.blackCode,
  },
  subjectText: {
    fontWeight: "300",
    fontSize: 12,
    paddingLeft: 5,
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
    borderBottomColor: COLORS.lineColor,
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
  icon: {
    marginRight: 5,
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
    paddingLeft: 10,
    fontWeight: "300",
    color: COLORS.blackCode,
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingLeft: 10,
    fontWeight: "300",
    color: COLORS.blackCode,
  },
  startDateView: {
    height: 40,
    width: "90%",
    flexDirection: "row",
    borderColor: COLORS.InputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 12,
  },
  calender: {
   position:'absolute',
    marginTop:10
  },
  button: {
    marginTop: 38,
    width: "92%",
    marginRight: 8,
    alignSelf: "center",
  },
  calederView: {
    width: "50%",
    flexDirection: "column",
  },
  calenderPartition: {
    flexDirection: "row",
    marginLeft: 8,
  },
  startDateText: {
    padding: 10,
    alignSelf: "center",
    width: "80%",
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.blackCode,
  },
  errorText: {
    fontWeight: "400",
    fontSize: 12,
    padding: 10,
    lineHeight: 19,
    color:COLORS.red,
    alignSelf:'center',
  },
  errorView:{
    paddingHorizontal: 10,
  },
});
