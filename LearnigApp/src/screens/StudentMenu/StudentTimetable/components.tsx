import { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import CONSTANT from "../../../locales/constants";
import { COLOR_ARR, months } from "../../../locales/dataConstant";
import styles from "./styles";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import endurl from "../../../app/endurl";
import { getAPIRequest } from "../../../app/apiController";
import Images from "../../../assests/images";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector } from "react-redux";
import COLORS from "../../../assests/color";

interface element {
  label: string;
  value: string;
}
interface dateElement {
  id: string;
  date: Date;
  status: boolean;
}

export const CurrentMonth = ({ setFlatLlistData }: any) => {
  const [typeData, selectTypeData] = useState<any>();
  const [selectedMonth, setSelectedMonth] = useState<element | any>("");
  const [selectedWeek, setSelectedWeek] = useState<element | any>("");
  const [weekItems, setWeekItems] = useState<element[]>([]);
  const [dateData, setDateData] = useState([]);
  const [isError, setIsError] = useState("");
  const [classData, setClassData] = useState([]);

  const loginData = useSelector((state: any) => state.login.data);

  function getWeekOfMonth(date: Date) {
    let dayOfMonth = date.getDate();
    let firstDayOfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    ).getDay();
    let adjustedDayOfMonth =
      dayOfMonth + (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
    return Math.ceil(adjustedDayOfMonth / 7);
  }
  useEffect(() => {
    const d = new Date();

    const week: number = getWeekOfMonth(d);
    getWeekDates(d.getFullYear(), d.getMonth(), week);

    const currentMonth = new Date().getMonth() + 1;
    handleMonthChange({
      value: currentMonth.toString(),
      label: months[currentMonth - 1].label,
    });
  }, []);

  const handleError = (error: any) => {
    const val: any = Object.values(error.response.data.errors);
    if (val.length === 0) {
      setIsError(CONSTANT.ExceptionMSG);
    } else if (val !== "") {
      setIsError(val[0]);
    } else {
      setIsError(CONSTANT.ERRMSG);
    }
  };
  // useEffect(() => {
  //   getClassDataDropDown();
  // }, [classData]);

  const getClassDataDropDown = () => {
    // loginData?.response?.data?.role?.id
    // 1976

    getAPIRequest(
      endurl.CLASSLIST + `?limit=1000&school_id=${loginData.school_id}`
    )
      .then((res: any) => {
        setClassData(res?.data?.response?.results);
      })
      .catch((error) => {
        throw error;
      });
  };
  const callTimeTableAPI = (dates: any) => {
    const date = moment.utc(dates[0]);
    const end = moment.utc(dates[dates.length - 1]);
    const startDate = date.format("YYYY-MM-DD");
    const endDate = end.format("YYYY-MM-DD");
    getAPIRequest(
      endurl.TIMETABLE +
        `?class_id=${
          loginData?.role?.name == "Student" ? loginData.class_id : typeData?.id
        }&start_date=${startDate}&end_date=${endDate}&branch_id=${
          loginData.branch_id ? loginData?.branch_id : ""
        }`
    )
      .then((res: any) => {
        const { status } = res;
        if (status == 200) {
          setClassData(res?.data?.response);
        }
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const handleMonthChange = (month: element) => {
    setSelectedMonth(month);
    const selectedMonthNumber = parseInt(month.value, 10);
    const weeksInMonth: element[] = getWeeksInMonth(selectedMonthNumber);
    setWeekItems(weeksInMonth);
  };

  const handleWeekChange = (week: element) => {
    setSelectedWeek(week);
    const d = new Date();
    let year = d.getFullYear();
    getWeekDates(year, parseInt(selectedMonth.value - 1), parseInt(week.value)); // month is 0-indexed, so 4 = May
  };

  const getWeekDates = (year: number, month: number, week: number) => {
    const firstDayOfMonth = new Date(year, month, 2);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    let firstDateOfWeek = firstDayOfMonth;
    if (week > 1) {
      firstDateOfWeek = moment(firstDayOfMonth)
        .add(7 * (week - 1), "d")
        .toDate();
    }

    const dates = [];
    if (week === 5) {
      let noOfDays = 1;
      let daysInMonth = moment(firstDayOfMonth).daysInMonth();
      if (daysInMonth === 30) {
        noOfDays = 2;
      } else if (daysInMonth === 31) {
        noOfDays = 3;
      }
      for (let i = 0; i < noOfDays; i++) {
        dates.push(
          new Date(
            firstDateOfWeek.getFullYear(),
            firstDateOfWeek.getMonth(),
            firstDateOfWeek.getDate() + i
          )
        );
      }
    } else {
      for (let i = 0; i < 7; i++) {
        dates.push(
          new Date(
            firstDateOfWeek.getFullYear(),
            firstDateOfWeek.getMonth(),
            firstDateOfWeek.getDate() + i
          )
        );
      }
    }
    const d = new Date();
    const days: any = [];
    dates.forEach((date: any, index) => {
      days.push({
        id: index + 1,
        date: date - 1,
        status:
          `${d.getDate()}-${d.getMonth()}` ==
          `${date.getDate() - 1}-${date.getMonth()}`
            ? true
            : false,
      });
    });
    setDateData(days);
    callTimeTableAPI(dates);
  };

  const getWeeksInMonth = (month: number) => {
    const weeksInMonth = [];
    const date = new Date();
    const daysInMonth = new Date(date.getFullYear(), month, 0).getDate();
    let defaultWeek = getWeekOfMonth(new Date());
    for (let i = 1; i <= daysInMonth; i += 7) {
      const week = {
        label: `Week ${Math.ceil(i / 7)}`,
        value: `${Math.ceil(i / 7)}`,
      };
      if (Math.ceil(i / 7) === defaultWeek) {
        setSelectedWeek(week);
      }
      weeksInMonth.push(week);
    }
    return weeksInMonth;
  };

  const onChangeDate = (dateItem: dateElement) => {
    // setSelectedDate(dateString);
    let newDates = JSON.parse(JSON.stringify(dateData));
    newDates.map((ele: dateElement) => {
      if (ele.id === dateItem.id) {
        ele.status = true;
        getClassData(ele?.date);
      } else {
        ele.status = false;
      }
    });
    setDateData(newDates);
  };
  useEffect(() => {
    const d: any = new Date();
    getClassData(Date.parse(d));
    getClassDataDropDown();
  }, []);

  const getClassData = (date: any) => {
    const newd = moment.utc(date);
    const newDate = newd.format("YYYY-MM-DD");
    const newArray = classData.filter((ele: any) => ele?.for_date === newDate);
    setFlatLlistData(newArray);
  };

  return (
    <View style={styles.marginLR}>
      <View style={styles.spacer} />
      <Text style={styles.selectMonthText}>{CONSTANT.SELECTMONTH}</Text>
      <View style={styles.spacer} />
      <View style={styles.currentMonth}>
        <Dropdown
          style={styles.dropdown}
          maxHeight={270}
          data={months}
          value={selectedMonth?.value}
          labelField="label"
          valueField="value"
          onChange={(item: any) => {
            handleMonthChange(item);
          }}
          itemTextStyle={styles.dropdownLabel}
          selectedTextStyle={styles.dropdownLabel}
          itemContainerStyle={styles.dropDownStyle}
        />

        <Dropdown
          style={styles.dropdown}
          maxHeight={270}
          data={weekItems}
          value={selectedWeek?.value}
          labelField="label"
          valueField="value"
          onChange={(item: any) => {
            handleWeekChange(item);
          }}
          itemTextStyle={styles.dropdownLabel}
          selectedTextStyle={styles.dropdownLabel}
          itemContainerStyle={styles.dropDownStyle}
          disable={selectedMonth == null}
        />
      </View>
      {loginData?.data?.response?.data?.role?.name == "Teacher" ? (
        <>
          <Text style={styles.subTextStyle}> {CONSTANT.SELECT_CLASS}</Text>
          <Dropdown
            style={styles.dropdownone}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconColor={COLORS.Black}
            data={classData}
            maxHeight={100}
            labelField={"name"}
            valueField="id"
            placeholder="Select"
            value={typeData}
            onChange={(item: any) => {
              selectTypeData(item);
            }}
          />
        </>
      ) : null}
      <View style={styles.datesStripContainer}>
        {dateData.length > 0 &&
          dateData.map((dateItem: dateElement) => {
            return (
              <TouchableOpacity
                key={dateItem.id}
                style={
                  dateItem.status == true
                    ? styles.dateStyle
                    : styles.dateStyleGreen
                }
                onPress={() => onChangeDate(dateItem)}
              >
                <Text>{moment(dateItem.date).format("ddd")}</Text>
                <Text>{moment(dateItem.date).format("DD")}</Text>
              </TouchableOpacity>
            );
          })}
      </View>

      {isError ? (
        <View style={styles.errorView}>
          <Image source={Images.error} style={styles.errorIcon} />
          <Text style={styles.errorText}>{isError}</Text>
        </View>
      ) : null}
    </View>
  );
};

export const DailySchedule = ({ item, index, holiday }: any) => {
  const backgroundColorIndex =
    Math.floor(Math.random() * (COLOR_ARR.length - 1)) + 1;

  function getTime(dateString: string) {
    const date = moment(dateString);
    const localDate = date.utcOffset(dateString).format("h:mm A");
    return localDate;
  }

  return (
    <View style={styles.marginLR}>
      <View style={styles.scheduleCard}>
        <View style={styles.scheduleTime}>
          <Text style={styles.scheduleTimeText}>{getTime(item.time_from)}</Text>
          <View style={styles.line} />
        </View>

        {holiday === true ? (
          <View
            style={[
              styles.scheduleSubjectCard,
              {
                backgroundColor: COLOR_ARR[backgroundColorIndex].bgcolor,
                borderLeftColor: COLOR_ARR[backgroundColorIndex].linecolor,
                borderLeftWidth: 5,
              },
            ]}
          >
            <View style={styles.cardView}>
              <Text style={styles.scheduleSubjectCardTitle}>
                {CONSTANT.HOLIDAY}
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.scheduleSubjectCard,
              {
                backgroundColor: COLOR_ARR[backgroundColorIndex].bgcolor,
                borderLeftColor: COLOR_ARR[backgroundColorIndex].linecolor,
                borderLeftWidth: 5,
              },
            ]}
          >
            <View style={styles.cardView}>
              <Text style={styles.scheduleSubjectCardTitle}>
                {item.course_name}
              </Text>
              <Text style={styles.scheduleSubjectCardSubTitle}>
                {item.class_name}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export const DailyScheduleList = ({ classData }: any) => {
  const isHoliday = classData[0]?.is_holiday;
  return (
    <>
      {classData.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={classData[0]?.time_blocks}
          renderItem={({ item, index }) => (
            <DailySchedule item={item} holiday={isHoliday} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View>
          <Text style={styles.noDataText}>{CONSTANT.NO_DATA}</Text>
        </View>
      )}
    </>
  );
};
