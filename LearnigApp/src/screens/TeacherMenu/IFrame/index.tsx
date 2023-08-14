import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackHeader from '../../../component/BackHeader';
import AppIFrame from '../../../component/app/AppIFrame';
import COLORS from '../../../assests/color';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import endurl from "../../../app/endurl";

const TeacherIFrame: React.FC = () => {
  const couseData = useSelector((state: any) => state?.courses.courseDataForIFrame);
  const userData = useSelector((state: any) => state?.login?.data);
  const [dataUrl, setDataUrl] = useState("")

  useFocusEffect(
    React.useCallback(() => {
      setDataUrl("")
      console.log("couseData", couseData);
      // const iFrameURL = `${endurl.I_FRAME_ENDPOINT}/${couseData.course_id}/${couseData.lesson_id}/index.html?user_id=${userData.user_id}&role=${userData.role.name}`;
      const iFrameURL = couseData?.lessonData?.content_url;
      console.log("dafdasfdfiFrameURL", iFrameURL);
      setDataUrl(iFrameURL)
    }, [couseData])
  );

  return (
    <View style={styles.container}>
      <BackHeader title={couseData.lessonData.lesson_name}/>
      {dataUrl !== "" && <AppIFrame url={dataUrl}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
});

export default TeacherIFrame;
