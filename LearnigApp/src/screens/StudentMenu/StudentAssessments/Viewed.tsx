import React, { useEffect, useState } from "react";
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
import CONSTANT from "../../../locales/constants";
import COLORS from "../../../assests/color";
import { useNavigation } from "@react-navigation/core";
import { getAPIRequest } from "../../../app/apiController";
import endurl from "../../../app/endurl";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../component/Loader";
import { Image } from "react-native-svg";
import { setLessonData } from "../../../store/courseSlice";

interface dataItem {
  id: number;
  title: string;
  dueDate: string;
  status: string;
}

const StudentViewedAsessment = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [assessmentList, setAssessmentList] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setLoader] = useState(false);
  const loginData = useSelector((state: any) => state.login.data);
  const studentId = loginData?.user_profile_id;

  const sortAscending = (header: string) => {
    const titleArr = [...assessmentList];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.assessment_name.toLowerCase() < b.assessment_name.toLowerCase()
          ? 1
          : -1
      );

      setAssessmentList(titleArr);
    }
  };

  const sortDescending = (header: string) => {
    const titleArr = [...assessmentList];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.assessment_name.toLowerCase() > b.assessment_name.toLowerCase()
          ? 1
          : -1
      );

      setAssessmentList(titleArr);
    }
  };
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

  const getAssessmentList = () => {
    setLoader(true);
    // console.log(endurl.STUDENT_ASSESSMENTLIST + `?student_id=${studentId}`);
    getAPIRequest(endurl.STUDENT_ASSESSMENTLIST + `?student_id=${studentId}`)
      .then((res: any) => {
        setLoader(false);
        const { status } = res;
        // console.log("====================================");
        // console.log("resasdfasd", res.data?.response?.results);
        // console.log("====================================");
        if (status == 200) {
          setAssessmentList(res?.data?.response?.results);
        }
      })
      .catch((error) => {
        setLoader(false);
        handleError(error);
      });
  };

  const handleOpenAssessment = (item: any) => {
    dispatch(setLessonData(item));
    //alert("URL not available");
  };

  // Function to render the data in table format
  const renderItem = ({ item }: any) => (
    <View style={styles.flatlisrRowView}>
      <View style={localStyles.column1Data}>
        <Text style={[styles.textStyle]}>{item.assessment_name}</Text>
      </View>

      <View style={localStyles.column2Data}>
        <Text style={styles.textStyle}>{item.submission_date}</Text>
      </View>

      <View style={localStyles.column3Data}>
        <Text style={styles.textStyle}>{item.status}</Text>
      </View>
    </View>
  );

  return isLoading ? (
    <Loader />
  ) : (
    <View style={styles.mainView}>
      <BackHeader title={CONSTANT.ASSIGNED_ASSESMENT} />

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
            <Text style={styles.tableHeadingTxt}>{CONSTANT.DUEDATE}</Text>
            <View style={localStyles.column2Icon}>
              <Images.AngleUp height={10} width={10} />
              <Images.AngleDown height={10} width={10} />
            </View>
          </View>

          {/*  Heading Column # 3 */}
          <View style={localStyles.column3View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.STATUS}</Text>
            <View style={localStyles.column3Icon}>
              <Images.AngleUp height={10} width={10} />
              <Images.AngleDown height={10} width={10} />
            </View>
          </View>
        </View>

        {assessmentList?.length > 0 ? (
          <FlatList
            data={assessmentList}
            keyExtractor={(item: any) => item.id}
            renderItem={renderItem}
            scrollEnabled={true}
          />
        ) : (
          <View style={localStyles.noDataFoundView}>
            <Text style={localStyles.noDataFound}>{CONSTANT.NO_DATA}</Text>
          </View>
        )}
      </View>

      {isError ? (
        <View style={localStyles.errorView}>
          <Image source={Images.error} style={localStyles.errorIcon} />
          <Text style={localStyles.errorText}>{isError}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default StudentViewedAsessment;

const localStyles = StyleSheet.create({
  column1View: {
    width: "36%",
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
    width: "36%",
    paddingRight: "7%",
  },
  column2View: {
    width: "32%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "4%",
  },
  column2Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "9%",
  },
  column2Data: {
    width: "32%",
    paddingLeft: "4%",
  },
  column3View: {
    width: "32%",
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
    width: "32%",
    paddingLeft: "6%",
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
