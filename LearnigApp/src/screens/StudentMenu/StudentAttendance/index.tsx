import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "react-native-paper";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeader from "../../../component/BackHeader";
import Images from "../../../assests/images";
import CONSTANT from "../../../locales/constants";
import COLORS from "../../../assests/color";
import CustomButton from "../../../component/customButton";
import { Dropdown } from "react-native-element-dropdown";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useSelector } from "react-redux";
import endurl from "../../../app/endurl";
import { getAPIRequest } from "../../../app/apiController";
import Loader from "../../../component/Loader";
import styles from "./styles";

const StudentAttendance = () => {
  const loginData = useSelector((state: any) => state.login.data);
  const [isLoading, setLoader] = useState(true);
  const [finalData, setFinalData] = useState<any>([]);
  const [disableLeftArrow, setDisableLeftArrow] = useState(false);
  const [disableRightArrow, setDisableRightArrow] = useState(false);
  //const school_id = 3;
  const school_id = loginData?.school_id;
  const token = loginData?.AccessToken;
  const headers = {
    Authorization: "Bearer " + token,
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Accept: "*/*",
  };

  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectData, setSubjectData] = useState([
    { label: "No Data Found", value: -1 },
  ]);
  const [startDate, setDate] = useState("Select");
  const [endDate, setEndDate] = useState("Select");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isDatePickerVisibleForEnd, setIsDatePickerVisibleForEnd] =
    useState(false);
  const [calendderVisible, setCalenderVisible] = useState(false);
  const [nextDate, setNextDate] = useState("");
  const [isError, setIsError] = useState("");
  const [markedDates, setMarkedDates] = useState({});
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [restrictedStartDate, setRestrictedStartDate] = useState("YYYY-MM-DD");
  const [restrictedEndate, setRestrictedEndDate] = useState("YYYY-MM-DD");
  // const class_name = "MasterClass1";
  const student_id = loginData?.user_profile_id;

  const hideDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };
  const hideDatePickerForEnd = () => {
    setIsDatePickerVisibleForEnd(!isDatePickerVisibleForEnd);
  };

  const handleConfirmForStart = (date: any) => {
    let req_format = moment(date).format("YYYY-MM-DD");
    setDate(req_format);
    if (endDate !== "Select")
      moment(req_format).isAfter(endDate)
        ? setIsError(CONSTANT.DATE_ERROR)
        : setIsError("");
    setCalenderVisible(false);

    hideDatePicker();
  };

  const handleConfirmForEnd = (date: any) => {
    let req_endDate = moment(date).format("YYYY-MM-DD");
    setEndDate(req_endDate);
    if (startDate !== "Select")
      moment(startDate).isAfter(req_endDate)
        ? setIsError(CONSTANT.DATE_ERROR)
        : setIsError("");
    setCalenderVisible(false);
    hideDatePickerForEnd();
  };

  useFocusEffect(
    React.useCallback(() => {
      setSelectedSubject("");
      setDate("Select");
      setEndDate("Select");
      setCalenderVisible(false);
      dateRestrictedApi();
      subjectListApi();
      setLoader(false);
      setIsError("");
    }, [])
  );

  const subjectListApi = async () => {
    await getAPIRequest(
      endurl.STUDENT_SUBJECTLIST +
        `?ordering=-created_at&limit=100&offset=0&selection=Subject`,
      headers
    )
      .then((res: any) => {
        setLoader(false);
        const responseData = res.data.response.results;

        const finalData = responseData.map((item: any) => {
          return { label: item.content, value: item.id };
        });

        setSubjectData(finalData);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const dateRestrictedApi = async () => {
    await getAPIRequest(
      endurl.SCHOOL_SERVICE_ATTENDENCE + school_id + "/",
      headers
    )
      .then((res: any) => {
        setLoader(false);
        const responseStartDate = res.data?.activation_start_date;
        setRestrictedStartDate(res.data?.activation_start_date);
        setRestrictedEndDate(res.data?.activation_end_date);
        console.log("Data:-", responseStartDate);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const handleError = (error: any) => {
    const val: any = Object.values(error);
    if (val.length === 0) {
      setIsError(CONSTANT.ExceptionMSG);
    } else if (val !== "") {
      setIsError(val[0]);
    } else {
      setIsError(CONSTANT.ERRMSG);
    }
  };

  const getAttendanceData = (monthDate: string) => {
    setIsError("");

    let firstDay = moment(monthDate).startOf("month").format("YYYY-MM-DD");
    let lastDay = moment(monthDate).endOf("month").format("YYYY-MM-DD");

    moment(startDate).isSameOrAfter(firstDay) ? (firstDay = startDate) : null;

    let limit = moment(lastDay).diff(firstDay, "days") + 1;

    const url =
      endurl.STUDENT_ATTENDANCE +
      `?school_id=${school_id}&class_name=${loginData?.class_name}&start_date=${firstDay}&end_date=${lastDay}&subject=${subjectName}&child_limit=${limit}&child_offset=0&single_students_id=${student_id}`;

    console.log(url);

    getAPIRequest(url, headers)
      .then((res: any) => {
        setLoader(false);
        const responseData = res.data.response.results;
        //console.log("main:-", responseData?.attendence_recors?.results);

        if (responseData.length > 0) {
          const record =
            responseData[0].attendence_recors?.results?.[subjectName];

          // let filterData = responseData.filter(
          //   (item: any) => item.id === student_id
          // );
          // let recordFound = filterData[0];

          {
            /* Construct the array for marking Dates in Calendar as per data received from API */
          }
          let markedDay: any = {};
          console.log(record);

          record?.records?.map((item: any) => {
            markedDay[item.present_on_date] = {
              marked: (
                moment(item.present_on_date).isAfter(endDate) ? false : true
              )
                ? moment(item.present_on_date).isBefore(startDate)
                  ? false
                  : true
                : false,
              dotColor:
                item.present === true
                  ? COLORS.green
                  : item.present === false
                  ? COLORS.Pink
                  : item.is_holiday === true
                  ? COLORS.yellow
                  : item.is_weekend === true
                  ? COLORS.yellow
                  : COLORS.bgGrey,
            };
          });
          console.log("MarkDay", markedDay);

          setMarkedDates(markedDay);

          if (!calendderVisible) {
            setCalenderVisible(true);
            setCalendarLoading(false);
          }
        } else {
          setIsError("No Data Found");
          setLoader(false);
        }
      })
      .catch((error) => {
        setLoader(false);
        handleError(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.mainView}>
        <BackHeader title={CONSTANT.ATTENDANCE} />
        <View style={styles.marginView}>
          <Text style={styles.subjectText}> {CONSTANT.SELECTSUBJECT}</Text>

          {isLoading ? (
            <Loader />
          ) : (
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconColor={COLORS.Black}
              data={subjectData}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder="Select"
              value={selectedSubject}
              onChange={(item: any) => {
                setSelectedSubject(item);
                setSubjectName(item.label);
              }}
            />
          )}
          <View style={styles.calenderPartition}>
            <View style={styles.calederView}>
              <Text style={styles.dateText}>{CONSTANT.STARTDATE}</Text>

              <View style={styles.startDateView}>
                <Text style={styles.startDateText}>
                  {startDate !== "Select"
                    ? moment(startDate, "YYYY-MM-DD").format("DD-MM-YYYY")
                    : startDate}
                </Text>

                <TouchableOpacity
                  onPress={() => setIsDatePickerVisible(!isDatePickerVisible)}
                >
                  <Images.Calender
                    height={14}
                    width={14}
                    style={styles.calender}
                  />
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmForStart}
                onCancel={hideDatePicker}
                minimumDate={new Date(restrictedStartDate)}
              />
            </View>
            <View style={styles.calederView}>
              <Text style={styles.dateText}>{CONSTANT.ENDDATE}</Text>
              <View style={styles.startDateView}>
                <Text style={styles.startDateText}>
                  {endDate !== "Select"
                    ? moment(endDate, "YYYY-MM-DD").format("DD-MM-YYYY")
                    : endDate}
                </Text>

                <DateTimePickerModal
                  isVisible={isDatePickerVisibleForEnd}
                  mode="date"
                  onConfirm={handleConfirmForEnd}
                  onCancel={hideDatePickerForEnd}
                  maximumDate={new Date()}
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsDatePickerVisibleForEnd(!isDatePickerVisibleForEnd)
                  }
                  disabled={startDate == "Select"}
                >
                  <Images.Calender
                    height={14}
                    width={14}
                    style={styles.calender}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.button}>
            <CustomButton
              title={CONSTANT.SEARCH}
              onPressButton={() => {
                setCalendarLoading(true), getAttendanceData(startDate);
              }}
              disable={
                !selectedSubject ||
                startDate === "Select" ||
                endDate === "Select" ||
                moment(startDate).isAfter(endDate)
              }
            />
          </View>
        </View>
        {calendarLoading ? (
          <View style={{ marginTop: 30 }}>
            <Loader />
          </View>
        ) : (
          <View style={styles.calenderiewForMargin}>
            {calendderVisible ? (
              <Calendar
                initialDate={startDate}
                minDate={startDate}
                maxDate={endDate}
                onMonthChange={(month) => {
                  // Changed month
                  let monthChange = moment(
                    month.dateString,
                    "YYYY-MM-DD"
                  ).format("YYYY-MM-DD");

                  {
                    /* Check if StartDate has been reached. If yes, disable left Arrow of Calendar*/
                  }
                  let monthStart = moment(monthChange)
                    .startOf("month")
                    .format("YYYY-MM-DD");
                  let leftDisable = moment(startDate).isSameOrAfter(monthStart);

                  {
                    /* Check if EndDate has been reached. If yes, disable right Arrow of Calendar*/
                  }
                  let monthEnd = moment(monthChange)
                    .endOf("month")
                    .format("YYYY-MM-DD");
                  let rightDisable = moment(monthEnd).isSameOrAfter(endDate);

                  {
                    /* Fetch attendance data for current selected month */
                  }
                  getAttendanceData(monthChange);
                  setDisableLeftArrow(leftDisable);
                  setDisableRightArrow(rightDisable);
                }}
                disableArrowLeft={disableLeftArrow}
                disableArrowRight={disableRightArrow}
                markedDates={markedDates}
                markingType="custom"
                displayLoadingIndicator
              />
            ) : (
              <View></View>
            )}
          </View>
        )}
        {calendderVisible ? (
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "7%",
              marginBottom: "4%",
              flexDirection: "column",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: COLORS.RED,
                  alignSelf: "center",
                }}
              ></View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "300",
                  color: COLORS.Black,
                  textAlign: "center",
                  paddingLeft: "3%",
                }}
              >
                {CONSTANT.ABSENT}
              </Text>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: COLORS.green,
                  alignSelf: "center",
                  marginLeft: "6%",
                }}
              ></View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "300",
                  color: COLORS.Black,
                  textAlign: "center",
                  paddingLeft: "3%",
                }}
              >
                {CONSTANT.PRESENT}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: "5%",
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: COLORS.yellow,
                  alignSelf: "center",
                }}
              ></View>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "300",
                  color: COLORS.Black,
                  textAlign: "center",
                  paddingLeft: "3%",
                }}
              >
                {CONSTANT.HOLIDAY}
              </Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StudentAttendance;
