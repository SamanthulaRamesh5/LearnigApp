import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import AppHeader from "../component/app/AppHeader";
import NAVIGATION_CONSTANT from "../locales/constantsNavigation";
import { parentDrawer, parentRoutes } from "./ParentRoutes";
import { studentDrawer, studentRoutes } from "./StudentRoutes";
import { teacherDrawer, teacherRoutes } from "./TeacherRoutes";
import AppDrawerContent from "../component/app/AppDrawerContent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
  const loginData = useSelector((state: any) => state.login.data);
  const role = loginData?.role?.name;

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <AppDrawerContent
          {...props}
          items={
            role === "Teacher"
              ? teacherDrawer
              : role === "Student"
              ? studentDrawer
              : parentDrawer
          }
        />
      )}
      backBehavior="history"
      screenOptions={({ navigation, route }) => ({
        header: () => <AppHeader navigation={navigation} />,
        drawerType: "slide",
      })}
    >
      {role === "Teacher"
        ? teacherRoutes()
        : role === "Student"
        ? studentRoutes()
        : parentRoutes()}
    </Drawer.Navigator>
  );
};

export const AuthStackNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName={NAVIGATION_CONSTANT.LOGIN}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={NAVIGATION_CONSTANT.LOGIN}
      options={{ headerShown: false }}
      component={LoginScreen}
    />
    <Stack.Screen
      name={NAVIGATION_CONSTANT.FORGOT}
      options={{ headerShown: false }}
      component={ForgotPassword}
    />
    <Stack.Screen
      name={NAVIGATION_CONSTANT.RESETPASSWORD}
      options={{ headerShown: false }}
      component={ResetPassword}
    />
    <Stack.Screen name={NAVIGATION_CONSTANT.DRAWER} component={DrawerStack} />
  </Stack.Navigator>
);
