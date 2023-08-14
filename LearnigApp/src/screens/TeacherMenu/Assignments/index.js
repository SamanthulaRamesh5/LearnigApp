import React from "react";
import { SafeAreaView, FlatList, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BackHeader from "../../../component/BackHeader";
import TeacherHeader from "../../../component/TeacherHeader";
import CONSTANT from "../../../locales/constants";
import NAVIGATION_CONSTANT from "../../../locales/constantsNavigation";
import Images from "../../../assests/images";
import styles from "./styles";
import CustomIcon from "../../../component/CustomIcon";
// import BookIcon from '../../assests/images/Book.svg';

const Assignments = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      assignmentType: CONSTANT.CREATEASSIGNMENT,
      icon: Images.Assignment,
      navigateTo: NAVIGATION_CONSTANT.CREATE_ASSIGNMNET,
    },
    {
      id: 2,
      assignmentType: CONSTANT.VIEWASSIGNMENT,
      icon: Images.Ealpha,
      navigateTo: NAVIGATION_CONSTANT.VIEW_ASSIGNMENT_TEACHER,
    },
    {
      id: 3,
      assignmentType: CONSTANT.COMPLETEDASSIGNMENT,
      icon: Images.CompletedAssignment,
      navigateTo: NAVIGATION_CONSTANT.COMPLETED_ASSIGNMENT_TEACHER,
    },
    {
      id: 4,
      assignmentType: CONSTANT.ASSIGNMENTREPORT,
      icon: Images.AssignmentReport,
      navigateTo: "",
    },
    {
      id: 5,
      assignmentType: CONSTANT.PERFORMANCEEXPECTATION,
      icon: Images.PerformanceExpectation,
      navigateTo: NAVIGATION_CONSTANT.TEACHER_PERFORMANCE_EXPECTATION,
    },
  ];

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate(item.navigateTo, {
          assignmentType: item.assignmentType,
        })
      }
    >
      <CustomIcon
        name={item.icon}
        iconStyle={{ width: 35, height: 35 }}
      />
      <Text style={styles.itemText}>{item.assignmentType}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeader title={CONSTANT.ASSIGNMENT} />
      <View style={styles.flatList}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemDivider}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Assignments;
