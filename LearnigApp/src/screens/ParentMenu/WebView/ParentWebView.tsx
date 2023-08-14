import React from "react";
import { View, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import CommonBorder from "../../../component/CommonBorder";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeaderForParent from "../../../component/BackHeaderForParent";
import Images from "../../../assests/images";
import CONSTANT from "../../../locales/constants";
import { WebView } from "react-native-webview";

const ParentWebView = () => {
  return (
    <SafeAreaView style={styles.mainView}>
      

      <BackHeaderForParent title={CONSTANT.ADDITION} dropdown={true} />
      <View style={styles.marginView}>
        <WebView
          source={{ uri: "https://reactnative.dev/" }}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};
export default ParentWebView;
