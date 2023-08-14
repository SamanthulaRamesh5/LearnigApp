import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from "react-native-modal-datetime-picker";
import Images from "../assests/images";
import COLORS from '../assests/color';
import CONSTANT from '../locales/constants';
import moment from 'moment';

type Props = {
    startDate:any,
    endDate:any,
    setEndDate:(date:any)=>void,
    setStartDate:(date:any)=>void
}

const DatePickers = (props: Props) => {

    const {startDate,endDate,setStartDate,setEndDate} = props

    const [isDatePickerVisibleSt, setDatePickerVisibilitySt] =
    useState<boolean>(false);
  const [isDatePickerVisibleEd, setDatePickerVisibilityEd] =
    useState<boolean>(false);
    const [isError, setIsError] = useState("");


    const hideDatePickerStart = () => {
        setDatePickerVisibilitySt(false);
      };
    
      const handleConfirmStart = (date: string) => {
        let req_format = moment(date).format("YYYY-MM-DD");
        setStartDate(req_format);
        if (endDate !== "Select")
          moment(req_format).isAfter(endDate)
            ? setIsError(CONSTANT.DATE_ERROR)
            : setIsError("");
        hideDatePickerStart();
      };

      //end


      const handleConfirmEnd = (date: string) => {
        let req_endDate = moment(date).format("YYYY-MM-DD");
        setEndDate(req_endDate);
        if (startDate !== "Select")
          moment(startDate).isAfter(req_endDate)
            ? setIsError(CONSTANT.DATE_ERROR)
            : setIsError("");
        hideDatePickerEnd();
      };

      const hideDatePickerEnd = () => {
        setDatePickerVisibilityEd(false);
      };


  return (
    <>
    <View style={localStyles.dateView}>
            {/* View to display Start Date and picker */}
            <View style={localStyles.dtView1}>
              <Text style={localStyles.dtTitle}>{CONSTANT.STARTDATE}</Text>
              <View style={localStyles.innerdateView}>
                <Text style={localStyles.dtTxt}>{startDate}</Text>
                {/* Date Picker for Start Date */}
                <DateTimePicker
                  isVisible={isDatePickerVisibleSt}
                  mode="date"
                  onConfirm={handleConfirmStart}
                  onCancel={hideDatePickerStart}
                  maximumDate={new Date()}
                />
                <TouchableOpacity
                  onPress={() =>
                    setDatePickerVisibilitySt(!isDatePickerVisibleSt)
                  }
                >
                  <Images.Calender
                    height={15}
                    width={15}
                    style={localStyles.calender}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ width: "2%" }} />

            {/* View to display End Date and Picker */}
            <View style={localStyles.dtView1}>
              <Text style={localStyles.dtTitle}>{CONSTANT.ENDDATE}</Text>
              <View style={localStyles.innerdateView}>
                <Text style={localStyles.dtTxt}>{endDate}</Text>
                {/* Date Picker for End Date */}
                <DateTimePicker
                  isVisible={isDatePickerVisibleEd}
                  mode="date"
                  onConfirm={handleConfirmEnd}
                  onCancel={hideDatePickerEnd}
                  maximumDate={new Date()}
                  minimumDate={new Date(startDate)}
                />
                <TouchableOpacity
                  onPress={() =>
                    setDatePickerVisibilityEd(!isDatePickerVisibleEd)
                  }
                >
                  <Images.Calender
                    height={15}
                    width={15}
                    style={localStyles.calender}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
            {isError ? (
                <View style={localStyles.errorView}>
                  <Text style={localStyles.errorText}>{isError}</Text>
                </View>
              ) : null}
              </>
  )
}

export default DatePickers

const localStyles = StyleSheet.create({

    dateView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "4%",
        marginTop: "8%",
      },
      dtView1: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
      },
      dtTitle: {
        fontSize: 12,
        color: COLORS.colorBlack,
      },
      dtTxt: {
        fontSize: 14,
        color: COLORS.colorBlack,
      },
      innerdateView: {
        height: 40,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: COLORS.InputBorderColor,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 12,
        padding: "4%",
      },
      calender: {
        // margin: 8,
        alignSelf: "flex-end",
      },
      errorView: {
        paddingHorizontal: 10,
      },
      errorText: {
        fontWeight: "400",
        fontSize: 12,
        padding: 10,
        lineHeight: 19,
        color: COLORS.red,
      },
})