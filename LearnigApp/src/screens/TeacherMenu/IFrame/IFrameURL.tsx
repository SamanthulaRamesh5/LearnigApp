import React from 'react';
import { View, StyleSheet } from 'react-native';
import BackHeader from '../../../component/BackHeader';
import AppIFrame from '../../../component/app/AppIFrame';
import COLORS from '../../../assests/color';
import { useSelector } from 'react-redux';

const TeacherIFrameURL: React.FC = () => {
  
    const lesson = useSelector((state: any) => state?.courses.lessonDataURL)
    
    return (
    <View style={styles.container}>
        <BackHeader title={lesson.lesson_name}/>
        <AppIFrame url={lesson.content_url}/>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
});

export default TeacherIFrameURL;
