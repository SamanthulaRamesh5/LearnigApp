import React from "react";
import { SafeAreaView, FlatList, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import BackHeaderForParent from "../../../component/BackHeaderForParent";
import TeacherHeader from "../../../component/TeacherHeader";
import CONSTANT from "../../../locales/constants";
import NAVIGATION_CONSTANT from "../../../locales/constantsNavigation";
import Images from "../../../assests/images";
import styles from "./styles";
import CustomIcon from "../../../component/CustomIcon";

const ParentMore = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      assignmentType: CONSTANT.CONTACTUS,
      icon: Images.ContactUs,
      navigateTo: NAVIGATION_CONSTANT.PARENT_CONTACT_US,
    },
    {
      id: 2,
      assignmentType: CONSTANT.FAQ,
      icon: Images.FAQ,
      navigateTo: NAVIGATION_CONSTANT.PARENT_FAQ,
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
      <BackHeaderForParent dropdown={true} title={CONSTANT.MORE} />
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

export default ParentMore;
