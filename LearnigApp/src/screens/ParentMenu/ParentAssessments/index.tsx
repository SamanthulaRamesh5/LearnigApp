import React from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import CommonBorder from "../../../component/CommonBorder";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeaderForParent from "../../../component/BackHeaderForParent";
import Images from "../../../assests/images";
import CONSTANT from "../../../locales/constants";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION_CONSTANT from "../../../locales/constantsNavigation";

const ParentAssessments = () => {
  const navigation: any = useNavigation();

  return (
    <SafeAreaView style={styles.mainView}>
      

      <BackHeaderForParent title={CONSTANT.ASSESMENT} dropdown={true} />
      <View style={styles.marginView}>
        <View style={styles.handleMargin}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_CONSTANT.ASSIGNED_ASSESSMENT)
            }
          >
            <View style={styles.subView}>
              <Images.ViewAssessments
                style={styles.icon}
                height={20}
                width={20}
              />
              <Text style={styles.subTextStyle}>
                {CONSTANT.ASSIGNED_ASSESMENT}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_CONSTANT.COMPLETED_ASSESSMENT)
            }
          >
            <View style={styles.subView}>
              <Images.CompletedAssessment
                style={styles.icon}
                height={20}
                width={20}
              />
              <Text style={styles.subTextStyle}>
                {CONSTANT.COMPLETED_ASSESMENT}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_CONSTANT.ASSESSMENT_REPORT)
            }
          >
            <View style={styles.subView}>
              <Images.Report style={styles.icon} height={20} width={20} />
              <Text style={styles.subTextStyle}>
                {CONSTANT.REPORT_ASSESMENT}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_CONSTANT.PERFORANCEEXPECTATION)
            }
          >
            <View style={styles.subView}>
              <Images.PerformanceExpectation
                style={styles.icon}
                height={20}
                width={20}
              />
              <Text style={styles.subTextStyle}>{CONSTANT.PERFORMANCE}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ParentAssessments;
