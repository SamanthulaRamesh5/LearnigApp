import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeaderForParent from "../../../component/BackHeaderForParent";
import Images from "../../../assests/images";
import CONSTANT from "../../../locales/constants";
import { Dropdown } from "react-native-element-dropdown";
import COLORS from "../../../assests/color";
import CustomButton from "../../../component/customButton";
import { Calendar } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import endurl from "../../../app/endurl";
import { getAPIRequest } from "../../../app/apiController";
import { useSelector } from "react-redux";
import Loader from "../../../component/Loader";

const ParentAttendance = () => {
  const loginData = useSelector((state: any) => state.login.data);
  const token = loginData?.AccessToken;
  const selectedStudent = useSelector((state: any) => state.dropdown.data);
  const [monthSelect, setMonth] = useState(null);
  const [subjectData, setSubjectData] = useState([
    { label: "No Data Found", value: -1 },
  ]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [startDate, setStartDate] = useState("Select");
  const [endDate, setEndDate] = useState("Select");
  const [calenderDate, setCalenderDate] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isDatePickerVisibleForEnd, setIsDatePickerVisibleForEnd] =
    useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendderVisible, setCalenderVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const [isError, setIsError] = useState("");
  const [dropdownMonths, setDropdownMonths] = useState();
  const [markedDates, setMarkedDates] = useState();
  const [disableLeftArrow, setDisableLeftArrow] = useState(false);
  const [disableRightArrow, setDisableRightArrow] = useState(false);
  const [restrictedStartDate, setRestrictedStartDate] = useState("YYYY-MM-DD");
  const [restrictedEndate, setRestrictedEndDate] = useState("YYYY-MM-DD");

  const headers = {
    Authorization: `Bearer ${token}`,
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Accept: "*/*",
  };

  useEffect(() => {
    getMonths();
    callSubjectAPI();
    dateRestrictedApi();
  }, []);

  {
    /* Create list of Months till current month of the year to populate in the dropdown */
  }
  const getMonths = () => {
    let names = [];
    const todayMonth = parseInt(moment().format("M"));

    for (let i = 0; i < todayMonth; i++) {
      let monthName = moment()
        .subtract(i, "month")
        .startOf("month")
        .format("MMMM");
      names.push({ label: monthName, value: todayMonth - i });
    }
    names.sort((a: any, b: any) => (a.value > b.value ? 1 : -1));
    setDropdownMonths(names);
  };

  const callSubjectAPI = async () => {
    getAPIRequest(
      endurl.SUBJECTLIST +
        `?ordering=-created_at&limit=100&offset=0&selection=${subjectName}`,
      headers
    )
      .then((res: any) => {
        const responseData = res.data.response.results;
        console.log("Subject APi response - ", responseData);

        const finalData = responseData.map((item: any) => {
          return { label: item.content, value: item.id };
        });

        console.log("Final Data - ", finalData);
        setSubjectData(finalData);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  useEffect(() => {
    setCalenderVisible(false);
  }, [subjectName, startDate, endDate]);

  useEffect(() => {
    if (startDate !== "Select" && subjectName && selectedStudent.label)
      getAttendanceData(startDate);
  }, [selectedStudent]);

  const dateRestrictedApi = async () => {
    await getAPIRequest(
      endurl.SCHOOL_SERVICE_ATTENDENCE + loginData?.school_id + "/",
      headers
    )
      .then((res: any) => {
        setCalendarLoading(false);

        setRestrictedStartDate(res.data?.activation_start_date);
        setRestrictedEndDate(res.data?.activation_end_date);
      })
      .catch((error) => {
        setCalendarLoading(false);
      });
  };

  const getAttendanceData = (monthDate: string) => {
    setCalendarLoading(true);
    setIsError("");

    let firstDay = moment(monthDate).startOf("month").format("YYYY-MM-DD");
    let lastDay = moment(monthDate).endOf("month").format("YYYY-MM-DD");
    moment(startDate).isSameOrAfter(firstDay) ? (firstDay = startDate) : null;

    let limit = moment(lastDay).diff(firstDay, "days") + 1;

    let apiURL =
      endurl.TEACHER_ATTENDANCE +
      `?school_id=${selectedStudent.school_id}&class_name=${selectedStudent.class_name}&start_date=${firstDay}&end_date=${lastDay}&child_limit=${limit}&child_offset`;
    subjectName ? (apiURL = apiURL + `&subject=${subjectName}`) : null;

    console.log("apiURL is - ", apiURL);

    getAPIRequest(apiURL, headers)
      .then((res: any) => {
        const responseData = res?.data?.response?.results;

        if (responseData.length > 0) {
          let studentRecord = responseData.filter(
            (item: any) => item.id == selectedStudent.id
          );

          let recordFound = studentRecord[0];

          {
            /* Construct the array for marking Dates in Calendar as per data received from API */
          }
          let markedDay: any = {};

          recordFound?.attendence_recors?.results?.map((item: any) => {
            markedDay[item.present_on_date] = {
              marked: moment(item.present_on_date).isAfter(endDate)
                ? false
                : true,
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

          setMarkedDates(markedDay);
          if (!calendderVisible) {
            setCalenderVisible(true);
            // setCalendarLoading(false);
          }
        } else setIsError("No Data Found");
        // setLoading(false);
      })
      .catch((error) => {
        // setLoading(false);
        setCalendarLoading(false);
        handleError(error);
      });
    setCalendarLoading(false);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };
  const hideDatePickerForEnd = () => {
    setIsDatePickerVisibleForEnd(!isDatePickerVisibleForEnd);
  };

  const handleConfirmForStart = (date: any) => {
    let req_format = moment(date).format("YYYY-MM-DD");
    setStartDate(req_format);
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.mainView}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <BackHeaderForParent title={CONSTANT.ATTENDANCE} dropdown={true} />
          <View style={styles.marginView}>
            <Text style={styles.subTextStyle}> {CONSTANT.SORTBYMONTH}</Text>

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconColor={COLORS.Black}
              data={dropdownMonths}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder="Select"
              value={monthSelect}
              onChange={(item: any) => {
                setMonth(item.value);
                setStartDate(
                  moment(item.label, "MMMM")
                    .startOf("month")
                    .format("YYYY-MM-DD")
                );
                setEndDate(
                  moment(item.label, "MMMM").endOf("month").format("YYYY-MM-DD")
                );
              }}
              itemContainerStyle={{
                margin:-7}}
            />
            <Text style={styles.subjectText}> {CONSTANT.SELECTSUBJECT}</Text>

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
                setSelectedSubject(item.value);
                setSubjectName(item.label);
              }}
              itemContainerStyle={{
                margin:-7}}
            />
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
                  maximumDate={new Date()}
                  minimumDate={new Date(restrictedStartDate)}
                />
              </View>
              <View style={styles.calederView}>
                <Text style={styles.dateText}>{CONSTANT.ENDDATE}</Text>
                <View style={styles.startDateView}>
                  <Text style={styles.startDateText}>
                    {" "}
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
                    minimumDate={new Date(startDate)}
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
                  getAttendanceData(startDate);
                }}
                disable={
                  !selectedStudent?.label ||
                  startDate === "Select" ||
                  endDate === "Select" ||
                  moment(startDate).isAfter(endDate) ||
                  subjectName === ""
                }
              />
            </View>
          </View>
          {calendarLoading ? (
            <Loader />
          ) : isError ? (
            <View style={styles.errorView}>
              <Text style={styles.errorText}>{isError}</Text>
            </View>
          ) : (
            <View style={styles.calenderiewForMargin}>
              {/*  Display the calendar after user pressed Search button */}
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
                    let leftDisable =
                      moment(startDate).isSameOrAfter(monthStart);

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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ParentAttendance;
