import { StyleSheet } from "react-native";
import COLORS from "../../../assests/color";
import { HEIGHT, WIDTH } from "../../../locales/common";

const styles = StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  dropdownView: {
    width: "92%",
    height: 40,
    alignSelf: "center",
    marginBottom: 28,
  },
});

export default styles;
