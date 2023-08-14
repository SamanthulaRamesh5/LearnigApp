import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeaderForParent from "../../../../component/BackHeaderForParent";
import Images from "../../../../assests/images";
import styles from "./styles";
import CONSTANT from "../../../../locales/constants";

import NAVIGATION_CONSTANT from "../../../../locales/constantsNavigation";
import { getAPIRequest } from "../../../../app/apiController";
import endurl from "../../../../app/endurl";
import Loader from "../../../../component/Loader";
import { useSelector } from "react-redux";

const ParentAssignedAssignment = (props: any) => {
  const navigation: any = useNavigation();
  const [assignmentData, setAssignmentData] = useState([]);
  const [loader, setLoader] = useState(false);
  const selectedStudent = useSelector((state: any) => state.dropdown.data);

  const sortAscending = (header: string) => {
    const titleArr = [...assignmentData];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a?.assignment_name?.toLowerCase() < b?.assignment_name?.toLowerCase() ? 1 : -1
      );

      setAssignmentData(titleArr);
    } else if (header === CONSTANT.DUEDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA < dateB ? 1 : -1;
      });

      setAssignmentData(titleArr);
    }
  };

  const sortDescending = (header: string) => {
    const titleArr = [...assignmentData];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a?.assignment_name?.toLowerCase() > b?.assignment_name?.toLowerCase() ? 1 : -1
      );

      setAssignmentData(titleArr);
    } else if (header === CONSTANT.SUBMITDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.dueDate).getTime();
        var dateB = new Date(b.dueDate).getTime();
        return dateA > dateB ? 1 : -1;
      });

      setAssignmentData(titleArr);
    }
  };
  

  useEffect(() => {
    setLoader(true);
    getAPIRequest(`${endurl.ASSIGNASSIGNMENT}?student_id=${selectedStudent.id}`)
      .then((res: any) => {
        setAssignmentData(res?.data?.results);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, [selectedStudent]);

  // Function to render the data in table format
  const renderItem = ({ item }: any) => (
    <View style={styles.flatlisrRowView}>
      <View style={styles.column1Data}>
        <Text style={[styles.textStyle]}>{item?.assignment_name}</Text>
      </View>

      <View style={styles.column2Data}>
        <Text style={styles.textStyle}>
          {moment(item?.end_date).format("MM-DD-YYYY")}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeaderForParent
        title={CONSTANT.ASSIGNED_ASSIGNMENT_PARENT}
        dropdown={true}
      />

      <View style={styles.flatlistMain}>
        {/* Display Header of the table */}
        <View style={styles.flatlistHeading}>
          {/*  Heading Column # 1 */}
          <View style={styles.column1View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.TITLE}</Text>
            <View style={styles.column1Icon}>
              <TouchableOpacity onPress={() => sortAscending(CONSTANT.TITLE)}>
                <Images.AngleUp height={10} width={10} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => sortDescending(CONSTANT.TITLE)}>
                <Images.AngleDown height={10} width={10} />
              </TouchableOpacity>
            </View>
          </View>

          {/*  Heading Column # 2 */}
          <View style={styles.column2View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.DUEDATE}</Text>
            <View style={styles.column2Icon}>
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
        </View>

        {selectedStudent.label ? (
          assignmentData && !loader ? (
            <FlatList
              data={assignmentData}
              keyExtractor={(item: any) => item.id}
              renderItem={renderItem}
              scrollEnabled={true}
              style={{flex:1}}
              contentContainerStyle={{paddingBottom:50}}
            />
          ) : loader ? (
            <Loader />
          ) : assignmentData.length <= 0 ? (
            <View style={styles.noDataFoundView}>
              <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
            </View>
          ) : null
        ) : (
          <View style={styles.noChildView}>
            <Text style={styles.noDataFound}>
              {CONSTANT.PLEASE_SELECT_CHILD}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ParentAssignedAssignment;
