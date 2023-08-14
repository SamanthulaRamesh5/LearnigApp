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
import styles from "./styles";
import CommonBorder from "../../../component/CommonBorder";
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

const Attendance = () => {
  const [classData, setClassData] = useState([
    { label: "No Data Found", value: -1 },
  ]);
  const [studentData, setStudentData] = useState([]);
  const [subjectData, setSubjectData] = useState([
    { label: "No Data Found", value: -1 },
  ]);
  const [markedDates, setMarkedDates] = useState();
  const [selectedClass, setSelectedClass] = useState<string>();
  const [className, setClassName] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>();
  const [subjectName, setSubjectName] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>();
  const [startDate, setStartDate] = useState("Select");
  const [endDate, setEndDate] = useState("Select");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isDatePickerVisibleForEnd, setIsDatePickerVisibleForEnd] =
    useState(false);
  const [calendderVisible, setCalenderVisible] = useState(false);
  const [disableLeftArrow, setDisableLeftArrow] = useState(false);
  const [disableRightArrow, setDisableRightArrow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [restrictedStartDate, setRestrictedStartDate] = useState("YYYY-MM-DD");
  const [restrictedEndate, setRestrictedEndDate] = useState("YYYY-MM-DD");
  const loginData = useSelector((state: any) => state.login.data);
  const token = loginData?.AccessToken;
  const schoolId = loginData?.school_id;
  const branchId = loginData?.branch_id ? loginData?.branch_id : "";
  // const schoolId = 3;
  // const branchId = 3493;

  const headers = {
    Authorization: `Bearer ${token}`,
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Accept: "*/*",
  };

  useFocusEffect(
    React.useCallback(() => {
      callClassAPI();
      callSubjectAPI();
      dateRestrictedApi();
      setLoading(false);
      setIsError("");
    }, [])
  );

  useEffect(() => {
    setCalenderVisible(false);
    setSelectedStudent("");
    if (selectedClass && selectedSubject) {
      callStudentAPI();
    }
  }, [selectedClass, selectedSubject]);

  useEffect(() => {
    setCalenderVisible(false);
  }, [selectedStudent]);

  const hideDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };
  const hideDatePickerForEnd = () => {
    setIsDatePickerVisibleForEnd(!isDatePickerVisibleForEnd);
  };

  const handleConfirmForStart = (date: string) => {
    let req_format = moment(date).format("YYYY-MM-DD");
    setStartDate(req_format);
    if (endDate !== "Select")
      moment(req_format).isAfter(endDate)
        ? setIsError(CONSTANT.DATE_ERROR)
        : setIsError("");
    setCalenderVisible(false);

    hideDatePicker();
  };

  const handleConfirmForEnd = (date: string) => {
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

  const callClassAPI = async () => {
    getAPIRequest(
      endurl.CLASSLIST + `?school_id=${schoolId}&branch_id=${branchId}`,
      headers
    )
      .then((res: any) => {
        const responseData = res.data.response.results;

        const finalData = responseData.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));

        setClassData(finalData);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const callSubjectAPI = async () => {
    getAPIRequest(
      endurl.SUBJECTLIST +
        `?ordering=-created_at&limit=100&offset=0&selection=Subject`,
      headers
    )
      .then((res: any) => {
        const responseData = res.data.response.results;

        const finalData = responseData.map((item: any) => {
          return { label: item.content, value: item.id };
        });

        setSubjectData(finalData);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const dateRestrictedApi = async () => {
    await getAPIRequest(
      endurl.SCHOOL_SERVICE_ATTENDENCE + schoolId + "/",
      headers
    )
      .then((res: any) => {
        setLoading(false);
        setRestrictedStartDate(res.data?.activation_start_date);
        setRestrictedEndDate(res.data?.activation_end_date);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const callStudentAPI = async () => {
    setLoading(true);

    // console.log("Student API Url - ",endurl.STUDENTLIST +
    // `?school_id=${schoolId}&class_name=${className}&subject=${subjectName}`);

    getAPIRequest(
      endurl.STUDENTLIST +
        `?school_id=${schoolId}&class_name=${className}&subject=${subjectName}`,
      headers
    )
      .then((res: any) => {
        const responseData = res?.data?.response?.results;
        // console.log('response status-', responseData);

        let finalData = [];
        if (responseData.length > 0) {
          finalData = responseData?.map((item: any) => ({
            label: item.first_name + " " + item.last_name,
            value: item.id,
            data: item,
          }));
        } else
          finalData.push({
            label: "No Students Found",
            value: "-1",
            data: null,
          });

        setStudentData(finalData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        handleError(error);
      });
  };

  const getAttendanceData = (monthDate: string) => {
    setIsError("");

    let firstDay = moment(monthDate).startOf("month").format("YYYY-MM-DD");
    let lastDay = moment(monthDate).endOf("month").format("YYYY-MM-DD");
    moment(startDate).isSameOrAfter(firstDay) ? (firstDay = startDate) : null;

    let limit = moment(lastDay).diff(firstDay, "days") + 1;

    console.log(
      endurl.TEACHER_ATTENDANCE +
        endurl.TEACHER_ATTENDANCE +
        `?school_id=${schoolId}&class_name=${className}&start_date=${firstDay}&end_date=${lastDay}&subject=${subjectName}&child_limit=${limit}&child_offset`
    );

    getAPIRequest(
      endurl.TEACHER_ATTENDANCE +
        `?school_id=${schoolId}&class_name=${className}&start_date=${firstDay}&end_date=${lastDay}&subject=${subjectName}&child_limit=${limit}&child_offset`,
      headers
    )
      .then((res: any) => {
        const responseData = res.data.response.results;

        let studentRecord = responseData.filter(
          (item: any) => item.id == selectedStudent
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
          setCalendarLoading(false);
        }

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        handleError(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View>
        {/* If data not ready, show a loader */}
        {loading ? (
          <Loader />
        ) : (
          <ScrollView style={styles.mainView}>
            <BackHeader title={CONSTANT.ATTENDANCE} />
            <View style={styles.marginView}>
              {/* <View style={styles.twoDropdownView}>
                
                <View style={styles.classDropdownView}>
                  <Text style={styles.subTextStyle}>
                    {" "}
                    {CONSTANT.SELECT_CLASS}
                  </Text>

                  <Dropdown
                    style={styles.dropdown1}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconColor={COLORS.Black}
                    data={classData}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    placeholder="Select"
                    value={selectedClass}
                    onChange={(item: any) => {
                      setSelectedClass(item.value);
                      setClassName(item.label);
                    }}
                  />
                </View>

                <View style={{ width: 15 }} />
                
                <View style={styles.subjectDropdownView}>
                  <Text style={styles.subTextStyle}>
                    {" "}
                    {CONSTANT.SELECTSUBJECT}
                  </Text>

                  <Dropdown
                    style={styles.dropdown1}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconColor={COLORS.Black}
                    data={data}
                    showsVerticalScrollIndicator={true}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    placeholder="Select"
                    value={selectedSubject}
                    onChange={(item: any) => {
                      setSelectedSubject(item.value);
                      setSubjectName(item.label);
                    }}
                  />
                </View>
              {/* </View>  */}

              {/*  Display Select CLASS DropDown Picker */}
              <View style={styles.classDropdownView}>
                <Text style={styles.subTextStyle}>
                  {" "}
                  {CONSTANT.SELECT_CLASS}
                </Text>

                <Dropdown
                  style={styles.dropdown1}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconColor={COLORS.Black}
                  data={classData}
                  maxHeight={150}
                  labelField="label"
                  valueField="value"
                  placeholder="Select"
                  value={selectedClass}
                  onChange={(item: any) => {
                    setSelectedClass(item.value);
                    setClassName(item.label);
                  }}
                />
              </View>

              <View style={{ width: 15 }} />
              {/*  Display Select SUBJECT DropDown Picker */}
              <View style={styles.subjectDropdownView}>
                <Text style={styles.subTextStyle}>
                  {" "}
                  {CONSTANT.SELECTSUBJECT}
                </Text>

                <Dropdown
                  style={styles.dropdown1}
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
                />
              </View>

              {/*  Display Select STUDENT DropDown Picker */}
              <View style={styles.studentDropdownView}>
                <Text style={styles.subTextStyle}>
                  {" "}
                  {CONSTANT.SELECT_STUDENT}
                </Text>

                <Dropdown
                  style={styles.dropdown1}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  itemTextStyle={{ textTransform: "capitalize" }}
                  iconColor={COLORS.Black}
                  data={studentData}
                  maxHeight={150}
                  labelField="label"
                  valueField="value"
                  placeholder="Select"
                  value={selectedStudent}
                  onChange={(item: any) => {
                    setSelectedStudent(item.value);
                  }}
                />
              </View>

              <View style={styles.dtPickerView}>
                {/*  Display Date Picker for Start Date */}
                <View style={styles.startDtMainView}>
                  <Text style={styles.subTextStyle}> {CONSTANT.STARTDATE}</Text>

                  <View style={styles.startDateView}>
                    <Text style={styles.startDateText}>
                      {startDate !== "Select"
                        ? moment(startDate, "YYYY-MM-DD").format("DD-MM-YYYY")
                        : startDate}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        setIsDatePickerVisible(!isDatePickerVisible)
                      }
                    >
                      <Images.Calender
                        height={14}
                        width={14}
                        style={styles.calender}
                      />
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirmForStart}
                      onCancel={hideDatePicker}
                      maximumDate={new Date()}
                      minimumDate={new Date(restrictedStartDate)}
                    />
                  </View>
                </View>

                <View style={{ width: 15 }} />

                {/*  Display Date Picker for END Date */}
                <View style={styles.endDtMainView}>
                  <Text style={styles.subTextStyle}> {CONSTANT.ENDDATE}</Text>

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
                      minimumDate={new Date(startDate)}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setIsDatePickerVisibleForEnd(!isDatePickerVisibleForEnd)
                      }
                      disabled={startDate === "Select"}
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

              {/* Search button */}
              <View style={styles.button}>
                <CustomButton
                  title={CONSTANT.SEARCH}
                  onPressButton={() => {
                    setCalendarLoading(true), getAttendanceData(startDate);
                  }}
                  disable={
                    !selectedClass ||
                    !selectedSubject ||
                    selectedStudent === "-1" ||
                    !selectedStudent ||
                    startDate === "Select" ||
                    endDate === "Select" ||
                    moment(startDate).isAfter(endDate)
                  }
                  // disable={ ! selectedClass || ! selectedSubject || startDate === 'Select' || endDate === 'Select' }
                />
              </View>
            </View>

            {isError ? (
              <View style={styles.errorView}>
                <Text style={styles.errorText}>{isError}</Text>
              </View>
            ) : null}

            {calendarLoading ? (
              <View style={{ marginTop: 30 }}>
                <Loader />
              </View>
            ) : (
              <View style={styles.calenderiewForMargin}>
                {/*  Display the calendar after user pressed Search button */}
                {calendderVisible ? (
                  <>
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
                        let rightDisable =
                          moment(monthEnd).isSameOrAfter(endDate);

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
                  </>
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
            <View style={{ marginTop: 150 }} />
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Attendance;
