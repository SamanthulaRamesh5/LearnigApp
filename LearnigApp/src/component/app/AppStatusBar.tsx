import React from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import COLORS from '../../assests/color';

const AppStatusBar = ({...props}) => (
    <View style={styles.statusBar}>
      <SafeAreaView>
        <StatusBar barStyle="light-content"  translucent backgroundColor={COLORS.ThemeGreen} {...props} />
      </SafeAreaView>
    </View>
  );

export default AppStatusBar;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: COLORS.ThemeGreen
  },
});
