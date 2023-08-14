import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "react-native-paper";
import BackHeader from "../../../../component/BackHeader";
import Images from "../../../../assests/images";
import styles from "./styles";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../../component/customButton";
import NAVIGATION_CONSTANT from "../../../../locales/constantsNavigation";
import { getAPIRequest } from "../../../../app/apiController";
import endurl from "../../../../app/endurl";
import { useSelector } from "react-redux";
import Loader from "../../../../component/Loader";
import scoreColor from "../../../../app/commonFunctions";

interface dataItem {
  id: number;
  title: string;
  class: string;
  countStart: string;
  countEnd: string;
  bgColor: string;
  score: number;
}

const CompletedAssignmentTeacher = () => {
  const loginData = useSelector((state: any) => state.login.data);
  const [isLoading, setLoader] = useState(true);
  const school_id = loginData?.school_id;
  const user_id = loginData?.user_id;
  const branch_id = loginData?.branch_id ? loginData?.branch_id : '' ;
  // const school_id = 2;
  // const user_id = 7;
  const status = CONSTANT.COMPLETED_STATUS;
  const navigation: any = useNavigation();
  const [list, setList] = useState<dataItem[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      completedAssignmentApi();
    }, [])
  );


  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const completedAssignmentApi = async () => {
    // console.log("Completed assingment URL - ",endurl.TEACHER_COMPLETED_ASSIGNMENT_LIST +
    // `?branch_id=${branch_id}&ordering=-created_at&school_id=${school_id}&user_id=${user_id}&status=${status}`);
    
    const url =
      endurl.TEACHER_COMPLETED_ASSIGNMENT_LIST +
      `?branch_id=${branch_id}&ordering=-created_at&school_id=${school_id}&user_id=${user_id}&status=${status}`;

    getAPIRequest(url)
      .then((res: any) => {
        setLoader(false);

        const responseData = res?.data?.response.results;

        const finalData = responseData.map((item: any) => {
          const [studentCount, totalStudents] =
            item?.completed_student_count?.split("/");

          if (item.score == null) {
            item.score = 0;
          }

          return {
            id: item.id,
            title: item.name,
            class: item.grade_name,
            countStart: studentCount,
            countEnd: totalStudents,
            score: item.score,
            bgColor: scoreColor(item.score),
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
    } else if (header === CONSTANT.SCORE) {
      titleArr.sort((a: any, b: any) => a.score - b.score);

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
    } else if (header === CONSTANT.SCORE) {
      titleArr.sort((a: any, b: any) => b.score - a.score);

      setList(titleArr);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.flatlistRowView}>
      <View style={styles.column1Data}>
        <Text style={[styles.textStyle]}>{item.title}</Text>
      </View>

      <TouchableOpacity
        style={styles.column2Data}
        onPress={() =>
          navigation.navigate(
            NAVIGATION_CONSTANT.TEACHER_COMPLETED_ASSIGNMENT_DETAILS,
            { assignment: item }
          )
        }
      >
        <Text style={styles.textStyle}>
          {item.class}(
          <Text style={styles.studentCountText}>{item.countStart}</Text>
          {"/"}
          <Text style={styles.totalstudentCountText}>{item.countEnd}</Text>)
        </Text>
      </TouchableOpacity>

      <View
        style={[
          styles.scoreView,
          {
            backgroundColor: item.bgColor,
          },
        ]}
      >
        <Text style={[styles.textStyle]}>{item.score}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeader title={CONSTANT.COMPLETEDASSIGNMENT} />
      <View style={styles.endAssignmentView}>
        <CustomButton
          title={CONSTANT.ASSIGN_ASSIGNMENT_TEACHER}
          onPressButton={() =>
            navigation.navigate(NAVIGATION_CONSTANT.VIEW_ASSIGNMENT_TEACHER)
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
            <Text style={styles.tableHeadingTxt}>
              {CONSTANT.SCORE} {CONSTANT.PERCENT}
            </Text>
            <View style={styles.column3Icon}>
              <TouchableOpacity onPress={() => sortAscending(CONSTANT.SCORE)}>
                <Images.AngleUp height={10} width={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sortDescending(CONSTANT.SCORE)}>
                <Images.AngleDown height={10} width={10} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
                // ItemSeparatorComponent={ItemDivider}
                scrollEnabled={true}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CompletedAssignmentTeacher;
