import React from "react";
import { ScrollView, View } from "react-native";
import Images from "../../../assests/images";
import DashboardMenu from "../../../component/DashboardMenu";
import CONSTANT from "../../../locales/constants";
import NAVIGATION_CONSTANT from "../../../locales/constantsNavigation";
import { useNavigation } from "@react-navigation/native";
import gStyles from "../../../css";

const StudentDashboard = () => {
  const navigation: any = useNavigation();
  return (
    <ScrollView style={gStyles.flexScroll}>
      <View style={gStyles.rowView}>
        <DashboardMenu
          title={CONSTANT.COURSES}
          icon={Images.Book}
          onPressItem={() =>
            navigation.navigate(NAVIGATION_CONSTANT.STUDENT_COURSES)
          }
        />
        <DashboardMenu
          title={CONSTANT.ASSIGNMENT}
          icon={Images.Assignment}
          onPressItem={() =>
            navigation.navigate(NAVIGATION_CONSTANT.STUDENT_ASSIGNMENTS)
          }
        />
      </View>

      <View style={gStyles.rowView}>
        <DashboardMenu
          title={CONSTANT.ASSESMENT}
          icon={Images.Assesment}
          onPressItem={() =>
            navigation.navigate(NAVIGATION_CONSTANT.STUDENT_ASSESSMENTS)
          }
        />
        <DashboardMenu
          title={CONSTANT.REPORT}
          icon={Images.Reports}
          onPressItem={() =>
            navigation.navigate(NAVIGATION_CONSTANT.STUDENT_REPORTS)
          }
        />
      </View>

      <View style={gStyles.rowView}>
        <DashboardMenu
          title={CONSTANT.ATTENDANCE}
          icon={Images.Attendance}
          onPressItem={() =>
            navigation.navigate(NAVIGATION_CONSTANT.STUDENT_ATTENDENCE)
          }
        />
        <DashboardMenu
          title={CONSTANT.TIMETABLE}
          icon={Images.TimeTable}
          onPressItem={() =>
            navigation.navigate(NAVIGATION_CONSTANT.STUDENT_TIMETABLE)
          }
        />
      </View>

      <View style={gStyles.rowView}>
        <DashboardMenu
          title={CONSTANT.USEEALPHA}
          icon={Images.Ealpha}
          onPressItem={() => navigation.navigate(NAVIGATION_CONSTANT.STUDENT_USE_EALPHA)}
        />
        <DashboardMenu
          title={CONSTANT.MORE}
          icon={Images.More}
          onPressItem={() => navigation.navigate(NAVIGATION_CONSTANT.MORE)}
        />
      </View>
    </ScrollView>
  );
};

export default StudentDashboard;
