import { StyleSheet, TouchableOpacity, Text,View} from "react-native";
import COLORS from "../../assests/color";

type APPBUTTONTWOTYPE = {
  label: string
  labelTwo: string
  onBackData?:()=>void
  onNextData:()=>void
}

const AppButtonTwo = ({ label,labelTwo,onBackData,onNextData }:APPBUTTONTWOTYPE) => {
  return (
    <View style={style.mainView}>
      <TouchableOpacity style={style.firstButtonStyle} onPress={onBackData}>
        <Text style={style.firstButtonText}>{label}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.secondButtonStyle} onPress={onNextData}>
        <Text style={style.secondButtonText}>{labelTwo}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    marginTop: "5%",
    paddingHorizontal: "5%",
    justifyContent:'center'
  },
  firstButtonStyle: {
    width: 96,
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.ThemeGreen,
    marginTop: "2%",
    borderRadius: 4,
    alignItems:'center',
    justifyContent:'center',
    marginRight:'5%'
  },
  firstButtonText: {
   color: COLORS.ThemeGreen,
   fontSize:16,
   fontWeight:'500'
  },
  secondButtonStyle:{
    width: 96,
    height: 40,
    backgroundColor: COLORS.ThemeGreen,
    borderWidth: 1,
    borderColor: COLORS.ThemeGreen,
    marginTop: "2%",
    borderRadius: 4,
    alignItems:'center',
    justifyContent:'center'
  },
  secondButtonText: {
    color: COLORS.white,
    fontSize:16,
    fontWeight:'500'
   },
});

export default AppButtonTwo;
