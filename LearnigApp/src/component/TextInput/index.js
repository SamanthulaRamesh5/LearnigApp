import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import COLORS from '../../assests/color';
import {WIDTH} from '../../locales/common';
import CONSTANT from '../../locales/constants';

const TextInputComp = ({username, password}) => {
  const [text, onChangeText] = React.useState('Useless Text');
  return (
    <View>
      <TextInput
        style={style.input}
        placeholder={CONSTANT.USERNAME}
        placeholderTextColor={COLORS.colorBlack}
        value={username}
        // onFocus={() => setDefaultState(true)}
        // onChangeText={username => onChangeEmail(username)}
        // opacity={defaultState === true ? 1 : 0.5}
      />
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1.5,
    width: WIDTH - 30,
    borderRadius: 4,
    borderColor: COLORS.InputBorderColor,
    marginTop: 60,
    padding: 10,
  },
});

export default TextInputComp;
