import React from 'react';
import {View, Text} from 'react-native';
import HowToUse from '../../../component/app/HowToUse';
import BackHeader from '../../../component/BackHeader';
import CONSTANT from '../../../locales/constants';

const TeacherUseEAlpha = () => {
  return (
    <>
    <BackHeader title={CONSTANT.USEEALPHA} />
      <HowToUse title='Teacher View includes:' listData={[
        "Access all teacher guides, student books, practice and work books, ancillaries and assessments complete with full interactivity.",
        "Navigate with ease through hyperlinked content pages.",
        "Set assignments easily to whole classes or groups or individual students.",
        "Effortlessly monitor and report student progress."
      ]} />
    </>
  );
};

export default TeacherUseEAlpha;
