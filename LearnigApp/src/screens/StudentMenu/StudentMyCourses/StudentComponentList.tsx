import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

import { useNavigation } from '@react-navigation/native'
import { getAPIRequest } from '../../../app/apiController'
import endurl from '../../../app/endurl'
import COLORS from '../../../assests/color'
import Images from '../../../assests/images'
import BackHeader from '../../../component/BackHeader'
import DropdownPicker from '../../../component/DropdownPicker'
import { HEIGHT, WIDTH } from '../../../locales/common'
import NAVIGATION_CONSTANT from '../../../locales/constantsNavigation'
import CoursesDropDown from '../../../component/CoursesDropDown'

const StudentComponentList = (props: any) => {
  const navigation: any = useNavigation()
  const { title, grade, user_id } = props?.route?.params
  const [componentList, setComponentList] = useState([])
  const [volumeData, setVolumeData] = useState([])
  const headerTitle = title + ' ' + grade?.label

  useEffect(() => {
    getAPIRequest(
      `${endurl.COMPONENTLIST}?keyword=${title}&grade_value=${grade?.label}&user_id=${user_id}`
    )
      .then((res: any) => {
        console.log(res?.data?.response)
        setComponentList(res?.data?.response)
      })
      .catch((error) => {
        setComponentList([])
      })
  }, [title, grade, user_id])


  useEffect(()=>{
    if(componentList.length>0){
      const diffPoints = componentList.map(item => ({
        component: item.component,
        courses_id:item.courses_id,
        endPoint: `${endurl.VOLUME}?keyword=${title}&grade_value=${grade?.label}&user_id=${user_id}&component_value=${item.component}`
      }));
      
      const promises = diffPoints.map(item => getAPIRequest(item.endPoint));
      Promise.all(promises)
        .then(responses => {
          
          const mappedResponses = responses.map((res, index) => {
            
            return({
            component: diffPoints[index].component,
            courses_id:diffPoints[index].courses_id,
            response: res.data.response // Assuming the response object has a `data` property
          })});
      
          setVolumeData(mappedResponses)
        })
        .catch(error => {
          // Handle errors here
          console.log(error);
        });
    }
  },[componentList])


  const onSelect = (title: string, data: any) => {
    navigation.navigate(NAVIGATION_CONSTANT.STUDENT_COURCES_TABLE_OF_CONTENTS, {
      course_id: data?.value,
      title: headerTitle + ' ' + data?.label,
    })
  }

  const renderItem = ({item}) => {
    return ((
      <View style={{
        borderColor: COLORS.green,
        borderWidth: 0.5,
        marginVertical: 10,
        borderRadius: 10
      }}>
        <Text style={styles.label}>{item?.component}</Text>
        <View style={{ flexDirection: 'row', }}>
          <View style={{
            width: '45%',
            alignItems: 'center',
            borderWidth: 0.5, margin: 10,
            borderColor: COLORS.highlightTextColor,
            borderRadius: 10
          }}>

            <Images.StudentBook height={120} width={124} style={{ marginTop: 5 }} />
            <View style={styles.bottomView}>
              <Text style={styles.text}>{item?.component}</Text>
            </View>
          </View>
          <View style={styles.dropDown}>
          <CoursesDropDown
            title={"Select Volume"}
            data={item.response}
            onSelect={(data) => onSelect(item?.name, data)}
          />  
          </View>
        </View>
      </View>
    ))
  }



  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}>
        <BackHeader title={headerTitle} />
        <FlatList
          data={volumeData}
          keyExtractor={(item: any,index) => item.id ?? index.toString()}
          renderItem={renderItem}
          scrollEnabled={true}
          style={{ flex: 1, padding: 10 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  )
}

export default StudentComponentList

const styles = StyleSheet.create({
  mainView: {
    width: WIDTH,
    height: HEIGHT,
  },
  subView: {
    width: '90%',
    height: '40%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.ThemeGreen,
    alignSelf: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.labelColor,
    marginLeft: 10,
    marginTop: 10
  },
  imgView: {
    width: '85%',
    height: '85%',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.ThemeGreen,
    alignItems: 'center',
    marginLeft: 16,
    marginTop: '5%',
    paddingTop: '2%',
  },
  bottomView: {
    marginTop: 5,
    width: '70%',
    height: 45,
    borderRadius: 7,
    backgroundColor: COLORS.boxColor,
    justifyContent: 'center',
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.highlightTextColor,
    textAlign: 'center',
  },
  dropDown: {
    width: '45%',
    alignItems: 'center',
    marginTop: '15%'
  },
})
