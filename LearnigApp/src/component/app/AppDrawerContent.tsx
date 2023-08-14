import React from 'react';
import { StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types';
import CustomIcon from '../CustomIcon';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  items: { title: string, route: string, icon: string }[];
}

const AppDrawerContent: React.FC<CustomDrawerContentProps> = ({ items, navigation, ...rest }) => {

  const currentRouteName = navigation.getState().routes[navigation.getState().index].name;

  return (
    <DrawerContentScrollView contentContainerStyle={{ paddingTop: 10 }} {...rest}>
      {items.map((item, index) => (
        <DrawerItem
          key={index}
          label={item.title}
          activeBackgroundColor={"#E1F0FA"}
          focused={currentRouteName === item.route}
          icon={({ focused, color, size }) => <CustomIcon
            name={item.icon}
            iconStyle={styles.dashboardIcon}
          />}
          onPress={() => navigation.navigate(item.route)} />
      ))}
      {/* <DrawerItemList navigation={undefined} {...rest} /> */}
    </DrawerContentScrollView>
  );
};

export default AppDrawerContent;

const styles = StyleSheet.create({
  iconStyle: {
    width: 20,
    height: 24,
  },
  dashboardIcon: {
    width: 22,
    height: 20,
  },
  studentCourseIcon: {
    width: 24,
    height: 17,
  },
});