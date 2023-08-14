import React from 'react';
import {StyleSheet, View} from 'react-native';
import COLORS from '../assests/color';
import {WIDTH} from '../locales/common';

const CommonBorder = () => {
  return <View style={styles.borderView}></View>;
};

export default CommonBorder;

const styles = StyleSheet.create({
  borderView: {
    width: WIDTH,
    height: 22,
    backgroundColor: COLORS.ThemeGreen,
  },
});
