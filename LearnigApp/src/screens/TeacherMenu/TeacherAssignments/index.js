import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TeacherHeader from '../../../component/TeacherHeader'
import BackHeader from '../../../component/BackHeader'
import CONSTANT from '../../../locales/constants'
import { useNavigation } from '@react-navigation/native'
import styles from './style'
import CustomIcon from '../../../component/CustomIcon'
import data from './AssignmentSection'

const TeacherAssignments = () => {
  const navigation = useNavigation()
  console.log('hello')

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>{
        console.log('item',item.navigateTo)
        navigation.navigate(item.navigateTo, {
          assignmentType: item.assignmentType,
        })
      }
      }
    >
      <CustomIcon name={item.icon} iconStyle={styles.iconStyle} />
      <Text style={styles.itemText}>{item.assignmentType}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.mainView}>
      <TeacherHeader navigation={navigation} />
      <BackHeader title={CONSTANT.ASSIGNMENT} />
      <View style={styles.flatList}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemDivider}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  )
}

export default TeacherAssignments
