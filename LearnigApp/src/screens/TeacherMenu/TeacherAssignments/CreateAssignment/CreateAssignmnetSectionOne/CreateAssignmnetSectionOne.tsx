import React from "react";
import { Alert, ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import AppInput from "../../../../../widget/app_input/app_input";
// import APPCALENDER from "../../../../../widget/app_start-end_calender/app_calender";
import AssignmnetDropDown from "../../AssignmnetDropDropDown/DropDown";
import DropdownElement from "../../AssignmnetDropDropDown/DropdownElement";
import AppButtonTwo from "../../../../../widget/app_button_two/app_button";
import CONSTANT from "../../../../../locales/constants";
import { useEffect, useState } from "react";
import endurl from "../../../../../app/endurl";
import { useNavigation } from "@react-navigation/native";
import { getAPIRequest } from "../../../../../app/apiController";
import { useSelector , useDispatch } from "react-redux";
import { addScreenOneData } from "../../../../../store/createAssignmentSlice";
import COLORS from "../../../../../assests/color";
import NAVIGATION_CONSTANT from "../../../../../locales/constantsNavigation";
import Images from "../../../../../assests/images";
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import gStyles from "../../../../../css";

const CreateSectionOne = () => {
  const createAssignmentData = useSelector((state:any) => state.createAssignment.data);
  const [course, setCourse] = useState([]);
  const [grade, setGrade] = useState([]);
  const [component, setComponent] = useState([]);
  const [volume, setVolume] = useState([]);
  const [assesmentName, SetAssesmentName] = useState<string>("");
  const [courseSelectData, setCourseSelectData] = useState<any>({});
  const [gradeSelectData, setGradeSelectData] = useState<any>({});
  const [componentSelectData, setComponentSelectData] = useState<any>();
  const [volumeSelectData, setVolumeSelectData] = useState<any>({});
  const [startDate, setStartDate] = useState("Select");
  const [endDate, setEndDate] = useState("Select");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isDatePickerVisibleForEnd, setIsDatePickerVisibleForEnd] = useState(false);
  const [isError, setIsError] = useState("");
  const [errors, setErrors] = useState<any>({});

  const navigation : any = useNavigation();
  const dispatch = useDispatch();
  const loginData = useSelector((state:any) => state.login?.data)

  useFocusEffect(
    React.useCallback(() => {
      setErrors([]);
      setCourseSelectData([]);
      setGradeSelectData([]);
      setComponentSelectData([]);
      setVolumeSelectData([]);
      // SetAssesmentName("");
      // setStartDate("Select");
      // setEndDate("Select");
      getCourseData();
      getGrade();
      getComponent();
      getVolume();
      setIsError('');
    }, [])
  );

  useEffect(()=>{
    if(createAssignmentData)
    {
      setDefaultValues() 
    }
  },[volume])

  const setDefaultValues = () => {
    const selectedCourse = course.filter((item:any) => item.id == createAssignmentData.courseSelectData);
    const selectedGrade = grade.filter((item:any) => item.label == createAssignmentData.gradeSelectData );
    const selectedComponent = component.filter((item:any) => item.label == createAssignmentData.componentSelectData);
    const selectedVolume = volume.filter((item:any) => item.label == createAssignmentData.volumeSelectData );
    // console.log("Found Course - ",selectedCourse);
    // console.log("Found Grade - ",selectedGrade);
    // console.log("Found Component - ",selectedComponent);
    // console.log("Found Volume - ",selectedVolume);
    setCourseSelectData(selectedCourse[0]);
    setGradeSelectData(selectedGrade[0]);
    setComponentSelectData(selectedComponent[0]);
    setVolumeSelectData(selectedVolume[0]);
  }

  const getCourseData = async () => {
    await getAPIRequest(endurl.COURSES+`${loginData?.user_id}/details/?all_courses=all`)
      .then((res: any) => {
        const responseData = res?.data?.response;
        const finalData = responseData.map((item: any) => ({
          label: item.name,
          value: item.id,
          ...item
        }));
        setCourse(finalData);
      })
      .catch((e) => {
        setIsError("Something went wrong, please try again !!")
      });
  };

  const getGrade = () => {
    getAPIRequest(endurl.COURSE_CODE_SERVICE + `?selection=${CONSTANT.GRADE}`)
      .then((res: any) => {
        const finalData = res?.data?.response?.results?.map((item: any) => ({
          label: item.content,
          value: item.id,
          ...item
        }));
        setGrade(finalData);
      })
      .catch((e) => {
        setIsError("Something went wrong, please try again !!")
      });
  };

  const getComponent = () => {
    getAPIRequest(endurl.COURSE_CODE_SERVICE + `?selection=${CONSTANT.COMPONENT}`)
      .then((res: any) => {
        const finalData = res?.data?.response?.results?.map((item: any) => ({
          label: item.content,
          value: item.id,
          ...item
        }));
        setComponent(finalData);
      })
      .catch((e) => {
        setIsError("Something went wrong, please try again !!")
      });
  };

  const getVolume = () => {
    getAPIRequest(endurl.COURSE_CODE_SERVICE + `?selection=${CONSTANT.VOLUME}`)
      .then((res: any) => {
        const finalData = res?.data?.response?.results?.map((item: any) => ({
          label: item.content,
          value: item.id,
          ...item
        }));
        setVolume(finalData);
      })
      .catch((e) => {
        setIsError("Something went wrong, please try again !!")
      });
  };

  const onNextData = () => {
    const validationErrors: any = {};
    
    if( !assesmentName ){
      validationErrors.name = 'Assignment Name is required';
    }
    if(!startDate || startDate == 'Select'){
      validationErrors.startDt = 'Please select Start Date';
    } 
    if( !endDate || endDate == 'Select' ){
      validationErrors.endDt = 'Please select End Date';
    } 
    if( courseSelectData.length === 0 ){
      validationErrors.course = 'Please select a Course';
    } 
    if( gradeSelectData.length === 0  ){
      validationErrors.grade = 'Please select a Grade';
    } 
    if( Object.keys(componentSelectData).length === 0  ){
      validationErrors.component = 'Please select a Component';
    } 
    if( volumeSelectData.length === 0  ){
      validationErrors.volume = 'Please select a Volume';
    } 
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Form submission logic
      const sectionOneData = {
        name: assesmentName,
        start_date: startDate,
        end_date: endDate,
        course_id: courseSelectData?.course_id,
        course_name: courseSelectData?.name,
        course_table_id: courseSelectData?.id,
        grade: gradeSelectData?.id,
        grade_name: gradeSelectData.content,
        component_id: componentSelectData?.id,
        component_name: componentSelectData?.content,
        volume_id: volumeSelectData?.id,
        volume_name: volumeSelectData?.content,
      };
      dispatch(addScreenOneData(sectionOneData));
      navigation.navigate(NAVIGATION_CONSTANT.CREATE_ASSIGNMENT_TWO);
    }
  };

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <AppInput
        label={CONSTANT.ASSESMENT_NAME}
        placeholder={CONSTANT.ASSIGNMENT_NAME}
        value={assesmentName}
        saveInputData={(ele: string) => SetAssesmentName(ele)}
      />
      {errors.name && <Text style={[gStyles.errorText, styles.errorText]}>{errors.name}</Text>}

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
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmForStart}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
            />
          </View>
          {errors.startDt && <Text style={[gStyles.errorText, styles.errorText]}>{errors.startDt}</Text>}

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
              // maximumDate={new Date()}
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
              />
            </TouchableOpacity>
          </View>
          {errors.endDt && <Text style={[gStyles.errorText, styles.errorText]}>{errors.endDt}</Text>}
        </View>
      </View>

      {isError ? (
        <View style={styles.errorView}>
          <Text style={[gStyles.errorText, styles.errorText]}>{isError}</Text>
        </View>
      ) : null}

      <DropdownElement
        label={CONSTANT.SELECT_COURSE}
        data={course}
        selected={courseSelectData}
        onSelect={(item: any) => setCourseSelectData(item)}
      />
      {errors.course && <Text style={[gStyles.errorText, styles.errorText]}>{errors.course}</Text>}
      <DropdownElement
        label={CONSTANT.SELECT_GRADE}
        data={grade}
        selected={gradeSelectData}
        onSelect={(item: any) => setGradeSelectData(item)}
      />
      {errors.grade && <Text style={[gStyles.errorText, styles.errorText]}>{errors.grade}</Text>}
      <DropdownElement
        label={CONSTANT.COMPONENTS}
        data={component}
        selected={componentSelectData}
        onSelect={(item: any) => setComponentSelectData(item)}
      />
      {errors.component && <Text style={[gStyles.errorText, styles.errorText]}>{errors.component}</Text>}
      <DropdownElement
        label={CONSTANT.SELECT_VOLUME}
        data={volume}
        selected={volumeSelectData}
        onSelect={(item: any) => setVolumeSelectData(item)}
      />
      {errors.volume && <Text style={[gStyles.errorText, styles.errorText]}>{errors.volume}</Text>}
      <AppButtonTwo
        label={CONSTANT.CANCEL}
        labelTwo={CONSTANT.CREATE}
        onNextData={() => onNextData()}
        onBackData={() => navigation.goBack()}
      />
      <View style={{ marginBottom: 100 }} />
    </ScrollView>
  );
};
export default CreateSectionOne;

const styles = StyleSheet.create({
  dtPickerView: { 
    flexDirection: 'row', 
    marginTop: '5%',
    marginHorizontal: '4%',
  },
  startDtMainView: { 
    flexDirection: 'column', 
    flex: 1 
  },
  endDtMainView: {
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    flex: 1,
  },
  subTextStyle: {
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 17,
    color: COLORS.blackCode,
  },
  startDateView: {
    height: 48,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.listSeparatorColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 8,
    padding: 8,
  },
  startDateText: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.blackCode,
  },
  errorView:{
    paddingHorizontal: 10,
  },
  errorText: {
    marginLeft: '5%'
  },
});