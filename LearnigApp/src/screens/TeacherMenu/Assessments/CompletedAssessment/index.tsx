import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-paper";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeader from "../../../../component/BackHeader";
import Images from "../../../../assests/images";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION_CONSTANT from "../../../../locales/constantsNavigation";
import { getAPIRequest } from "../../../../app/apiController";
import endurl from "../../../../app/endurl";
import { useSelector } from "react-redux";
import Loader from "../../../../component/Loader";
import { HEIGHT, WIDTH } from "../../../../locales/common";

interface dataItem {
  id: number;
  title: string;
  class: string;
  count: string;
  bgColor: string;
  score: number;
}

const CompletedAssessmentTeacher = () => {
  const loginData = useSelector((state: any) => state.login.data);
  const [isLoading, setLoader] = useState(true);
  const user_id = loginData?.user_id;
  const navigation: any = useNavigation();
  const [assignedList, setAssignedList] = useState([]);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    getCompletedAssessmentList();
  }, []);

  const getCompletedAssessmentList = () => {
    setLoader(true);
    console.log(
      endurl.TEACHER_COMPLETED_ASSESSMENT_LIST +
        `?limit=10&offset=0&ordering=&search=&start_date=&submission_date=&user_id=${user_id}`
    );

    getAPIRequest(
      endurl.TEACHER_COMPLETED_ASSESSMENT_LIST +
        `?limit=10&offset=0&ordering=&search=&start_date=&submission_date=&user_id=${user_id}`
    )
      .then((res: any) => {
        setLoader(false);
        setAssignedList(res?.data?.response?.results);
      })
      .catch((error) => {
        setLoader(false);
        handleError(error);
      });
  };

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

  const goToCompletedList = (item: any) => {
    navigation.navigate(
      NAVIGATION_CONSTANT.TEACHER_COMPLETED_ASSESSMENT_DETAIL,
      {
        item: item,
      }
    );
  };

  const sortAscending = (header: string) => {
    const titleArr = [...assignedList];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.assessment_name.toLowerCase() < b.assessment_name.toLowerCase()
          ? 1
          : -1
      );

      setAssignedList(titleArr);
    } else if (header === CONSTANT.STARTDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.start_date).getTime();
        var dateB = new Date(b.start_date).getTime();
        return dateA < dateB ? 1 : -1;
      });

      setAssignedList(titleArr);
    } else if (header === CONSTANT.DUEDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.submission_date).getTime();
        var dateB = new Date(b.submission_date).getTime();
        return dateA < dateB ? 1 : -1;
      });

      setAssignedList(titleArr);
    }
  };

  const sortDescending = (header: string) => {
    const titleArr = [...assignedList];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.assessment_name.toLowerCase() > b.assessment_name.toLowerCase()
          ? 1
          : -1
      );

      setAssignedList(titleArr);
    } else if (header === CONSTANT.STARTDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.start_date).getTime();
        var dateB = new Date(b.start_date).getTime();
        return dateA < dateB ? 1 : -1;
      });

      setAssignedList(titleArr);
    } else if (header === CONSTANT.DUEDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.submission_date).getTime();
        var dateB = new Date(b.submission_date).getTime();
        return dateA > dateB ? 1 : -1;
      });

      setAssignedList(titleArr);
    }
  };

  const renderItem = ({ item }: any) => {
    const [studentCount, totalStudents] = item?.student_count?.split("/");

    return (
      <View style={styles.flatlisrRowView}>
        <View style={styles.column1Data}>
          <TouchableOpacity onPress={() => goToCompletedList(item)}>
            <Text style={[styles.textStyle]}>{item.assessment_name}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.column2Data}>
          <Text style={[styles.textStyle]}>
            {item.class_name} (
            <Text style={styles.studentCountText}>{studentCount}</Text>
            {"/"}
            <Text style={styles.totalstudentCountText}>{totalStudents}</Text>)
          </Text>
        </View>

        <View style={styles.column3Data}>
          <Text style={styles.textStyle}>{item.start_date}</Text>
        </View>

        <View style={styles.column4Data}>
          <Text style={styles.textStyle}>{item.submission_date}</Text>
        </View>
      </View>
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.mainView}>
      <BackHeader title={CONSTANT.COMPLETED_ASSESMENT} />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal={true}
      >
        <View style={styles.flatlistMain}>
          {/* Display Header of the table */}
          <View style={styles.flatlistHeading}>
            {/*  Heading Column # 1 */}
            <View style={styles.column1View}>
              <Text style={styles.tableHeadingTxt}>{CONSTANT.TITLE}</Text>
              <View style={styles.column1Icon}>
                <TouchableOpacity onPress={() => sortAscending(CONSTANT.TITLE)}>
                  <Images.AngleUp height={10} width={10} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => sortDescending(CONSTANT.TITLE)}
                >
                  <Images.AngleDown height={10} width={10} />
                </TouchableOpacity>
              </View>
            </View>

            {/*  Heading Column # 2 */}
            <View style={styles.column2View}>
              <Text style={styles.tableHeadingTxt}>{CONSTANT.CLASS}</Text>
              <View style={styles.column1Icon}></View>
            </View>

            {/*  Heading Column # 3 */}
            <View style={styles.column3View}>
              <Text style={styles.tableHeadingTxt}>{CONSTANT.STARTDATE}</Text>
              <View style={styles.column2Icon}>
                <TouchableOpacity
                  onPress={() => sortAscending(CONSTANT.STARTDATE)}
                >
                  <Images.AngleUp height={10} width={10} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => sortDescending(CONSTANT.STARTDATE)}
                >
                  <Images.AngleDown height={10} width={10} />
                </TouchableOpacity>
              </View>
            </View>

            {/*  Heading Column # 3 */}

            <View style={styles.column4View}>
              <Text style={styles.tableHeadingTxt}>{CONSTANT.DUEDATE}</Text>
              <View style={styles.column3Icon}>
                <TouchableOpacity
                  onPress={() => sortAscending(CONSTANT.DUEDATE)}
                >
                  <Images.AngleUp height={10} width={10} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => sortDescending(CONSTANT.DUEDATE)}
                >
                  <Images.AngleDown height={10} width={10} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/*  Render the content in a table format */}
          {assignedList.length > 0 ? (
            <FlatList
              data={assignedList}
              keyExtractor={(item: any) => item.assessment_id}
              renderItem={renderItem}
              // scrollEnabled={true}
            />
          ) : (
            <View style={styles.noDataFoundView}>
              <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
            </View>
          )}
        </View>

        {isError ? (
          <View style={styles.errorView}>
            <Image source={Images.error} style={styles.errorIcon} />
            <Text style={styles.errorText}>{isError}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompletedAssessmentTeacher;

const styles = StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  flatList: {
    marginTop: "8%",
    height: "90%",
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 17,
    color: COLORS.blackCode,
    flexWrap: "wrap",
  },
  studentCountText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 17,
    color: COLORS.RED,
    flexWrap: "wrap",
  },
  totalstudentCountText: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 17,
    color: COLORS.blackCode,
    flexWrap: "wrap",
  },
  item: {
    paddingVertical: "5%",
    paddingHorizontal: "2%",
    marginLeft: "5%",
    width: "85%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemText: {
    fontSize: 14,
    lineHeight: 17,
    color: COLORS.blackCode,
    paddingLeft: "7%",
  },
  itemSeparator: {
    height: 1,
    width: "85%",
    marginLeft: "5%",
    backgroundColor: COLORS.listSeparatorColor,
  },
  iconStyle: {
    height: 35,
    width: 25,
    marginLeft: 15,
  },
  flatlistMain: {
    // flex:1,
    height: "90%",
    width: 520,
    //  marginHorizontal:"4%",
    marginTop: "8%",
    padding: "3.5%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    // alignItems:'center',
  },
  flatlistHeading: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    padding: "4%",
    // height:80,
  },
  tableHeadingTxt: {
    fontSize: 14,
    fontWeight: "500",
  },
  flatlisrRowView: {
    flexDirection: "row",
    alignItems: "center",
    // height: 70,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
    padding: "4%",
  },
  scoreView: {
    width: "33%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  column1View: {
    width: "28%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column1Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "45%",
  },
  column1Data: {
    width: "28%",
    paddingRight: "7%",
  },
  column2View: {
    width: "16%",
    flexDirection: "row",
    justifyContent: "flex-start",
    // paddingLeft: '4%',
  },
  column2Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "9%",
  },
  column2Data: {
    width: "16%",
    // paddingLeft: '4%',
  },
  column3View: {
    width: "28%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "6%",
  },
  column4View: {
    width: "28%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "6%",
  },
  column3Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "10%",
  },
  column3Data: {
    width: "28%",
    paddingLeft: "6%",
  },
  column4Data: {
    width: "28%",
    paddingLeft: "5%",
  },
  noDataText: {
    color: COLORS.Black,
    alignSelf: "center",
    marginTop: "20%",
    fontSize: 16,
    fontWeight: "400",
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
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
});
