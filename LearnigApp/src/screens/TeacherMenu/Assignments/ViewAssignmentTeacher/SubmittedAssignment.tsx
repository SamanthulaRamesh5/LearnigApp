import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import styles from "./styles";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeader from "../../../../component/BackHeader";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../../../../component/customButton";
import NAVIGATION_CONSTANT from "../../../../locales/constantsNavigation";
import { getAPIRequest, patchAPIRequest } from "../../../../app/apiController";
import endurl from "../../../../app/endurl";
import Loader from "../../../../component/Loader";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector } from "react-redux";
import { dropdown_value } from "../../../../locales/dataConstant";

interface dataItem {
  id: number;
  title: string;
  submitedDate: string;
  status: string;
}

const SubmittedAssignment = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const { itemId } = route.params;

  const [isModalVisible, setModalVisible] = useState({ value: false, id: -1 });
  const loginData = useSelector((state: any) => state.login.data);
  const user_id = loginData?.user_id;
  const teacher_name = loginData?.first_name;
  const token = loginData?.AccessToken;
  const branch_id = loginData?.branch_id ? loginData?.branch_id : '';
  const school_id = loginData?.school_id;

  const [remark, setRemark] = useState("");
  const [label, setLabel] = useState("");
  const [isError, setIsError] = useState("");

  const toggleModal = (assignmentId: number) => {
    if (isModalVisible.value) {
      setModalVisible({ value: false, id: -1 });
    } else {
      setModalVisible({ value: true, id: assignmentId });
    }
  };

  const [isLoading, setLoader] = useState(true);
  const [value, setValue] = useState(null);

  const [studentName, setStudentName] = useState<dataItem[]>([]);
  const [assignmentId, setAssignmentId] = useState("");

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  useEffect(() => {
    submittedListAPI();
  }, []);

  const extraData = {
    Authorization: "Bearer " + token,
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Accept: "*/*",
  };

  const submittedListAPI = () => {
    const url = endurl.STUDENT_LIST + itemId + `/list`;
    getAPIRequest(url, extraData)
      .then((res: any) => {
        setLoader(false);
        const responseData = res?.data?.response.results;

        const finalData = responseData.map((item: any) => {
          setAssignmentId(item.id);
          return {
            id: item.id,
            title: item.first_name + " " + item.last_name,
            status: item.state,
            submitedDate: item.end_date,
          };
        });
        setStudentName(finalData);

        const assignmentData = responseData.map((item: any) => {
          return {
            id: item.id,
          };
        });
        setAssignmentId(assignmentData);
      })
      .catch((error) => {
        setLoader(false);

        // handleError(error);
      });
  };

  const onChangeRemark = (remark: string) => {
    setIsError("");
    if (remark == "") {
      Alert.alert("Remark can not be empty");
    } else {
      setRemark(remark);
    }
  };

  const changeStatus = () => {
    const formData = new FormData();
    formData.append(
      "state",
      label == CONSTANT.MARK_AS_COMPLETED ? CONSTANT.COMPLETED_STATUS : label
    );
    formData.append("teacher_id", user_id);
    formData.append("teacher_name", teacher_name);
    formData.append("remark", remark);

    const extraData = {
      Authorization: "Bearer " + token,
    };

    const url = endurl.CHANGE_STATUS + isModalVisible.id + "/change-status/";

    patchAPIRequest(url, formData, {
      headers: extraData,
    })
      .then((res: any) => {
        setLoader(false);

        toggleModal(-1);
        submittedListAPI();
      })
      .catch((error) => {
        setLoader(isLoading);
      });
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.flatlistRowView}>
      <View style={styles.column1Data}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              NAVIGATION_CONSTANT.TEACHER_ASSIGNMENT_DETAILS,
              { itemId: assignmentId, itemName: item.title }
            )
          }
        >
          <Text style={[styles.textStyle]}>{item.title}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.column2Data}>
        <Text style={styles.textStyle}>{item.submitedDate}</Text>
      </View>

      <View style={styles.scoreView}>
        {item.status == CONSTANT.COMPLETED_STATUS ? (
          <Text style={styles.textStyle}>{item.status}</Text>
        ) : (
          <TouchableOpacity onPress={() => toggleModal(item.id)}>
            <Text style={styles.textStyle}>{item.status}</Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity }>
          <Text style={styles.textStyle}>{item.status}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeader title={CONSTANT.ASSIGNED_ASSIGNMENT_PARENT} />
      <View style={styles.endAssignmentView}>
        <CustomButton
          title={CONSTANT.COMPLETED}
          onPressButton={() =>
            navigation.navigate(
              NAVIGATION_CONSTANT.COMPLETED_ASSIGNMENT_TEACHER
            )
          }
        />
      </View>
      <View style={styles.flatlistMain}>
        {/* Display Header of the table */}
        <View style={styles.flatlistHeading}>
          {/*  Heading Column # 1 */}
          <View style={styles.submittedcolumn1View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.STUDENT_NAME}</Text>
          </View>

          {/*  Heading Column # 2 */}
          <View style={styles.submittedcolumn2View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.SUBMIT_DATE}</Text>
          </View>

          {/*  Heading Column # 3 */}
          <View style={styles.column3View}>
            <Text style={styles.tableHeadingTxt}>{CONSTANT.STATUS}</Text>
          </View>
        </View>

        {/*  Render the content in a table format */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {studentName?.length <= 0 ? (
              <View style={styles.noElementView}>
                <Text style={styles.noDataFound}>{CONSTANT.NO_DATA}</Text>
              </View>
            ) : (
              <FlatList
                data={studentName}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemDivider}
                scrollEnabled={true}
              />
            )}
          </>
        )}
      </View>
      <Modal isVisible={isModalVisible.value}>
        <View style={styles.modal_alignment}>
          <View style={styles.borderView}>
            <Text style={styles.headerModal}>{CONSTANT.MARK_ASSIGNMENT}</Text>
          </View>
          <Text style={styles.changeStatusText}>{CONSTANT.CHANGE_STATUS}</Text>
          <View style={styles.dropdownView}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconColor={COLORS.Black}
              data={dropdown_value}
              maxHeight={100}
              labelField="label"
              valueField="value"
              value={value}
              onChange={(item: any) => {
                setValue(item.value);
                setLabel(item.label);
              }}
            />
          </View>
          <Text style={styles.remarkText}>{CONSTANT.REMARK}</Text>
          <TextInput
            mode="outlined"
            style={styles.remarkTextInput}
            theme={{ colors: { primary: COLORS.Black } }}
            onChangeText={(newVal) => onChangeRemark(newVal)}
          ></TextInput>

          <View style={styles.buttonView}>
            <Button
              style={[
                styles.buttonStyle,
                {
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.ThemeGreen,
                },
              ]}
              textColor={COLORS.green}
              mode="outlined"
              onPress={() => toggleModal(-1)}
            >
              {CONSTANT.CANCEL}
            </Button>

            <CustomButton
              title="Update"
              disable={remark === ""}
              onPressButton={() => {
                isLoading ? <Loader /> : changeStatus();
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SubmittedAssignment;
