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
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17,
    alignSelf: "center",
    paddingLeft: 10,
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
    borderBottomColor: COLORS.listSeparatorColor,
    borderLeftWidth: 3,
  },
});
