import React from 'react';
import {View, Text} from 'react-native';
import HowToUse from '../../../component/app/HowToUse';
import BackHeader from '../../../component/BackHeader';
import CONSTANT from '../../../locales/constants';

const ParentUseEAlpha = () => {
  return (
    <>
    <BackHeader title={CONSTANT.USEEALPHA} />
      <HowToUse title='Parent View includes:' listData={[
        "Access to student books, practice and work books, ancillaries and assessments.",
        "Fully interactive and engaging exercises.",
        "Instant checking and scoring functionality.",
        "Catering for a variety of learning styles.",
        "Easy and fun to use."
      ]} />
    </>
  );
};

export default ParentUseEAlpha;
