import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Text, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getAPIRequest } from "../../../../app/apiController";
import BackHeader from "../../../../component/BackHeader";
import styles from "../../../ParentMenu/ParentReports/AssessmentReport/styles";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import endurl from "../../../../app/endurl";
import Loader from "../../../../component/Loader";
import DatePickers from "../../../../component/DatePickers";
import CustomButton from "../../../../component/customButton";
import Share from "react-native-share";
import { captureScreen } from "react-native-view-shot";
import RNFS from "react-native-fs";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Images from "../../../../assests/images";

interface dataItem {
  id: number;
  firstName: string;
  lastName: string;
}

interface completedDataItem extends dataItem {
  score: number;
}

const TeacherAssignmentReportAssignments = ({ route }: any) => {
  const assigmentItem = route?.params?.assigmentItem;
  const loginData = useSelector((state: any) => state.login.data);
  const school_id = loginData?.school_id;
  const user_id = loginData?.user_id;
  // const school_id = 5396;
  // const user_id = 1976;
  const status = [CONSTANT.STUDENTS_TAB, CONSTANT.ASSIGNMENTS_TAB];
  const navigation: any = useNavigation();

  const [isLoading, setLoader] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>(CONSTANT.ASSIGNMENTS_TAB);
  const [completedData, setCompletedData] = useState<completedDataItem[]>([]);
  const [notCompletedData, setNotCompletedData] = useState<dataItem[]>([]);
  const [startDate, setStartDate] = useState<string>("Select");
  const [endDate, setEndDate] = useState<string>("Select");
  const [printData, setPrintData] = useState<any>();
  const [filePath, setFilePath] = useState("");

  console.log("assigmentItem - ",assigmentItem);



  useFocusEffect(
    React.useCallback(() => {
      setSelectedTab(CONSTANT.ASSIGNMENTS_TAB)
      completedAssignmentDetailsApi();
    }, [])
  );

  const sortAscending = (header: string) => {
    // const titleArr = [...studentData];
    // if (header === CONSTANT.FIRST_NAME) {
    //   titleArr.sort((a: any, b: any) =>
    //     a.first_name.toLowerCase() < b.first_name.toLowerCase() ? 1 : -1
    //   );

    //   setStudentData(titleArr);
    // } else if (header === CONSTANT.LAST_NAME) {
    //   titleArr.sort((a: any, b: any) =>
    //     a.last_name.toLowerCase() < b.last_name.toLowerCase() ? 1 : -1
    //   );
    //   setStudentData(titleArr);
    // }
  };

  const sortDescending = (header: string) => {
    // const titleArr = [...studentData];
    // if (header === CONSTANT.FIRST_NAME) {
    //   titleArr.sort((a: any, b: any) =>
    //     a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1
    //   );

    //   setStudentData(titleArr);
    // } else if (header === CONSTANT.LAST_NAME) {
    //   titleArr.sort((a: any, b: any) =>
    //     a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1
    //   );
    //   setStudentData(titleArr);
    // }
  };

  const completedAssignmentDetailsApi = async () => {
    setLoader(true);
    const url =
      endurl.TEACHER_COMPLETED_ASSIGNMENT_STUDENT_LIST +
      assigmentItem.id +
      `/list/?&offset=0&search=&limit=10`;

    let headers = {
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      Accept: "*/*",
    };

    getAPIRequest(url, headers)
      .then((res: any) => {
        const responseData = res?.data?.response?.results;

        const tempCompletedData = responseData.filter(
          (item: any) => status.indexOf(item.state) != -1
        );
        const tempNotCompletedData = responseData.filter(
          (item: any) => status.indexOf(item.state) == -1
        );

        setCompletedData(tempCompletedData);
        setNotCompletedData(tempNotCompletedData);

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const renderItemCompleted = ({ item }: any) => (
    <View style={localStyles.flatlistRowView}>
      <View style={localStyles.column1Data}>
        <Text style={[localStyles.textStyle]}>{item.first_name}</Text>
      </View>

      <View style={localStyles.column2Data}>
        <Text style={localStyles.textStyle}>{item.last_name}</Text>
      </View>

      <View
        style={[
          localStyles.scoreView,
          {
            backgroundColor:
              item.score <= 35
                ? COLORS.bgOrange
                : item.score >= 36 && item.score <= 60
                ? COLORS.bgYellow
                : item.score >= 61 && item.score <= 80
                ? COLORS.bgBlue
                : item.score >= 81 && item.score <= 100
                ? COLORS.bgGreen
                : COLORS.Black,
          },
        ]}
      >
        <Text style={[localStyles.textStyle]}>
          {item.score == null ? 0 : item.score}
        </Text>
      </View>
    </View>
  );

  const renderItemNotCompleted = ({ item }: any) => (
    <View style={localStyles.flatlistRowViewStudents}>
      <View style={localStyles.column1DataStudents}>
        <Text style={[localStyles.textStyle]}>{item.first_name}</Text>
      </View>

      <View style={localStyles.column2DataStudents}>
        <Text style={localStyles.textStyle}>{item.last_name}</Text>
      </View>
    </View>
  );

  const renderTab = (tabName: string) => {
    if (tabName === CONSTANT.ASSIGNMENTS_TAB) {

        return (
            <View style={localStyles.flatlistMain}>
              <FlatList
                data={notCompletedData}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItemNotCompleted}
                ListHeaderComponent={
                  <View style={localStyles.flatlistHeading}>
                    {/*  Heading Column # 1 */}
                    <View style={localStyles.column1ViewAssignments}>
                      <Text style={localStyles.tableHeadingTxt}>
                        {CONSTANT.ASSIGNMENT_NAME}
                      </Text>
                      <View style={localStyles.column1Icon}>
                        <Images.AngleUp height={10} width={10} />
                        <Images.AngleDown height={10} width={10} />
                      </View>
                    </View>

                    {/*  Heading Column # 2 */}
                    <View style={localStyles.column2ViewAssignments}>
                      <Text
                        style={[
                          localStyles.tableHeadingTxt,
                          { paddingRight: "8%", paddingLeft: "2%" },
                        ]}
                      >
                        {CONSTANT.TOTAL_ASSIGNMENT}
                      </Text>
                      <View style={localStyles.column2Icon}>
                        <Images.AngleUp height={10} width={10} />
                        <Images.AngleDown height={10} width={10} />
                      </View>
                    </View>

                    <View style={localStyles.column3ViewAssignments}>
                      <Text style={localStyles.tableHeadingTxt}>
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
                }
                ListEmptyComponent={
                  isLoading ? (
                    <Loader />
                  ) : (
                    <Text style={localStyles.noDataFound}>{CONSTANT.NO_DATA}</Text>
                  )
                }
                scrollEnabled={true}
              />
            </View>
          );
    } else if (tabName === CONSTANT.STUDENTS_TAB) {
        return (
            <View style={localStyles.flatlistMain}>
              <FlatList
                data={completedData}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItemCompleted}
                // horizontal={true}
                ListHeaderComponent={
                  <View style={localStyles.flatlistHeading}>
                  {/*  Heading Column # 1 */}
                  <View style={localStyles.column1View}>
                      <Text style={localStyles.tableHeadingTxt}>
                          {CONSTANT.FIRST_NAME}
                      </Text>
                      <View style={localStyles.column1Icon}>
                          <TouchableOpacity onPress={() => sortAscending(CONSTANT.FIRST_NAME)}>
                              <Images.AngleUp height={10} width={10} />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => sortDescending(CONSTANT.FIRST_NAME)}>
                              <Images.AngleDown height={10} width={10} />
                          </TouchableOpacity>
                      </View>
                  </View>

                  {/*  Heading Column # 2 */}
                  <View style={localStyles.column2View}>
                    <Text style={[localStyles.tableHeadingTxt]}>
                      {CONSTANT.LAST_NAME}
                    </Text>
                    <View style={localStyles.column3Icon}>
                      <Images.AngleUp height={10} width={10} />
                      <Images.AngleDown height={10} width={10} />
                    </View>
                  </View>

                  {/*  Heading Column # 3 */}
                  <View style={localStyles.column3View}>
                    <Text style={localStyles.tableHeadingTxt}>
                      {CONSTANT.TOTAL_ASSIGNMENT}
                    </Text>
                  </View>

                  <View style={localStyles.scoreViewStudents}>
                    <Text style={localStyles.tableHeadingTxt}>
                      {CONSTANT.SCORE}{CONSTANT.PERCENT}
                    </Text>
                  </View>

                </View>
                }
                ListEmptyComponent={
                  isLoading ? (
                    <Loader />
                  ) : (
                    <Text style={localStyles.noDataFound}>{CONSTANT.NO_DATA}</Text>
                  )
                }
                scrollEnabled={true}
              />
            </View>
          );
    }
  };

  const takeSnapShot = () => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    }).then(
      (uri) => {
        RNFS.readFile(uri, "base64").then((res) => {
          let urlString = "data:image/jpeg;base64," + res;
          let options = {
            title: "Share Title",
            message: "Share Message",
            url: urlString,
            type: "image/jpeg",
          };
          Share.open(options)
            .then((res) => {
              Alert.alert("Report successfully printed");
            })
            .catch((err) => {
              err && console.log(err);
            });
        });
      },
      (error) => console.error("Oops, snapshot failed", error)
    );
  };

  const isPermitted = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External Storage Write Permission",
            message: "App needs access to Storage data",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err:any) {
        Alert.alert("Write permission err", err);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    if (await isPermitted()) {
      let options = {
        //Content to print
        html: `<h1 style="text-align: center;"><strong>Assignment Report</strong></h1><p style="text-align: center;">${student_name}</p><div style="display: flex; justify-content: center;"><p><strong>Date From:- ${startDate}</strong></p><p style="padding-left: 10px;"><strong>Date To:- ${endDate}</strong></p></div>
        <div style="justify-content: center;display: flex;text-align:center;">
        <table style="border-collapse: separate;border: 0.8px solid black;border-spacing: 5px 5px;">

        <tr style="background-color: #CCCCCC;margin-top: 10px;margin-left:10px;margin-right:10px;"><th style="padding:5px;">Assignment Name </th><th style="padding:5px;">Score</th></tr><tr style="text-align: center;margin:5px;"><td>${name}</td><td style="background-color: #FCD4C6">${score}</td</tr></table></div>`,
        //File Name
        fileName: "report",
        //File directory
        directory: "docs",
      };
      let file = await RNHTMLtoPDF.convert(options);
      setFilePath(file.filePath);
      Alert.alert(file.filePath);
    }
  };

  return (
    <SafeAreaView style={[styles.mainView, { flex: 1 }]}>
      <BackHeader title={CONSTANT.ASSIGNMENTREPORT} />

      <DatePickers startDate={startDate} setStartDate={setStartDate}
                endDate={endDate} setEndDate={setEndDate}/>

    <View style={[localStyles.completedTab,{ marginTop: '3%'}]}>
        <Text>{assigmentItem.assignment_type == 'my group' ? "Group : " : "Class : "}{assigmentItem.assign_external_name}</Text>
    </View>

      <View style={{ flexDirection: "row", marginTop: "6%" }}>
        <TouchableOpacity
          onPress={() => setSelectedTab(CONSTANT.ASSIGNMENTS_TAB)}
          style={[
            localStyles.tabStyle,
            localStyles.completedTab,
            {
              backgroundColor:
                selectedTab == CONSTANT.ASSIGNMENTS_TAB
                  ? COLORS.green
                  : COLORS.LIGHT_GREY,
            },
          ]}
        >
          <Text
            style={[
              localStyles.textStyle,
              {
                color:
                  selectedTab === CONSTANT.ASSIGNMENTS_TAB
                    ? COLORS.white
                    : COLORS.blackCode,
              },
            ]}
          >
            {CONSTANT.ASSIGNMENTS_TAB}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(CONSTANT.STUDENTS_TAB)}
          style={[
            localStyles.tabStyle,
            {
              backgroundColor:
                selectedTab === CONSTANT.STUDENTS_TAB
                  ? COLORS.green
                  : COLORS.LIGHT_GREY,
            },
          ]}
        >
          <Text
            style={[
              localStyles.textStyle,
              {
                color:
                  selectedTab === CONSTANT.NOT_COMPLETED_STATUS
                    ? COLORS.white
                    : COLORS.blackCode,
              },
            ]}
          >
            {CONSTANT.STUDENTS_TAB}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <ScrollView
        // contentContainerStyle={localStyles.contentContainer}
        horizontal={true}
      > */}
      {renderTab(selectedTab)}
      {/* </ScrollView> */}

      <View style={styles.buttonView}>
        <Button
          style={[
            localStyles.buttonStyle,
            { backgroundColor: COLORS.white, borderColor: COLORS.ThemeGreen },
          ]}
          textColor={COLORS.blackCode}
          mode="outlined"
          onPress={() => takeSnapShot()}
        //   disabled={list.length === 0 ? true : false}
        >
          {CONSTANT.PRINT}
        </Button>

        <CustomButton
          title={CONSTANT.DOWNLOAD}
          onPressButton={() => createPDF()}
          //disable={list.length == 0}
        />
      </View>
    </SafeAreaView>
  );
};

export default TeacherAssignmentReportAssignments;

const localStyles = StyleSheet.create({
  flatlistHeading: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    backgroundColor: COLORS.lightGrey,
    padding: "4%",
    height: 70,
  },
  flatlistMain: {
    flex: 1,
    marginHorizontal: "4%",
    // marginTop:'8%',
    padding: "3%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    alignItems: "center",
  },
  flatlistRowViewStudents: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    height: 60,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  tableHeadingTxt: {
    fontSize: 14,
    fontWeight: "400",
  },
  column1ViewAssignments: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal:5,
  },
  column1DataStudents: {
    width: "50%",
    paddingLeft: "4%",
  },
  column2ViewAssignments: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal:5,
  },
  column2DataStudents: {
    width: "50%",
    paddingLeft: "2%",
  },
  column3ViewAssignments: {
    width: "30%",
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: "3%",
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 17,
    paddingRight: "2%",
    color: COLORS.blackCode,
    flexWrap: "wrap",
  },
  tabStyle: {
    height: 57,
    width: 160,
    borderWidth: 1,
    borderColor: COLORS.border_color,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  completedTab: {
    marginLeft: "4%",
  },
  buttonStyle: {
    backgroundColor: COLORS.ThemeGreen,
    borderRadius: 4,
    height: 40,
  },
  flatlistRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    borderBottomColor: COLORS.listSeparatorColor,
  },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
  },
  column1View: {
    width: "25%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column1Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingLeft: "40%",
  },
  column1Data: {
    width: "34%",
    paddingHorizontal: "4%",
  },
  column2View: {
    width: "25%",
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
    paddingLeft: "2%",
  },
  column3View: {
    width: "35%",
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
  scoreView: {
    width:'33%' ,
    height:60 ,
    alignItems:'center',
    justifyContent:'center',
  },
  scoreViewStudents: {
    width:'15%' ,
    height:60 ,
    alignItems:'center',
    justifyContent:'center',
  },
  contentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
});
