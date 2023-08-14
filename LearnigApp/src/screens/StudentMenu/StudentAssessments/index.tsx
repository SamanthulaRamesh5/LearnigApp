import React from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeader from "../../../component/BackHeader";
import Images from "../../../assests/images";
import CONSTANT from "../../../locales/constants";
import NAVIGATION_CONSTANT from "../../../locales/constantsNavigation";
import CustomIcon from "../../../component/CustomIcon";
import { useNavigation } from "@react-navigation/native";

interface dataItem {
  id: number;
  assessmentType: string;
  icon: string;
  navigateTo: string;
}

const StudentAssessments = () => {
  const navigation: any = useNavigation();
  const data: dataItem[] = [
    {
      id: 1,
      assessmentType: CONSTANT.ASSIGNED_ASSESMENT,
      icon: Images.ViewAssessments,
      navigateTo: NAVIGATION_CONSTANT.STUDENT_VIEWED_ASSESSMENT,
    },
    {
      id: 2,
      assessmentType: CONSTANT.COMPLETED_ASSESMENT,
      icon: Images.CompletedAssessment,
      navigateTo: NAVIGATION_CONSTANT.STUDENT_COMPLETED_ASSESSMENT,
    },
    {
      id: 3,
      assessmentType: CONSTANT.REPORT_ASSESMENT,
      icon: Images.AssignmentReport,
      navigateTo: NAVIGATION_CONSTANT.STUDENT_ASSESSMENT_REPORT,
    },
    {
      id: 4,
      assessmentType: CONSTANT.PERFORMANCE,
      icon: Images.PerformanceExpectation,
      navigateTo: NAVIGATION_CONSTANT.STUDENT_PERFORMANCE_EXPECTATION,
    },
  ];

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate(item.navigateTo, {
          assessmentType: item.assessmentType,
        })
      }
    >
      {/* <BookIcon width={26} height={26} /> */}
      <CustomIcon name={item.icon} iconStyle={{ width: 26, height: 26 }} />
      <Text style={styles.itemText}>{item.assessmentType}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainView}>
      <BackHeader title={CONSTANT.ASSESMENT} />
      <View style={styles.flatList}>
        <FlatList
          data={data}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemDivider}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

export default StudentAssessments;
