import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import styles from "./styles";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeaderForParent from "../../../component/BackHeaderForParent";
import CONSTANT from "../../../locales/constants";
import { CurrentMonth, DailyScheduleList } from "./component";

interface Props {
  navigation: any;
}

const ParentTimetable: React.FC<Props> = ({ navigation }) => {
  const [classData, setClassData] = useState([]);
  return (
    <SafeAreaView style={styles.mainView}>
      

      <BackHeaderForParent title={CONSTANT.SCHOOLTIMETABLE} dropdown={true} />
      <View style={{ zIndex: 1 }}>
        <CurrentMonth
          setFlatLlistData={(data: any) => {
            setClassData(data);
          }}
        />
      </View>
      <View style={{ zIndex: 0, paddingBottom: 100 }}>
        <DailyScheduleList classData={classData} />
      </View>
    </SafeAreaView>
  );
};

export default ParentTimetable;
