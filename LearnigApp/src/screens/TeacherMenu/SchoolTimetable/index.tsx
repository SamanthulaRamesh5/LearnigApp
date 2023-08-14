import React, { useState } from "react";
import { View, SafeAreaView } from "react-native";
import BackHeader from "../../../component/BackHeader";
import CommonBorder from "../../../component/CommonBorder";
import TeacherHeader from "../../../component/TeacherHeader";
import CONSTANT from "../../../locales/constants";
import { CurrentMonth, DailyScheduleList } from "./components";
import styles from "./styles";

interface Props {
  navigation: any;
}

const SchoolTimeTable: React.FC<Props> = ({ navigation }) => {
  const [classData,setClassData] = useState([])
  return (
    <SafeAreaView style={styles.mainView}>
      
      <BackHeader title={CONSTANT.TIMETABLE} />
      <View style={{ zIndex: 1 }}>
        <CurrentMonth  setFlatLlistData={(data:any)=>{
          setClassData(data)
          }}/>
      </View>
      <View style={{ zIndex: 0, paddingBottom: 100 }}>
        <DailyScheduleList classData={classData} />
      </View>
    </SafeAreaView>
  );
};

export default SchoolTimeTable;