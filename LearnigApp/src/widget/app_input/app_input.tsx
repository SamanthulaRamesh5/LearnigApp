import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../assests/color";
import { TextInput } from "react-native-paper";

type APPINPUTTYPE = {
  label: string;
  placeholder: string;
  value: string;
  saveInputData: (e: string) => void;
};

const AppInput = ({ label, placeholder, value, saveInputData }: APPINPUTTYPE) => {
  return (
    <View style={style.mainVIew}>
      <Text style={style.textStyle}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={style.inputStyle}
        placeholderTextColor={COLORS.greyColor}
        value={value}
        onChangeText={(e: string) => saveInputData(e)}
      />
    </View>
  );
};

const style = StyleSheet.create({
  textStyle: {
    fontSize: 12,
    fontWeight: "300",
    color: COLORS.colorBlack,
  },
  mainVIew: {
    marginTop: "5%",
    paddingHorizontal: "5%",
  },
  inputStyle: {
    height: 48,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    marginTop: "2%",
    borderRadius: 4,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.colorBlack,
    paddingLeft: 10,
  },
});

export default AppInput;
