import React , { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, FlatList, StyleSheet, View, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import COLORS from '../../../../../assests/color'
import Images from '../../../../../assests/images'
import { Checkbox } from 'react-native-paper'
import CONSTANT from '../../../../../locales/constants'
import AppButtonTwo from '../../../../../widget/app_button_two/app_button'
import { getAPIRequest } from '../../../../../app/apiController'
import { useSelector , useDispatch } from 'react-redux'
import endurl from '../../../../../app/endurl'
import BackHeader from '../../../../../component/BackHeader';
import { useNavigation } from '@react-navigation/native'
import NAVIGATION_CONSTANT from '../../../../../locales/constantsNavigation';
import { addScreenTwoData } from '../../../../../store/createAssignmentSlice';
import { setLessonDataURL } from '../../../../../store/courseSlice';
import Loader from '../../../../../component/Loader';

const CreateSectionTwo = () => {
  const lessonData = useSelector((state: any) => state?.courses.courseDataForIFrame);
  const [unitdata, setData] = useState([])
  const [checkBoxID, setCheckBoxID] = useState<any>([])
  const [checkBoxIDTwo, setCheckBoxIDTwo] = useState<any>([])
  const [visible, setVisible] = useState(false)
  const [renderId, setRenderId] = useState();
  const [loading, setLoading] = useState(true);
  const loginData = useSelector((state: any) => state.login.data);
  const screenOneData = useSelector((state: any) => state.createAssignment.screenOneData);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      console.log("Calling API - ",`${endurl.TEACHER_COURSE_LISTING}${screenOneData?.course_table_id}/?school_id=${loginData.school_id}`);
      
      getAPIRequest(
        `${endurl.TEACHER_COURSE_LISTING}${screenOneData?.course_table_id}/?school_id=${loginData.school_id}`
      )
      .then((res: any) => {
        // console.log("Reponse of api - ",res.data.response?.course_chapters);
        
        setData(res.data.response?.course_chapters)
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false)
        console.log("Error:",e);
      });
    }, [screenOneData])
  );

  useFocusEffect(
    React.useCallback(() => {
      if(lessonData?.lessonData){
        const lessonArr = [];
        lessonArr.push(lessonData.lessonData.id);
        setCheckBoxID(lessonArr);
        
        const pageArr = lessonData.lessonData.pages.map((page:any) => page.id);
        setCheckBoxIDTwo(pageArr);
      }
      
    }, [lessonData])
  );

  const onsubmit = () => {
    let result:any = []

    unitdata.map((unit: any) => {
      let lessonArr: any = []
      unit.visible_lessons.map((lesson: any) => {
        if (checkBoxID.includes(lesson.id)) {
          let pageArr: any = []
          lesson.pages.map((page: any) => {
            if (checkBoxIDTwo.includes(page.id)) {
              pageArr.push({
                page_id: page.page_id,
                page_name: page.name,
              })
            }
          })
          lessonArr.push({
            id: lesson.id,
            lesson_id: lesson.lesson_id,
            lesson_name: lesson.lesson_name,
            pages: pageArr,
          })
        }
      })

      if (lessonArr.length) {
        result.push({
          chapter_id: unit.id.toString(),
          chapter_name: unit.chapter_name,
          lessons: lessonArr,
        })
      }
    })
    console.log("Result - ",result);
    if(result.length === 0)
    {
      Alert.alert("Please select a lesson");
    }
    else
    {
      dispatch(addScreenTwoData(result));
      navigation.navigate(NAVIGATION_CONSTANT.CREATE_ASSIGNMENT_THREE);
    }
  }

  const handleViewLesson = (item: any) => {
    dispatch(setLessonDataURL(item));
    navigation.navigate(NAVIGATION_CONSTANT.TEACHER_IFRAME_URL);
  }

  const onChangeStatusSecond = (id: any) => {
    setCheckBoxID((prevCheckboxes: any) => {
      const updatedCheckboxes = [...prevCheckboxes]
      const value = id;
      if (!updatedCheckboxes.includes(value)) {
        updatedCheckboxes.push(value)
      } else {
        const valueIndex = updatedCheckboxes.indexOf(value)
        updatedCheckboxes.splice(valueIndex, 1)
      }
      return updatedCheckboxes
    })
  }

  const onChangeAddSecond = (id: any) => {
    setCheckBoxID((prevCheckboxes: any) => {
      const updatedCheckboxes = [...prevCheckboxes]
      const value = id;
      if (!updatedCheckboxes.includes(value)) {
        updatedCheckboxes.push(value)
      } 
      return updatedCheckboxes
    })
  }


  const onChangeStatusThird = (id: any, secondItem: any) => {
    
    setCheckBoxIDTwo((prevCheckboxes: any) => {
      const updatedCheckboxes = [...prevCheckboxes]
      const value = id;

      if (!updatedCheckboxes.includes(value)) {
        updatedCheckboxes.push(value)
        onChangeAddSecond(secondItem?.id)
      } else {
        const valueIndex = updatedCheckboxes.indexOf(value)
        updatedCheckboxes.splice(valueIndex, 1)
      }
      return updatedCheckboxes
    })
  }

  const thirdRenderItem = ( thirdItem: any, secondItem : any) => {
    return (
      <View style={[style.mainVIew, {marginLeft:'7%'}]}>
        <View style={style.checkBoxStyle}>
          <Checkbox.Android
            status={checkBoxIDTwo.includes(thirdItem.id) ? 'checked' : 'unchecked'}
            color={COLORS.ThemeGreen}
            uncheckedColor={COLORS.greyShadow}
            onPress={() => {onChangeStatusThird(thirdItem?.id, secondItem)}}
          />
          <Text style={style.thirdLevelText}>{thirdItem?.name}</Text>
        </View>
      </View>
    )
  }

  const secondRenderItem = ({ item }: any) => {
    return (
      <View style={style.secondItemView1}>
        <View style={style.secondItemView2}>
          <View style={style.levelTwoCheckBoxStyle}>
            <Checkbox.Android
              status={checkBoxID.includes(item.id) ? 'checked' : 'unchecked'}
              color={COLORS.ThemeGreen}
              uncheckedColor={COLORS.greyShadow}
              onPress={() => {
                onChangeStatusSecond(item?.id)
              }}
            />

            <Text style={style.meText}>{item?.lesson_name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleViewLesson(item)}
          >
            <Text style={style.previewText}>{CONSTANT.PREVIEW}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={item.pages}
          keyExtractor={(item) => item.id}
          renderItem={(thirdItem) => thirdRenderItem(thirdItem.item, item)}
        />
      </View>
    )
  }

  const renderItem = ({ item }: any) => {
    return (
      <View style={style.mainVIew}>
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            setVisible(visible ? false : true)
            setRenderId(item?.id)
          }}
        >
          <Text style={style.textStyle}>{item?.chapter_name}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.eyeStyle}
          onPress={() => setVisible(visible ? false : true)}
        >
          <Images.DownArrow style={style.imgsStyle} />
        </TouchableOpacity>
        {visible && item.id == renderId ? (
          <FlatList
            data={item?.visible_lessons}
            keyExtractor={(item) => item?.id}
            renderItem={(item) => secondRenderItem(item)}
          />
        ) : null}
      </View>
    )
  }
  return (
    <>
      <BackHeader title={CONSTANT.CREATE_ASSIGNMENT}/>
      <View style={{height:'2%'}}/>
      {
        loading ? 
          <Loader />
          : (
            <>
              <FlatList
                data={unitdata}
                keyExtractor={(item: any) => item?.id}
                renderItem={(item) => renderItem(item)}
              />
              <AppButtonTwo
                label={CONSTANT.BACK}
                labelTwo={CONSTANT.NEXT}
                onNextData={() => onsubmit()}
                onBackData={() => navigation.goBack()}
              />
              <View style={{ marginBottom: 50 }} />
            </>
          )
      }
      
    </>
  )
}

const style = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: COLORS.greenDropDown,
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    // marginTop: '2%',
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.colorBlack,
    paddingLeft: 30,
    alignItems: 'center',
  },
  mainVIew: {
    marginTop: '3%',
    paddingHorizontal: '5%',
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.colorBlack,
  },
  eyeStyle: {
    position: 'relative',
    bottom: 28,
    left: 10,
  },
  imgsStyle: {
    width: 20,
    height: 10,
  },
  checkBoxStyle: {
    flexDirection: 'row',
  },
  levelTwoCheckBoxStyle: {
    width:'80%',
    flexDirection: 'row',
    alignItems:'center',
  },
  meText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.blackCode,
    width:'80%',
    flexWrap:'wrap',
  },
  previewText: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.blackCode,
    textDecorationLine:"underline",
  },
  thirdLevelText: {
    fontSize: 14,
    fontWeight: '300',
    color: COLORS.blackCode,
    marginTop: 10,
  },
  secondItemView1: {
    borderBottomColor:COLORS.listSeparatorColor, 
    borderBottomWidth: 1, 
    paddingVertical:'2%',
  },
  secondItemView2: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'space-between', 
    paddingRight: '4%',
  },
})
export default CreateSectionTwo;
