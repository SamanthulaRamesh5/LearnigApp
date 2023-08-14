import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import COLORS from "../assests/color";
import Images from "../assests/images";
import { WIDTH } from "../locales/common";
import CONSTANT from "../locales/constants";
import CommonDropdown from "./CommonDropDown";

interface props {
  title: string;
  dropdown: boolean;
}
const BackHeaderForParent = ({ title, dropdown = false }: props) => {
  const navigation = useNavigation();
  const courseData = useSelector((state: any) => state?.studentList?.data);

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <TouchableOpacity style={styles.subView} onPress={onPressBack}>
        <Images.Back style={styles.icon} />
        <Text style={styles.text}>{CONSTANT.BACK}</Text>
      </TouchableOpacity>
      {dropdown && courseData ? (
        <View style={styles.dropdownView}>
          <CommonDropdown courseData={courseData} />
        </View>
      ) : null}

      <View style={styles.borderView}>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

export default BackHeaderForParent;

const styles = StyleSheet.create({
  mainView: {
    width: WIDTH,
    alignItems: "center",
    marginTop: 15,
  },
  subView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
  icon: {
    marginTop: 3,
    width: 8,
    height: 5,
  },
  text: {
    marginLeft: 7,
    fontWeight: "300",
    fontSize: 12,
    color: COLORS.blackCode,
  },
  borderView: {
    width: WIDTH - 45,
    height: WIDTH / 10,
    borderRadius: 4,
    borderColor: COLORS.leftBorder,
    justifyContent: "center",
    borderLeftWidth: 3,
    marginTop: 20,
  },
  textStyle: {
    marginLeft: 12,
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.blackCode,
  },
  dropdownView: {
    width: "90%",
  },
});
