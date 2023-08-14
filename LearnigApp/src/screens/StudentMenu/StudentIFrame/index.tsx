import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BackHeader from "../../../component/BackHeader";
import AppIFrame from "../../../component/app/AppIFrame";
import COLORS from "../../../assests/color";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import endurl from "../../../app/endurl";

const StudentIFrame: React.FC = () => {
  const couseData = useSelector(
    (state: any) => state?.courses.courseDataForIFrame
  );
  const userData = useSelector((state: any) => state?.login?.data);
  const [dataUrl, setDataUrl] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setDataUrl("");
      const iFrameURL = couseData?.lessonData?.content_url;
      console.log("dafdasfdfiFrameURL", couseData);
      setDataUrl(iFrameURL);
    }, [couseData])
  );

  return (
    <View style={styles.container}>
      <BackHeader
        title={
          couseData.lessonData?.lesson_name ?? couseData.lessonData?.unit_name
        }
      />
      {dataUrl !== "" && <AppIFrame url={dataUrl} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default StudentIFrame;
