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

const ParentReports = () => {
  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={styles.mainView}>
      {/* <CommonBorder /> */}
      

      <BackHeaderForParent title={CONSTANT.REPORT} dropdown={true} />
      <View style={styles.marginView}>
        <View style={styles.handleMargin}>
          {/* <View style={styles.borderView}>
          <Text style={styles.textStyle}>{CONSTANT.ASSIGNMENT}</Text>
        </View> */}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_CONSTANT.ASSESSMENT_REPORT)
            }
          >
            <View style={styles.subView}>
              <Images.CompletedAssessment
                style={styles.icon}
                height={20}
                width={20}
              />
              <Text style={styles.subTextStyle}>{CONSTANT.ASSESMENT}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_CONSTANT.ASSIGNMENTREPORT)
            }
          >
            <View style={styles.subView}>
              <Images.ViewAssignment
                style={styles.icon}
                height={24}
                width={24}
              />
              <Text style={styles.subTextStyle}>{CONSTANT.ASSIGNMENT}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_CONSTANT.PERFORANCEEXPECTATION)
            }
          >
            <View style={styles.subView}>
              <Images.Performance style={styles.icon} height={20} width={20} />
              <Text style={styles.subTextStyle}>{CONSTANT.PERFORMANCE}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ParentReports;
