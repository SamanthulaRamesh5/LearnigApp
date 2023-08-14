import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

type props = {
  title: string
  onDropdownPress?: () => any
  data: any
  onSelect?: (item:any) => any
}

const DropdownPicker = ({
  title,
  onDropdownPress,
  data,
  onSelect
}: props) => {
  const [value, setValue] = useState(null)
  const [items, setItems] = useState([{}])
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    if(data && data.length>0)
      {
      const arr = data?.map((d: any) => ({ label: d.grade ?? d.volume, value: d.courses_id }))
      setItems(arr)
    }
  }, [data])

  const onClickDropDown = () => {
    setIsFocus(false)
    onDropdownPress && onDropdownPress()
  }

  const onSelectValue = (item: any) => {
    setValue(item.value)
    onSelect && onSelect(item)
  }

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={items}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={title}
      value={value}
      onFocus={onClickDropDown}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => onSelectValue(item)}
    />
  )
}

export default DropdownPicker

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
