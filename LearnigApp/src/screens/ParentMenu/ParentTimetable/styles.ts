import { StyleSheet } from "react-native";
import COLORS from "../../../assests/color";
import { HEIGHT, WIDTH } from "../../../locales/common";
const styles = StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  selectMonthText: {
    color: COLORS.blackCode,
    fontWeight: "300",
  },
  currentMonth: {
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 5,
  },
  marginLR: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  spacer: {
    height: 14,
  },
  scheduleCard: {
    flexDirection: "row",
  },
  scheduleTime: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10,
  },
  scheduleTimeText: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "400",
  },
  scheduleSubjectCardLine: {
    width: 6,
    backgroundColor: COLORS.Black,
    opacity: 0.4,
    height: "100%",
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    marginRight: 12,
  },
  scheduleSubjectCard: {
    flexDirection: "row",
    backgroundColor: COLORS.red,
    justifyContent: "flex-start",
    alignItems: "center",
    flexGrow: 1,
    borderRadius: 10,
  },
  cardView: {
    marginHorizontal: 16,
  },
  scheduleSubjectCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    width: 236,
  },
  scheduleSubjectCardSubTitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  dropdown: {
    width: 130,
    height: 40,
    borderColor: COLORS.InputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 16,
  },
  dropdownone: {
    height: 40,
    borderColor: COLORS.InputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 16,
  },
  dropDownStyle: {
    width: 130,
    borderColor: COLORS.greyColor,
    backgroundColor: COLORS.white,
    fontSize: 14,
    margin:-3
  },
  dropdownContainer: {
    borderColor: COLORS.greyColor,
    width: 130,
    top: 50,
    left: 0,
  },
  dropdownLabel: {
    fontSize: 14,
    color: COLORS.Black,
    textAlign: "center",
    borderColor: COLORS.greyColor,
  },
  line: {
    height: 60,
    backgroundColor: COLORS.greyColor,
    width: 1,
  },
  dateNumberStyle: {
    color: COLORS.blackCode,
    fontWeight: "400",
    fontSize: 14,
  },
  dateNameStyle: {
    color: COLORS.blackCode,
  },
  highlightedDateNumber: {
    color: COLORS.blackCode,
    fontSize: 14,
  },
  highlightDateNameStyle: {
    color: COLORS.blackCode,
  },
  highlightDateContainerStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.greenColor,
    borderWidth: 2,
    borderRadius: 22,
    width: 35.56,
    height: 64,
  },
  calenderStyle: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
  },
  dateContainerStyle: {
    backgroundColor: COLORS.greenColorCode,
  },
  flatListContainer: {
    padding: 4,
    paddingBottom: 300,
  },
  dateStyle: {
    width: 35,
    height: 64,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    borderColor: COLORS.ThemeGreen,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  dateStyleGreen: {
    width: 35,
    height: 64,
    borderRadius: 50,
    backgroundColor: COLORS.greenColorCode,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  datesStripContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
  },
  errorIcon: {
    marginTop: 2,
    marginLeft: 2,
  },
  errorView: {
    marginTop: 5,
    flexDirection: 'row',
  },
  errorText: {
    color: COLORS.red,
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '400',
  },
  noDataText:{
    color: COLORS.Black,
    alignSelf: 'center',
    marginTop:"20%",
    fontSize: 16,
    fontWeight: '400',
  }, 
  subTextStyle: {
    fontWeight: "300",
    fontSize: 14,
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
});

export default styles;
