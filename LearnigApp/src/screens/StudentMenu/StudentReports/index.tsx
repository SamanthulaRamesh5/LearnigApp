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
  assignmentType: string;
  icon: string;
  navigateTo: string;
}

const StudentReports = () => {
  const navigation: any = useNavigation();
  const data: dataItem[] = [
    {
      id: 1,
      assignmentType: CONSTANT.ASSESMENT,
      icon: Images.CompletedAssessment,
      navigateTo: NAVIGATION_CONSTANT.STUDENT_ASSESSMENT_REPORT,
    },
    {
      id: 2,
      assignmentType: CONSTANT.ASSIGNMENT,
      icon: Images.Ealpha,
      navigateTo: NAVIGATION_CONSTANT.STUDENT_ASSIGNMENT_REPORT,
    },
    {
      id: 3,
      assignmentType: CONSTANT.PERFORMANCE,
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
          assignmentType: item.assignmentType,
        })
      }
    >
      {/* <BookIcon width={26} height={26} /> */}
      <CustomIcon
        name={item.icon}
        iconStyle={{ width: 26, height: 26 }}
      />
      <Text style={styles.itemText}>{item.assignmentType}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      
      <BackHeader title={CONSTANT.REPORT} />
      <View style={styles.flatList}>
        <FlatList
          data={data}
          keyExtractor={(item: any) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemDivider}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default StudentReports;
