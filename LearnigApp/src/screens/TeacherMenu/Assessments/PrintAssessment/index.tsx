import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import CONSTANT from "../../../../locales/constants";
import COLORS from "../../../../assests/color";
import BackHeader from "../../../../component/BackHeader";
import styles from "./styles";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import NAVIGATION_CONSTANT from "../../../../locales/constantsNavigation";

const PrintAssessment = () => {
  const navigation: any = useNavigation();
  const assessmentDetails = useSelector(
    (state: any) => state.assessmentData.data
  );

  return (
    <SafeAreaView>
      <BackHeader title={assessmentDetails.name} />

      <View style={styles.borderView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NAVIGATION_CONSTANT.QUESTIONSHEETASSESSMENT)
          }
        >
          <View style={styles.buttonStyle}>
            <Text
              style={{
                color: COLORS.printAssessmentText,
                textAlign: "center",
              }}
            >
              {CONSTANT.PRINT_ASSSESMENT_QUESTION}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}></View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NAVIGATION_CONSTANT.ANSWERSHEETASSESMENT)
          }
        >
          <View style={styles.buttonStyle}>
            <Text
              style={{
                color: COLORS.printAssessmentText,
                textAlign: "center",
              }}
            >
              {CONSTANT.PRINT_ASSSESMENT_ANSWER}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PrintAssessment;
