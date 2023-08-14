import React, { useState, useEffect } from 'react';
import { SectionList, ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import Loader from './Loader';
import { getAPIRequest } from '../app/apiController';
import COLORS from '../assests/color';
import Images from '../assests/images';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseId, setLessonData } from "../store/courseSlice";
import { addAssignmentData } from '../store/createAssignmentSlice';
import { useNavigation } from '@react-navigation/native';
import NAVIGATION_CONSTANT from '../locales/constantsNavigation';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

const withSectionList = (WrappedComponent) => {
  return function WithSectionList(props) {
    const dispatch = useDispatch()
    const [contentData, setContentData] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {
      fetchData();
    }, [props.url]);

    const fetchData = async () => {
      if (props.url && props.url.length > 0) {
        setLoading(true)
        getAPIRequest(props.url)
          .then((res: any) => {
            const data = res?.data?.response?.course_chapters
            const sectionData = data.map((item, index) => ({
              chapter_id: 'section_' + item.chapter_id,
              chapter_name: item.chapter_name,
              data: item.visible_lessons,
              index: index,
              isDownloaded: false
            }));
            setContentData(sectionData);
            dispatch(setCourseId(res?.data?.response?.course_id))

          })
          .catch((error) => {
            console.log(error);
          }).finally(() => {
            setLoading(false);
          })
      }
    };

    if (loading) {
      return (
        <Loader />
      );
    }
    return <WrappedComponent data={contentData} {...props} />;
  };
};

// Usage example
const MySectionListComponent = ({ data , createAssignmentData}: any) => {
  const dispatch = useDispatch();
  const loginData = useSelector((state: any) => state.login.data);
  const navigation = useNavigation();
  const [activeIndexes, setActiveIndexes] = useState<number | any>([])
  const [isDownloadedChapter, setIsDownLoadedChapter] = useState(data.map(item => ({ [item.chapter_id]: false })))

  const handleViewLesson = (item: any) => {
    console.log("item", item)
    dispatch(setLessonData(item))
    console.log('asdfloginData', loginData)
    if(loginData.role.name === "Student") {
      navigation.navigate(NAVIGATION_CONSTANT.STUDENT_IFRAME)
    } else {
      navigation.navigate(NAVIGATION_CONSTANT.TEACHER_IFRAME)
    }
  }

  const handleAssignLesson = (item: any) => {
    console.log("Item for assignment - ",item);
    dispatch(setLessonData(item));
    dispatch(addAssignmentData(createAssignmentData));
    navigation.navigate(NAVIGATION_CONSTANT.CREATE_ASSIGNMNET)
  }

  const settingActiveIndex = (index: number | any, isAvailable: boolean) => {
    if (isAvailable)
      setActiveIndexes(activeIndexes.filter((item: number) => item != index))
    else setActiveIndexes([...activeIndexes, index])
  }

  const handleChapterDownload = (chapter_id) => {
    setIsDownLoadedChapter({ ...isDownloadedChapter, [chapter_id]: true })
  }

  return (
    <SectionList
      style={{ flex: 1, padding: 10 }}
      sections={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index, section }) => {
        if (activeIndexes.includes(section.chapter_id))
          return (
            <View style={styles.lessonStyle}>
              <Text numberOfLines={1} style={styles.lessonTitle}>{item.lesson_name}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={{marginRight: 10}} hitSlop={10} activeOpacity={0.6} onPress={() => handleViewLesson(item)}>
                  <Images.Eye/>
                </TouchableOpacity>
                {/* <TouchableOpacity>
                  <Images.Download />
                </TouchableOpacity> */}
                { loginData.role.name === "Teacher" ? (
                  <TouchableOpacity style={{marginRight: 2}} hitSlop={10} activeOpacity={0.6} onPress={() => handleAssignLesson(item)}>
                    <Images.CourseAssign/>
                  </TouchableOpacity>
                ) : null }
              </View>              
            </View>)
        else {
          return null
        }
      }}
      renderSectionHeader={({ section }) => {
        const isAvailable = activeIndexes.includes(section.chapter_id)
        return (
          <TouchableOpacity
            style={styles.sectionHeader}
            activeOpacity={0.8}
            onPress={() =>
              settingActiveIndex(section.chapter_id, isAvailable)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {isAvailable ?
                <Images.AngleUp width={10} height={10} /> : <Images.AngleDown width={10} height={10} />}
              <Text style={{ marginLeft: 10, }}>{section.chapter_name}</Text>
            </View>
            {/* {isDownloadedChapter[section.chapter_id] ?
              <TouchableOpacity activeOpacity={0.6} onPress={() => handleViewLesson(section.chapter_id)}>
                <Images.Eye />
              </TouchableOpacity>
              : <TouchableOpacity activeOpacity={0.6}
                onPress={() => handleChapterDownload(section.chapter_id)}>
                <Images.Download />
              </TouchableOpacity>} */}
          </TouchableOpacity>
        )
      }}
      ListHeaderComponent={<View style={styles.headerStyle}>
        <Text style={styles.headerText}>Chapter Name</Text>
      </View>}
    />
  );
};

const styles = StyleSheet.create({
  headerStyle: { backgroundColor: COLORS.greenColorCode },
  headerText: {
    color: COLORS.blackCode,
    fontSize: 14,
    fontWeight: '500',
    padding: 10
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightGrey, padding: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9'
  },
  lessonStyle: {
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F5F5F5'
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  lessonTitle:{ marginLeft: 20, 
                color: COLORS.blackCode, 
                fontSize: 14, 
                width:'78%' }
})

const MySectionListWithHOC = withSectionList(MySectionListComponent);

export default MySectionListWithHOC;
