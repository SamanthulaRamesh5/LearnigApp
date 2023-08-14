import * as React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import COLORS from '../assests/color'

const Loader = () => (
  <View style={styles.mainContainer}>
    <ActivityIndicator
      animating={true}
      color={COLORS.ThemeGreen}
      size="large"
    />
  </View>
)

export default Loader;

const styles = StyleSheet.create({
mainContainer:{
  alignItem: 'çenter', 
  justifyContent: 'center',
  flex: 1,
}
})
