import React from "react";
import { View, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import styles from "../../ParentAssessments/styles";
import CommonBorder from "../../../../component/CommonBorder";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeaderForParent from "../../../../component/BackHeaderForParent";

import CONSTANT from "../../../../locales/constants";

const AssignmentList = () => {
  return (
    <SafeAreaView style={styles.mainView}>      

      <BackHeaderForParent
        title={CONSTANT.ASSIGNED_ASSIGNMENT}
        dropdown={true}
      />
      <View style={styles.marginView}></View>
    </SafeAreaView>
  );
};

export default AssignmentList;
