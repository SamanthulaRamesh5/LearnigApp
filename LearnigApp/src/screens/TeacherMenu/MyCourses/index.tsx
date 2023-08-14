import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, View , Text, StyleSheet} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import BackHeader from '../../../component/BackHeader'
import TeacherHeader from '../../../component/TeacherHeader'
import CONSTANT from '../../../locales/constants'
import NAVIGATION_CONSTANT from '../../../locales/constantsNavigation'
import Images from '../../../assests/images'
import styles from './styles'
import { getCourseList } from '../../../store/courseSlice'
import Loader from '../../../component/Loader'
import endurl from '../../../app/endurl'
import DropdownPicker from '../../../component/DropdownPicker'
import { getAPIRequest } from '../../../app/apiController'
import DropdownElement from '../TeacherAssignments/AssignmnetDropDropDown/DropdownElement'
import CoursesDropDown from '../../../component/CoursesDropDown'
import { Dropdown } from 'react-native-element-dropdown'
import COLORS from '../../../assests/color'


const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const Courses = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [isLoading, setLoader] = useState(true);
  const [gradeData, setGradeData] = useState([]);
  
  const [courseData, setCoursesData] = useState([]);
  
  const loginData = useSelector((state: any) => state?.login?.data)

  const user_id = loginData?.user_id

  useEffect(() => {
    
    getAPIRequest(`${endurl.COURSES}${user_id}/details/`)
      .then((res: any) => {
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
        name: item.short_name.trim(),
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

    navigation.navigate(NAVIGATION_CONSTANT.COMPONENT, {
      grade: grade,
      title: title,
      user_id: user_id,
      createAssignmentData: { gradeSelectData : grade.label },
    })
  }

  const renderItem = ({item}) => {
    return (
     <View style={styles.itemContainer}> 
      <View style={styles.item}>
          <Images.Book width={24} height={24}/>
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
          contentContainerStyle={{paddingBottom: 100}}
        />
     
    </SafeAreaView>
  )
}

export default Courses


const styless = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    padding: 10,
    fontWeight: "300",
    color: COLORS.blackCode,
  },
})
