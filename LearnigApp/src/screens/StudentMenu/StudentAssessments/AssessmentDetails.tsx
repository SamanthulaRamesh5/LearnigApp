import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import CommonBorder from "../../../component/CommonBorder";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeader from "../../../component/BackHeader";
import COLORS from "../../../assests/color";
import CONSTANT from "../../../locales/constants";
import Images from "../../../assests/images";

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

const StudentAssessmentDetails = () => {
  const [performanceLevel, setPerformanceLevel] =
    useState<string>("Approaching");
  const [score, setScore] = useState<number>(50);
  const [selection, setSelection] = useState<string>("");
  const [correct, setCorrect] = useState<dataItem[]>([]);
  const [incorrect, setInCorrect] = useState<dataItem[]>([]);
  const [maybe, setMaybe] = useState<dataItem[]>([]);
  const [exclam, setExclam] = useState<dataItem[]>([]);
  const [displayData, setDisplayData] = useState<dataItem[]>([]);
  const color: colorData[] = [
    {
      status: CONSTANT.CORRECT,
      bgColor: COLORS.correctBgColor,
      borderColor: COLORS.correctBorderColor,
    },
    {
      status: CONSTANT.MAYBE,
      bgColor: COLORS.maybeBgColor,
      borderColor: COLORS.maybeBorderColor,
    },
    {
      status: CONSTANT.INCORRECT,
      bgColor: COLORS.incorrectBgColor,
      borderColor: COLORS.incorrectBorderColor,
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

  useEffect(() => {
    filterData();
  }, []);

  const filterData = () => {
    setCorrect(allData.filter((item) => item.status === CONSTANT.CORRECT));
    setInCorrect(allData.filter((item) => item.status === CONSTANT.INCORRECT));
    setMaybe(allData.filter((item) => item.status === CONSTANT.MAYBE));
    setExclam(allData.filter((item) => item.status === CONSTANT.EXCLAM));
  };

  const ItemDivider = () => {
    return <View style={localStyles.itemSeparator} />;
  };

  const renderItem = ({ item }: any) => {
    let colorData = color.filter((ele) => ele.status === item.status);

    return (
      <View style={localStyles.flatListMain}>
        <View
          style={[
            localStyles.mainRenderView,
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
    <View style={styles.mainView}>
      <BackHeader title={CONSTANT.ASSESSMENT_DETAILS} />

      <View style={localStyles.marginView}>
        <View style={localStyles.headerFirst}>
          <View>
            <View style={localStyles.performanceTextView}>
              <Text style={localStyles.performanceText}>
                {CONSTANT.EXCEPTATION_LEVEL}
              </Text>
              <Text style={[localStyles.performanceText, localStyles.boldText]}>
                {performanceLevel}
              </Text>
            </View>

            <View style={localStyles.scoreView}>
              <Text style={localStyles.scoreViewText}>{CONSTANT.SCORE}</Text>
              <Text
                style={[
                  localStyles.scoreViewText,
                  localStyles.scorePercentText,
                ]}
              >
                {score}
                {CONSTANT.PERCENT}
              </Text>
              <Text style={localStyles.scoreViewText}>
                - {performanceLevel}
              </Text>
            </View>

            {/* View to display the table header row */}
            <View style={localStyles.rowWiseView}>
              <View style={localStyles.performanceView}>
                <Text style={localStyles.numQuestionsTxt}>
                  {CONSTANT.NUM_OF_QUESTIONS}
                </Text>
              </View>

              {/* Display GREEN tick */}
              <View style={localStyles.fromHeaderView}>
                <Images.CheckGreen />
              </View>

              {/* Display ORANGE tick */}
              <View style={localStyles.toHeaderView}>
                <Images.CheckOrange />
              </View>

              {/* Display RED CROSS */}
              <View style={localStyles.wrongHeaderView}>
                <Images.Uncheck />
              </View>

              {/* Display EXCLAMATION  */}
              <View style={localStyles.lastHeaderView}>
                <Images.NoResponse />
              </View>
            </View>

            {/* Number of questions displayed below the ticks */}
            <View style={localStyles.rowNumberWiseView}>
              {/* Diplay total number of questions */}
              <TouchableOpacity
                style={localStyles.performanceView}
                onPress={() => {
                  setSelection(CONSTANT.TOTAL);
                  setDisplayData(allData);
                }}
              >
                <Text
                  style={[
                    localStyles.textView,
                    selection === CONSTANT.TOTAL
                      ? localStyles.extraBoldText
                      : null,
                  ]}
                >
                  {allData.length}
                </Text>
              </TouchableOpacity>

              {/* Diplay number of correct questions */}
              <TouchableOpacity
                style={localStyles.fromHeaderView}
                onPress={() => {
                  setSelection(CONSTANT.CORRECT);
                  setDisplayData(correct);
                }}
              >
                <Text
                  style={[
                    localStyles.textView,
                    selection === CONSTANT.CORRECT
                      ? localStyles.extraBoldText
                      : null,
                  ]}
                >
                  {correct.length}
                </Text>
              </TouchableOpacity>

              {/* Diplay number of maybe questions */}
              <TouchableOpacity
                style={localStyles.toHeaderView}
                onPress={() => {
                  setSelection(CONSTANT.MAYBE);
                  setDisplayData(maybe);
                }}
              >
                <Text
                  style={[
                    localStyles.textView,
                    selection === CONSTANT.MAYBE
                      ? localStyles.extraBoldText
                      : null,
                  ]}
                >
                  {maybe.length}
                </Text>
              </TouchableOpacity>

              {/* Diplay number of incorrect questions */}
              <TouchableOpacity
                style={localStyles.wrongHeaderView}
                onPress={() => {
                  setSelection(CONSTANT.INCORRECT);
                  setDisplayData(incorrect);
                }}
              >
                <Text
                  style={[
                    localStyles.textView,
                    selection === CONSTANT.INCORRECT
                      ? localStyles.extraBoldText
                      : null,
                  ]}
                >
                  {incorrect.length}
                </Text>
              </TouchableOpacity>

              {/* Diplay number of exclamation questions */}
              <TouchableOpacity
                style={localStyles.lastHeaderView}
                onPress={() => {
                  setSelection(CONSTANT.EXCLAM);
                  setDisplayData(exclam);
                }}
              >
                <Text
                  style={[
                    localStyles.textView,
                    selection === CONSTANT.EXCLAM
                      ? localStyles.extraBoldText
                      : null,
                  ]}
                >
                  {exclam.length}
                </Text>
              </TouchableOpacity>
            </View>

            {selection ? (
              <View style={localStyles.flatListMain}>
                <View
                  style={[
                    localStyles.mainRenderView,
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
    </View>
  );
};

export default StudentAssessmentDetails;

const localStyles = StyleSheet.create({
  marginView: {
    marginTop: 20,
    marginHorizontal: 10,
    flex: 1,
  },
  flatListMain: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  mainRenderView: {
    borderColor: COLORS.white,
    borderLeftWidth: 3,
    width: "100%",
    padding: "1%",
    height: 55,
    justifyContent: "center",
  },
  headerFirst: {
    margin: "3%",
    paddingHorizontal: "3%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    alignItems: "center",
  },
  rowWiseView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGrey,
    height: 65,
    marginTop: 20,
  },
  textView: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 17,
    textDecorationLine: "underline",
    paddingLeft: 2,
  },
  rowNumberWiseView: {
    flexDirection: "row",
    alignItems: "center",
    height: 42,
  },
  performanceView: {
    width: "40%",
    height: "100%",
    paddingRight: "10%",
    paddingLeft: "4%",
    borderColor: COLORS.listSeparatorColor,
    borderWidth: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  fromHeaderView: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.listSeparatorColor,
    borderWidth: 1,
    height: "100%",
  },
  toHeaderView: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.listSeparatorColor,
    borderWidth: 1,
    height: "100%",
  },
  wrongHeaderView: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.listSeparatorColor,
    borderWidth: 1,
    height: "100%",
  },
  lastHeaderView: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.listSeparatorColor,
    borderWidth: 1,
    height: "100%",
  },
  performanceTextView: {
    width: "100%",
    height: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  performanceText: {
    fontSize: 14,
    fontWeight: "400",
  },
  boldText: {
    fontWeight: "500",
  },
  extraBoldText: {
    fontWeight: "600",
  },
  submitDtView: {
    height: "9%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  submitDtText: {
    fontSize: 18,
    fontWeight: "300",
    color: COLORS.colorBlack,
    textTransform: "capitalize",
    paddingRight: "1.5%",
  },
  teacherNameView: {
    height: "9%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  teacherNameText: {
    fontSize: 18,
    fontWeight: "300",
    color: COLORS.colorBlack,
    textTransform: "capitalize",
  },
  scoreView: {
    backgroundColor: COLORS.bgYellow,
    height: "15%",
    marginTop: "3%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scoreViewText: {
    fontSize: 18,
    fontWeight: "500",
    alignSelf: "center",
    paddingVertical: 20,
    lineHeight: 22,
  },
  scorePercentText: {
    color: COLORS.borderYellow,
    paddingHorizontal: "2%",
  },
  numQuestionsTxt: {
    fontSize: 14,
    fontWeight: "500",
  },
  itemSeparator: {
    height: 2.5,
    width: "90%",
    marginLeft: "6%",
    backgroundColor: COLORS.white,
  },
});
