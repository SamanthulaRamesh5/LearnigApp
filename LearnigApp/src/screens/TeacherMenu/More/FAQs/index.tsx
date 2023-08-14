import React from 'react';
import { SafeAreaView } from 'react-native';
import FAQList from '../../../../component/app/AppFAQList';
import BackHeader from '../../../../component/BackHeader';
import CONSTANT from '../../../../locales/constants';
import gStyles from '../../../../css';

const faqData = [
  { id: '1', question: 'Question 1', answer: 'Answer 1' },
  { id: '2', question: 'Question 2', answer: 'Answer 2' },
  { id: '3', question: 'Question 3', answer: 'Answer 3' },
  // Add more FAQ items as needed
];

const TeacherFAQ: React.FC = () => {
  return (
    <SafeAreaView style={gStyles.flex1White}>
      <BackHeader title={CONSTANT.FAQ} />
      <FAQList data={[]} />
    </SafeAreaView>
  );
};

export default TeacherFAQ;