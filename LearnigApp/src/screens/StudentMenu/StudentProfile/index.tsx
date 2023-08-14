import React from 'react';
import UserProfile from '../../../component/app/UserProfile';
import BackHeader from '../../../component/BackHeader';
import CONSTANT from '../../../locales/constants';

const StudentProfile = () => {
  return (
    <>
    <BackHeader title={CONSTANT.PROFILE} />
      <UserProfile/>
    </>
  );
};

export default StudentProfile;
