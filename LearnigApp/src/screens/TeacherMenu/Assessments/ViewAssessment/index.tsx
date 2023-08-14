import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";

import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import BackHeader from "../../../../component/BackHeader";
import CONSTANT from "../../../../locales/constants";
import Images from "../../../../assests/images";
import { getAPIRequest } from "../../../../app/apiController";
import endurl from "../../../../app/endurl";
import Loader from "../../../../component/Loader";
import { useSelector } from "react-redux";
import { Image } from "react-native-svg";
import { useFocusEffect } from "@react-navigation/native";

interface dataItem {
  id: number;
  title: string;
  class: string;
  dueDate: string;
  startDate: string;
}

const ViewAsessmentTeacher = () => {
  const navigation: any = useNavigation();
  const [assignedList, setAssignedList] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setLoader] = useState(false);
  const loginData = useSelector((state: any) => state.login.data);

  const userId = loginData?.user_id;
  // let userId = 1783;

  // useEffect(() => {
  //   getAssignedAssessmentList();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getAssignedAssessmentList();
    }, [])
  );

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

  const getAssignedAssessmentList = () => {
    setLoader(true);
    console.log(
      endurl.ASSIGNED_ASSESSMENT +
        `limit=1000&offset=0&ordering=-created_at&search=&start_date=&submission_date=&user_id=${userId}&domain_name=uat.ealpha.xyz`
    );

    getAPIRequest(endurl.ASSIGNED_ASSESSMENT + `?user_id=${userId}`)
      .then((res: any) => {
        setLoader(false);
        const { status } = res;
        if (status == 200) {
          console.log(res?.data?.response?.results);
          setAssignedList(res?.data?.response?.results);
        }
      })
      .catch((error) => {
        setLoader(false);
        handleError(error);
      });
  };

  // Function to render the data in table format
  const renderItem = ({ item }: any) => {
    const [studentCount, totalStudents] = item?.student_count?.split("/");

    return (
      <View style={styles.flatlisrRowView}>
        <View style={styles.column1Data}>
          <Text style={[styles.textStyle]}>{item.assessment_name}</Text>
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
      <BackHeader title={CONSTANT.ASSIGNED_ASSESMENT_TEACHER} />

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
              {/* <View style={styles.column1Icon}>
                <Images.AngleUp height={10} width={10} />
                <Images.AngleDown height={10} width={10} />
              </View> */}
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

export default ViewAsessmentTeacher;
