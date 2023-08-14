import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BackHeader from "../../../../../component/BackHeader";
import AppIFrame from "../../../../../component/app/AppIFrame";
import COLORS from "../../../../../assests/color";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import endurl from "../../../../../app/endurl";
import { getAPIRequest } from "../../../../../app/apiController";

const QuestionAssessmetIFrame: React.FC = () => {
  const assessmentDetails = useSelector(
    (state: any) => state.assessmentData.data
  );
  const [isLoading, setLoader] = useState<boolean>(true);
  const userData = useSelector((state: any) => state?.login?.data);

  const [dataUrl, setDataUrl] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      setDataUrl("");
      QuestionListApi();
    }, [])
  );

  const QuestionListApi = () => {
    const iFrameURL = `${endurl.QUESTION_PRINT_I_FRAME}/${assessmentDetails.id}/?user_id=${userData.user_id}`;
    console.log(iFrameURL);

    getAPIRequest(iFrameURL)
      .then((res: any) => {
        setLoader(false);
        const responseData = res?.data?.response?.question_sheet;
        console.log(responseData);

        setDataUrl(responseData);
      })
      .catch((e) => {
        setLoader(false);

        return e;
      });
  };

  return (
    <View style={styles.container}>
      <BackHeader title={assessmentDetails.name} />
      <View style={styles.iFrameView}>
        {dataUrl !== "" && <AppIFrame url={dataUrl} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  iFrameView: {
    margin: 10,
  },
});

export default QuestionAssessmetIFrame;
