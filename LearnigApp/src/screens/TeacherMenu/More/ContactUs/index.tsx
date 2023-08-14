import React from 'react';
import { SafeAreaView } from 'react-native';
import BackHeader from '../../../../component/BackHeader';
import CONSTANT from '../../../../locales/constants';
import gStyles from '../../../../css';
import AppContactUs from '../../../../component/app/AppContactUs';

const TeacherContactUs: React.FC = () => {
  return (
    <SafeAreaView style={gStyles.flex1White}>
      <BackHeader title={CONSTANT.CONTACT_US} />
      <AppContactUs />
    </SafeAreaView>
  );
};

export default TeacherContactUs;