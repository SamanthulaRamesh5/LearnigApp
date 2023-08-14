import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import CommonBorder from "../../../../../component/CommonBorder";
import TeacherHeader from "../../../../../component/TeacherHeader";
import BackHeaderForParent from "../../../../../component/BackHeaderForParent";
import COLORS from "../../../../../assests/color";
import CONSTANT from "../../../../../locales/constants";
import Images from "../../../../../assests/images";
import NAVIGATION_CONSTANT from "../../../../../locales/constantsNavigation";
import moment from "moment";
import { getAPIRequest } from "../../../../../app/apiController";
import endurl from "../../../../../app/endurl";
import { useSelector } from "react-redux";
import Loader from "../../../../../component/Loader";
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";

const TeacherAssignmentDetails = () => {
  const [submitDate, setSubmitDate] = useState<string>(
    moment().format("DD-MM-YYYY")
  );
  const [teacherName, setTeacherName] = useState<string>("Mark James");
  const [studentName, setStudentName] = useState<string>("");
  const [score, setScore] = useState<number>(35);
  const [selection, setSelection] = useState<string>("");
  const [correct, setCorrect] = useState<dataItem[]>([]);
  const [incorrect, setInCorrect] = useState<dataItem[]>([]);
  const [maybe, setMaybe] = useState<dataItem[]>([]);
  const [exclam, setExclam] = useState<dataItem[]>([]);
  const [displayData, setDisplayData] = useState<dataItem[]>([]);
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const { itemId, itemName } = route.params;
  const assignment_id = itemId;
  const student_name = itemName;

  const [isLoading, setLoader] = useState(true);
  const loginData = useSelector((state: any) => state.login.data);
  const token = loginData?.AccessToken;
  const [isModalVisible, setModalVisible] = useState(false);

  interface dataItem {
    id: number;
    question: string;
    status: string;
  }

  interface colorData {
    status: string;
    bgColor: string;
    borderColor: string;
  }

  const color: colorData[] = [
    {
      status: CONSTANT.CORRECT,
      bgColor: COLORS.correctBgColor,
      borderColor: COLORS.correctBorderColor,
    },
    {
      status: CONSTANT.INCORRECT,
      bgColor: COLORS.incorrectBgColor,
      borderColor: COLORS.maybeBorderColor,
    },
    {
      status: CONSTANT.MAYBE,
      bgColor: COLORS.maybeBgColor,
      borderColor: COLORS.incorrectBorderColorTeacher,
    },

    {
      status: CONSTANT.EXCLAM,
      bgColor: COLORS.exclamBgColor,
      borderColor: COLORS.exclamBorderColor,
    },
  ];

  const [allData, setAllData] = useState<dataItem[]>([
    {
      id: 1,
      question: "Question 1",
      status: "correct",
    },
    {
      id: 2,
      question: "Question 2",
      status: "incorrect",
    },
    {
      id: 3,
      question: "Question 3",
      status: "maybe",
    },
    {
      id: 4,
      question: "Question 4",
      status: "correct",
    },
    {
      id: 5,
      question: "Question 5",
      status: "exclam",
    },
  ]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getResultApi = () => {
    const url = endurl.TEACHER_ASSIGNMENT_RESULT + assignment_id + "/report/";

    let headers = {
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    getAPIRequest(url, headers)
      .then((res: any) => {
        setLoader(false);
        const responseData = res?.data?.response;
      })
      .catch((error) => {
        setLoader(false);
        console.log("error", error);
      });
  };

  useEffect(() => {
    setStudentName(student_name);
    filterData();
    getResultApi();
  }, []);

  const filterData = () => {
    setCorrect(allData.filter((item) => item.status === CONSTANT.CORRECT));
    setInCorrect(allData.filter((item) => item.status === CONSTANT.INCORRECT));
    setMaybe(allData.filter((item) => item.status === CONSTANT.MAYBE));
    setExclam(allData.filter((item) => item.status === CONSTANT.EXCLAM));
  };

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem = ({ item }: any) => {
    let colorData = color.filter((ele) => ele.status === item.status);

    return (
      <View style={styles.flatListMain}>
        <View
          style={[
            styles.mainRenderView,
            {
              backgroundColor:
                selection === CONSTANT.TOTAL
                  ? colorData[0].bgColor
                  : COLORS.white,
              borderLeftColor: colorData[0].borderColor,
            },
          ]}
        >
          <Text style={[styles.itemText, { paddingLeft: "4%" }]}>
            {item.question}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainView}>
      
      <BackHeaderForParent
        title={CONSTANT.ASSIGNMENT_DETAILS}
        dropdown={false}
      />
      <View style={styles.marginView}>
        <View style={styles.headerFirst}>
          <View>
            <View style={styles.submitDtView}>
              <Text style={[styles.submitDtText, styles.boldText]}>
                {CONSTANT.SUBMITDATE} :
              </Text>
              <Text style={styles.submitDtText}>{submitDate}</Text>
            </View>

            <View style={styles.teacherNameView}>
              <Text style={[styles.teacherNameText, styles.boldText]}>
                {CONSTANT.TEACHER}
              </Text>
              <Text style={styles.teacherNameText}>{teacherName}</Text>
            </View>

            <View style={styles.teacherNameView}>
              <Text style={[styles.teacherNameText, styles.boldText]}>
                {CONSTANT.STUDENT_NAME + ": "}
              </Text>
              <Text style={styles.teacherNameText}>{studentName}</Text>
            </View>

            <View style={styles.teacherNameView}>
              <Text style={[styles.teacherNameText, styles.boldText]}>
                {CONSTANT.CLASS + ": "}
              </Text>
              <Text style={styles.teacherNameText}>{CONSTANT.class1A}</Text>
            </View>

            {/* View to display the table header row */}
            <View style={styles.rowWiseView}>
              <View style={styles.performanceView}>
                <Text style={styles.numQuestionsTxt}>
                  {CONSTANT.NUM_OF_QUESTIONS}
                </Text>
              </View>

              {/* <View style={styles.divideView}></View> */}
              {/* Display GREEN tick */}
              <View style={styles.fromHeaderView}>
                <Images.CheckGreen />
              </View>

              {/* <View style={styles.divideView}></View> */}
              {/* Display ORANGE tick */}
              <View style={styles.toHeaderView}>
                <Images.RedCheck />
              </View>

              {/* <View style={styles.divideView}></View> */}
              {/* Display RED CROSS */}
              <View style={styles.wrongHeaderView}>
                <Images.CheckOrange />
              </View>

              {/* <View style={styles.divideView}></View> */}
              {/* Display EXCLAMATION  */}
              <View style={styles.lastHeaderView}>
                <Images.BlueCheck />
              </View>
              <View style={styles.lastHeaderView}>
                <Images.ThreeDot />
              </View>

              <Modal isVisible={isModalVisible}>
                <View
                  style={{
                    width: "50%",
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.bgGrey,
                  }}
                ></View>
              </Modal>
            </View>

            {/* Number of answers displayed below the ticks */}
            <View style={styles.rowNumberWiseView}>
              {/* Diplay total number of questions */}
              <TouchableOpacity
                style={styles.performanceView}
                onPress={() => {
                  setSelection(CONSTANT.TOTAL);
                  setDisplayData(allData);
                }}
              >
                <Text
                  style={[
                    styles.textView,
                    selection === CONSTANT.TOTAL ? styles.extraBoldText : null,
                  ]}
                >
                  {allData.length}
                </Text>
              </TouchableOpacity>
              <View style={styles.divideView}></View>

              {/* Diplay number of correct questions */}
              <TouchableOpacity
                style={styles.fromHeaderView}
                onPress={() => {
                  setSelection(CONSTANT.CORRECT);
                  setDisplayData(correct);
                }}
              >
                <Text
                  style={[
                    styles.textView,
                    selection === CONSTANT.CORRECT
                      ? styles.extraBoldText
                      : null,
                  ]}
                >
                  {correct.length}
                </Text>
              </TouchableOpacity>
              <View style={styles.divideView}></View>

              {/* Diplay number of maybe questions */}
              <TouchableOpacity
                style={styles.toHeaderView}
                onPress={() => {
                  setSelection(CONSTANT.MAYBE);
                  setDisplayData(maybe);
                }}
              >
                <Text
                  style={[
                    styles.textView,
                    selection === CONSTANT.MAYBE ? styles.extraBoldText : null,
                  ]}
                >
                  {maybe.length}
                </Text>
              </TouchableOpacity>
              <View style={styles.divideView}></View>

              {/* Diplay number of incorrect questions */}
              <TouchableOpacity
                style={styles.wrongHeaderView}
                onPress={() => {
                  setSelection(CONSTANT.INCORRECT);
                  setDisplayData(incorrect);
                }}
              >
                <Text
                  style={[
                    styles.textView,
                    selection === CONSTANT.INCORRECT
                      ? styles.extraBoldText
                      : null,
                  ]}
                >
                  {incorrect.length}
                </Text>
              </TouchableOpacity>
              <View style={styles.divideView}></View>

              {/* Diplay number of exclamation questions */}
              <TouchableOpacity
                style={styles.lastHeaderView}
                onPress={() => {
                  setSelection(CONSTANT.EXCLAM);
                  setDisplayData(exclam);
                }}
              >
                <Text
                  style={[
                    styles.textView,
                    selection === CONSTANT.EXCLAM ? styles.extraBoldText : null,
                  ]}
                >
                  {exclam.length}
                </Text>
              </TouchableOpacity>
            </View>

            {selection ? (
              <View style={styles.flatListMain}>
                <View
                  style={[
                    styles.mainRenderView,
                    {
                      backgroundColor: COLORS.lightGrey2,
                      borderLeftColor: COLORS.greyBorder,
                    },
                  ]}
                >
                  <Text style={[styles.itemText, { paddingLeft: "4%" }]}>
                    {CONSTANT.NUM_OF_QUESTIONS}
                  </Text>
                </View>
              </View>
            ) : null}

            <FlatList
              data={displayData}
              keyExtractor={(item: any) => item.id}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemDivider}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TeacherAssignmentDetails;
