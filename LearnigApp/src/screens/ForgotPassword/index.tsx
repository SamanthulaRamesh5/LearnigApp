import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInput, Text } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import COLORS from "../../assests/color";
import Images from "../../assests/images";
import CONSTANT from "../../locales/constants";
import NAVIGATION_CONSTANT from "../../locales/constantsNavigation";
import styles from "./styles";
import CustomButton from "../../component/customButton";
import endurl from "../../app/endurl";
import Loader from "../../component/Loader";
import CommonBorder from "../../component/CommonBorder";
import { postAPIRequest } from "../../app/apiController";
import BackHeader from "../../component/BackHeader";

const ForgotPassword = () => {
  const navigation: any = useNavigation();
  const [userEmail, setEmail] = useState("");
  const [isError, setIsError] = useState("");
  const [isLoading, setLoader] = useState(false);

  const onChangeEmail = (userEmail: string) => {
    setIsError("");
    setEmail(userEmail);
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
    setEmail("");
  };

  const onPressReset = async (): Promise<void> => {
    const data = {
      username: userEmail,
    };
    setLoader(true);
    await axios.post(endurl.FORGOTPASS, data)
      .then((res) => {
        const { status } = res.data.response;
        setLoader(false);
        if (status == 200) {
          navigation.navigate(NAVIGATION_CONSTANT.RESETPASSWORD, {
            msg: res.data.message,
            userName: userEmail,
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.subContainer}>
            <View style={styles.companyStyle}>
              <Images.LogoImg style={styles.logo} />
              <Images.SymbolImg style={styles.CompanyLogo} />
            </View>

            <View style={styles.borderLine}></View>

            <Text style={styles.ForgotText}>{CONSTANT.FORGOTPASSWORD}</Text>

            <Text style={styles.loginText}>{CONSTANT.MSG_FORGOT_PASSWORD}</Text>

            <View style={styles.TextInput}>
              <TextInput
                placeholder={CONSTANT.USERNAME}
                value={userEmail}
                onChangeText={(userEmail) => onChangeEmail(userEmail)}
                mode="outlined"
                outlineColor={COLORS.InputBorderColor}
                activeOutlineColor={COLORS.InputBorderColor}
                style={styles.textStyle}
                textColor={COLORS.colorBlack}
                placeholderTextColor={COLORS.grey}
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
                title={CONSTANT.SUBMIT}
                onPressButton={onPressReset}
                disable={userEmail === ""}
              />
            </View>

            <Text style={styles.PrivacyText}>{CONSTANT.PRIVACYPOLICY}</Text>
            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
