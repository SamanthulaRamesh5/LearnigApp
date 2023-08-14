import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import BackHeader from "../../../../../component/BackHeader";
import AppIFrame from "../../../../../component/app/AppIFrame";
import COLORS from "../../../../../assests/color";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import endurl from "../../../../../app/endurl";
import { getAPIRequest } from "../../../../../app/apiController";
import Pdf from "react-native-pdf";

const AnswerAssessmentIFrame: React.FC = () => {
  const assessmentDetails = useSelector(
    (state: any) => state.assessmentData.data
  );
  const userData = useSelector((state: any) => state?.login?.data);
  const [dataUrl, setDataUrl] = useState("");
  const [isLoading, setLoader] = useState<boolean>(true);

  useFocusEffect(
    React.useCallback(() => {
      setDataUrl("");
      answerListApi();
    }, [])
  );

  const answerListApi = () => {
    const iFrameURL = `${endurl.QUESTION_PRINT_I_FRAME}/${assessmentDetails.id}/?user_id=${userData.user_id}`;
    console.log(iFrameURL);

    getAPIRequest(iFrameURL)
      .then((res: any) => {
        setLoader(false);
        const responseData = res?.data?.response?.answer_sheet_pdf;
        console.log(responseData);

        setDataUrl(responseData);
      })
      .catch((e) => {
        setLoader(false);

        return e;
      });
  };
  const source = { uri: dataUrl, cache: true };

  return (
    <View style={styles.container}>
      <BackHeader title={assessmentDetails.name} />
      <View style={styles.iFrameView}>
        <Pdf source={source} trustAllCerts={false} style={styles.pdf} />
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
  pdf: {
    width: "100%",
    height: "90%",
  },
});

export default AnswerAssessmentIFrame;
