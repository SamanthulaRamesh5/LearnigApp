import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import COLORS from "../../assests/color";
import Images from "../../assests/images";
import styles from "./styles";
import { getLoginData } from "../../store/loginSlice";
import { regExpPassword } from "../../locales/regex";
import CustomButton from "../../component/customButton";
import { Checkbox } from "react-native-paper";
import Loader from "../../component/Loader";
import { TextInput, Text } from "react-native-paper";
import { getItem, setItem } from "../../component/StorageHelper/StorageDetail";
import CONSTANT from "../../locales/constants";
import NAVIGATION_CONSTANT from "../../locales/constantsNavigation";
import CommonBorder from "../../component/CommonBorder";

const LoginScreen = () => {
  const navigation: any = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPassEmpty, setIsPassEmpty] = useState(false);
  const [isError, setIsError] = useState("");
  const [isLoading, setLoader] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState<any>("unchecked");
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch<any>();
  const loginData = useSelector((state: any) => state.login);

  useEffect(() => {
    const { loading, err, data } = loginData;

    setIsError("");
    setLoader(loading);
    if (err != "") {
      setUsername("");
      setPassword("");
      const message = err?.message !== "" ? err?.message : CONSTANT.ERRMSG;
      setIsError(message);
    } else {
      rememberMeFirstTime();
    }
    if (data !== [] && data?.status == "200") {
      // navigation.navigate(NAVIGATION_CONSTANT.DRAWER);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: NAVIGATION_CONSTANT.DRAWER },
          ],
        })
      );
    }
  }, [loginData]);

  const rememberMeFirstTime = async () => {
    const value: any = await getItem();
    setToggleCheckBox("checked");
    setUsername(value ? value.username : "");
    setPassword(value ? value.password : "");
    value
      ? value.password
      : " "
      ? setIsPassEmpty(false)
      : setIsPassEmpty(true);
  };

  const onPressLogin = () => {
    var data = {
      username: username,
      password: password,
    };
    if (toggleCheckBox === "checked") {
      setItem(data?.username,data?.password);
    }

    dispatch(getLoginData(data));
  };

  const onChangeName = (username: string) => {
    setIsError("");
    setUsername(username);
  };

  const onChangePassword = (password: string) => {
    setIsError("");
    setPassword(password);
    if (password === "" || !regExpPassword.test(password)) {
      setIsPassEmpty(true);
    } else {
      setIsPassEmpty(false);
    }
  };

  const onChangeStatus = () => {
    if (toggleCheckBox == "checked") {
      setToggleCheckBox("unchecked");
    } else {
      setToggleCheckBox("checked");
    }
  };

  const onClickForgotPass = () => {
    navigation.navigate(NAVIGATION_CONSTANT.FORGOT);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.mainView}>
        {/* <CommonBorder /> */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.subContainer}>
            <View style={styles.companyStyle}>
              <Images.LogoImg style={styles.logo} />
              <Images.SymbolImg style={styles.CompanyLogo} />
            </View>

            <View style={styles.borderLine}></View>

            <Text style={styles.loginText}>{CONSTANT.LOGINTEXT}</Text>

            <View style={styles.TextInputView1}>
              <TextInput
                mode="outlined"
                placeholder={CONSTANT.USERNAME}
                placeholderTextColor={COLORS.grey}
                textColor={COLORS.colorBlack}
                selectionColor={COLORS.grey}
                style={styles.textStyle}
                value={username}
                outlineColor={COLORS.InputBorderColor}
                autoCapitalize="none"
                autoCorrect={false}
                activeOutlineColor={COLORS.InputBorderColor}
                onChangeText={(newVal) => onChangeName(newVal)}
              />
            </View>

            <View style={styles.TextInputView2}>
              <TextInput
                mode="outlined"
                placeholder={CONSTANT.PASSWORD}
                value={password}
                placeholderTextColor={COLORS.grey}
                textColor={COLORS.colorBlack}
                selectionColor={COLORS.grey}
                style={styles.textStyle}
                outlineColor={COLORS.InputBorderColor}
                activeOutlineColor={COLORS.InputBorderColor}
                secureTextEntry={showPassword}
                onChangeText={(password) => onChangePassword(password)}
                right={
                  <TextInput.Icon
                    // name={<AntIcon name="eye" color="#cccccc" size={20} />}
                    icon={password !== "" && showPassword ? "eye-off" : "eye"}
                    style={{ marginTop: 12 }}
                    onPress={() => setShowPassword(!showPassword)}
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

            <View style={styles.subView}>
              <View style={styles.checkBoxStyle}>
                <Checkbox.Android
                  status={toggleCheckBox}
                  color={COLORS.ThemeGreen}
                  uncheckedColor={COLORS.greyShadow}
                  onPress={() => onChangeStatus()}
                />
              </View>
              <Text style={styles.RememberMeText}>{CONSTANT.REMEMBERME}</Text>
              <TouchableOpacity onPress={onClickForgotPass}>
                <Text style={styles.forgotText}>{CONSTANT.FORGOTPASSWORD}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.button}>
              <CustomButton
                title={CONSTANT.LOGIN}
                onPressButton={onPressLogin}
                disable={username === "" || isPassEmpty}
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

export default LoginScreen;
