import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { Text, Button, Checkbox } from "react-native-paper";
import styles from "./styles";
import { Dropdown } from "react-native-element-dropdown";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import BackHeader from "../../../../component/BackHeader";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../../component/customButton";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import Images from "../../../../assests/images";
import endurl from "../../../../app/endurl";
import { useSelector } from "react-redux";
import { getAPIRequest, postAPIRequest } from "../../../../app/apiController";
import { typeDropdownAssessmment } from "../../../../locales/dataConstant";
import { useFocusEffect } from "@react-navigation/native";

interface TypeItem {
  id: number;
  label: string;
}

const CreateAssessmentAssignTeacher = (props: any) => {
  const assesmentData = props?.route?.params;

  const [typeData, selectTypeData] = useState<TypeItem>();
  const [selectDropdown, setSelectDropDown] = useState<any>(null);
  const [groupData, setGroupData] = useState([]);
  const [classData, setClassData] = useState<TypeItem[]>([]);
  const [studentData, setStudentData] = useState([]);

  const loginData: any = useSelector<any>((state) => state?.login?.data);
  const token = loginData?.AccessToken;
  const school_id = loginData?.school_id;
  const extraData = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
  const [checkBoxID, setCheckBoxID] = useState<any>([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [minute, setMinute] = useState("");
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState("Select");
  const [endDate, setEndDate] = useState("Select");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isDatePickerVisibleForEnd, setIsDatePickerVisibleForEnd] =
    useState(false);
  const [isError, setIsError] = useState("");

  const onChangeStatusSecond = (id: any) => {
    if (checkBoxID.includes(id)) {
      toggleCheckBox ? setToggleCheckBox(false) : null;
    }

    setCheckBoxID((prevCheckboxes: any) => {
      const updatedCheckboxes = [...prevCheckboxes];
      const value = id;
      if (!updatedCheckboxes.includes(value)) {
        updatedCheckboxes.push(value);
      } else {
        const valueIndex = updatedCheckboxes.indexOf(value);
        updatedCheckboxes.splice(valueIndex, 1);
      }
      return updatedCheckboxes;
    });
  };
  // useEffect(()=>{
  //   getStudentData()
  // },[])

  useFocusEffect(
    React.useCallback(() => {
      setSelectDropDown("");
      setMinute("");
      setStartDate("Select");
      setEndDate("Select");
      setCheckBoxID("");
      setStudentData([]);
    }, [])
  );

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

    hideDatePicker();
  };

  const handleConfirmForEnd = (date: string) => {
    let req_endDate = moment(date).format("YYYY-MM-DD");
    setEndDate(req_endDate);
    if (startDate !== "Select")
      moment(startDate).isAfter(req_endDate)
        ? setIsError(CONSTANT.DATE_ERROR)
        : setIsError("");
    hideDatePickerForEnd();
  };

  useEffect(() => {
    getGroupData();
    getClassData();
  }, []);

  const getLabel = (): string => {
    if (typeData?.label == "student") return CONSTANT.SELECT_CLASS;
    else if (typeData?.label == "Group") return CONSTANT.SELECT_GROUP;
    else if (typeData?.label == "class") return CONSTANT.SELECT_CLASS;
    else return CONSTANT.SELECT;
  };

  const getClassData = async () => {
    // loginData?.response?.data?.role?.id
    // 1976
    var data = {
      teacher_id: loginData?.user_profile_id,
    };
    await postAPIRequest(endurl.CLASSES, data, extraData)
      .then((res: any) => {
        const responseData = res?.data?.response;

        setClassData(responseData);
      })
      .catch((error) => {
        return error;
      });
  };
  const getGroupData = async () => {
    await getAPIRequest(`${endurl.GROUPDATALIST}`)
      .then((res: any) => {
        setGroupData(res?.data?.response?.results);
      })
      .catch((error) => {
        throw error;
      });
  };

  const setDropData = (item: any) => {
    setSelectDropDown(item);
    if (typeData?.label === "student") getStudentData(item);
  };

  const getStudentData = async (details: any) => {
    getAPIRequest(
      `${endurl.STUDENT}?branchId=${
        loginData?.branchId ? loginData?.branchId : ""
      }&school_id=${loginData?.school_id}&class_id=${details.class_id}`
    )
      .then((res: any) => {
        setStudentData(res?.data?.response?.results);
        setCheckBoxID([]);
      })
      .catch((e) => {
        console.log("Student data fetch error: ", e);
      });
    loginData?.response?.data?.role?.id;
  };

  const getLabelForDropDown = (): string => {
    if (typeData?.label == "student") return CONSTANT.SELECT_NAME;
    else if (typeData?.label == "Group") return CONSTANT.SELECT_GROUP_NAME;
    else if (typeData?.label == "class") return CONSTANT.SELECT_NAME;
    else return CONSTANT.SELECT;
  };

  const getData = () => {
    if (typeData?.label == "student") return classData;
    else if (typeData?.label == "Group") return groupData;
    else if (typeData?.label == "class") return classData;
    else return classData;
  };

  const OnSubmitAssesmnet = () => {
    if (startDate == "Select") {
      Alert.alert("Start Date can not be empty");
    } else if (endDate == "Select") {
      Alert.alert("End Date can not be empty");
    } else if (minute == "") {
      Alert.alert("Duration can not be empty");
    } else if (typeData?.label == CONSTANT.SELECT) {
      Alert.alert("Please Select Type");
    } else {
      if (typeData?.label == "student") {
        const Assemnetdata = {
          category_name: typeData?.label,
          start_date: startDate,
          submission_date: endDate,
          duration: parseInt(minute),
          assessment_id: assesmentData?.data?.id.toString(),
          school_id: school_id,
          //created_by: loginData?.user_id,
          //updated_by: loginData?.user_id,
          //group_id: [typeData?.label == "Group" ? selectDropdown?.id : ""],
          student_id: checkBoxID,
          class_id: [
            typeData?.label == "student"
              ? selectDropdown?.class_id
              : typeData?.label,
          ],
        };
        console.log("Data:-", Assemnetdata);

        postAPIRequest(endurl.ASSIGNASSESMNET, Assemnetdata, extraData)
          .then((res) => {
            Alert.alert(res?.data?.message);

            navigation.goBack();
          })
          .catch((e) => {
            console.log(e);

            return e;
          });
      }

      if (typeData?.label == "class") {
        const Assemnetdata = {
          category_name: typeData?.label,
          start_date: startDate,
          submission_date: endDate,
          duration: parseInt(minute),
          assessment_id: assesmentData?.data?.id.toString(),
          school_id: school_id,
          created_by: loginData?.user_id,
          updated_by: loginData?.user_id,
          //group_id: [typeData?.label == "Group" ? selectDropdown?.id : ""],

          class_id: [
            typeData?.label == "class"
              ? {
                  id: selectDropdown?.class_id,
                  class_name: selectDropdown?.name,
                }
              : typeData?.label,
          ],
        };
        console.log("classData:-", assesmentData);

        postAPIRequest(endurl.ASSIGNASSESMNET, Assemnetdata, extraData)
          .then((res) => {
            Alert.alert(res?.data?.message);
            navigation.goBack();
          })
          .catch((e) => {
            return e;
          });
      }

      if (typeData?.label == "Group") {
        const Assemnetdata = {
          category_name: "my_group",
          start_date: startDate,
          submission_date: endDate,
          duration: parseInt(minute),
          assessment_id: assesmentData?.data?.id.toString(),
          school_id: school_id,
          comments: "",
          created_by: loginData?.user_id,
          updated_by: loginData?.user_id,
          group_id: [
            typeData?.label == "Group" ? selectDropdown?.id : typeData?.label,
          ],
        };

        console.log("GroupData:-", assesmentData);

        postAPIRequest(endurl.ASSIGNASSESMNET, Assemnetdata, extraData)
          .then((res) => {
            Alert.alert(res?.data?.message);

            navigation.goBack();
          })
          .catch((e) => {
            return e;
          });
      }
    }
  };

  const sortAscending = (header: string) => {
    const titleArr = [...studentData];
    if (header === CONSTANT.FIRST_NAME) {
      titleArr.sort((a: any, b: any) =>
        a.first_name.toLowerCase() < b.first_name.toLowerCase() ? 1 : -1
      );

      setStudentData(titleArr);
    } else if (header === CONSTANT.LAST_NAME) {
      titleArr.sort((a: any, b: any) =>
        a.last_name.toLowerCase() < b.last_name.toLowerCase() ? 1 : -1
      );
      setStudentData(titleArr);
    }
  };

  const sortDescending = (header: string) => {
    const titleArr = [...studentData];
    if (header === CONSTANT.FIRST_NAME) {
      titleArr.sort((a: any, b: any) =>
        a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1
      );

      setStudentData(titleArr);
    } else if (header === CONSTANT.LAST_NAME) {
      titleArr.sort((a: any, b: any) =>
        a.first_name.toLowerCase() > b.first_name.toLowerCase() ? 1 : -1
      );
      setStudentData(titleArr);
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.flatlisrRowViewSecond}>
        <View style={styles.column1DataCheckBox}>
          <Checkbox.Android
            status={checkBoxID.includes(item.id) ? "checked" : "unchecked"}
            color={COLORS.ThemeGreen}
            uncheckedColor={COLORS.greyShadow}
            onPress={() => {
              onChangeStatusSecond(item?.id);
            }}
          />
        </View>

        <View style={styles.column2DataCheckBox}>
          <Text style={styles.textStyle}>{item?.first_name}</Text>
        </View>

        <View style={styles.column3DataCheckBox}>
          <Text style={styles.textStyle}>{item?.last_name}</Text>
        </View>
      </View>
    );
  };

  const changeCheckboxHeader = () => {
    toggleCheckBox == true
      ? (setToggleCheckBox(false), setCheckBoxID([]))
      : (setCheckBoxID(studentData.map((item: any) => item.id)),
        setToggleCheckBox(true));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.mainView}>
        <BackHeader title={CONSTANT.CREATE_ASSESMENT} />
        <React.Fragment>
          <ScrollView>
            <View>
              <View style={styles.marginView}>
                <Text style={styles.subTextStyle}> {CONSTANT.ASSESSNAME}</Text>
                <View style={styles.textInputViewStyle}>
                  <TextInput editable={false} style={styles.textInputStyle}>
                    {assesmentData?.data?.name}
                  </TextInput>
                </View>
              </View>
              <View style={styles.dtPickerView}>
                {/* View to display Start Date and picker */}
                <View style={styles.startDtMainView}>
                  <Text style={styles.subTextStyle}>{CONSTANT.STARTDATE}</Text>
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
                      <Images.Calender height={14} width={14} />
                    </TouchableOpacity>
                    <DateTimePicker
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={handleConfirmForStart}
                      onCancel={hideDatePicker}
                      minimumDate={new Date()}
                    />
                  </View>
                </View>

                <View style={{ width: "2%" }} />

                {/* View to display End Date and Picker */}
                <View style={styles.endDtMainView}>
                  <Text style={styles.subTextStyle}> {CONSTANT.ENDDATE}</Text>

                  <View style={styles.startDateView}>
                    <Text style={styles.startDateText}>
                      {endDate !== "Select"
                        ? moment(endDate, "YYYY-MM-DD").format("DD-MM-YYYY")
                        : endDate}
                    </Text>
                    <DateTimePicker
                      isVisible={isDatePickerVisibleForEnd}
                      mode="date"
                      onConfirm={handleConfirmForEnd}
                      onCancel={hideDatePickerForEnd}
                      // maximumDate={new Date()}
                      minimumDate={new Date(startDate)}
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setIsDatePickerVisibleForEnd(!isDatePickerVisibleForEnd)
                      }
                      disabled={startDate === "Select"}
                    >
                      <Images.Calender height={14} width={14} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {isError ? (
                <View style={styles.errorView}>
                  <Text style={styles.errorText}>{isError}</Text>
                </View>
              ) : null}
              <View style={styles.marginView}>
                <Text style={styles.subTextStyle}> {CONSTANT.SETDURATION}</Text>
                <View style={styles.textInputViewStyle}>
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder={CONSTANT.TIMEDURATION}
                    placeholderTextColor={COLORS.blackCode}
                    onChangeText={(e) => setMinute(e)}
                    value={minute}
                  />
                </View>
              </View>

              <View style={styles.marginView}>
                <Text style={styles.subTextStyle}> {CONSTANT.SELECT_TYPE}</Text>

                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconColor={COLORS.Black}
                  data={typeDropdownAssessmment}
                  maxHeight={100}
                  labelField={"label"}
                  valueField="value"
                  placeholder="Select"
                  value={typeData}
                  onChange={(item: any) => {
                    selectTypeData(item);
                  }}
                />

                <Text style={styles.subjectText}> {getLabel()}</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconColor={COLORS.Black}
                  data={getData()}
                  maxHeight={100}
                  labelField={getLabelForDropDown()}
                  valueField="id"
                  placeholder="Select"
                  value={selectDropdown}
                  onChange={(item: any) => {
                    setDropData(item);
                  }}
                />
              </View>
              <View style={styles.studentListBorderView}>
                <Text style={styles.headerTextStyle}>
                  {CONSTANT.STUDENT_LIST}
                </Text>
              </View>
              {studentData?.length > 0 && typeData?.label == "student" ? (
                <View style={styles.flatlistMain}>
                  {/* Display Header of the table */}
                  <View style={styles.flatlistHeading}>
                    {/*  Heading Column # 1 */}
                    <View style={styles.column1ViewCheckBox}>
                      <Checkbox.Android
                        status={
                          toggleCheckBox
                            ? "checked"
                            : checkBoxID.length == studentData.length
                            ? "checked"
                            : "unchecked"
                        }
                        color={COLORS.ThemeGreen}
                        uncheckedColor={COLORS.greyShadow}
                        onPress={() => changeCheckboxHeader()}
                      />
                    </View>

                    {/*  Heading Column # 2 */}
                    <View style={styles.column2ViewCheckBox}>
                      <Text style={styles.tableHeadingTxt}>
                        {CONSTANT.FIRST_NAME}
                      </Text>
                      <View style={styles.column2IconCheckBox}>
                        <TouchableOpacity
                          onPress={() => sortAscending(CONSTANT.FIRST_NAME)}
                        >
                          <Images.AngleUp height={10} width={10} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => sortDescending(CONSTANT.FIRST_NAME)}
                        >
                          <Images.AngleDown height={10} width={10} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/*  Heading Column # 3 */}
                    <View style={styles.column3ViewCheckBox}>
                      <Text style={styles.tableHeadingTxt}>
                        {CONSTANT.LAST_NAME}
                      </Text>
                      <View style={styles.column3IconCheckBox}>
                        <TouchableOpacity
                          onPress={() => sortAscending(CONSTANT.LAST_NAME)}
                        >
                          <Images.AngleUp height={10} width={10} />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => sortAscending(CONSTANT.LAST_NAME)}
                        >
                          <Images.AngleDown height={10} width={10} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/*  Render the content in a table format */}

                  {studentData?.length <= 0 ? (
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
                      data={studentData}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={(item) => renderItem(item)}
                    />
                  )}
                </View>
              ) : null}

              {/*  View to display Print and Download buttons */}
              <View style={styles.buttonView}>
                <Button
                  style={[
                    styles.buttonStyle,
                    {
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.ThemeGreen,
                    },
                  ]}
                  textColor={COLORS.ThemeGreen}
                  mode="outlined"
                  onPress={() => navigation.goBack()}
                >
                  {CONSTANT.CANCEL}
                </Button>

                <CustomButton
                  title={CONSTANT.CREATE}
                  disable={
                    startDate === "Select" ||
                    endDate === "Select" ||
                    minute === ""
                  }
                  onPressButton={() => OnSubmitAssesmnet()}
                />
              </View>
            </View>
            <View style={{ marginBottom: 100 }} />
          </ScrollView>
        </React.Fragment>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateAssessmentAssignTeacher;
