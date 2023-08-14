import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  SectionList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeader from "../../../component/BackHeader";
import Button from "react-native-paper";
import Images from "../../../assests/images";
import styles from "./styles";
import CONSTANT from "../../../locales/constants";
import COLORS from "../../../assests/color";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getAPIRequest } from "../../../app/apiController";
import Loader from "../../../component/Loader";
import endurl from "../../../app/endurl";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import { setLessonData } from "../../../store/courseSlice";
import NAVIGATION_CONSTANT from "../../../locales/constantsNavigation";
import Modal from "react-native-modal";
import CustomButton from "../../../component/customButton";
// const [activeIndexes, setActiveIndexes] = useState<number | any>([]);

interface dataItem {
  id: number;
  title: string;
  dueDate: string;
  status: string;
}

const StudentNewAssignment = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const loginData = useSelector((state: any) => state.login.data);
  const [isLoading, setLoader] = useState(true);
  const student_id = loginData?.user_profile_id;
  const [iframeShow, setIframeShow] = useState(-1);
  const [isModalVisible, setModalVisible] = useState({
    value: false,
    chapter: [],
  });

  const [list, setList] = useState<dataItem[]>([]);

  // useEffect(() => {
  //   assignmentListApi();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      assignmentListApi();
    }, [])
  );

  // const settingActiveIndex = (index: number | any, isAvailable: boolean) => {
  //   if (isAvailable)
  //     setActiveIndexes(activeIndexes.filter((item: number) => item != index));
  //   else setActiveIndexes([...activeIndexes, index]);
  // };

  const toggleModal = (item: any) => {
    if (isModalVisible.value) {
      setModalVisible({ value: false, chapter: [] });
    } else {
      setModalVisible({ value: true, chapter: item });
    }
  };

  const assignmentListApi = async () => {
    const url =
      endurl.STUDENT_NEW_ASSIGNMENT_LIST +
      `?student_id=${student_id}&ordering=-created_at&offset=0&limit=10&all_assignments=all`;
    console.log(
      endurl.STUDENT_NEW_ASSIGNMENT_LIST +
        `?student_id=${student_id}&ordering=-created_at&offset=0&limit=10&all_assignments=all`
    );

    getAPIRequest(url)
      .then((res: any) => {
        setLoader(false);
        const responseData = res?.data?.results;

        setList(responseData);
      })
      .catch((error) => {
        setLoader(isLoading);

        console.log("error", error);
      });
  };

  const sortAscending = (header: string) => {
    const titleArr = [...list];

    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.assignment_name.toLowerCase() < b.assignment_name.toLowerCase()
          ? 1
          : -1
      );

      setList(titleArr);
    } else if (header === CONSTANT.STATUS) {
      titleArr.sort((a: any, b: any) =>
        a.state.toLowerCase() < b.state.toLowerCase() ? 1 : -1
      );

      setList(titleArr);
    } else if (header === CONSTANT.DUEDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.end_date).getTime();
        var dateB = new Date(b.end_date).getTime();
        return dateA < dateB ? 1 : -1;
      });

      setList(titleArr);
    }
  };

  const sortDescending = (header: string) => {
    const titleArr = [...list];
    if (header === CONSTANT.TITLE) {
      titleArr.sort((a: any, b: any) =>
        a.assignment_name.toLowerCase() > b.assignment_name.toLowerCase()
          ? 1
          : -1
      );

      setList(titleArr);
    } else if (header === CONSTANT.STATUS) {
      titleArr.sort((a: any, b: any) =>
        a.state.toLowerCase() > b.state.toLowerCase() ? 1 : -1
      );

      setList(titleArr);
    } else if (header === CONSTANT.DUEDATE) {
      titleArr.sort((a: any, b: any) => {
        var dateA = new Date(a.end_date).getTime();
        var dateB = new Date(b.end_date).getTime();
        return dateA > dateB ? 1 : -1;
      });

      setList(titleArr);
    }
  };

  const handleOpenAssignment = (item: any) => {
    setModalVisible({ value: false, chapter: [] });
    //const data = { course_id: "", lessonData: item };
    dispatch(setLessonData(item));
    navigation.navigate(NAVIGATION_CONSTANT.STUDENT_IFRAME);
  };

  // Function to render the data in table format
  const renderItem = ({ item }: any) => (
    <View style={styles.flatlisrRowView}>
      <TouchableOpacity
        onPress={() => toggleModal(item.chapters)}
        style={localStyles.column1Data}
      >
        <Text style={[styles.textStyle]}>{item.assignment_name}</Text>
      </TouchableOpacity>

      <View style={localStyles.column2Data}>
        <Text style={styles.textStyle}>{item.end_date}</Text>
      </View>

      <View style={localStyles.column3Data}>
        <Text style={styles.textStyle}>{item.state}</Text>
      </View>
    </View>
  );

  const openIframeLink = ({ item }: any) => (
    <View style={styles.modalFlatList}>
      <TouchableOpacity onPress={() => handleOpenAssignment(item)}>
        <Text style={[styles.lessonText]}>{item.unit_name}</Text>
      </TouchableOpacity>
    </View>
  );

  const modalRenderItem = ({ item, index }: any) => (
    <View style={{ flexDirection: "column", paddingVertical: 5 }}>
      <View style={styles.modalFlatList}>
        <Text style={[styles.textStyle]}>{item.chapter_name}</Text>
        <TouchableOpacity
          onPress={() => setIframeShow(iframeShow == index ? -1 : index)}
        >
          <Images.DownArrow style={styles.imgsStyle} />
        </TouchableOpacity>
      </View>

      {iframeShow == index ? (
        <FlatList
          data={item.lessons}
          keyExtractor={(item: any) => item.id}
          renderItem={openIframeLink}
          // ItemSeparatorComponent={ItemDivider}
          scrollEnabled={true}
        />
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeader title={CONSTANT.NEWASSIGNMENT} />

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

        {/*  Render the content in a table format */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {list?.length <= 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={localStyles.noDataFound}>{CONSTANT.NO_DATA}</Text>
              </View>
            ) : (
              <FlatList
                data={list}
                keyExtractor={(item: any) => item.id}
                renderItem={renderItem}
                // ItemSeparatorComponent={ItemDivider}
                scrollEnabled={true}
              />
            )}
          </>
        )}
      </View>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => setModalVisible({ value: false, chapter: [] })}
      >
        <Modal isVisible={isModalVisible.value}>
          <View style={styles.modal_alignment}>
            <View style={styles.borderView}>
              <Text style={styles.headerModal}>{CONSTANT.CHAPTER_NAME}</Text>
            </View>
            <FlatList
              data={isModalVisible.chapter}
              keyExtractor={(item: any) => item.id}
              renderItem={modalRenderItem}
              // ItemSeparatorComponent={ItemDivider}
              scrollEnabled={true}
            />
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                backgroundColor: COLORS.green,
                marginBottom: 10,
                alignSelf: "center",
              }}
              onPress={() => setModalVisible({ value: false, chapter: [] })}
            >
              <Text style={styles.modalTextStyle}>{CONSTANT.CANCEL}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StudentNewAssignment;

const localStyles = StyleSheet.create({
  column1View: {
    width: "34%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  column1Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "35%",
  },
  column1Data: {
    width: "36%",
    paddingRight: "7%",
  },
  column2View: {
    width: "33%",
    flexDirection: "row",
    paddingLeft: "2%",
    justifyContent: "flex-start",
  },
  column2Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "13%",
  },
  column2Data: {
    width: "33%",
  },
  column3View: {
    width: "33%",
    flexDirection: "row",
    paddingLeft: "6%",
    justifyContent: "flex-start",
  },
  column3Icon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: "13%",
  },
  column3Data: {
    width: "32%",
    paddingLeft: "6%",
  },
  noDataFound: {
    fontSize: 16,
    fontWeight: "600",
  },
});
