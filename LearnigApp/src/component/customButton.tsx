import React,{FC} from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import COLORS from '../assests/color';

interface Props {
  title: string;
  disable?: boolean;
  onPressButton?: () => void;
  content?: FC<{ contentStyle?: object }>;
}

const CustomButton:FC<Props> = ({
  title, disable,onPressButton, content:contentStyle
}) => {
  return (
    <Button
      style={styles.buttonStyle}
      contentStyle={styles.buttonText}
      mode="contained"
      disabled={disable}
      onPress={ onPressButton}>
      {title}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.ThemeGreen,
    borderRadius: 4,
    height: 40,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 16,
  },
});
