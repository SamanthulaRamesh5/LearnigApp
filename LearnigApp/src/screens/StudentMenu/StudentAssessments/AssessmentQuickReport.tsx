import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeader from "../../../component/BackHeader";
import styles from "./styles";
import COLORS from "../../../assests/color";
import CONSTANT from "../../../locales/constants";
import Loader from "../../../component/Loader";

const AssessmentReportStudent = (props: any) => {
  let assessment_name = props?.route?.params?.assessmentName;
  const [isLoading, setLoader] = useState(false);

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.mainView}>
      <BackHeader title={CONSTANT.QUICK_VIEW_REPORT} />
      <View style={localStyles.textView}>
        <Text style={localStyles.textStyle}>{assessment_name}</Text>
      </View>
    </View>
  );
};

export default AssessmentReportStudent;

const localStyles = StyleSheet.create({
  flatlistRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  textView: {
    width: "90%",
    height: 35,
    borderRadius: 4,
    borderColor: COLORS.transparentGrey,
    borderWidth: 1,
    justifyContent: "center",
    borderLeftColor: COLORS.leftBorder,
    borderLeftWidth: 3,
    marginTop: 20,
    marginHorizontal: 15,
  },
  textStyle: {
    marginLeft: 12,
    fontWeight: "400",
    fontSize: 14,
    color: COLORS.blackCode,
  },
});
