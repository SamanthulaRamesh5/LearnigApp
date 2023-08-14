import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { captureScreen } from "react-native-view-shot";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

import COLORS from "../assests/color";
import { WIDTH } from "../locales/common";
import Images from "../assests/images";
import CONSTANT from "../locales/constants";
import CommonBorder from "./CommonBorder";
import { logoutApp } from "../app/logoutController";
import NAVIGATION_CONSTANT from "../locales/constantsNavigation";

interface props {
  dashboard?: boolean;
}

const TeacherHeader = ({ dashboard = false }: props) => {
  const navigation: any = useNavigation();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const loginData = useSelector((state: any) => state.login.data);
  const profile = loginData?.profile_picture;

  useFocusEffect(
    React.useCallback(() => {
      setLogoutVisible(false);
    }, [])
  );

  const toggleModal = () => {
    setLogoutVisible(!logoutVisible);
  };

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Image Download Permission",
          message: "Your permission is required to save images to your device",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        "",
        "Your permission is required to save images to your device",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } catch (err) {
      console.log("err", err);
    }
  };

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureScreen({
        format: "png",
        quality: 0.8,
      });

      if (Platform.OS === "android") {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }
      // cameraroll saves image
      const image: any = CameraRoll.save(uri, { type: "photo" });

      if (image) {
        Alert.alert(
          "",
          CONSTANT.SAVE_SUCCESS,
          [{ text: "OK", onPress: () => {} }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const onLogout = () => {
    logoutApp(NAVIGATION_CONSTANT.HOME, navigation);
  };

  return (
    <>
      {/* <CommonBorder /> */}
      <View style={[styles.mainView, styles.shadowProp]}>
        <View style={styles.subView}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Images.Menu style={styles.menuStyle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
            <Images.HomeImg style={styles.homeStyle} />
          </TouchableOpacity>
        </View>
        <View style={[styles.subView, styles.endView]}>
          <TouchableOpacity
            onPress={() => {
              downloadImage();
            }}
          >
            <Images.ScannerImg style={styles.scanner} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle} onPress={() => toggleModal()}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: profile,
              }}
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
      {logoutVisible ? (
        <View
          style={[
            styles.logoutView,
            dashboard ? styles.logoutRelativeView : styles.logoutAbsoluteView,
          ]}
        >
          <Button
            mode="outlined"
            style={styles.logoutButton}
            textColor={COLORS.blackCode}
            onPress={onLogout}
          >
            {CONSTANT.SIGNOUT}
          </Button>
        </View>
      ) : null}
    </>
  );
};

export default TeacherHeader;

const styles = StyleSheet.create({
  mainView: {
    width: WIDTH,
    height: 61,
    backgroundColor: COLORS.white,
    flexDirection: "row",
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  subView: {
    width: "50%",
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
  endView: {
    justifyContent: "flex-end",
  },
  menuStyle: {
    height: 17,
    width: 24,
    marginLeft: 15,
  },
  homeStyle: {
    height: 20,
    width: 19,
    marginLeft: 13,
  },
  scanner: {
    height: 16,
    width: 16,
    marginRight: 13,
  },
  msgBox: {
    height: 20,
    width: 20,
    marginRight: 13,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 0.5,
    borderColor: COLORS.borderLine,
    marginRight: 17,
    backgroundColor: "#e0dcdc",
  },
  tinyLogo: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  logoutView: {
    width: "45%",
    zIndex: 999,
    borderWidth: 2,
    borderColor: COLORS.bgGrey,
    marginTop: 8,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutAbsoluteView: {
    position: "absolute",
    top: "7%",
    left: "50%",
  },
  logoutRelativeView: {
    position: "relative",
    // top: '8%',
    left: "50%",
  },
  logoutButton: {
    backgroundColor: COLORS.ThemeGreen,
    borderRadius: 4,
    height: 40,
    width: 150,
    borderColor: COLORS.ThemeGreen,
  },
});
