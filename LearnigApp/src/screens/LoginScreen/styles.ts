import { StyleSheet } from "react-native";
import COLORS from "../../assests/color";
import { HEIGHT, WIDTH } from "../../locales/common";

export default StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    alignItems: "center",
    backgroundColor: COLORS.white,
    flex: 1,
  },
  subContainer: {
    width: "90%",
    height: "100%",
    justifyContent: "flex-end",
  },
  borderView: {
    width: WIDTH,
    height: 22,
    backgroundColor: COLORS.ThemeGreen,
  },
  companyStyle: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    width: 118,
    height: 42,
    marginRight: 7,
  },
  CompanyLogo: {
    width: 152,
    height: 48,
    marginLeft: 7,
  },
  borderLine: {
    backgroundColor: COLORS.borderLine,
    borderWidth: 0.1,
    marginTop: "3%",
  },
  loginText: {
    color: COLORS.blackCode,
    fontWeight: "300",
    fontSize: 14,
    marginTop: "10%",
    textAlign: "center",
  },
  TextInputView1: {
    marginTop: "10%",
  },
  TextInputView2: {
    marginTop: "6%",
  },
  button: {
    marginTop: "15%",
  },
  PrivacyText: {
    marginTop: "2%",
    color: COLORS.grey,
    fontWeight: "300",
    textAlign: "center",
  },
  forgotText: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: "38%",
    marginTop: "4%",
  },
  subView: {
    flexDirection: "row",
  },
  checkBoxStyle: {},
  RememberMeText: {
    fontSize: 14,
    fontWeight: "300",
    color: COLORS.colorBlack,
    marginTop: "3%",
  },
  errorIcon: {
    marginTop: 2,
    marginLeft: 2,
  },
  errorView: {
    flexDirection: "row",
  },
  errorText: {
    color: COLORS.red,
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "400",
  },
  TextInput: {
    marginTop: 40,
  },
  textStyle:{
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "MaterialIcons-Regular",
  }
});
