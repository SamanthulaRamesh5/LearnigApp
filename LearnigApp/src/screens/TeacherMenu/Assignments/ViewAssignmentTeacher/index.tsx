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
import BackHeader from "../../../../component/BackHeader";
import Images from "../../../../assests/images";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../../component/customButton";
import NAVIGATION_CONSTANT from "../../../../locales/constantsNavigation";
import styles from "./styles";
import { getAPIRequest } from "../../../../app/apiController";
import endurl from "../../../../app/endurl";
import { useSelector } from "react-redux";
import Loader from "../../../../component/Loader";

interface dataItem {
  id: number;
  title: string;
  class: string;
  dueDate: string;
  count: string;
}

const ViewAssignmentTeacher = () => {
  const navigation: any = useNavigation();
  const loginData = useSelector((state: any) => state.login.data);
  const [isLoading, setLoader] = useState(true);
  const token = loginData?.AccessToken;
  const school_id = loginData?.school_id;
  const user_id = loginData?.user_id;
  const branch_id = loginData?.branch_id ? loginData?.branch_id : '';
  // const school_id = 5396;
  // const user_profile_id = 1976;

  const [list, setList] = useState<dataItem[]>([]);

  const extraData = {
    Authorization: "Bearer " + token,
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Accept: "*/*",
  };

  useEffect(() => {
    assignmentListApi();
  }, []);

  const assignmentListApi = async () => {
    const url =
      endurl.TEACHER_ASSIGNMENT_LIST +
      `?branch_id=${branch_id}&ordering=-created_at&school_id=${school_id}&user_id=${user_id}&all_assignments=all`;
    console.log(url);

    getAPIRequest(url, extraData)
      .then((res: any) => {
        setLoader(false);

        const responseData = res?.data?.response?.results;

        const finalData = responseData?.map((item: any) => {
          const [studentCount, totalStudents] =
            item?.completed_student_count?.split("/");

          return {
            id: item.id,
            title: item.name,
            class: item.grade_name,
            dueDate: item.end_date,
            countStart: studentCount,
            countEnd: totalStudents,
          };
        });
        setList(finalData);
      })
      .catch((error) => {
        setLoader(false);

        // handleError(error);
      });
  };

  const sortAscending = (header: string) => {
    const titleArr = [...list];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
      );

      setList(titleArr);
    } else if (header === CONSTANT.CLASS) {
      titleArr.sort((a: any, b: any) =>
        a.class.toLowerCase() < b.class.toLowerCase() ? 1 : -1
      );
      setList(titleArr);
    } else if (header === CONSTANT.DUEDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA < dateB ? 1 : -1;
      });

      setList(titleArr);
    }
  };

  const sortDescending = (header: string) => {
    const titleArr = [...list];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      );

      setList(titleArr);
    } else if (header === CONSTANT.CLASS) {
      titleArr.sort((a: any, b: any) =>
        a.class.toLowerCase() > b.class.toLowerCase() ? 1 : -1
      );
      setList(titleArr);
    } else if (header === CONSTANT.DUEDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA > dateB ? 1 : -1;
      });

      setList(titleArr);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(NAVIGATION_CONSTANT.SUBMITTED_ASSIGNMENT, {
          itemId: item.id,
        })
      }
    >
      <View style={styles.flatlistRowView}>
        <View style={styles.column1Data}>
          <Text style={[styles.textStyle]}>{item.title}</Text>
        </View>

        <View style={styles.column2Data}>
          <Text style={styles.textStyle}>
            {item.class}(
            <Text style={styles.studentCountText}>{item.countStart}</Text>
            {"/"}
            <Text style={styles.totalstudentCountText}>{item.countEnd}</Text>)
          </Text>
        </View>

        <View style={styles.scoreView}>
          <Text style={[styles.textStyle]}>{item.dueDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeader title={CONSTANT.ASSIGNED_ASSIGNMENT_PARENT} />
      <View style={styles.endAssignmentView}>
        <CustomButton
          title={CONSTANT.COMPLETED}
          onPressButton={() =>
            navigation.navigate(
              NAVIGATION_CONSTANT.COMPLETED_ASSIGNMENT_TEACHER
            )
          }
        />
      </View>
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
              <TouchableOpacity onPress={() => sortDescending(CONSTANT.TITLE)}>
                <Images.AngleDown height={10} width={10} />
              </TouchableOpacity>
            </View>
          </View>

          {/*  Heading Column # 2 */}
          <View style={styles.column2View}>
            <Text
              style={[
                styles.tableHeadingTxt,
                { paddingRight: "8%", paddingLeft: "2%" },
              ]}
            >
              {CONSTANT.CLASS}
            </Text>
            <View style={styles.column2Icon}>
              <TouchableOpacity onPress={() => sortAscending(CONSTANT.CLASS)}>
                <Images.AngleUp height={10} width={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sortDescending(CONSTANT.CLASS)}>
                <Images.AngleDown height={10} width={10} />
              </TouchableOpacity>
            </View>
          </View>

          {/*  Heading Column # 3 */}
          <View style={styles.column3View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.DUEDATE}</Text>
            <View style={styles.column3Icon}>
              <TouchableOpacity onPress={() => sortAscending(CONSTANT.DUEDATE)}>
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {list?.length <= 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
              </View>
            ) : (
              <FlatList
                data={list}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
                scrollEnabled={true}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewAssignmentTeacher;
