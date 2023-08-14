import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import COLORS from '../assests/color';
import { WIDTH } from '../locales/common';

interface Props {
  title: string;
  icon?: FC<{ style?: object }>;
  iconStyle?: object;
  onPressItem?: () => void;
}

const DashboardMenu: FC<Props> = ({
  title,
  icon: Icon,
  onPressItem,
}) => {
  return (
    <TouchableOpacity style={styles.borderView} onPress={onPressItem}>
      <View style={styles.borderView} >
      <View style={styles.borderLeft}/>
        <View style={styles.iconContainter}>
        {Icon && <Icon />}
        </View>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default DashboardMenu

const styles = StyleSheet.create({
  borderView: {
    width: WIDTH / 2 - 30,
    height: WIDTH / 3,
    borderRadius: 5,
    borderColor: COLORS.transparentGrey,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGrey,
    margin: 10
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: COLORS.blackCode,
  },
  borderLeft: {
    backgroundColor: COLORS.green,
    height: WIDTH / 3 - 7,
    width: 2.5,
    position: "absolute",
    left: 0,
    top: 2,
    borderRadius: 5
  },
  iconContainter: {
    width: WIDTH/4 - 20,
    height: WIDTH/4 - 20,
    alignItems: "center",
    justifyContent: "center"
  }
})
