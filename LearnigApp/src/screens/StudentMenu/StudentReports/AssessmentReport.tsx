import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  Alert,
} from "react-native";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeader from "../../../component/BackHeader";
import Images from "../../../assests/images";
import styles from "./styles";
import CONSTANT from "../../../locales/constants";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Text, Button } from "react-native-paper";
import moment from "moment";
import COLORS from "../../../assests/color";
import CustomButton from "../../../component/customButton";
import { getAPIRequest } from "../../../app/apiController";
import Loader from "../../../component/Loader";
import endurl from "../../../app/endurl";
import { useSelector } from "react-redux";
import Share from "react-native-share";
import { captureScreen } from "react-native-view-shot";
import RNFS from "react-native-fs";
import scoreColor from "../../../app/commonFunctions";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { useFocusEffect } from "@react-navigation/native";

interface dataItem {
  id: number;
  name: string;
  score: number;
  bgColor: string;
}

const StudentAssessmentReport = () => {
  const [isDatePickerVisibleSt, setDatePickerVisibilitySt] =
    useState<boolean>(false);
  const [isDatePickerVisibleEd, setDatePickerVisibilityEd] =
    useState<boolean>(false);
  const [startDate, setStartDate] = useState("Select");
  const [endDate, setEndDate] = useState("Select");
  const loginData = useSelector((state: any) => state.login.data);
  const [isLoading, setLoader] = useState(false);
  const student_name = loginData?.first_name + " " + loginData?.last_name;
  const student_id = loginData?.user_profile_id;
  const [filePath, setFilePath] = useState("");
  const [name, setName] = useState([]);
  const [score, setScore] = useState([]);

  const [list, setList] = useState<dataItem[]>([]);

  const headers = {
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Accept: "*/*",
  };

  const showDatePickerEnd = () => {
    setDatePickerVisibilityEd(true);
  };

  const hideDatePickerEnd = () => {
    setDatePickerVisibilityEd(false);
  };

  useEffect(() => {
    if (startDate != "Select" && endDate != "Select") {
      if (endDate < startDate) {
        Alert.alert("End date can not be smaller than start date");
      }
      reportListApi();
    }
  }, [startDate, endDate]);

  useFocusEffect(
    React.useCallback(() => {
      reportListApi();
    }, [])
  );

  const handleConfirmEnd = (date: string) => {
    setEndDate(moment(date).format("YYYY-MM-DD"));

    hideDatePickerEnd();
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

  const showDatePickerStart = () => {
    setDatePickerVisibilitySt(true);
  };

  const hideDatePickerStart = () => {
    setDatePickerVisibilitySt(false);
  };

  const handleConfirmStart = (date: string) => {
    setStartDate(moment(date).format("YYYY-MM-DD"));

    hideDatePickerStart();
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
      } catch (err) {
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
       
        <tr style="background-color: #CCCCCC;margin-top: 10px;margin-left:10px;margin-right:10px;"><th style="padding:5px;">Assignment Name </th><th style="padding:5px;">Score</th></tr> ${list
          .map(
            (line) => `
          <tr>
            <td>${line.title}</td>
            <td style="background-color: #FCD4C6;padding-left: 10px;">${line.score}</td>
          </tr>
        `
          )
          .join("")}</table></div>`,
        //File Name
        fileName: "assessment_report_student",
        //File directory
        directory: "docs",
      };
      let file = await RNHTMLtoPDF.convert(options);
      Alert.alert(file.filePath);
      setFilePath(file.filePath);
      console.log(filePath);
    }
  };

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const reportListApi = async () => {
    setLoader(true);
    const url =
      startDate != "Select" && endDate != "Select"
        ? endurl.STUDENT_REPORT_ASSESSMENT_LIST +
          `?start_date=${startDate}&submission_date=${endDate}&student_id=${student_id}`
        : endurl.STUDENT_REPORT_ASSESSMENT_LIST + `?student_id=${student_id}`;

    getAPIRequest(url, headers)
      .then((res: any) => {
        setLoader(false);

        const responseData = res?.data?.response?.results;

        const finalData = responseData?.map((item: any) => {
          if (item.percentage == null) {
            item.percentage = "";
          }
          setName(item.assignment_name);
          setScore(item.score);
          return {
            id: item.id,
            title: item.assessment_name,
            score: item.percentage,
            bgColor: scoreColor(item.score),
          };
        });
        setList(finalData);
      })
      .catch((error) => {
        setLoader(true);
        // handleError(error);
      });
  };

  const renderItem = ({ item }: any) => (
    <View style={localStyles.flatlisrRowView}>
      <View style={localStyles.column1Data}>
        <Text style={[styles.itemText]}>{item.title}</Text>
      </View>

      <View
        style={[
          localStyles.scoreView,
          {
            backgroundColor: item.bgColor,
          },
        ]}
      >
        <Text style={localStyles.scoreTxt}>{item.score}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeader title={CONSTANT.REPORT_ASSESMENT} />

      {/* Start Dt and End Dt View */}
      <View style={localStyles.dateView}>
        {/* View to display Start Date and picker */}
        <View style={localStyles.dtView1}>
          <Text style={localStyles.dtTitle}>{CONSTANT.DATEFROM}</Text>
          <View style={styles.dateView}>
            <Text style={localStyles.dtTxt}>
              {startDate !== "Select"
                ? moment(startDate, "YYYY-MM-DD").format("DD-MM-YYYY")
                : startDate}
            </Text>
            {/* Date Picker for Start Date */}
            <DateTimePicker
              isVisible={isDatePickerVisibleSt}
              mode="date"
              onConfirm={handleConfirmStart}
              onCancel={hideDatePickerStart}
            />
            <TouchableOpacity
              onPress={() => setDatePickerVisibilitySt(!isDatePickerVisibleSt)}
            >
              <Images.DatePicker
                height={15}
                width={15}
                style={styles.calender}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: "2%" }} />

        {/* View to display End Date and Picker */}
        <View style={localStyles.dtView1}>
          <Text style={localStyles.dtTitle}>{CONSTANT.DATETO}</Text>
          <View style={styles.dateView}>
            <Text style={localStyles.dtTxt}>
              {endDate !== "Select"
                ? moment(endDate, "YYYY-MM-DD").format("DD-MM-YYYY")
                : endDate}
            </Text>
            {/* Date Picker for End Date */}
            <DateTimePicker
              isVisible={isDatePickerVisibleEd}
              mode="date"
              onConfirm={handleConfirmEnd}
              onCancel={hideDatePickerEnd}
            />
            <TouchableOpacity
              onPress={() => setDatePickerVisibilityEd(!isDatePickerVisibleEd)}
              disabled={startDate == "Select"}
            >
              <Images.DatePicker
                height={15}
                width={15}
                style={styles.calender}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Display Student Name */}
      <View style={localStyles.studentNameView}>
        <Text style={localStyles.studentName}>
          {student_name && student_name}
        </Text>
      </View>

      {/* Display Header of the table */}
      <View style={localStyles.flatlistMain}>
        <View style={localStyles.flatlistHeading}>
          <View style={localStyles.column1Heading}>
            <Text style={localStyles.tableHeadingTxt}>
              {CONSTANT.ASSESSNAME}
            </Text>
          </View>
          <View style={localStyles.column2Heading}>
            <Text style={localStyles.tableHeadingTxt}>
              {CONSTANT.SCORE} {CONSTANT.PERCENT}
            </Text>
          </View>
        </View>

        {/*  Render the content in a table format */}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {list?.length <= 0 ? (
              <View style={localStyles.noDataFoundView}>
                <Text style={localStyles.noDataFound}>{CONSTANT.NO_DATA}</Text>
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

      <View style={styles.buttonView}>
        <Button
          style={[
            localStyles.buttonStyle,
            { backgroundColor: COLORS.white, borderColor: COLORS.ThemeGreen },
          ]}
          textColor={COLORS.blackCode}
          mode="outlined"
          onPress={() => takeSnapShot()}
          disabled={list.length == 0 ? true : false}
        >
          {CONSTANT.PRINT}
        </Button>

        <CustomButton
          title={CONSTANT.DOWNLOAD}
          onPressButton={() => createPDF()}
          disable={list.length == 0 ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

export default StudentAssessmentReport;

const localStyles = StyleSheet.create({
  dateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "4%",
    marginTop: "8%",
  },
  dtView1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dtTitle: {
    fontSize: 12,
    color: COLORS.colorBlack,
  },
  dtTxt: {
    fontSize: 14,
    color: COLORS.colorBlack,
  },
  studentName: {
    fontSize: 15,
    color: COLORS.colorBlack,
  },
  flatlistMain: {
    height: "40%",
    margin: "4%",
    padding: "3%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    alignItems: "center",
  },
  flatlistHeading: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    padding: "4%",
    height: 65,
  },
  tableHeadingTxt: {
    fontSize: 14,
    fontWeight: "400",
  },
  flatlisrRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  scoreView: {
    width: "35%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreTxt: {
    fontSize: 14,
    lineHeight: 17,
    color: COLORS.blackCode,
  },
  buttonStyle: {
    backgroundColor: COLORS.ThemeGreen,
    borderRadius: 4,
    height: 40,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: 16,
  },
  printButtonText: {
    color: COLORS.blackCode,
    fontWeight: "500",
    fontSize: 16,
  },
  studentNameView: {
    margin: "4%",
  },
  column1Heading: {
    width: "65%",
  },
  column1Data: {
    width: "65%",
  },
  column2Heading: {
    width: "35%",
    alignItems: "center",
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
});
