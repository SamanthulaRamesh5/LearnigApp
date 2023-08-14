import React, { useState , useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeaderForParent from "../../../../component/BackHeaderForParent";
import Images from "../../../../assests/images";
import styles from "./styles";
import CONSTANT from "../../../../locales/constants";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Text, Button } from "react-native-paper";
import moment from "moment";
import COLORS from "../../../../assests/color";
import CustomButton from "../../../../component/customButton";
import Loader from "../../../../component/Loader";
import { useSelector } from "react-redux";
import endurl from "../../../../app/endurl";
import { getAPIRequest } from "../../../../app/apiController";
interface dataItem {
  id: number;
  name: string;
  score: number;
  bgColor: string;
}

const AssessMentReport = () => {
  const selectedStudent = useSelector((state: any) => state.dropdown.data);
  const studentName: string = selectedStudent?.label;
  const studentId = selectedStudent.value;

  const [isDatePickerVisibleSt, setDatePickerVisibilitySt] =
    useState<boolean>(false);
  const [isDatePickerVisibleEd, setDatePickerVisibilityEd] =
    useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('Select');
  const [endDate, setEndDate] = useState<string>('Select');
  const [data, setData] = useState<dataItem[]>([]);
  const [isLoading, setLoader] = useState(false);
  const [isError, setIsError] = useState("");

  const headers = {
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Accept: "*/*",
  };
  
  useEffect(() => {
    reportListApi();
  }, []);

  useEffect(() => {
    reportListApi();
  },[selectedStudent, startDate, endDate])

  const reportListApi = async () => {
    setLoader(true);
    const url =
      startDate != "Select" && endDate != "Select"
        ? endurl.PARENT_REPORT_ASSESSMENT_LIST +
          `?start_date=${startDate}&submission_date=${endDate}&student_id=${studentId}`
        : endurl.PARENT_REPORT_ASSESSMENT_LIST + `?student_id=${studentId}`;

    getAPIRequest(url, headers)
      .then((res: any) => {
        setLoader(false);

        const responseData = res?.data?.response?.results;

        const finalData = responseData?.map((item: any) => {
          if (item.percentage == null) {
            item.percentage = 0;
          }
          return {
            id: item.id,
            name: item.assessment_name,
            score: item.percentage,
            bgColor:
              item.percentage <= 35
                ? COLORS.bgOrange
                : item.percentage >= 36 && item.percentage <= 60
                ? COLORS.bgYellow
                : item.percentage >= 61 && item.percentage <= 80
                ? COLORS.bgBlue
                : item.percentage >= 81 && item.percentage <= 100
                ? COLORS.bgGreen
                : COLORS.white,
          };
        });
        setData(finalData);
      })
      .catch((error) => {
        setLoader(true);
        // handleError(error);
      });
  };

  const showDatePickerEnd = () => {
    setDatePickerVisibilityEd(true);
  };

  const hideDatePickerEnd = () => {
    setDatePickerVisibilityEd(false);
  };

  const handleConfirmEnd = (date: string) => {
    let req_endDate = moment(date).format("YYYY-MM-DD");
    setEndDate(req_endDate);
    if (startDate !== "Select")
      moment(startDate).isAfter(req_endDate)
        ? setIsError(CONSTANT.DATE_ERROR)
        : setIsError("");
    hideDatePickerEnd();
  };

  const showDatePickerStart = () => {
    setDatePickerVisibilitySt(true);
  };

  const hideDatePickerStart = () => {
    setDatePickerVisibilitySt(false);
  };

  const handleConfirmStart = (date: string) => {
    let req_format = moment(date).format("YYYY-MM-DD");
    setStartDate(req_format);
    if (endDate !== "Select")
      moment(req_format).isAfter(endDate)
        ? setIsError(CONSTANT.DATE_ERROR)
        : setIsError("");
    hideDatePickerStart();
  };

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem: React.FC<{item: dataItem}> = ({item}) => (
    <View style={localStyles.flatlisrRowView}>
      <View style={localStyles.column1Data}>
        <Text style={[styles.itemText]}>{item.name}</Text>
      </View>

      <View style={[localStyles.scoreView, { backgroundColor: item.bgColor }]}>
        <Text style={localStyles.scoreTxt}>{item.score}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeaderForParent title={CONSTANT.REPORT_ASSESMENT} dropdown={true} />

      { studentName ? (
        <>
          {/* Start Dt and End Dt View */}
          <View style={localStyles.dateView}>
            {/* View to display Start Date and picker */}
            <View style={localStyles.dtView1}>
              <Text style={localStyles.dtTitle}>{CONSTANT.STARTDATE}</Text>
              <View style={styles.dateView}>
                <Text style={localStyles.dtTxt}>{startDate}</Text>
                {/* Date Picker for Start Date */}
                <DateTimePicker
                  isVisible={isDatePickerVisibleSt}
                  mode="date"
                  onConfirm={handleConfirmStart}
                  onCancel={hideDatePickerStart}
                  maximumDate={new Date()}
                />
                <TouchableOpacity
                  onPress={() => setDatePickerVisibilitySt(!isDatePickerVisibleSt)}
                >
                  <Images.Calender height={15} width={15} style={styles.calender} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ width: "2%" }} />

            {/* View to display End Date and Picker */}
            <View style={localStyles.dtView1}>
              <Text style={localStyles.dtTitle}>{CONSTANT.ENDDATE}</Text>
              <View style={styles.dateView}>
                <Text style={localStyles.dtTxt}>{endDate}</Text>
                {/* Date Picker for End Date */}
                <DateTimePicker
                  isVisible={isDatePickerVisibleEd}
                  mode="date"
                  onConfirm={handleConfirmEnd}
                  onCancel={hideDatePickerEnd}
                  maximumDate={new Date()}
                  minimumDate={new Date(startDate)}
                />
                <TouchableOpacity
                  onPress={() => setDatePickerVisibilityEd(!isDatePickerVisibleEd)}
                >
                  <Images.Calender height={15} width={15} style={styles.calender} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {isError ? (
              <View style={localStyles.errorView}>
                <Text style={localStyles.errorText}>{isError}</Text>
              </View>
            ) : null}

          {/* Display Student Name */}
          <View style={localStyles.studentNameView}>
            <Text style={localStyles.studentName}>{studentName}</Text>
          </View>

          {/* Display Header of the table */}
          <View style={localStyles.flatlistMain}>
            <View style={localStyles.flatlistHeading}>
              <View style={localStyles.column1Heading}>
                <Text style={localStyles.tableHeadingTxt}>{CONSTANT.ASSESSNAME}</Text>
              </View>
              <View style={localStyles.column2Heading}>
                <Text style={localStyles.tableHeadingTxt}>{CONSTANT.SCORE} {CONSTANT.PERCENT}</Text>
              </View>
            </View>

            {
              selectedStudent.length > 0 ? (
                isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {data?.length <= 0 ? (
                      <View style={localStyles.noDataFoundView}>
                        <Text style={localStyles.noDataFound}>{CONSTANT.NO_DATA}</Text>
                      </View>
                    ) : (
                      <FlatList
                        data={data}
                        keyExtractor={(item: any) => item.id}
                        renderItem={renderItem}
                        // ItemSeparatorComponent={ItemDivider}
                      />
                    )}
                  </>
                )
              ) : (
                <View style={localStyles.noChildView}>
                  <Text style={localStyles.noDataFound}>{CONSTANT.PLEASE_SELECT_CHILD}</Text>
                </View>
              )
            }
          </View>

          <View style={styles.buttonView}>
            <Button
              style={[
                localStyles.buttonStyle,
                { backgroundColor: COLORS.white, borderColor: COLORS.ThemeGreen },
              ]}
              textColor={COLORS.blackCode}
              mode="outlined"
              onPress={() => Alert.alert("Printing....")}
              disabled={data.length > 0 ? false : true }
            >
              {CONSTANT.PRINT}
            </Button>

            <CustomButton
              title={CONSTANT.DOWNLOAD}
              onPressButton={() => Alert.alert("Downloading....")}
              disable={data.length > 0 ? false : true }
            />
          </View> 
        </>
      ) : (
        <View style={localStyles.noChildView}>
          <Text style={localStyles.noDataFound}>{CONSTANT.PLEASE_SELECT_CHILD}</Text>
        </View>
      )
    }
    </SafeAreaView>
  );
};

export default AssessMentReport;

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
    fontWeight: '400',
    color: COLORS.colorBlack,
    textTransform:'capitalize'
  },
  flatlistMain: {
    height: "40%",
    marginHorizontal: "4%",
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
  noChildView: {
    flex:1, 
    alignItems:'center', 
    marginTop:'30%'
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
  errorView:{
    paddingHorizontal: 10,
  },
  errorText: {
    fontWeight: "400",
    fontSize: 12,
    padding: 10,
    lineHeight: 19,
    color:COLORS.red
  },
});
