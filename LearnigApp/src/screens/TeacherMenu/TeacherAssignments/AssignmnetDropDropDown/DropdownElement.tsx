import React, { useState } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import COLORS from '../../../../assests/color';

type AssignmnetDropDownProps = {
    label: string;
    data: any;
    selected: any;
    onSelect?: (item: any) => any,
  };

const DropdownElement = ({ label, data, selected, onSelect }: AssignmnetDropDownProps) => {
  
  const onSelectValue = (item: any) => {
    onSelect && onSelect(item)
  }
  
  return(
    <View style={styles.dropdownView}>
        <Text style={styles.subTextStyle}>
          {" "}
          {label}
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemContainerStyle={{margin:-3}}
          iconColor={COLORS.Black}
          data={data}
          maxHeight={100}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={selected?.value}
          onChange={(item) => onSelectValue(item)}
        />
    </View>
    )
}

export default DropdownElement;

const styles = StyleSheet.create({
    dropdown: {
      height: 48,
      borderColor: COLORS.InputBorderColor,
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 8,
      backgroundColor: COLORS.white,
    },
    placeholderStyle: {
      fontSize: 14,
      paddingLeft: 8,
      fontWeight: "300",
      color: COLORS.grey,
    },
    selectedTextStyle: {
      fontSize: 14,
      paddingLeft: 8,
      marginTop: -5,
      fontWeight: "400",
      color: COLORS.blackCode,
    },
    dropdownView : { 
      flexDirection: 'column', 
      flex: 1 ,
      marginHorizontal:'4.5%',
      marginTop: '4%',
    },
    subTextStyle: {
      fontWeight: "300",
      fontSize: 12,
      lineHeight: 17,
      color: COLORS.blackCode,
    },
  });