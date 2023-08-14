import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Platform,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import COLORS from "../../assests/color";
import Images from "../../assests/images";
import CustomButton from "../../component/customButton";
import CONSTANT from "../../locales/constants";
import { regExpPassword } from "../../locales/regex";
import endurl from "../../app/endurl";
import styles from "./styles";
import Loader from "../../component/Loader";
import BackHeader from "../../component/BackHeader";
import { useNavigation } from "@react-navigation/native";
import { postAPIRequest } from "../../app/apiController";
import NAVIGATION_CONSTANT from "../../locales/constantsNavigation";
import axios from "axios";

const ResetPassword = (props: any) => {
  const navigation: any = useNavigation();
  let userName = props?.route?.params?.userName;

  const [isNewPass, setIsNewPass] = useState("");
  const [isConfPass, setIsConfPass] = useState("");
  const [isNewPassEmpty, setIsNewPassEmpty] = useState(true);
  const [isConfPassEmpty, setIsConfPassEmpty] = useState(true);
  const [isConfCodeEmpty, setIsConfCodeEmpty] = useState(true);
  const [isError, setIsError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showConfPassword, setShowConfPassword] = useState(true);
  const [isLoading, setLoader] = useState(false);
  const [confCode, setConfCode] = useState("");

  const setConfCodeVal = (newVal: string) => {
    setIsError("");
    setConfCode(newVal);
    if (newVal.length == 0) {
      setIsConfCodeEmpty(true);
    } else {
      setIsConfCodeEmpty(false);
    }
  };

  const setNewPass = (newVal: string) => {
    setIsError("");
    setIsNewPass(newVal);
    if (newVal.length == 0) {
      setIsNewPassEmpty(true);
    } else if (!regExpPassword.test(newVal)) {
      setIsError(CONSTANT.PASSWORDVALIDATION_MSG);
    } else {
      setIsNewPassEmpty(false);
    }
  };

  const confirmPass = (newVal: string) => {
    setIsError("");
    setIsConfPass(newVal);
    if (newVal.length == 0) {
      setIsConfPassEmpty(true);
    } else if (!regExpPassword.test(newVal)) {
      setIsError(CONSTANT.PASSWORDVALIDATION_MSG);
    } else {
      setIsConfPassEmpty(false);
    }
  };

  const handleError = (error: any) => {

    const val: any = Object.values(error.response.data.errors);
    if (val.length === 0) {
      setIsError(CONSTANT.ExceptionMSG);
    } else if (val !== "") {
      setIsError(val[0]);
    } else {
      setIsError(CONSTANT.ERRMSG);
    }
  };

  const onPressReset = () => {
    const data = {
      username: userName,
      confirmation_code: confCode,
      confirm_password: isConfPass,
      password: isNewPass,
    };
    setLoader(true);
    axios.post(endurl.RESETPASS, data)
      .then((res) => {
        const { status } = res.data.response;
        setLoader(false);
        if (status == 200) {
          const message = res.data.message;
          navigation.navigate(NAVIGATION_CONSTANT.LOGIN, {
            msg: res?.data?.message,
          });
        }
      })
      .catch((error) => {
        setLoader(false);
        handleError(error);
      });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.mainView}>
        <BackHeader />
        <View style={styles.subContainer}>
          <View style={styles.companyStyle}>
            <Images.LogoImg style={styles.logo} width={118} />
            <Images.SymbolImg style={styles.CompanyLogo} width={152} />
          </View>

          <View style={styles.borderLine}></View>

          <Text style={styles.TextView}>{CONSTANT.RESETPASSWORD}</Text>

          <View style={styles.TextInput1}>
            <TextInput
              mode="outlined"
              placeholder={CONSTANT.CONFIRMATION_CODE}
              placeholderTextColor={COLORS.grey}
              textColor={COLORS.colorBlack}
              style={styles.textStyle}
              outlineColor={COLORS.InputBorderColor}
              activeOutlineColor={COLORS.InputBorderColor}
              keyboardType="number-pad"
              onChangeText={(newVal) => setConfCodeVal(newVal)}
            />
          </View>

          <View style={styles.TextInput2}>
            <TextInput
              mode="outlined"
              placeholder={CONSTANT.NEWPASSWORD}
              placeholderTextColor={COLORS.grey}
              textColor={COLORS.colorBlack}
              style={styles.textStyle}
              outlineColor={COLORS.InputBorderColor}
              activeOutlineColor={COLORS.InputBorderColor}
              secureTextEntry={showPassword}
              onChangeText={(newVal) => setNewPass(newVal)}
              right={
                <TextInput.Icon
                  icon={isNewPass !== "" && showPassword ? "eye-off" : "eye"}
                  style={{ marginTop: 12 }}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          </View>

          <View style={styles.TextInput2}>
            <TextInput
              mode="outlined"
              placeholder={CONSTANT.CONFIRMPASSWORD}
              placeholderTextColor={COLORS.grey}
              textColor={COLORS.colorBlack}
              style={styles.textStyle}
              outlineColor={COLORS.InputBorderColor}
              activeOutlineColor={COLORS.InputBorderColor}
              secureTextEntry={showConfPassword}
              onChangeText={(newVal) => confirmPass(newVal)}
              right={
                <TextInput.Icon
                  icon={
                    isConfPass !== "" && showConfPassword ? "eye-off" : "eye"
                  }
                  style={{ marginTop: 12 }}
                  onPress={() => setShowConfPassword(!showPassword)}
                />
              }
            />
          </View>

          {isError ? (
            <View style={styles.errorView}>
              <Image source={Images.error} style={styles.errorIcon} />
              <Text style={styles.errorText}>{isError}</Text>
            </View>
          ) : null}

          <View style={styles.button}>
            <CustomButton
              title={CONSTANT.SAVE}
              onPressButton={onPressReset}
              disable={isNewPassEmpty || isConfCodeEmpty || isConfPassEmpty}
            />
          </View>

          <Text style={styles.PrivacyText}>{CONSTANT.PRIVACYPOLICY}</Text>
          <View style={{ flex: 1 }} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
