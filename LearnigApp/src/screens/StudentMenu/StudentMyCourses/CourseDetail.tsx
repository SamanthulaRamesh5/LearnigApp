import React from 'react';
import {
    SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackHeader from '../../../component/BackHeader';
import TeacherHeader from '../../../component/TeacherHeader';
import CONSTANT from '../../../locales/constants';
import styles from './styles';

const StudentCourseDetail = ({route}:any) => {
    const navigation :any = useNavigation();
    const courseName = route.params.courseName;

    return (
        <SafeAreaView style={styles.mainView}>
            
            <BackHeader title={courseName}/>
        </SafeAreaView>
    );
};

export default StudentCourseDetail;
