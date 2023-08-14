import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeaderForParent from "../../../../component/BackHeaderForParent";
import Images from "../../../../assests/images";
import styles from "./styles";
import CONSTANT from "../../../../locales/constants";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Text, Button } from "react-native-paper";
import moment from "moment";
import COLORS from "../../../../assests/color";
import CustomButton from "../../../../component/customButton";
import { useSelector } from "react-redux";
import endurl from "../../../../app/endurl";
import { getAPIRequest } from "../../../../app/apiController";
interface dataItem {
  id: number;
  name: string;
  score: number;
  bgColor: string;
}

const AssignmentReport = () => {
  const [loader, setLoader] = useState(false);
  const selectedStudent = useSelector((state: any) => state.dropdown.data);

  const [isDatePickerVisibleSt, setDatePickerVisibilitySt] =
    useState<boolean>(false);
  const [isDatePickerVisibleEd, setDatePickerVisibilityEd] =
    useState<boolean>(false);
  const [startDate, setStartDate] = useState("DD-MM-YYYY");
  const [endDate, setEndDate] = useState("DD-MM-YYYY");
  const studentName: string = selectedStudent?.label;

  const data: dataItem[] = [
    {
      id: 1,
      name: "Assignment 1",
      score: 86,
      bgColor: COLORS.bgGreen,
    },
    {
      id: 2,
      name: "Assignment 2",
      score: 75,
      bgColor: COLORS.bgBlue,
    },
    {
      id: 3,
      name: "Assignment 3",
      score: 65,
      bgColor: COLORS.bgYellow,
    },
    {
      id: 4,
      name: "Assignment 4",
      score: 55,
      bgColor: COLORS.bgOrange,
    },
  ];

  const showDatePickerEnd = () => {
    setDatePickerVisibilityEd(true);
  };

  const hideDatePickerEnd = () => {
    setDatePickerVisibilityEd(false);
  };

  const handleConfirmEnd = (date: string) => {
    setEndDate(moment(date).format("DD-MM-YYYY"));
    hideDatePickerEnd();
  };

  const showDatePickerStart = () => {
    setDatePickerVisibilitySt(true);
  };

  const hideDatePickerStart = () => {
    setDatePickerVisibilitySt(false);
  };

  const handleConfirmStart = (date: string) => {
    setStartDate(moment(date).format("DD-MM-YYYY"));
    hideDatePickerStart();
  };

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem = ({ item }: any) => (
    <View style={localStyles.flatlisrRowView}>
      <View style={localStyles.column1Data}>
        <Text style={[styles.itemText]}>{item.name}</Text>
      </View>

      <View style={[localStyles.scoreView, { backgroundColor: item.bgColor }]}>
        <Text style={localStyles.scoreTxt}>{item.score}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeaderForParent title={CONSTANT.ASSIGNMENTREPORT} dropdown={true} />

      {/* Start Dt and End Dt View */}
      <View style={localStyles.dateView}>
        {/* View to display Start Date and picker */}
        <View style={localStyles.dtView1}>
          <Text style={localStyles.dtTitle}>{CONSTANT.STARTDATE}</Text>
          <View style={styles.dateView}>
            <Text style={localStyles.dtTxt}>{startDate}</Text>
            {/* Date Picker for Start Date */}
            <DateTimePicker
              isVisible={isDatePickerVisibleSt}
              mode="date"
              onConfirm={handleConfirmStart}
              onCancel={hideDatePickerStart}
            />
            <TouchableOpacity
              onPress={() => setDatePickerVisibilitySt(!isDatePickerVisibleSt)}
            >
              <Images.Calender height={15} width={15} style={styles.calender} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ width: "2%" }} />

        {/* View to display End Date and Picker */}
        <View style={localStyles.dtView1}>
          <Text style={localStyles.dtTitle}>{CONSTANT.ENDDATE}</Text>
          <View style={styles.dateView}>
            <Text style={localStyles.dtTxt}>{endDate}</Text>
            {/* Date Picker for End Date */}
            <DateTimePicker
              isVisible={isDatePickerVisibleEd}
              mode="date"
              onConfirm={handleConfirmEnd}
              onCancel={hideDatePickerEnd}
            />
            <TouchableOpacity
              onPress={() => setDatePickerVisibilityEd(!isDatePickerVisibleEd)}
            >
              <Images.Calender height={15} width={15} style={styles.calender} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      { studentName ? (
        <>
          {/* Display Student Name */}
          <View style={localStyles.studentNameView}>
            <Text style={localStyles.studentName}>{studentName}</Text>
          </View>

          {/* Display Header of the table */}
          <View style={localStyles.flatlistMain}>
            <View style={localStyles.flatlistHeading}>
              <View style={localStyles.column1Heading}>
                <Text style={localStyles.tableHeadingTxt}>{CONSTANT.ASSIGNMENT_NAME}</Text>
              </View>
              <View style={localStyles.column2Heading}>
                <Text style={localStyles.tableHeadingTxt}>
                  {CONSTANT.SCORE} {CONSTANT.PERCENT}
                </Text>
              </View>
            </View>

            {/*  Render the content in a table format */}
            <FlatList
              data={data}
              keyExtractor={(item: any) => item.id}
              renderItem={renderItem}
              // ItemSeparatorComponent={ItemDivider}
            />
          </View>

          <View style={styles.buttonView}>
            <Button
              style={[
                localStyles.buttonStyle,
                { backgroundColor: COLORS.white, borderColor: COLORS.ThemeGreen },
              ]}
              textColor={COLORS.blackCode}
              mode="outlined"
              onPress={() => Alert.alert("Printing....")}
              disabled={data.length == 0}
            >
              {CONSTANT.PRINT}
            </Button>

            <CustomButton
              title={CONSTANT.DOWNLOAD}
              onPressButton={() => Alert.alert("Downloading....")}
              disable={data.length == 0}
            />
          </View> 
          </>
        ) : (
          <View style={localStyles.noChildView}>
            <Text style={localStyles.noDataFound}>{CONSTANT.PLEASE_SELECT_CHILD}</Text>
          </View>
        )
      }
    </SafeAreaView>
  );
};

export default AssignmentReport;

const localStyles = StyleSheet.create({
  dateView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "4%",
    marginTop: "8%",
  },
  dtView1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dtTitle: {
    fontSize: 12,
    color: COLORS.colorBlack,
  },
  dtTxt: {
    fontSize: 14,
    color: COLORS.colorBlack,
  },
  studentName: {
    fontSize: 15,
    color: COLORS.colorBlack,
  },
  flatlistMain: {
    height: "40%",
    margin: "4%",
    padding: "3%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    alignItems: "center",
  },
  flatlistHeading: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    padding: "4%",
    height: 65,
  },
  tableHeadingTxt: {
    fontSize: 14,
    fontWeight: "400",
  },
  flatlisrRowView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
  },
  scoreView: {
    width: "35%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  scoreTxt: {
    fontSize: 14,
    lineHeight: 17,
    color: COLORS.blackCode,
  },
  buttonStyle: {
    backgroundColor: COLORS.ThemeGreen,
    borderRadius: 4,
    height: 40,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: 16,
  },
  printButtonText: {
    color: COLORS.blackCode,
    fontWeight: "500",
    fontSize: 16,
  },
  studentNameView: {
    margin: "4%",
  },
  column1Heading: {
    width: "65%",
  },
  column1Data: {
    width: "65%",
  },
  column2Heading: {
    width: "35%",
    alignItems: "center",
  },
  noChildView: {
    flex:1, 
    alignItems:'center', 
    marginTop:'30%'
  },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.blackCode,
  },
});
