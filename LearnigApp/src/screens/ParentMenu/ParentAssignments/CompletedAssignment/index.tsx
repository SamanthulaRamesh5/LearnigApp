import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeaderForParent from "../../../../component/BackHeaderForParent";
import Images from "../../../../assests/images";
import styles from "./styles";
import COLORS from "../../../../assests/color";
import CONSTANT from "../../../../locales/constants";
import NAVIGATION_CONSTANT from "../../../../locales/constantsNavigation";
import { getAPIRequest } from "../../../../app/apiController";
import endurl from "../../../../app/endurl";
import Loader from "../../../../component/Loader";
import { useSelector } from "react-redux";

const CompletedAssignment = () => {
  const navigation: any = useNavigation();
  const [completedData, setCompletedData] = useState([]);
  const [loader, setLoader] = useState(false);
  const selectedStudent = useSelector((state: any) => state.dropdown.data);

  const data = [COLORS.bgBlue, COLORS.bgYellow, COLORS.bgGreen];

  const sortAscending = (header: string) => {
    const titleArr = [...completedData];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a?.assignment_name?.toLowerCase() < b?.assignment_name?.toLowerCase() ? 1 : -1
      );

      setCompletedData(titleArr);
    } else if (header === CONSTANT.DUEDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA < dateB ? 1 : -1;
      });

      setCompletedData(titleArr);
    } else if (header === CONSTANT.SCORE) {
      titleArr.sort((a: any, b: any) => a.score - b.score);

      setCompletedData(titleArr);
    }
  };

  const sortDescending = (header: string) => {
    const titleArr = [...completedData];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a?.assignment_name?.toLowerCase() > b?.assignment_name?.toLowerCase() ? 1 : -1
      );

      setCompletedData(titleArr);
    } else if (header === CONSTANT.SUBMITDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA > dateB ? 1 : -1;
      });

      setCompletedData(titleArr);
    } else if (header === CONSTANT.SCORE) {
      titleArr.sort((a: any, b: any) => b.score - a.score);

      setCompletedData(titleArr);
    }
  };

  useEffect(() => {
    setLoader(true);
    getAPIRequest(
      `${endurl.ASSIGNASSIGNMENT}?student_id=${selectedStudent.id}&state=${CONSTANT.SUBMITTED}`
    )
      .then((res: any) => {
        setCompletedData(res?.data?.results);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, [selectedStudent]);

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(NAVIGATION_CONSTANT.ASSIGNMENTDETAILS)}
    >
      <View style={localStyles.flatlistRowView}>
        <View style={localStyles.column1Data}>
          <Text style={[styles.textStyle]}>{item?.assignment_name}</Text>
        </View>

        <View style={localStyles.column2Data}>
          <Text style={styles.textStyle}>{item?.end_date}</Text>
        </View>

        <View style={[styles.scoreView, { backgroundColor: data[index] }]}>
          <Text style={[styles.textStyle]}>{item.score}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      
      <BackHeaderForParent
        title={CONSTANT.COMPLETEDASSIGNMENT}
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
            <Text style={[styles.tableHeadingTxt, { paddingRight: "12%" }]}>
              {CONSTANT.DUEDATE}
            </Text>
            <View style={localStyles.column2Icon}>
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

        {selectedStudent?.label ? (
          completedData.length > 0 && !loader ? (
            <FlatList
              data={completedData}
              keyExtractor={(item: any) => item.id}
              renderItem={renderItem}
              scrollEnabled={true}
              style={{flex:1}}
              contentContainerStyle={{paddingBottom:50}}
            />
          ) : loader ? (
            <Loader />
          ) : completedData.length <= 0 ? (
            <View style={localStyles.noDataFoundView}>
              <Text style={localStyles.noDataFound}>{CONSTANT.NO_DATA}</Text>
            </View>
          ) : null
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

export default CompletedAssignment;

const localStyles = StyleSheet.create({
  flatlistRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
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
  noChildView: {
    flex: 1,
    alignItems: "center",
    marginTop: "30%",
  },
});
