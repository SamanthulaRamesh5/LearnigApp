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

interface Item {
  id: number;
  assignmentType: string;
  icon: string;
  navigateTo?: any;
}

const Assessments: React.FC = () => {
  const navigation = useNavigation();
  const data: Item[] = [
    {
      id: 1,
      assignmentType: CONSTANT.CREATE_ASSESMENT,
      icon: Images.Assignment,
      navigateTo: NAVIGATION_CONSTANT.TEACHER_CREATE_ASSESSMENT,
    },
    {
      id: 2,
      assignmentType: CONSTANT.ASSIGNED_ASSESMENT,
      icon: Images.ViewAssessments,
      navigateTo: NAVIGATION_CONSTANT.TEACHER_VIEW_ASSESSMENT,
    },
    {
      id: 3,
      assignmentType: CONSTANT.COMPLETED_ASSESMENT,
      icon: Images.CompletedAssessment,
      navigateTo: NAVIGATION_CONSTANT.TEACHER_COMPLETED_ASSESSMENT,
    },
    {
      id: 4,
      assignmentType: CONSTANT.REPORT_ASSESMENT,
      icon: Images.AssignmentReport,
      navigateTo: "",
    },
    {
      id: 5,
      assignmentType: CONSTANT.PERFORMANCE,
      icon: Images.PerformanceExpectation,
      navigateTo: NAVIGATION_CONSTANT.TEACHER_PERFORMANCE_EXPECTATION,
    },
  ];

  const ItemDivider: React.FC = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem: React.FC<{ item: Item }> = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate(item?.navigateTo, {
          assignmentType: item.assignmentType,
        })
      }
    >
      {/* <BookIcon width={26} height={26} /> */}
      <CustomIcon name={item.icon} iconStyle={{ width: 26, height: 26 }} />
      <Text style={styles.itemText}>{item.assignmentType}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeader title={CONSTANT.ASSESMENT} />
      <View style={styles.flatList}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemDivider}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Assessments;
