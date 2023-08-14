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
import CONSTANT from "../../../locales/constants";
import COLORS from "../../../assests/color";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION_CONSTANT from "../../../locales/constantsNavigation";
import { getAPIRequest } from "../../../app/apiController";
import Loader from "../../../component/Loader";
import endurl from "../../../app/endurl";
import { useSelector } from "react-redux";
import moment from "moment";
import scoreColor from "../../../app/commonFunctions";

interface dataItem {
  id: number;
  title: string;
  submitDate: string;
  score: number;
  bgColor: string;
}

const StudentCompletedAssignment = () => {
  const navigation: any = useNavigation();
  const loginData = useSelector((state: any) => state.login.data);
  const [isLoading, setLoader] = useState(true);
  const student_id = loginData?.user_profile_id;
  const [list, setList] = useState<dataItem[]>([]);

  // const [data, setData] = useState<dataItem[]>([
  //   {
  //     id: 1,
  //     title: "Maths Homework",
  //     submitDate: "05-10-2022",
  //     score: 40,
  //     bgColor: "#BECCFF",
  //   },
  //   {
  //     id: 2,
  //     title: "English Homework",
  //     submitDate: "07-10-2022",
  //     score: 50,
  //     bgColor: "#FCD4C6",
  //   },
  //   {
  //     id: 3,
  //     title: "Maths Homework",
  //     submitDate: "10-10-2022",
  //     score: 70,
  //     bgColor: "#FFF9BE",
  //   },
  //   {
  //     id: 4,
  //     title: "Science Work",
  //     submitDate: "18-10-2022",
  //     score: 40,
  //     bgColor: "#D9FFC8",
  //   },
  //   {
  //     id: 5,
  //     title: "Maths Homework",
  //     submitDate: "05-10-2022",
  //     score: 40,
  //     bgColor: "#BECCFF",
  //   },
  //   {
  //     id: 6,
  //     title: "English Homework",
  //     submitDate: "07-10-2022",
  //     score: 50,
  //     bgColor: "#FCD4C6",
  //   },
  //   {
  //     id: 7,
  //     title: "Maths Homework",
  //     submitDate: "10-10-2022",
  //     score: 70,
  //     bgColor: "#FFF9BE",
  //   },
  //   {
  //     id: 8,
  //     title: "Science Work",
  //     submitDate: "18-10-2022",
  //     score: 40,
  //     bgColor: "#D9FFC8",
  //   },
  //   {
  //     id: 9,
  //     title: "Maths Homework",
  //     submitDate: "05-10-2022",
  //     score: 40,
  //     bgColor: "#BECCFF",
  //   },
  //   {
  //     id: 10,
  //     title: "English Homework",
  //     submitDate: "07-10-2022",
  //     score: 50,
  //     bgColor: "#FCD4C6",
  //   },
  //   {
  //     id: 11,
  //     title: "Maths Homework",
  //     submitDate: "10-10-2022",
  //     score: 70,
  //     bgColor: "#FFF9BE",
  //   },
  //   {
  //     id: 12,
  //     title: "Science Work",
  //     submitDate: "18-10-2022",
  //     score: 40,
  //     bgColor: "#D9FFC8",
  //   },
  // ]);

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const headers = {
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Accept: "*/*",
  };
  useEffect(() => {
    assignmentListApi();
  }, []);

  const sortAscending = (header: string) => {
    const titleArr = [...list];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
      );

      setList(titleArr);
    } else if (header === CONSTANT.SUBMITDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA < dateB ? 1 : -1;
      });

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
    } else if (header === CONSTANT.SUBMITDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA > dateB ? 1 : -1;
      });

      setList(titleArr);
    } else if (header === CONSTANT.SCORE) {
      titleArr.sort((a: any, b: any) => b.score - a.score);

      setList(titleArr);
    }
  };

  const assignmentListApi = async () => {
    const url =
      endurl.STUDENT_NEW_ASSIGNMENT_LIST +
      `?student_id=${student_id}&state=${CONSTANT.COMPLETED_STATUS}&ordering=-created_at&offset=0&limit=10`;
    console.log(url);

    getAPIRequest(url, headers)
      .then((res: any) => {
        setLoader(false);
        const responseData = res?.data?.results;

        // const finalData = responseData?.map((item: any) => {
        //   if (item.score == null) {
        //     item.score = 0;
        //   }
        //   // return {
        //   //   id: item.id,
        //   //   title: item.assignment_name,
        //   //   submitDate: moment(item.end_date).format("YYYY-MM-DD"),
        //   //   score: item.score,
        //   //   bgColor: scoreColor(item.score),
        //   // };
        // });
        setList(responseData);
      })
      .catch((error) => {
        setLoader(isLoading);
        return error;
      });
  };

  const renderItem = ({ item }: any) => (
    <View style={localStyles.flatlistRowView}>
      <View style={localStyles.column1Data}>
        <Text style={[styles.textStyle]}>{item.assignment_name}</Text>
      </View>

      <View style={localStyles.column2Data}>
        <Text style={styles.textStyle}>
          {moment(item.end_date).format("YYYY-MM-DD")}
        </Text>
      </View>

      {/* <View style={{ width: '33%', }}> */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NAVIGATION_CONSTANT.STUDENT_ASSIGNMENT_DETAILS, {
            item: item,
          })
        }
        style={[
          styles.scoreView,
          {
            backgroundColor: scoreColor(item.score),
          },
        ]}
      >
        <Text style={[styles.textStyle]}>
          {item.score == null ? 0 : item.score}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeader title={CONSTANT.COMPLETEDASSIGNMENT} />

      <View style={styles.flatlistMain}>
        <View style={styles.flatlistHeading}>
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
                <Text style={localStyles.noDataFound}>{CONSTANT.NO_DATA}</Text>
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

export default StudentCompletedAssignment;

const localStyles = StyleSheet.create({
  flatlistRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
    // paddingHorizontal:'4%'
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
  },
  column2Data: {
    width: "33%",
  },
  column3View: {
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
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
  },
});
