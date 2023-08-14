import React, { useState } from "react";
import { SafeAreaView, View, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import styles from "./CompletedAssessmentStyles";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeader from "../../../../component/BackHeader";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import endurl from "../../../../app/endurl";
import { getAPIRequest } from "../../../../app/apiController";
import Loader from "../../../../component/Loader";

interface dataItem {
  id: number;
  title: string;
  class: string;
  count: string;
  bgColor: string;
  percentage: number;
}

const CompletedAssessmentDetail = (props: any) => {
  let assessmentName = props?.route?.params?.titleName;
  // let completedData = props?.route?.params?.complete;
  // let notcompletedData = props?.route?.params?.incomplete;
  const [selectedTab, setSelectedTab] = useState("completed");
  const loginData = useSelector((state: any) => state.login.data);
  const [isLoading, setLoader] = useState(true);
  const user_id = loginData?.user_id;
  const navigation: any = useNavigation();
  const [completedData, setCompletedData] = useState<dataItem[]>([]);
  const [notcompletedData, setNotCompletedData] = useState<dataItem[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      callAssessmenAPI();
    }, [])
  );

  const callAssessmenAPI = async () => {
    getAPIRequest(
      endurl.TEACHER_COMPLETED_ASSESSMENT_LIST + `?user_id=${user_id}`
    )
      .then((res: any) => {
        setLoader(false);
        const responseData = res?.data?.response.results;
        responseData.map((item: any) => {
          const completed_data = item.completed_student;
          const notCompleted_data = item.incompleted_student;
          setCompletedData(completed_data);
          setNotCompletedData(notCompleted_data);
        });
      })
      .catch((error) => {
        setLoader(isLoading);
        // handleError(error);
      });
  };

  const renderCompletedItem = ({ item }: any) => {
    return (
      <View style={styles.flatlistRowView}>
        <View style={styles.column1Data}>
          <Text style={[styles.textStyle]}>{item.first_name}</Text>
        </View>

        <View style={styles.column2Data}>
          <Text style={styles.textStyle}>{item.last_name}</Text>
        </View>

        <View
          style={[
            styles.scoreView,
            {
              backgroundColor:
                item.percentage <= 35
                  ? COLORS.bgOrange
                  : item.percentage >= 36 && item.percentage <= 60
                  ? COLORS.bgYellow
                  : item.percentage >= 61 && item.percentage <= 80
                  ? COLORS.bgBlue
                  : item.percentage >= 81 && item.percentage <= 100
                  ? COLORS.bgGreen
                  : COLORS.white,
            },
          ]}
        >
          <Text style={styles.textStyle}>{item.percentage}</Text>
        </View>
      </View>
    );
  };
  const renderNotCOmpletedItem = ({ item }: any) => {
    return (
      <View style={styles.flatlistRowView1}>
        <View style={styles.column1_Data}>
          <Text style={[styles.textStyle]}>{item.first_name}</Text>
        </View>

        <View style={styles.column2_Data}>
          <Text style={[styles.textStyle]}>{item.last_name}</Text>
        </View>
      </View>
    );
  };

  const renderTab = (tabName: any) => {
    if (tabName === "completed") {
      return (
        <View style={styles.flatlistMain}>
          {/* Display Header of the table */}
          <View style={styles.flatlistHeading}>
            {/*  Heading Column # 1 */}
            <View style={styles.column1View}>
              <Text style={styles.tableHeadingTxt}>{CONSTANT.FIRST_NAME}</Text>
            </View>

            {/*  Heading Column # 2 */}
            <View style={styles.column2View}>
              <Text style={[styles.tableHeadingTxt, { paddingRight: "12%" }]}>
                {CONSTANT.LAST_NAME}
              </Text>
            </View>

            {/*  Heading Column # 3 */}
            <View style={styles.column3View}>
              <Text style={styles.tableHeadingTxt}>
                {CONSTANT.SCORE} {CONSTANT.PERCENT}
              </Text>
            </View>
          </View>

          {completedData?.length <= 0 ? (
            <View style={styles.noDataFoundView}>
              <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
            </View>
          ) : (
            <FlatList
              data={completedData}
              keyExtractor={(item: any) => item.id}
              renderItem={renderCompletedItem}
              ListEmptyComponent={
                isLoading ? (
                  <Loader />
                ) : (
                  <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
                )
              }
              scrollEnabled={true}
            />
          )}
        </View>
      );
    } else if (tabName === "notCompleted") {
      return (
        <View style={styles.flatlistMain}>
          <View style={styles.flatlistHeading}>
            {/*  Heading Column # 1 */}
            <View style={styles.column1_View}>
              <Text style={styles.tableHeadingTxt}>{CONSTANT.FIRST_NAME}</Text>
            </View>

            {/*  Heading Column # 2 */}
            <View style={styles.column2_View}>
              <Text style={[styles.tableHeadingTxt, { paddingRight: "12%" }]}>
                {CONSTANT.LAST_NAME}
              </Text>
            </View>
          </View>

          {notcompletedData?.length <= 0 ? (
            <View style={styles.noDataFoundView}>
              <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
            </View>
          ) : (
            <FlatList
              data={notcompletedData}
              keyExtractor={(item: any) => item.id}
              renderItem={renderNotCOmpletedItem}
              ListEmptyComponent={
                isLoading ? (
                  <Loader />
                ) : (
                  <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
                )
              }
              scrollEnabled={true}
            />
          )}
        </View>
      );
    }
  };

  return (
    <View style={styles.mainView}>
      <BackHeader title={assessmentName} />
      <View style={{ flex: 1 }}>
        <View style={styles.tabView}>
          <TouchableOpacity onPress={() => setSelectedTab("completed")}>
            <Text
              style={
                selectedTab === "completed"
                  ? styles.selectedtabStyles
                  : styles.tabStyles
              }
            >
              {CONSTANT.COMPLETED}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab("notCompleted")}>
            <Text
              style={
                selectedTab === "notCompleted"
                  ? styles.selectedtabStyles
                  : styles.tabStyles
              }
            >
              {" "}
              {CONSTANT.NOTCOMPLETED}
            </Text>
          </TouchableOpacity>
        </View>
        {renderTab(selectedTab)}
      </View>
    </View>
  );
};

export default CompletedAssessmentDetail;
