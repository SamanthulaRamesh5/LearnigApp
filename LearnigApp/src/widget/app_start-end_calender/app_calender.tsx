// import { StyleSheet } from "react-native";
// import { View } from "react-native";
// import { Text } from "react-native-paper";
// import CONSTANT from "../../locales/constants";
// import COLORS from "../../assests/color";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { Image } from "react-native-svg";
// import Images from "../../assests/images";
// import { useEffect, useState } from "react";
// import DatePicker from "react-native-date-picker";

// type APPCALENDERPROPS = {
//   getDate: (startDate: any, endDate: any) => void;
// };

// const APPCALENDER = ({ getDate }: APPCALENDERPROPS) => {
//   const [open, setOpen] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [startDateStatus, setStartDateStatus] = useState(true);
//   const [enddateStatus, setendDatestatus] = useState(true);
//   const [endDate, setEndDate] = useState(new Date());
//   const [close, setCLose] = useState(false);

//   return (
//     <View style={style.mainView}>
//       <View>
//         <Text style={style.labelStyle}>{CONSTANT.START_DATE}</Text>
//         <View style={style.calenderView}>
//           <Text style={style.dateStyle}>
//             {startDateStatus
//               ? "Start Date"
//               : `${startDate?.getDate()}/${
//                   startDate?.getMonth() + 1
//                 }/${startDate?.getFullYear()}`}
//           </Text>
//           <TouchableOpacity onPress={()=>setOpen(true)}>
//             <Images.Calender />
//             <DatePicker
//               modal
//               open={open}
//               date={startDate}
//               maximumDate={new Date()}
//               mode="date"
//               onConfirm={(date) => {
//                 setOpen(false);
//                 setStartDate(date);
//                 setStartDateStatus(false);
//               }}
//               onCancel={() => {
//                 setOpen(false);
//               }}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View>
//         <Text style={style.labelStyle}>{CONSTANT.END_DATE}</Text>
//         <View style={style.calenderView}>
//           <Text style={style.dateStyle}>
//             {enddateStatus
//               ? "End Date"
//               : `${endDate?.getDate()}/${
//                   endDate?.getMonth() + 1
//                 }/${endDate?.getFullYear()}`}
//           </Text>
//           <TouchableOpacity onPress={()=>setCLose(true)}>
//             <Images.Calender />
//             <DatePicker
//               modal
//               open={close}
//               date={endDate}
//               maximumDate={new Date()}
//               mode="date"
//               onConfirm={(date) => {
//                 setCLose(false);
//                 setEndDate(date);
//                 setendDatestatus(false);
//                 getDate(startDate,endDate)
//               }}
//               onCancel={() => {
//                 setCLose(false);
//               }}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };
// const style = StyleSheet.create({
//   mainView: {
//     flexDirection: "row",
//     marginTop: "5%",
//     paddingHorizontal: "5%",
//     justifyContent: "space-between",
//   },
//   labelStyle: {
//     fontSize: 12,
//     fontWeight: "300",
//     color: COLORS.colorBlack,
//   },
//   calenderView: {
//     width: 165,
//     height: 48,
//     backgroundColor: COLORS.white,
//     borderWidth: 1,
//     borderColor: COLORS.InputBorderColor,
//     marginTop: "2%",
//     borderRadius: 4,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: "3%",
//     justifyContent: "space-between",
//   },
//   dateStyle: {
//     fontSize: 14,
//     fontWeight: "400",
//     color: COLORS.colorBlack,
//   },
// });

// export default APPCALENDER;
