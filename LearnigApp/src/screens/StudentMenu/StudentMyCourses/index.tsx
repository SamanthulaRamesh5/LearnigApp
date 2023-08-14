import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity
} from 'react-native';
import { Text } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import BackHeader from '../../../component/BackHeader';
import TeacherHeader from '../../../component/TeacherHeader';
import CONSTANT from '../../../locales/constants';
import NAVIGATION_CONSTANT from '../../../locales/constantsNavigation';
import Images from '../../../assests/images';
import styles from './styles';
import { getAPIRequest } from '../../../app/apiController';
import endurl from '../../../app/endurl';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../component/Loader';
import DropdownPicker from '../../../component/DropdownPicker';
import CoursesDropDown from '../../../component/CoursesDropDown';

interface dataItem {
  courseId: number;
  courseName: string;
}

const StudentCourses = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch()
  const [isLoading, setLoader] = useState(true)
  const [courseData, setCoursesData] = useState([])
  const [gradeData, setGradeData] = useState([])
  const loginData = useSelector((state: any) => state?.login?.data)

  const user_id = loginData?.user_id

  useEffect(() => {
    // dispatch(getCourseList())

    getAPIRequest(`${endurl.COURSES}${user_id}/details/`)
      .then((res: any) => {
        console.log(res.data.response)
        setCoursesData(res?.data?.response)

      })
      .catch((error) => {
        console.log(error)


      }).finally(() => {
        setLoader(false)
      })
  }, [])

  useEffect(()=>{
    if(courseData && courseData.length>0){
      const diffPoints = courseData.map(item => ({
        name: item.short_name,
        endPoint: `${endurl.GRADE}?keyword=${item?.short_name}&user_id=${user_id}`
      }));
      
      const promises = diffPoints.map(item => getAPIRequest(item.endPoint));
      
      Promise.all(promises)
        .then(responses => {
          const mappedResponses = responses.map((res, index) => ({
            name: diffPoints[index].name,
            response: res.data.response // Assuming the response object has a `data` property
          }));
      
          setGradeData(mappedResponses)
        })
        .catch(error => {
          // Handle errors here
          console.log(error);
        });
      
    }
  },[courseData])



  const onSelect = (title: string, grade: any) => {

    navigation.navigate(NAVIGATION_CONSTANT.STUDENT_COMPONENET_LIST, {
      grade: grade,
      title: title,
      user_id: user_id,
    })
  }

  const renderItem = ({item}) => {
    return (
     <View style={styles.itemContainer}> 
      <View style={styles.item}>
          <Images.Book width={35} height={35}/>
          <Text style={styles.itemTextTitle}>{item.name}</Text>
      </View>
      <CoursesDropDown
        title={" Select Grade "}
        data={item.response}
        onSelect={(data) => onSelect(item?.name, data)}
        style={{marginLeft:40,width:'80%'}}
      />  
   </View> 
      
    )
  }

  if (isLoading)
    return <Loader />
  return (
    <SafeAreaView style={styles.mainView}>
      <BackHeader title={CONSTANT.COURSES} />
      <FlatList
         keyExtractor={(item: any,index) => item.id ?? index.toString()}
          data={gradeData}
          renderItem={renderItem}
          scrollEnabled={true}
          style={{flex:1,padding:10}}
        />
    </SafeAreaView>
  )
};

export default StudentCourses;
