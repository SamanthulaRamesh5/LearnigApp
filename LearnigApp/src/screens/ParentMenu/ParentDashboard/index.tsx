import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Images from "../../../assests/images";
import CommonBorder from "../../../component/CommonBorder";
import DashboardMenu from "../../../component/DashboardMenu";
import TeacherHeader from "../../../component/TeacherHeader";
import CONSTANT from "../../../locales/constants";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import CommonDropdown from "../../../component/CommonDropDown";
import NAVIGATION_CONSTANT from "../../../locales/constantsNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getStudentList } from "../../../store/StudentListSlice";
import { addDropdownValue } from "../../../store/dropdownSlice";
import gStyles from "../../../css";
import COLORS from "../../../assests/color";

const ParentDashboard = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.login.data?.user_id)
  const courseData = useSelector(
    (state: any) => state?.studentList?.data
  );

  useEffect(() => {
    dispatch(getStudentList(userId));
  }, []);

  return (
      <View style={{flex:1,backgroundColor:COLORS.white}}>
      <View style={styles.dropdownView}>
        {courseData && <CommonDropdown courseData={courseData} />}
      </View>
      <ScrollView style={gStyles.flexScroll} contentContainerStyle={{paddingBottom:50}}>  
      <View style={gStyles.rowView}>
        <DashboardMenu
          title={CONSTANT.ASSESMENT}
          icon={Images.Assesment}
          onPressItem={() => navigation.navigate(NAVIGATION_CONSTANT.ASSESMENT)}
        />

        <DashboardMenu
          title={CONSTANT.ASSIGNMENT}
          icon={Images.Assignment}
          onPressItem={() =>
            navigation.navigate(NAVIGATION_CONSTANT.ASSIGNMENT)
          }
        />
      </View>

      <View style={gStyles.rowView}>
        <DashboardMenu
          title={CONSTANT.REPORT}
          icon={Images.Reports}
          onPressItem={() => navigation.navigate(NAVIGATION_CONSTANT.REPORT)}
        />
        <DashboardMenu
          title={CONSTANT.ATTENDANCE}
          icon={Images.Attendance}
          onPressItem={() => navigation.navigate(NAVIGATION_CONSTANT.ATTENDANCE)}
        />
      </View>

      <View style={gStyles.rowView}>
        <DashboardMenu
          title={CONSTANT.TIMETABLE}
          icon={Images.TimeTable}
          onPressItem={() => navigation.navigate(NAVIGATION_CONSTANT.PARENTTIMETABLE)}
        />
        <DashboardMenu
          title={CONSTANT.USEEALPHA}
          icon={Images.Ealpha}
          onPressItem={() => navigation.navigate(NAVIGATION_CONSTANT.PARENT_USE_EALPHA)}
        />
      </View>

      <View style={gStyles.rowView}>
        <DashboardMenu
          title={CONSTANT.MORE}
          icon={Images.More}
          onPressItem={() => navigation.navigate(NAVIGATION_CONSTANT.MORE)}
        />
      </View>
    </ScrollView>
    </View>
  );
};

export default ParentDashboard;
