import { StyleSheet } from "react-native";
import COLORS from "../../../../assests/color";

export default StyleSheet.create({
  borderView: {
    justifyContent: "center",
    marginLeft: 15,
    marginTop: 20,
  },
  buttonStyle: {
    backgroundColor: COLORS.printAssessmentButton,
    height: 52,
    width: "95%",
    display: "flex",
    justifyContent: "center",
  },
});
