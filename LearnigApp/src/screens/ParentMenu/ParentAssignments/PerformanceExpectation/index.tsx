import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import styles from "./styles";
import CommonBorder from "../../../../component/CommonBorder";
import TeacherHeader from "../../../../component/TeacherHeader";
import BackHeaderForParent from "../../../../component/BackHeaderForParent";

import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import { getAPIRequest } from "../../../../app/apiController";
import endurl from "../../../../app/endurl";
import { useSelector } from "react-redux";
import { PerformanceColorCombinations } from "../../../../locales/dataConstant";

const PerformanceExpectation = () => {
  const [data,setData] = useState([]);
  const [loader, setLoader] = useState(false);
 
  const id = useSelector((state: any) => state.dropdown.data.id);
  
  useEffect(()=>{
    if(id){
    setLoader(true);
    getAPIRequest(`${endurl.REPORT_SERVICES}?user_id=${id}`)
      .then((res: any) => {
        const responseData = res?.data?.response;
        
        if(responseData)
         setData(responseData);
         
      })
      .catch((error) => {
        console.log(error);
      }).finally(()=>{
        setLoader(false);
      });
    }
    },[id])

  const ItemDivider = () => {
    return <View style={styles.itemSeparator} />;
  };

  const renderItem = ({ item }) => (
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
      

      <BackHeaderForParent title={CONSTANT.PERFORMANCE} dropdown={true} />
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
            data={data}
            keyExtractor={(item) => item.id}
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

export default PerformanceExpectation;
