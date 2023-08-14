import React, { useEffect, useState } from 'react'
import { StyleSheet, View ,StyleProp,ViewStyle} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import COLORS from '../assests/color'
import WebView from 'react-native-webview'

type props = {
    title: string
    onDropdownPress?: () => any
    data: any
    onSelect?: (item: any) => any,
    style:StyleProp<ViewStyle>
}

const CoursesDropDown = ({
    title,
    data,
    onSelect,
    style
}: props) => {
    const [value, setValue] = useState(null)
      const [items, setItems] = useState([])

      useEffect(() => {
        if(data && data.length>0)
          {
          const arr = data?.map((d: any) => ({ label: d.grade ?? d.volume, value: d.courses_id }))
          setItems(arr)
        }
      }, [data])


    const onSelectValue = (item: any) => {
        setValue(item.value)
        onSelect && onSelect(item)
    }

    return (

        <Dropdown
            style={[styles.dropdown,style]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={items}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={title}
            value={value}
            onChange={(item) => onSelectValue(item)}
        />

    )
}



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
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 14,
        paddingLeft: 10,
        fontWeight: "300",
        color: COLORS.blackCode,
    },
})

export default React.memo(CoursesDropDown)
