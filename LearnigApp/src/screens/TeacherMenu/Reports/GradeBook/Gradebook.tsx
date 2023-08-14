import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";

import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeader from "../../../../component/BackHeader";
import CONSTANT from "../../../../locales/constants";
import Images from "../../../../assests/images";
import { getAPIRequest } from "../../../../app/apiController";
import endurl from "../../../../app/endurl";
import Loader from "../../../../component/Loader";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import COLORS from "../../../../assests/color";

interface dataItem {
  id: number;
  fName: string;
  lName: string;
  test1: string;
  test2: string;
  finalScoretotal: string;
  finalScoreAvg: string;
}

const Gradebook = () => {
  const navigation: any = useNavigation();
  const loginData = useSelector((state: any) => state.login.data);

  const [classData, setClassData] = useState([
    { label: "No Data Found", value: -1 },
  ]);
  const [selectedClass, setSelectedClass] = useState<string>();
  const [isError, setIsError] = useState("");
  const [isLoading, setLoader] = useState(false);
  const [gradeList, setGradeList] = useState([]);
  const [testcolumns, setTestColumns] = useState([]);
  const schoolId = loginData?.school_id;
  const branchId = loginData?.branch_id ? loginData?.branch_id : '';
  const token = loginData?.AccessToken;
  const headers = {
    Authorization: `Bearer ${token}`,
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Accept: "*/*",
  };

  useEffect(() => {
    callClassAPI();
    // getGradeBookList();
  }, []);

  const handleError = (error: any) => {
    const val: any = Object.values(error.response.data.errors);
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

        const responseData = res?.data?.response?.results;

        const finalData = responseData?.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));

        setClassData(finalData);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const getGradeBookList = (classId: any) => {

    setLoader(true);
    getAPIRequest(
      endurl.GRADE_BOOK + `?class_id=${classId}&school_id=${schoolId}`
    )
      .then((res: any) => {
        setLoader(false);
        const { status } = res;
        if (status == 200) {

          setTestColumns(res?.data?.response?.tests);
          setGradeList(res?.data?.response?.students);
        }
      })
      .catch((error) => {
        setLoader(false);
        handleError(error);
      });
  };

  // Function to render the data in table format
  const renderItem = ({ item, index }: any) => {
    const srNo = index + 1;
    return (
      <View
        style={[
          styles.flatlisrRowView,
          { width:  (testcolumns?.length > 0 ? 600 + testcolumns?.length  * 100  : 600) },
        ]}
      >
        <View style={styles.column1Data}>
          <Text style={[styles.textStyle]}>{srNo}</Text>
        </View>
        <View style={styles.column2Data}>
          <Text style={[styles.textStyle]}>{item.first_name}</Text>
        </View>

        <View style={styles.column3Data}>
          <Text style={styles.textStyle}>{item.last_name}</Text>
        </View>
        {item?.grade_tests.map((test: any) => (
          <View style={styles.column4Data}>
            <Text style={styles.textStyle}>{test.score}</Text>
          </View>
        ))}
        <View style={styles.column6Data}>
          <Text style={styles.textStyle}>{item.final_score}</Text>
        </View>
        <View style={styles.column7Data}>
          <Text style={styles.textStyle}>{item.average}</Text>
        </View>
      </View>
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.mainView}>
      
      <BackHeader title={CONSTANT.GRADEBOOK} />
      <View style={styles.DropdownView}>
        <View style={styles.classDropdownView}>
          <Text style={styles.subTextStyle}> {CONSTANT.SELECT_CLASS}</Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconColor={COLORS.Black}
            data={classData}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={selectedClass}
            onChange={(item: any) => {
              setSelectedClass(item.value);
              getGradeBookList(item.value);
            }}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal={true}
      >
        <View style={styles.flatlistMain}>
          {/* Display Header of the table */}
          <View
            style={[
              styles.flatlistHeading,
              { width: (testcolumns?.length > 0 ? 600 + testcolumns?.length  * 100  : 600) },
            ]}
          >
            {/*  Heading Column # 1 */}
            <View style={styles.column1View}>
              <Text style={styles.tableHeadingTxt}>{CONSTANT.SRNO}</Text>
              <View style={styles.column1Icon}>
                <Images.AngleUp height={10} width={10} />
                <Images.AngleDown height={10} width={10} />
              </View>
            </View>

            {/*  Heading Column # 2 */}
            <View style={styles.column2View}>
              <Text style={styles.tableHeadingTxt}>{CONSTANT.FIRST_NAME}</Text>
              <View style={styles.column1Icon}>
                <Images.AngleUp height={10} width={10} />
                <Images.AngleDown height={10} width={10} />
              </View>
            </View>

            {/*  Heading Column # 3 */}
            <View style={styles.column3View}>
              <Text style={styles.tableHeadingTxt}>{CONSTANT.LAST_NAME}</Text>
              <View style={styles.column1Icon}>
                <Images.AngleUp height={10} width={10} />
                <Images.AngleDown height={10} width={10} />
              </View>
            </View>

            {/*  Heading Column # 3 */}
            {testcolumns?.map((item: any) => (
              <View style={styles.column4View}>
                <Text style={styles.tableHeadingTxt}>{item.title}</Text>
                <View style={styles.column1Icon}>
                  <Images.AngleUp height={10} width={10} />
                  <Images.AngleDown height={10} width={10} />
                </View>
              </View>
            ))}

            <View style={styles.column6View}>
              <Text style={styles.tableHeadingTxt}>
                {CONSTANT.FINALSCORE_TOTAL}
              </Text>
              <View style={styles.column4Icon}>
                <Images.AngleUp height={10} width={10} />
                <Images.AngleDown height={10} width={10} />
              </View>
            </View>

            <View style={styles.column7View}>
              <Text style={styles.tableHeadingTxt}>
                {CONSTANT.FINALSCORE_AVG}
              </Text>
              <View style={styles.column4Icon}>
                <Images.AngleUp height={10} width={10} />
                <Images.AngleDown height={10} width={10} />
              </View>
            </View>
          </View>

          {gradeList?.length > 0 ? (
            <FlatList
              key={"id"}
              data={gradeList}
              keyExtractor={(item: any, index) => item.id.toString()}
              renderItem={renderItem}
            />
          ) : (
            <View style={styles.noDataFoundView}>
              <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Gradebook;
