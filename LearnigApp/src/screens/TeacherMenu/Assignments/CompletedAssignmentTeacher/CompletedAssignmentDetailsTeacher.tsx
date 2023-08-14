import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getAPIRequest } from "../../../../app/apiController";
import BackHeader from "../../../../component/BackHeader";
import styles from "./styles";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import endurl from "../../../../app/endurl";
import Loader from "../../../../component/Loader";

interface dataItem {
  id: number;
  firstName: string;
  lastName: string;
}

interface completedDataItem extends dataItem {
  score: number;
}

const CompletedAssignmentDetailsTeacher = ({ route }: any) => {
  const assigmentItem = route?.params?.assignment;
  const loginData = useSelector((state: any) => state.login.data);
  const school_id = loginData?.school_id;
  const user_id = loginData?.user_id;
  // const school_id = 5396;
  // const user_id = 1976;
  const status = [CONSTANT.SUBMITTED_STATUS, CONSTANT.COMPLETED_STATUS];
  const navigation: any = useNavigation();

  const [isLoading, setLoader] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>(
    CONSTANT.COMPLETED_STATUS
  );
  const [completedData, setCompletedData] = useState<completedDataItem[]>([]);
  const [notCompletedData, setNotCompletedData] = useState<dataItem[]>([]);


  useFocusEffect(
    React.useCallback(() => {
      setSelectedTab(CONSTANT.COMPLETED_STATUS)
      completedAssignmentDetailsApi();
    }, [])
  );

  const completedAssignmentDetailsApi = async () => {
    setLoader(true);
    const url =
      endurl.TEACHER_COMPLETED_ASSIGNMENT_STUDENT_LIST +
      assigmentItem.id +
      `/list/?&offset=0&search=&limit=10`;

    let headers = {
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      Accept: "*/*",
    };

    getAPIRequest(url, headers)
      .then((res: any) => {
        const responseData = res?.data?.response?.results;

        const tempCompletedData = responseData.filter(
          (item: any) => status.indexOf(item.state) != -1
        );
        const tempNotCompletedData = responseData.filter(
          (item: any) => status.indexOf(item.state) == -1
        );

        setCompletedData(tempCompletedData);
        setNotCompletedData(tempNotCompletedData);

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const renderItemCompleted = ({ item }: any) => (
    <View style={styles.flatlistRowView}>
      <View style={styles.column1Data}>
        <Text style={[localStyles.textStyle]}>{item.first_name}</Text>
      </View>

      <View style={styles.column2Data}>
        <Text style={localStyles.textStyle}>{item.last_name}</Text>
      </View>

      <View
        style={[
          styles.scoreView,
          {
            backgroundColor:
              item.score <= 35
                ? COLORS.bgOrange
                : item.score >= 36 && item.score <= 60
                ? COLORS.bgYellow
                : item.score >= 61 && item.score <= 80
                ? COLORS.bgBlue
                : item.score >= 81 && item.score <= 100
                ? COLORS.bgGreen
                : COLORS.Black,
          },
        ]}
      >
        <Text style={[localStyles.textStyle]}>
          {item.score == null ? 0 : item.score}
        </Text>
      </View>
    </View>
  );

  const renderItemNotCompleted = ({ item }: any) => (
    <View style={localStyles.flatlistRowViewNC}>
      <View style={localStyles.column1DataNC}>
        <Text style={[localStyles.textStyle]}>{item.first_name}</Text>
      </View>

      <View style={localStyles.column2DataNC}>
        <Text style={localStyles.textStyle}>{item.last_name}</Text>
      </View>
    </View>
  );

  const renderTab = (tabName: string) => {
    if (tabName === CONSTANT.COMPLETED_STATUS) {
      return (
        <View style={localStyles.flatlistMain}>
          {/* Display Header of the table */}
          <View style={localStyles.flatlistHeading}>
            {/*  Heading Column # 1 */}
            <View style={styles.column1View}>
              <Text style={localStyles.tableHeadingTxt}>
                {CONSTANT.FIRST_NAME}
              </Text>
            </View>

            {/*  Heading Column # 2 */}
            <View style={styles.column2View}>
              <Text style={[localStyles.tableHeadingTxt]}>
                {CONSTANT.LAST_NAME}
              </Text>
            </View>

            {/*  Heading Column # 3 */}
            <View style={styles.column3View}>
              <Text style={localStyles.tableHeadingTxt}>
                {CONSTANT.SCORE} {CONSTANT.PERCENT}
              </Text>
            </View>
          </View>

          <FlatList
            data={completedData}
            keyExtractor={(item: any) => item.id}
            renderItem={renderItemCompleted}
            ListEmptyComponent={
              isLoading ? (
                <Loader />
              ) : (
                <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
              )
            }
            scrollEnabled={true}
          />
        </View>
      );
    } else if (tabName === CONSTANT.NOT_COMPLETED_STATUS) {
      return (
        <View style={localStyles.flatlistMain}>
          {/* Display Header of the table */}
          <View style={localStyles.flatlistHeading}>
            {/*  Heading Column # 1 */}
            <View style={localStyles.column1ViewNC}>
              <Text style={localStyles.tableHeadingTxt}>
                {CONSTANT.FIRST_NAME}
              </Text>
            </View>

            {/*  Heading Column # 2 */}
            <View style={localStyles.column2ViewNC}>
              <Text
                style={[
                  localStyles.tableHeadingTxt,
                  { paddingRight: "8%", paddingLeft: "2%" },
                ]}
              >
                {CONSTANT.LAST_NAME}
              </Text>
            </View>
          </View>

          <FlatList
            data={notCompletedData}
            keyExtractor={(item: any) => item.id}
            renderItem={renderItemNotCompleted}
            ListEmptyComponent={
              isLoading ? (
                <Loader />
              ) : (
                <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
              )
            }
            scrollEnabled={true}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={[styles.mainView, { flex: 1 }]}>
      <BackHeader title={assigmentItem.title} />

      <View style={{ flexDirection: "row", marginTop: "10%" }}>
        <TouchableOpacity
          onPress={() => setSelectedTab(CONSTANT.COMPLETED_STATUS)}
          style={[
            localStyles.tabStyle,
            localStyles.completedTab,
            {
              backgroundColor:
                selectedTab == CONSTANT.COMPLETED_STATUS
                  ? COLORS.green
                  : COLORS.LIGHT_GREY,
            },
          ]}
        >
          <Text
            style={[
              localStyles.textStyle,
              {
                color:
                  selectedTab === CONSTANT.COMPLETED_STATUS
                    ? COLORS.white
                    : COLORS.blackCode,
              },
            ]}
          >
            {CONSTANT.COMPLETED}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab(CONSTANT.NOT_COMPLETED_STATUS)}
          style={[
            localStyles.tabStyle,
            {
              backgroundColor:
                selectedTab === CONSTANT.NOT_COMPLETED_STATUS
                  ? COLORS.green
                  : COLORS.LIGHT_GREY,
            },
          ]}
        >
          <Text
            style={[
              localStyles.textStyle,
              {
                color:
                  selectedTab === CONSTANT.NOT_COMPLETED_STATUS
                    ? COLORS.white
                    : COLORS.blackCode,
              },
            ]}
          >
            {CONSTANT.NOTCOMPLETED}
          </Text>
        </TouchableOpacity>
      </View>

      {renderTab(selectedTab)}
    </SafeAreaView>
  );
};

export default CompletedAssignmentDetailsTeacher;

const localStyles = StyleSheet.create({
  flatlistHeading: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: COLORS.lightGrey,
    padding: "4%",
    height: 70,
  },
  flatlistMain: {
    flex: 1,
    marginHorizontal: "4%",
    // marginTop:'8%',
    padding: "3%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    alignItems: "center",
  },
  flatlistRowViewNC: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    width: "100%",
    height: 60,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  tableHeadingTxt: {
    fontSize: 14,
    fontWeight: "400",
  },
  column1ViewNC: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column1DataNC: {
    width: "50%",
    paddingLeft: "4%",
  },
  column2ViewNC: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column2DataNC: {
    width: "50%",
    paddingLeft: "2%",
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 17,
    paddingRight: "2%",
    color: COLORS.blackCode,
    flexWrap: "wrap",
  },
  tabStyle: {
    height: 57,
    width: 160,
    borderWidth: 1,
    borderColor: COLORS.border_color,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  completedTab: {
    marginLeft: "4%",
  },
});
