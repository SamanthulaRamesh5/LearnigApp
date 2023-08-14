import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import styles from "./styles";
import CommonBorder from "../../../component/CommonBorder";
import TeacherHeader from "../../../component/TeacherHeader";
import BackHeader from "../../../component/BackHeader";
import CONSTANT from "../../../locales/constants";
import { getAPIRequest } from "../../../app/apiController";
import endurl from "../../../app/endurl";
import { useSelector } from "react-redux";
import { PerformanceColorCombinations } from "../../../locales/dataConstant";

interface dataItem {
  id: number;
  name: string;
  from: number;
  to: number;
  bgColor: string;
  background: string;
};

const PerformanceExpectationTeacher = () => {
  const loginData = useSelector((state: any) => state.login.data);
  const {user_id} = loginData
  const [expectationsData, setData] = useState<dataItem[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(()=>{
    setLoader(true);  
    getAPIRequest(`${endurl.REPORT_SERVICES}?user_id=${user_id}`)
      .then((res: any) => {
        const responseData = res?.data?.response;
        setData(responseData);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
    },[])

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem = ({ item } : any) => (
    <View style={styles.flatListMain}>
      <View
        style={[
          styles.mainRenderView,
          { backgroundColor: PerformanceColorCombinations[item.status.trim()]?.bgColor, borderLeftColor: PerformanceColorCombinations[item.status.trim()]?.background},
        ]}
      >
        <Text style={[styles.itemText]}>{item.status}</Text>
      </View>

      <View style={styles.fromView}>
        <Text style={styles.itemText}>{item.from_value}</Text>
      </View>
      <View style={styles.toView}>
        <Text style={styles.itemText}>{item.to_value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainView}>
      

      <BackHeader title={CONSTANT.PERFORMANCE} />
      <View style={styles.marginView}>
        <View style={styles.headerFirst}>
          <View style={styles.rowWiseView}>
            <View style={styles.performanceView}>
              <Text>{CONSTANT.PERFORMANCE}</Text>
            </View>
            <View style={styles.fromHeaderView}>
              <Text>{CONSTANT.FROM} {CONSTANT.PERCENT}</Text>
            </View>
            <View style={styles.ToHeaderView}>
              <Text>{CONSTANT.TO} {CONSTANT.PERCENT}</Text>
            </View>
          </View>

          <FlatList
            data={expectationsData}
            keyExtractor={(item,index) => index.toString()}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemDivider}
            ListEmptyComponent={loader?<ActivityIndicator animating size={'small'}/>
                                      :<Text style={styles.emptyList}>No data available</Text>}
            // scrollEnabled={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PerformanceExpectationTeacher;