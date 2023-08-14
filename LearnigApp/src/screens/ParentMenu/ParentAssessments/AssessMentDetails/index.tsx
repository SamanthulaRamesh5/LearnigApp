import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import styles from "./styles";
import CommonBorder from "../../../../component/CommonBorder";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeaderForParent from "../../../../component/BackHeaderForParent";
import COLORS from "../../../../assests/color";
import CONSTANT from "../../../../locales/constants";
import Images from "../../../../assests/images";
import moment from "moment";

const AssessmentDetails = () => {
  const [submitDate, setSubmitDate] = useState<string>(
    moment().format("DD-MM-YYYY")
  );
  const [teacherName, setTeacherName] = useState<string>("Mark James");
  const [performanceLevel, setPerformanceLevel] =
    useState<string>("Does not Meet");
  const [score, setScore] = useState<number>(35);
  const [selection, setSelection] = useState<string>("");
  const [correct, setCorrect] = useState<dataItem[]>([]);
  const [incorrect, setInCorrect] = useState<dataItem[]>([]);
  const [maybe, setMaybe] = useState<dataItem[]>([]);
  const [exclam, setExclam] = useState<dataItem[]>([]);
  const [displayData, setDisplayData] = useState<dataItem[]>([]);

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
        title={CONSTANT.ASSESSMENT_DETAILS}
        dropdown={true}
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

            <View style={styles.performanceTextView}>
              <Text style={styles.performanceText}>
                {CONSTANT.EXCEPTATION_LEVEL}
              </Text>
              <Text style={[styles.performanceText, styles.boldText]}>
                {performanceLevel}
              </Text>
            </View>

            <View style={styles.scoreView}>
              <Text style={styles.scoreViewText}>{CONSTANT.SCORE}</Text>
              <Text style={[styles.scoreViewText, styles.scorePercentText]}>
                {score}
                {CONSTANT.PERCENT}
              </Text>
              <Text style={styles.scoreViewText}>- {performanceLevel}</Text>
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
                <Images.CheckOrange />
              </View>

              {/* <View style={styles.divideView}></View> */}
              {/* Display RED CROSS */}
              <View style={styles.wrongHeaderView}>
                <Images.Uncheck />
              </View>

              {/* <View style={styles.divideView}></View> */}
              {/* Display EXCLAMATION  */}
              <View style={styles.lastHeaderView}>
                <Images.NoResponse />
              </View>
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

export default AssessmentDetails;
