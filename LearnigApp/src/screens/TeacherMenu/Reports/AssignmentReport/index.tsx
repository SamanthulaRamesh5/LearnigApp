import { useCallback, useEffect, useState } from "react";
import CONSTANT from "../../../../locales/constants";
import CustomButton from "../../../../component/customButton";
// import AssignmnetDropDown from "../../AssignmnetDropDropDown/DropDown";
import DropdownElement from "../../TeacherAssignments/AssignmnetDropDropDown/DropdownElement";
import Typedata from "../../TeacherAssignments/CreateAssignment/CreateAssignmnetSectionThree/typeConstants";
import { Checkbox , TextInput } from "react-native-paper";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image
} from "react-native";
import COLORS from "../../../../assests/color";
import Images from "../../../../assests/images";
import { useSelector , useDispatch } from "react-redux";
import endurl from "../../../../app/endurl";
import DocumentPicker from "react-native-document-picker";
import { FlatList } from "react-native-gesture-handler";
// import SafeApiCall from "../../../../../service/safeApicall";
import { useNavigation } from "@react-navigation/native";
import BackHeader from "../../../../component/BackHeader";
import { getAPIRequest, postAPIRequest } from "../../../../app/apiController";
import NAVIGATION_CONSTANT from "../../../../locales/constantsNavigation";
import Loader from "../../../../component/Loader";
import gStyles from "../../../../css";
import { HEIGHT, WIDTH } from "../../../../locales/common";
import DatePickers from "../../../../component/DatePickers";

const TeacherAssignmentReport = () => {
  const [typeData, setTypeData] = useState<any>([]);
  const [details, setDetails] = useState<any>([]);
  const [toggleCheckBox, setToggleCheckBox] = useState<any>(false);
  const loginData: any = useSelector<any>((state) => state?.login?.data);
  const screenTwoData = useSelector((state: any) => state.createAssignment.screenTwoData);
  const screenOneData = useSelector((state: any) => state.createAssignment.screenOneData);
  const [toggleCheckBoxsecond, setToggleCheckBoxsecond] = useState<any>(false);
  const [toggleCheckBoxHeader, setToggleCheckBoxHeader] = useState<any>(false);
  const [groupData, setGroupData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [fileResponse, setFileResponse] = useState<any>();
  const [comment, setComment] = useState<string>('');
  const [checkBoxID, setCheckBoxID] = useState<any>([]);
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<any>({});
  const [startDate, setStartDate] = useState<string>("Select");
  const [endDate, setEndDate] = useState<string>("Select");
  const maxlength: number = 500;
  // console.log("ScreenOne Data - ", JSON.stringify(screenOneData));
  // console.log("ScreenTwo Data - ", JSON.stringify(screenTwoData));
  // console.log("Type.label -",typeData.label);
  // console.log("details.label -",details?.label)
  // console.log("Checkbox data - ",JSON.stringify(checkBoxID));
  
  
  useEffect(() => {
    setError('');
    setLoader(false);
    setStudentData([]);
    getGroupData();
    getClassData();
  }, []);

  const getLabel = (): string => {
    if (typeData?.label == "Student") return CONSTANT.SELECT_CLASS;
    else if (typeData?.label == "My Group") return CONSTANT.SELECT_GROUP;
    else if (typeData?.label == "Classes") return CONSTANT.SELECT_CLASS;
    else return CONSTANT.SELECT;
  };

  const getClassData = () => {
    postAPIRequest(endurl.CLASSES, { teacher_id: loginData?.user_profile_id })
      .then((res) => {
        const finalData = res?.data?.response?.map((item: any) => ({
          label: item.name,
          value: item.class_id,
          ...item
        }));
        setClassData(finalData);
      })
      .catch((e) => {
        console.log("Class data post error: ", e);
      });
  };


  const getGroupData = () => {
    getAPIRequest(endurl.GROUP)
      .then((res: any) => {
        const finalData = res?.data?.response?.results?.map((item: any) => ({
          label: item.group_name,
          value: item.id,
          ...item
        }));
        setGroupData(finalData);
      })
      .catch((e) => {
        console.log("Group data fetch error: ", e);
      });
  };


  const getStudentData = (classDetails : any) => {
    // console.log("INside getStudent-",`${endurl.STUDENT}?branchId=${loginData?.branchId ? loginData?.branchId : ''}&school_id=${loginData?.school_id}&class_id=${classDetails.value}`);
    
    getAPIRequest(
      `${endurl.STUDENT}?branchId=${loginData?.branchId ? loginData?.branchId : ''}&school_id=${loginData?.school_id}&class_id=${classDetails.value}`
    )
      .then((res: any) => {
        // console.log("res?.data?.response?.results - ",res?.data?.response?.results.length);
        setStudentData(res?.data?.response?.results);
        setCheckBoxID([]);
      })
      .catch((e) => {
        console.log("Student data fetch error: ", e);
      });
  };

  const getData = () => {
    // console.log("typeData in getData() - ", typeData.label);
    if (typeData?.label == "Student") return classData;
    else if (typeData?.label == "My Group") return groupData;
    else if (typeData?.label == "Classes") return classData;
    else return [];
  };

  const getLabelForDropDown = (): string => {
    if (typeData?.label == "Student") return "name";
    else if (typeData?.label == "My Group") return "group_name";
    else if (typeData?.label == "Classes") return "name";
    else return CONSTANT.SELECT;
  };

  const onChangeStatus = () => {
    setToggleCheckBox(toggleCheckBox ? false : true);
  };

  const onChangeStatusSecond = () => {
      setToggleCheckBoxsecond(toggleCheckBoxsecond ? false : true);
  };

  const onChangeStatusCheckbox= (id: any) => {
    
    if (checkBoxID.includes(id)) {
      toggleCheckBoxHeader ? setToggleCheckBoxHeader(false) : null;
    }
    else if(checkBoxID.length == (studentData.length -  1)){
      setToggleCheckBoxHeader(true)
    }

    setCheckBoxID((prevCheckboxes: any) => {
      const updatedCheckboxes = [...prevCheckboxes]
      const value = id;
      if (!updatedCheckboxes.includes(value)) {
        updatedCheckboxes.push(value)
      } else {
        const valueIndex = updatedCheckboxes.indexOf(value)
        updatedCheckboxes.splice(valueIndex, 1)
      }
      
      return updatedCheckboxes
    })
  }

  const changeCheckboxHeader = () => {
    toggleCheckBoxHeader == true ? ( setToggleCheckBoxHeader(false), setCheckBoxID([]) ) : 
    ( setCheckBoxID(studentData.map((item: any) => item.id )), 
    setToggleCheckBoxHeader(true)  )
  }

  const setdropDownData = (e: any) => {
    setDetails(e);
    // console.log("setdropDownData - ",e.label)
    // console.log("Inside setDropdownDAta- ",typeData.label);
    typeData?.label == "My Group" ?( setStudentData([])) : getStudentData(e);
  };

  const renderComponent = ({ item }: any) => {
    return (
      <View style={style.flatlisrRowView}>
        <View style={style.column1Data}>
            <Checkbox.Android
              status={checkBoxID.includes(item.id) ? "checked" : "unchecked"}
              color={COLORS.ThemeGreen}
              uncheckedColor={COLORS.greyShadow}
              onPress={() => {
                onChangeStatusCheckbox(item?.id);
              }}
            />
        </View>

        <View style={style.column2Data}>
          <Text style={style.tableDataTextStyle}>{item?.first_name}</Text>
        </View>

        <View style={style.column3Data}>
          <Text style={style.tableDataTextStyle}>{item?.last_name}</Text>
        </View>
      </View>
    )
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response: any = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
      });
      // console.log("fileResponse - ",response[0]);
      
      setFileResponse(response[0]);
    } catch (err) {
      console.warn(err);
    }
  }, []);


  function onNextData(): void {
    
    const validationErrors: any = {};
    
    if( ! typeData ){
      validationErrors.typeData = 'Please select Type value';
    }
    if( Object.keys(details).length == 0 ){
      validationErrors.details = 'Please select a value';
    } 
    else if(typeData?.label == 'Student' && (checkBoxID?.length > 0 ? false : true)){
      validationErrors.students = 'Please select students';
    } 

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {

        setLoader(true);
        
        let postData = {
          start_date: startDate,
          end_date: endDate,
          assignment_type: typeData?.label.toLowerCase(),
          class_id: details?.value,
          school_id: loginData?.school_id,
          assign_external_id: typeData.label == 'My Group' ? details?.label : checkBoxID.length > 0 ? JSON.stringify(checkBoxID) : '',  /// please stringify
          assign_external_name: details?.label,
        }

        // console.log("postData object - ",postData);
        
        const formData = new FormData();
        Object.keys(postData).forEach((key: string) => {
          formData.append(key, postData[key]);
        });

        navigation.navigate(NAVIGATION_CONSTANT.TEACHER_ASSIGNMENT_REPORT_ASSIGNMENTS, {assigmentItem: postData});
    }
  }

  return (
    <ScrollView>
      <BackHeader title={CONSTANT.ASSIGNMENTREPORT} />

      <DatePickers startDate={startDate} setStartDate={setStartDate}
                endDate={endDate} setEndDate={setEndDate}/>
      <View style={{ height: '2%' }} />

      { loader ? (
        <View style={style.loaderView}>
          <Loader />
        </View>
      ) : (
        <>
          <DropdownElement
            label={CONSTANT.SELECT_TYPE}
            data={Typedata}
            selected={typeData}
            onSelect={(item: any) => {
              if(item.label === "My Group"){
                setDetails([]);
                setCheckBoxID([]);
              }
              setTypeData(item)
            }}
          />
          {errors.typeData && <Text style={[gStyles.errorText, style.gErrorText]}>{errors.typeData}</Text>}
          <DropdownElement
            label={getLabel()}
            data={getData()}
            selected={details}
            onSelect={(item: any) => setdropDownData(item)}
          />
          {errors.details && <Text style={[gStyles.errorText, style.gErrorText]}>{errors.details}</Text>}

          {typeData.label == 'Student' && typeData.label ? details.value ? (
            
            <View style={style.studentListView}>
              <View style={style.borderView}>
                <Text style={style.textStyle}>{CONSTANT.STUDENT_LIST}</Text>
              </View>
    
              { studentData.length > 0 ? (
                <View style={style.flatlistHeading}>
                {/*  Heading Column # 1 */}
                <View style={style.column1View}>
                  <Checkbox.Android
                    status={toggleCheckBoxHeader ? "checked" : "unchecked"}
                    color={COLORS.ThemeGreen}
                    uncheckedColor={COLORS.greyShadow}
                    onPress={() =>
                      changeCheckboxHeader()
                    }
                    disabled={studentData?.length == 0}
                  />
                </View>
    
                {/*  Heading Column # 2 */}
                <View style={style.column2View}>
                  <Text style={style.tableHeadingTxt}>
                    {CONSTANT.FIRST_NAME}
                  </Text>
                  <View style={style.column2Icon}>
                    <Images.AngleUp height={10} width={10} />
                    <Images.AngleDown height={10} width={10} />
                  </View>
                </View>
    
                {/*  Heading Column # 3 */}
                <View style={style.column3View}>
                  <Text style={style.tableHeadingTxt}>
                    {CONSTANT.LAST_NAME}
                  </Text>
                  <View style={style.column3Icon}>
                    <Images.AngleUp height={10} width={10} />
                    <Images.AngleDown height={10} width={10} />
                  </View>
                </View>
              </View>
              ) : null }
    
              <FlatList
                data={studentData}
                keyExtractor={(item: any) => item?.id}
                renderItem={(item) => renderComponent(item)}
                ListHeaderComponent={<></>
                }
                ListEmptyComponent={<Text style={style.noDataFound}>{CONSTANT.NO_DATA}</Text>}
                ListFooterComponent={errors.students && <Text style={[gStyles.errorText, style.gErrorText]}>{errors.students}</Text>}
                scrollEnabled={true}
              />
            </View> ) : null 
          :  null
          }
  
          <View style={{height: '3%'}}/>
    
          {error ? (
            <View style={style.errorView}>
              <Image source={Images.error} style={style.errorIcon} />
              <Text style={style.errorText}>{error}</Text>
            </View>
          ) : null}

            <View style={style.button}>
                <CustomButton
                title={CONSTANT.GET_REPORT}
                onPressButton={()=> {Alert.alert("Get Report"), onNextData()}}
                />
            </View>
          {/* <View style={{ marginBottom: 150 }} /> */}
        </>

      )}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  loaderView: {
    marginTop:'50%', 
    alignItems:'center', 
    justifyContent:'center',
  },
  checkBoxStyle: {
    marginHorizontal: "5%",
    flexDirection: "row",
  },
  meText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.colorBlack,
    marginTop: 10,
  },
  studentListView: {
    flex:1, 
    height: "30%",
    margin:'5%', 
    borderWidth:1, 
    borderColor: COLORS.listSeparatorColor,
  },
  attachFile: {
    marginHorizontal: "5%",
    fontSize: 12,
    color: COLORS.colorBlack,
    fontWeight: "300",
    marginTop: "2%",
  },
  downloadView: {
    flexDirection: "row",
    backgroundColor: COLORS.lightGreen,
    marginHorizontal: "5%",
    marginTop: "5%",
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.ThemeGreen,
    borderStyle: "dashed",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  dropStyle: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.colorBlack,
    marginLeft: 10,
  },
  fileUploadedView: {
    flex:1, 
    flexDirection:'row', 
    alignItems: 'center', 
    justifyContent:'space-between',
  },
  fileUploadedText: { 
    fontSize:12, 
    fontWeight:'500', 
    flexWrap:'wrap' 
  },
  fileUploadView:{
    flexDirection:'row', 
    alignItems: 'center'
  },
  uploadButton: {
    marginLeft: 10,
    backgroundColor: COLORS.ThemeGreen,
    width: 84,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.white,
  },
  browseStyle: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.ThemeGreen,
    textDecorationLine: "underline",
  },
  commentInput: {
    width: 348,
    marginTop: 10,
    marginHorizontal: "5%",
    height: 129,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    borderColor: COLORS.InputBorderColor,
    borderWidth: 1,
    textAlignVertical:'top',
  },
  borderView: {
    width: '90%',
    height: 35,
    borderRadius: 4,
    borderColor: COLORS.transparentGrey,
    borderWidth: 1,
    justifyContent: 'center',
    borderLeftColor: COLORS.leftBorder,
    borderLeftWidth: 3,
    marginVertical: 20,
  },
  textStyle: {
    marginLeft: 12,
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.blackCode,
  },
  flatlistHeading: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    padding: "4%",
    // height:80,
  },
  tableHeadingTxt: {
    fontSize: 14,
    fontWeight: "400",
  },
  tableDataTextStyle: {
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.blackCode,
    textTransform: 'capitalize',
  },
  column1View: {
    width: "20%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: "2%",
  },
  column2View: {
    width: "40%",
    flexDirection: "row",
    // justifyContent: "flex-start",
    // paddingLeft: "2%",
  },
  column3View: {
    width: "40%",
    flexDirection: "row",
    // justifyContent: "center",
    // paddingLeft: "7%",
  },
  flatlisrRowView: {
    flexDirection: "row",
    alignItems: "center",
    // height: 70,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
    padding: "4%",
  },
  column1Data: {
    width: "20%",
    // paddingRight:'7%',
  },
  column2Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "9%",
  },
  column2Data: {
    width: "40%",
    // paddingLeft: '2%',
  },
  column3Data: {
    width: "40%",
    // paddingLeft: "4%",
  },
  column3Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "10%",
  },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.blackCode,
    textAlign:'center',
    marginTop: 40
  },
  errorIcon: {
    marginTop: 2,
    marginLeft: 2,
  },
  errorView: {
    marginHorizontal: '4%',
    marginTop: '4%',
    flexDirection: 'row',
  },
  errorText: {
    color: COLORS.red,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '400',
  },
  gErrorText: {
    marginLeft: '5%'
  },
  button: {
    marginVertical: HEIGHT / 20,
    width: WIDTH - WIDTH / 10,
    alignSelf:'center'
  },
});
export default TeacherAssignmentReport;
