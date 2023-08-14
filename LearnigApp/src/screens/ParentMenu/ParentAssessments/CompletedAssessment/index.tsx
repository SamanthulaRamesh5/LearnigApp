import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeaderForParent from "../../../../component/BackHeaderForParent";
import Images from "../../../../assests/images";
import styles from "./styles";
import COLORS from "../../../../assests/color";
import CONSTANT from "../../../../locales/constants";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import endurl from "../../../../app/endurl";
import { getAPIRequest } from "../../../../app/apiController";
import NAVIGATION_CONSTANT from "../../../../locales/constantsNavigation";
import Loader from "../../../../component/Loader";

interface dataItem {
  id: number;
  title: string;
  submission_date: string;
  score: number;
  bgColor: string;
}

const CompletedAssessment = () => {
  const [isError, setIsError] = useState("");
  const [assessmentData, setAssessmentData] = useState<dataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const loginData = useSelector((state: any) => state.login.data);
  const token = loginData?.AccessToken;
  const selectedStudent = useSelector((state: any) => state.dropdown.data);

  const sortAscending = (header: string) => {
    const titleArr = [...assessmentData];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
      );

      setAssessmentData(titleArr);
    } else if (header === CONSTANT.SUBMITTED_DATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.submission_date).getTime();
        var dateB = new Date(b.submission_date).getTime();
        return dateA < dateB ? 1 : -1;
      });

      setAssessmentData(titleArr);
    } else if (header === CONSTANT.SCORE) {
      titleArr.sort((a: any, b: any) => a.score - b.score);

      setAssessmentData(titleArr);
    }
  };

  const sortDescending = (header: string) => {
    const titleArr = [...assessmentData];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      );

      setAssessmentData(titleArr);
    } else if (header === CONSTANT.SUBMITTED_DATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.submission_date).getTime();
        var dateB = new Date(b.submission_date).getTime();
        return dateA > dateB ? 1 : -1;
      });

      setAssessmentData(titleArr);
    } else if (header === CONSTANT.SCORE) {
      titleArr.sort((a: any, b: any) => b.score - a.score);

      setAssessmentData(titleArr);
    }
  };

  useEffect(() => {
    getAssessmentData();
  }, [selectedStudent]);

  const getAssessmentData = () => {
    setIsError("");
    setLoading(true);
    console.log("URL: " + endurl.PARENT_ASSESS_COMPLETED + `?student_id=${selectedStudent.value}&ordering=assessment_name`);

    getAPIRequest(
      endurl.PARENT_ASSESS_COMPLETED +
        `?student_id=${selectedStudent.value}&ordering=assessment_name`
    )
      .then((res: any) => {
        const responseData = res?.data?.response?.results;
        // console.log("Response from aPI - ", responseData);

        const finalData: dataItem[] = responseData?.map((item: any) => ({
          id: item.assessment_id,
          title: item.assessment_name,
          submission_date: item.submission_date,
          score: item.percentage,
          bgColor:
            item.percentage >= 35 && item.percentage <= 60
              ? COLORS.redOrange
              : item.percentage > 60 && item.percentage <= 70
              ? COLORS.bgYellow
              : item.percentage > 70 && item.percentage <= 80
              ? COLORS.bgBlue
              : item.percentage > 80 && item.percentage <= 100
              ? COLORS.bgGreen
              : null,
        }));
        // console.log("Final Data- ",finalData);

        setAssessmentData(finalData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        handleError(error);
      });
  };

  const handleError = (error: any) => {
    const val: any = Object.values(error);
    if (val.length === 0) {
      setIsError(CONSTANT.ExceptionMSG);
    } else if (val !== "") {
      setIsError(val[0]);
    } else {
      setIsError(CONSTANT.ERRMSG);
    }
  };

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem: React.FC<{ item: dataItem }> = ({ item }) => (
    <View style={localStyles.flatlistRowView}>
      <View style={localStyles.column1Data}>
        <Text style={[styles.textStyle]}>{item.title}</Text>
      </View>

      <View style={localStyles.column2Data}>
        <Text style={styles.textStyle}>{item.submission_date}</Text>
      </View>

      <View style={[styles.scoreView, { backgroundColor: item.bgColor }]}>
        <Text style={[styles.textStyle]}>{item.score}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeaderForParent
        title={CONSTANT.COMPLETED_ASSESMENT}
        dropdown={true}
      />

      <View style={styles.flatlistMain}>
        {/* Display Header of the table */}
        <View style={styles.flatlistHeading}>
          {/*  Heading Column # 1 */}
          <View style={localStyles.column1View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.TITLE}</Text>
            <View style={localStyles.column1Icon}>
              <TouchableOpacity onPress={() => sortAscending(CONSTANT.TITLE)}>
                <Images.AngleUp height={10} width={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sortDescending(CONSTANT.TITLE)}>
                <Images.AngleDown height={10} width={10} />
              </TouchableOpacity>
            </View>
          </View>

          {/*  Heading Column # 2 */}
          <View style={localStyles.column2View}>
            <Text style={[styles.tableHeadingTxt, localStyles.dueDateTxt]}>
              {CONSTANT.SUBMITTED_DATE}
            </Text>
            <View style={localStyles.column2Icon}>
              <TouchableOpacity onPress={() => sortAscending(CONSTANT.SUBMITTED_DATE)}>
                <Images.AngleUp height={10} width={10} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sortDescending(CONSTANT.SUBMITTED_DATE)}
              >
                <Images.AngleDown height={10} width={10} />
              </TouchableOpacity>
            </View>
          </View>

          {/*  Heading Column # 3 */}
          <View style={localStyles.column3View}>
            <Text style={styles.tableHeadingTxt}>
              {CONSTANT.SCORE} {CONSTANT.PERCENT}
            </Text>
            <View style={localStyles.column3Icon}>
              <TouchableOpacity onPress={() => sortAscending(CONSTANT.SCORE)}>
                <Images.AngleUp height={10} width={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sortDescending(CONSTANT.SCORE)}>
                <Images.AngleDown height={10} width={10} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {selectedStudent.label ? (
          loading ? (
            <Loader />
          ) : assessmentData.length > 0 ? (
            <FlatList
              data={assessmentData}
              keyExtractor={(item: any) => item.id}
              renderItem={renderItem}
              scrollEnabled={true}
            />
          ) : isError ? (
            <View style={localStyles.errorView}>
              <Text style={localStyles.errorText}>{isError}</Text>
            </View>
          ) : (
            <View>
              <Text style={localStyles.noDataText}>{CONSTANT.NO_DATA}</Text>
            </View>
          )
        ) : (
          <View style={localStyles.noChildView}>
            <Text style={localStyles.noDataFound}>
              {CONSTANT.PLEASE_SELECT_CHILD}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CompletedAssessment;

const localStyles = StyleSheet.create({
  flatlistRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
    // marginTop: 10
  },
  column1View: {
    width: "34%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column1Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "40%",
  },
  column1Data: {
    width: "34%",
    paddingHorizontal: "4%",
  },
  column2View: {
    width: "33%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column2Icon: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "3%",
    justifyContent: "space-evenly",
  },
  column2Data: {
    width: "33%",
  },
  column3View: {
    width: "33%",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "3%",
  },
  column3Icon: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "13%",
    justifyContent: "space-between",
  },
  dueDateTxt: {
    paddingRight: "12%",
  },
  errorView: {
    padding: 10,
  },
  errorText: {
    fontWeight: "400",
    fontSize: 12,
    padding: 10,
    lineHeight: 19,
    color: COLORS.red,
  },
  noChildView: {
    flex: 1,
    alignItems: "center",
    marginTop: "30%",
  },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.blackCode,
  },
  noDataText: {
    color: COLORS.Black,
    alignSelf: "center",
    marginTop: "20%",
    fontSize: 16,
    fontWeight: "400",
  },
});
