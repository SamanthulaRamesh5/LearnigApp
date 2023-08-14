import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeader from "../../../component/BackHeader";
import Images from "../../../assests/images";
import styles from "./styles";
import COLORS from "../../../assests/color";
import CONSTANT from "../../../locales/constants";
import NAVIGATION_CONSTANT from "../../../locales/constantsNavigation";
import { useNavigation } from "@react-navigation/core";
import { useSelector } from "react-redux";
import { getAPIRequest } from "../../../app/apiController";
import endurl from "../../../app/endurl";
import Loader from "../../../component/Loader";

interface dataItem {
  id: number;
  title: string;
  submitDate: string;
  score: number;
  bgColor: string;
}

const StudentCompletedAsessment = () => {
  const navigation: any = useNavigation();
  const [completedAssessmentList, setCompletedAssessmentList] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setLoader] = useState(false);
  const loginData = useSelector((state: any) => state.login.data);
  const studentId = loginData?.user_profile_id;

  useEffect(() => {
    getAssessmentList();
  }, []);

  const handleError = (error: any) => {
    const val: any = Object.values(error?.response?.data?.errors);
    if (val.length === 0) {
      setIsError(CONSTANT.ExceptionMSG);
    } else if (val !== "") {
      setIsError(val[0]);
    } else {
      setIsError(CONSTANT.ERRMSG);
    }
  };

  const sortAscending = (header: string) => {
    const titleArr = [...completedAssessmentList];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.assessment_name.toLowerCase() < b.assessment_name.toLowerCase()
          ? 1
          : -1
      );

      setCompletedAssessmentList(titleArr);
    } else if (header === CONSTANT.SCORE) {
      titleArr.sort((a: any, b: any) => a.percentage - b.percentage);

      setCompletedAssessmentList(titleArr);
    } else if (header === CONSTANT.SUBMITDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA < dateB ? 1 : -1;
      });

      setCompletedAssessmentList(titleArr);
    }
  };

  const sortDescending = (header: string) => {
    const titleArr = [...completedAssessmentList];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.assessment_name.toLowerCase() > b.assessment_name.toLowerCase()
          ? 1
          : -1
      );

      setCompletedAssessmentList(titleArr);
    } else if (header === CONSTANT.SCORE) {
      titleArr.sort((a: any, b: any) => b.percentage - a.percentage);

      setCompletedAssessmentList(titleArr);
    } else if (header === CONSTANT.SUBMITDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA > dateB ? 1 : -1;
      });

      setCompletedAssessmentList(titleArr);
    }
  };

  const getAssessmentList = () => {
    setLoader(true);
    getAPIRequest(
      endurl.STUDENT_COMPLETED_ASSESSMENTLIST + `?student_id=${studentId}`
    )
      .then((res: any) => {
        setLoader(false);
        const { status } = res;
        if (status == 200) {
          setCompletedAssessmentList(res?.data?.response?.results);
        }
      })
      .catch((error) => {
        setLoader(false);
        handleError(error);
      });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={localStyles.flatlistRowView}
      onPress={() =>
        navigation.navigate(NAVIGATION_CONSTANT.QUICK_VIEW_REPORT_ASSESSMENT, {
          assessmentName: item.assessment_name,
        })
      }
    >
      <View style={localStyles.column1Data}>
        <Text style={[styles.textStyle]}>{item.assessment_name}</Text>
      </View>

      <View style={localStyles.column2Data}>
        <Text style={styles.textStyle}>{item.submission_date}</Text>
      </View>

      <View
        style={[
          styles.scoreView,
          {
            backgroundColor:
              item.percentage <= 35
                ? COLORS.bgOrange
                : item.percentage >= 36 && item.percentage <= 60
                ? COLORS.bgYellow
                : item.percentage >= 61 && item.percentage <= 80
                ? COLORS.bgBlue
                : item.percentage >= 81 && item.percentage <= 100
                ? COLORS.bgGreen
                : COLORS.white,
          },
        ]}
      >
        <Text style={[styles.textStyle]}>{item.percentage}</Text>
      </View>
    </TouchableOpacity>
  );

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.mainView}>
      <BackHeader title={CONSTANT.COMPLETED_ASSESMENT} />

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
            <Text style={[styles.tableHeadingTxt, { paddingRight: "12%" }]}>
              {CONSTANT.SUBMITDATE}
            </Text>
            <View style={localStyles.column2Icon}>
              <TouchableOpacity
                onPress={() => sortAscending(CONSTANT.SUBMITDATE)}
              >
                <Images.AngleUp height={10} width={10} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sortDescending(CONSTANT.SUBMITDATE)}
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

        {completedAssessmentList?.length > 0 ? (
          <FlatList
            data={completedAssessmentList}
            keyExtractor={(item: any) => item.id}
            renderItem={renderItem}
            // ItemSeparatorComponent={ItemDivider}
            scrollEnabled={true}
          />
        ) : (
          <View style={localStyles.noDataFoundView}>
            <Text style={localStyles.noDataFound}>{CONSTANT.NO_DATA}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default StudentCompletedAsessment;

const localStyles = StyleSheet.create({
  flatlistRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  column1View: {
    height: 25,
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
    height: 25,
    width: "33%",
    flexDirection: "row",
    justifyContent: "center",
  },
  column3Icon: {
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "13%",
    justifyContent: "space-between",
  },
  noDataFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.blackCode,
  },
  errorIcon: {
    marginTop: 2,
    marginLeft: 2,
  },
  errorView: {
    flexDirection: "row",
    marginTop: 2,
  },
  errorText: {
    color: COLORS.red,
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "400",
  },
});
