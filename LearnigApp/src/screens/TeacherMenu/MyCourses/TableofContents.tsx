import { SectionList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackHeader from '../../../component/BackHeader'
import CONSTANT from '../../../locales/constants'
import COLORS from '../../../assests/color'
import { getAPIRequest } from '../../../app/apiController'
import endurl from '../../../app/endurl'
import MySectionListWithHOC from '../../../component/HocSectionList'
import { useSelector } from 'react-redux'

type Props = {}

const TableofContents = (props: any) => {

  const { course_id, title, createAssignmentData } = props?.route?.params
  const loginData = useSelector((state: any) => state?.login?.data)
  const { school_id, user_id, role } = loginData
  createAssignmentData.courseSelectData = course_id;

  return (
    <View style={styles.mainView}>

      <BackHeader title={title} />
      <MySectionListWithHOC
        url={`${endurl.CONTENTLISTING}${course_id}/?school_id=${school_id}&role=${role.name}`}
        createAssignmentData={createAssignmentData}/>

    </View>
  )
}

export default TableofContents

const styles = StyleSheet.create({
  mainView: { flex: 1, backgroundColor: COLORS.white },
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  }
})