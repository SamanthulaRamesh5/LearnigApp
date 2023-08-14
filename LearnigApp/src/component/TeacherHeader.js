import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import COLORS from '../assests/color'
import { WIDTH } from '../locales/common'
import Images from '../assests/images'

const TeacherHeader = () => {
  const navigation = useNavigation()
  return (
    <View style={[styles.mainView, styles.shadowProp]}>
      <View style={styles.subView}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Images.Menu style={styles.menuStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Images.HomeImg style={styles.homeStyle} />
        </TouchableOpacity>
      </View>
      <View style={[styles.subView, styles.endView]}>
        <Images.ScannerImg style={styles.scanner} />
        <Images.MsgImg style={styles.msgBox} />
        <Images.Calender style={styles.msgBox} />
      </View>
    </View>
  )
}

export default TeacherHeader

const styles = StyleSheet.create({
  mainView: {
    width: WIDTH,
    height: 61,
    backgroundColor: COLORS.white,
    // marginBottom: 20,
    flexDirection: 'row',
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  subView: {
    width: '50%',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  endView: {
    justifyContent: 'flex-end',
  },
  menuStyle: {
    height: 17,
    width: 24,
    marginLeft: 15,
  },
  homeStyle: {
    height: 20,
    width: 19,
    marginLeft: 13,
  },
  scanner: {
    height: 16,
    width: 16,
    marginRight: 13,
  },
  msgBox: {
    height: 20,
    width: 20,
    marginRight: 13,
  },
  calender: {
    height: 24,
    width: 24,
    marginRight: 22,
  },
})
