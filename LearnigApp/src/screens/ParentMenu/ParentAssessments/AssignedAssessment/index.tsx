import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeaderForParent from "../../../../component/BackHeaderForParent";
import Images from "../../../../assests/images";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import styles from "./styles";
import { useSelector } from "react-redux";
import endurl from "../../../../app/endurl";
import { getAPIRequest } from "../../../../app/apiController";
import Loader from "../../../../component/Loader";

interface dataItem {
  id: number;
  title: string;
  dueDate: string;
  status: string;
}

const AssignedAssessment = () => {
  const token = useSelector((state: any) => state.login.data?.AccessToken);
  const selectedStudent = useSelector((state: any) => state.dropdown.data);
  const [isError, setIsError] = useState();
  const [assessmentData, setAssessmentData] = useState<dataItem[]>([]);
  const [loading, setLoading] = useState(false);

  const sortAscending = (header: string) => {
    const titleArr = [...assessmentData];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
      );

      setAssessmentData(titleArr);
    } else if (header === CONSTANT.DUEDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA < dateB ? 1 : -1;
      });

      setAssessmentData(titleArr);
    } else if (header === CONSTANT.STATUS) {
      titleArr.sort((a: any, b: any) =>
        a.status.toLowerCase() < b.status.toLowerCase() ? 1 : -1
      );

      setAssessmentData(titleArr);
    }
  };

  const sortDescending = (header: string) => {
    const titleArr = [...assessmentData];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      );

      setAssessmentData(titleArr);
    } else if (header === CONSTANT.SUBMITDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA > dateB ? 1 : -1;
      });

      setAssessmentData(titleArr);
    } else if (header === CONSTANT.STATUS) {
      titleArr.sort((a: any, b: any) =>
        a.status.toLowerCase() > b.status.toLowerCase() ? 1 : -1
      );

      setAssessmentData(titleArr);
    }
  };

  useEffect(() => {
    getAssessmentData();
  }, [selectedStudent]);

  const getAssessmentData = () => {
    setIsError("");
    setLoading(true);
    let headers = {
      Authorization: `Bearer ${token}`,
    };
console.log(endurl.PARENTASSESSLIST + `?limit=10&offset=0&student_id=${selectedStudent.value}`)
    getAPIRequest(
      endurl.PARENTASSESSLIST + `?limit=10&offset=0&student_id=${selectedStudent.value}`,
      headers
    )
      .then((res: any) => {
        const responseData = res.data.response.results;
        // console.log("Response from aPI - ", responseData);
        console.log(responseData)

        const finalData = responseData.map((item: any) => ({
          id: item.assessment_id,
          title: item.assessment_name,
          dueDate: item.submission_date,
          status: item.status,
        }));
        // console.log("Final Data- ",finalData);
        setAssessmentData(finalData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        handleError(error);
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

  // Function to render the data in table format
  const renderItem: React.FC<{ item: dataItem }> = ({ item }) => (
    <View style={styles.flatlisrRowView}>
      <View style={localStyles.column1Data}>
        <Text style={[styles.textStyle]}>{item.title}</Text>
      </View>

      <View style={localStyles.column2Data}>
        <Text style={styles.textStyle}>{item.dueDate}</Text>
      </View>

      <View style={localStyles.column3Data}>
        <Text style={styles.textStyle}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeaderForParent
        dropdown={true}
        title={CONSTANT.ASSIGNED_ASSESMENT}
      />

      <View style={styles.flatlistMain}>
        {/* Display Header of the table */}
        <View style={styles.flatlistHeading}>
          {/*  Heading Column # 1 */}
          <View style={localStyles.column1View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.TITLE}</Text>
            <View style={localStyles.column1Icon}>
              <TouchableOpacity onPress={() => sortAscending(CONSTANT.TITLE)}>
                <Images.AngleUp height={10} width={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sortDescending(CONSTANT.TITLE)}>
                <Images.AngleDown height={10} width={10} />
              </TouchableOpacity>
            </View>
          </View>

          {/*  Heading Column # 2 */}
          <View style={localStyles.column2View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.DUEDATE}</Text>
            <View style={localStyles.column2Icon}>
              <TouchableOpacity onPress={() => sortAscending(CONSTANT.DUEDATE)}>
                <Images.AngleUp height={10} width={10} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sortDescending(CONSTANT.DUEDATE)}
              >
                <Images.AngleDown height={10} width={10} />
              </TouchableOpacity>
            </View>
          </View>

          {/*  Heading Column # 3 */}
          <View style={localStyles.column3View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.STATUS}</Text>
            <View style={localStyles.column3Icon}>
              <TouchableOpacity onPress={() => sortAscending(CONSTANT.STATUS)}>
                <Images.AngleUp height={10} width={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sortDescending(CONSTANT.STATUS)}>
                <Images.AngleDown height={10} width={10} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {selectedStudent.label ? (
          loading ? (
            <Loader />
          ) : assessmentData.length > 0 ? (
            <FlatList
              data={assessmentData}
              keyExtractor={(item: any) => item.id}
              renderItem={renderItem}
              scrollEnabled={true}
              style={{flex:1}}
              contentContainerStyle={{paddingBottom:100}}
            />
          ) : isError ? (
            <View style={localStyles.errorView}>
              <Text style={localStyles.errorText}>{isError}</Text>
            </View>
          ) : (
            <View>
              <Text style={localStyles.noDataText}>{CONSTANT.NO_DATA}</Text>
            </View>
          )
        ) : (
          <View style={localStyles.noChildView}>
            <Text style={localStyles.noDataFound}>
              {CONSTANT.PLEASE_SELECT_CHILD}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AssignedAssessment;

const localStyles = StyleSheet.create({
  column1View: {
    width: "36%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column1Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "45%",
  },
  column1Data: {
    width: "36%",
    paddingRight: "7%",
  },
  column2View: {
    width: "32%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "4%",
  },
  column2Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "9%",
  },
  column2Data: {
    width: "32%",
    paddingLeft: "4%",
  },
  column3View: {
    width: "32%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "6%",
  },
  column3Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "10%",
  },
  column3Data: {
    width: "32%",
    paddingLeft: "6%",
  },
  noDataText: {
    color: COLORS.Black,
    alignSelf: "center",
    marginTop: "20%",
    fontSize: 16,
    fontWeight: "400",
  },
  errorView: {
    padding: 10,
  },
  errorText: {
    fontWeight: "400",
    fontSize: 12,
    padding: 10,
    lineHeight: 19,
    color: COLORS.red,
  },
  noChildView: {
    flex: 1,
    alignItems: "center",
    marginTop: "30%",
  },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.blackCode,
  },
});
