import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import COLORS from "../assests/color";
import { useDispatch, useSelector } from "react-redux";
import { addDropdownValue } from "../store/dropdownSlice";

interface props {
  courseData: any;
  dropdownValue?: any;
  onSelect?: (item: any) => any;
}

const CommonDropdown = ({ courseData, dropdownValue, onSelect }: props) => {
  const [items, setItems] = useState([{}]);
  const dispatch = useDispatch();
  const dropdown_value = useSelector((state: any) => state?.dropdown?.data);
  const [value, setValue] = useState(dropdown_value?.value);

  useEffect(() => {
    const arr = courseData?.map((d: any) => ({
      label: d.first_name + " " + d.last_name,
      value: d.id,
      ...d,
    }));
    setItems(arr);
  }, [courseData]);

  useEffect(() => {
    setValue(dropdown_value.value);
  }, [dropdown_value]);

  const onSelectValue = (item: any) => {
    dispatch(addDropdownValue(item));
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={[styles.selectedTextStyle, styles.capitalizeText]}
      itemTextStyle={styles.capitalizeText}
      itemContainerStyle={{ margin: -12 }}
      iconColor={COLORS.Black}
      data={items}
      maxHeight={100}
      labelField="label"
      valueField="value"
      placeholder="Select child"
      value={value}
      onChange={(item: any) => {
        onSelectValue(item);
      }}
    />
  );
};

export default CommonDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 40,
    borderColor: COLORS.InputBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 16,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 20,
    top: 5,
    zIndex: 999,
    paddingHorizontal: 5,
    fontSize: 13,
  },
  placeholderStyle: {
    fontSize: 14,
    paddingLeft: 10,
    fontWeight: "300",
    color: COLORS.textColor,
  },
  selectedTextStyle: {
    fontSize: 14,
    paddingLeft: 10,
    fontWeight: "300",
    color: COLORS.textColor,
  },
  capitalizeText: {
    textTransform: "capitalize",
  },
});
