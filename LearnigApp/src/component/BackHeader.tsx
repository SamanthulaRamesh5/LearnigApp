import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import COLORS from "../assests/color";
import Images from "../assests/images";
import { WIDTH } from "../locales/common";
import CONSTANT from "../locales/constants";

interface props {
  title?: string;
}

const BackHeader = ({ title }: props) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <TouchableOpacity style={styles.subView} onPress={onPressBack}>
        <Images.Back style={styles.icon} />
        <Text style={styles.text}>{CONSTANT.BACK}</Text>
      </TouchableOpacity>
      {title ? (
        <View style={styles.borderView}>
          <Text style={styles.textStyle}>{title}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  mainView: {
    width: WIDTH,
    alignItems: "flex-start",
    marginLeft: "4%",
    marginTop: 15,
  },
  subView: {
    flexDirection: "row",
    width: "90%",
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
});
