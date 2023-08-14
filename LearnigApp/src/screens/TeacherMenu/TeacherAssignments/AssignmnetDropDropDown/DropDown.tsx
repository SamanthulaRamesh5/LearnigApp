import React, { useRef, useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
} from "react-native";
import COLORS from "../../../../assests/color";
import Images from "../../../../assests/images";

type AssignmnetDropDownProps = {
  label: string;
  data: any;
  onSelect: any;
  task: string;
};

const AssignmnetDropDown = ({ label, data, onSelect, task }: AssignmnetDropDownProps) => {
  const DropdownButton: any = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>({});
  const [dropdownTop, setDropdownTop] = useState(0);
  const [isDisable, setIsDisable] = useState(false);
  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton.current.measure(
      (_fx: any, fy: any, w: any, h: any, _px: any, py: any) => {
        setDropdownTop(py + h);
      }
    );
    setVisible(true);
  };

  const onItemPress = (item: React.SetStateAction<{}>) => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderFooter = () => {
    return <View style={{ height: 30 }} />;
  };
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item[task]}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              style={styles.flatStyles}
              ListFooterComponent={renderFooter}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.mainVIew}>
      <Text style={styles.textStyle}>{label}</Text>
      <TouchableOpacity
        style={styles.button}
        ref={DropdownButton}
        onPress={toggleDropdown}
        disabled={isDisable}
      >
        {renderDropdown()}
        <Text style={styles.buttonText}>
          {(selected && selected[task]) || 'Select'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.eyeStyle}
        ref={DropdownButton}
        onPress={toggleDropdown}
        disabled={isDisable}
      >
        <Images.DownArrow style={styles.imgsStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    height: 48,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    marginTop: "2%",
    borderRadius: 4,
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.colorBlack,
    paddingLeft: 10,
    alignItems: "center",
  },
  textStyle: {
    fontSize: 12,
    fontWeight: "300",
    color: COLORS.colorBlack,
  },
  mainVIew: {
    marginTop: "5%",
    paddingHorizontal: "5%",
  },
  buttonText: {
    flex: 1,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: COLORS.white,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  overlay: {
    width: "95%",
    height: "100%",
    alignSelf: "center",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: COLORS.InputBorderColor,
  },
  eyeStyle: {
    position: "relative",
    bottom: 28,
    left: 320,
  },
  imgsStyle: {
    width: 20,
    height: 10,
  },
  flatStyles: {
    height: 100,
    paddingVertical: 15,
    borderColor: COLORS.InputBorderColor,
    borderWidth: 1,
  },
});

export default AssignmnetDropDown;
