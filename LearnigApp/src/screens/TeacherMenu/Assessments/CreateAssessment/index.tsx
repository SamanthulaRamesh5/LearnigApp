import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import { Dropdown } from "react-native-element-dropdown";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import BackHeader from "../../../../component/BackHeader";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION_CONSTANT from "../../../../locales/constantsNavigation";
import endurl from "../../../../app/endurl";
import { useSelector } from "react-redux";
import { getAPIRequest } from "../../../../app/apiController";
import Loader from "../../../../component/Loader";
import { typeDropdownData } from "../../../../locales/dataConstant";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { addAssessmentData } from "../../../../store/createAssessmentSlice";

interface dataItem {
  id: number;
  name: string;
  // online: string;
  // printed: string;
}

interface courseItem {
  id: number;
  name: string;
}

interface classItem {
  id: number;
  name: string;
}
interface assesmentItem {
  id: number;
  name: string;
}

const CreateAssessmentTeacher = () => {
  const navigation: any = useNavigation();

  const [type, setType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [subjectSelect, setSubject] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [courseData, setCourseData] = useState<courseItem[]>([]);
  const [categoryData, setCategoryData] = useState<dataItem[]>([]);
  const [classData, setClassData] = useState<classItem[]>([]);
  const [assesmnetList, setAssesmentList] = useState<assesmentItem[]>([]);
  const [isLoading, setLoader] = useState(true);
  const loginData = useSelector((state: any) => state.login.data);
  const user_id = loginData?.user_id;

  const school_id = loginData?.school_id;
  const token = loginData?.AccessToken;
  const dispatch = useDispatch();

  const extraData = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  useFocusEffect(
    React.useCallback(() => {
      setSelectedCourse("");
      setSubject("");
      setSelectCategory("");
      setType("");
      getAssesmentList();
    }, [])
  );

  useEffect(() => {
    getCourseData();
    getClassData();
    getCategoryList();
  }, []);

  useEffect(() => {
    getAssesmentList();
  }, [selectedCourse]);

  useEffect(() => {
    getAssesmentList();
  }, [subjectSelect]);
  useEffect(() => {
    getAssesmentList();
  }, [selectCategory]);
  useEffect(() => {
    getAssesmentList();
  }, [type]);

  const getCategoryList = async () => {
    await getAPIRequest(
      endurl.CATEGORYLIST + `?ordering=-created_at&limit=500&selection=Category`
    )
      .then((res: any) => {
        const responseData = res?.data?.response?.results;

        const finalData = responseData.map((item: any) => {
          return {
            id: item.id,
            name: item.content,
          };
        });
        setCategoryData(finalData);
      })
      .catch((e) => {
        return e;
      });
  };

  const getCourseData = async () => {
    const url = endurl.COURSESLIST + `?limit=500`;

    await getAPIRequest(url, extraData)
      .then((res: any) => {
        const responseData = res?.data?.response.results;

        const finalData = responseData.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
        setCourseData(finalData);
      })
      .catch((e) => {
        return e;
      });
  };

  const getClassData = () => {
    getAPIRequest(
      endurl.ASIGNEDCLASSLIST + `?limit=1000&school_id=${school_id}`
    )
      .then((res: any) => {
        const responseData = res?.data?.response.results;

        const finalData = responseData.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
        setClassData(finalData);
      })
      .catch((e) => {
        return e;
      });
  };

  const getAssesmentList = () => {
    const url =
      endurl.ASSESMENTLIST +
      `?limit=10&offset=0&ordering=-created_at&courses_name=${selectedCourse}&grade_name=${subjectSelect}&is_paperscorer_type=${type}&category=${selectCategory}&user_id=${user_id}`;

    getAPIRequest(url)
      .then((res: any) => {
        setLoader(false);
        const responseData = res?.data?.response.results;

        const finalData = responseData.map((item: any) => {
          return {
            id: item.id,
            name: item.assessment_name,
          };
        });
        setAssesmentList(finalData);
      })
      .catch((e) => {
        setLoader(isLoading);
        return e;
      });
  };

  const goToAssignedAssessmentScreen = (item: any) => {
    navigation.navigate(NAVIGATION_CONSTANT.TEACHER_CREATE_ASSESSMENT_ASSIGN, {
      data: item,
    });
  };

  const goToPrintAssessmmentScreen = (item: any) => {
    dispatch(addAssessmentData(item));
    navigation.navigate(NAVIGATION_CONSTANT.PRINTASSESSMENT);
  };

  // Function to render the data in table format
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.flatlisrRowView}>
        <View style={styles.column1Data}>
          <Text style={[styles.textStyle]}>{item.name}</Text>
        </View>

        <View style={styles.column2Data}>
          <TouchableOpacity onPress={() => goToAssignedAssessmentScreen(item)}>
            <Text style={styles.textStyleClickable}>{`${
              item.is_paperscorer_type == false ? "Assign" : "NA"
            }`}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.column3Data}>
          <TouchableOpacity onPress={() => goToPrintAssessmmentScreen(item)}>
            <Text style={styles.textPrintedStyle}>{`${
              item.is_paperscorer_type == true ? "Assign" : "NA"
            }`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <View style={styles.mainView}>
        <BackHeader title={CONSTANT.CREATE_ASSESMENT} />
        <React.Fragment>
          <View style={{ flex: 1 }}>
            <View>
              {/* Display Header of the table */}

              {/*  Render the content in a table format */}

              {isLoading ? (
                <Loader />
              ) : (
                <FlatList
                  data={assesmnetList}
                  contentContainerStyle={{ paddingBottom: 150 }}
                  keyExtractor={(item: any) => item?.id?.toString()}
                  ListHeaderComponent={
                    <View style={styles.marginView}>
                      <Text style={styles.subTextStyle}>
                        {CONSTANT.SELECTCOURSE}
                      </Text>

                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconColor={COLORS.Black}
                        data={courseData}
                        maxHeight={140}
                        labelField="name"
                        valueField="name"
                        placeholder="Select"
                        value={selectedCourse}
                        onChange={(item: any) => {
                          setSelectedCourse(item.name);
                        }}
                      />
                      <Text style={styles.subjectText}>
                        {CONSTANT.SELECT_CLASS}
                      </Text>

                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconColor={COLORS.Black}
                        data={classData}
                        maxHeight={100}
                        labelField="name"
                        valueField="name"
                        placeholder="Select"
                        value={subjectSelect}
                        onChange={(item: any) => {
                          setSubject(item.name);
                        }}
                      />

                      <Text style={styles.subjectText}>
                        {CONSTANT.SELECT_CATEGORY}
                      </Text>

                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconColor={COLORS.Black}
                        data={categoryData}
                        maxHeight={100}
                        labelField="name"
                        valueField="name"
                        placeholder="Select"
                        value={selectCategory}
                        onChange={(item: any) => {
                          setSelectCategory(item.name);
                        }}
                      />

                      <Text style={styles.subjectText}>
                        {CONSTANT.SELECT_TYPE}
                      </Text>

                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconColor={COLORS.Black}
                        data={typeDropdownData}
                        maxHeight={100}
                        labelField="label"
                        valueField="value"
                        placeholder="Select"
                        value={type}
                        onChange={(item: any) => {
                          setType(item.value);
                        }}
                      />
                      <View style={styles.flatlistHeading}>
                        {/*  Heading Column # 1 */}
                        <View style={styles.column1View}>
                          <Text style={styles.tableHeadingTxt}>
                            {CONSTANT.ASSESSNAME}
                          </Text>
                        </View>

                        {/*  Heading Column # 2 */}
                        <View style={styles.column2View}>
                          <Text style={styles.tableHeadingTxt}>
                            {CONSTANT.ONLINE}
                          </Text>
                        </View>

                        {/*  Heading Column # 3 */}
                        <View style={styles.column3View}>
                          <Text style={styles.tableHeadingTxt}>
                            {CONSTANT.PRINTED}
                          </Text>
                        </View>
                      </View>
                    </View>
                  }
                  renderItem={(item) => renderItem(item)}
                  scrollEnabled={true}
                  ListEmptyComponent={
                    <View
                      style={{
                        paddingVertical: 5,
                        alignSelf: "center",
                      }}
                    >
                      <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
                    </View>
                  }
                />
              )}
            </View>
          </View>
        </React.Fragment>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateAssessmentTeacher;
