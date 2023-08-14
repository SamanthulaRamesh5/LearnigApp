import React from "react";
import { 
  View, 
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";
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
  navigateTo?:any;
}

const Reports = () => {
  const navigation = useNavigation();
  const data: Item[] = [
    {
      id: 1,
      assignmentType: CONSTANT.ASSESMENT,
      icon: Images.CompletedAssessment,
      navigateTo: "",
    },
    {
      id: 2,
      assignmentType: CONSTANT.ASSIGNMENT,
      icon: Images.Ealpha,
      navigateTo:NAVIGATION_CONSTANT.TEACHER_ASSIGNMENT_REPORT,
    },
    {
      id: 3,
      assignmentType: CONSTANT.GRADEBOOK,
      icon: Images.Ealpha,
      navigateTo: NAVIGATION_CONSTANT.GRADE_BOOK,
    },
    {
      id: 4,
      assignmentType: CONSTANT.PERFORMANCE,
      icon: Images.PerformanceExpectation,
      navigateTo: NAVIGATION_CONSTANT.TEACHER_PERFORMANCE_EXPECTATION,
    },
    
  ];

  const ItemDivider = () => {
    return (
      <View style={styles.itemSeparator}/>
    );
  }

  const renderItem: React.FC<{item: Item}> = ({item}) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={()=> navigation.navigate(item.navigateTo,{ assignmentType: item.assignmentType})}>
      {/* <BookIcon width={26} height={26} /> */}
      <CustomIcon
        name={item.icon}
        iconStyle={{width: 30, height:30}}
      />
      <Text style={styles.itemText}>{item.assignmentType}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      
      <BackHeader title={CONSTANT.REPORT}/>
      <View style={styles.flatList}>
        <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemDivider}
            scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Reports;
