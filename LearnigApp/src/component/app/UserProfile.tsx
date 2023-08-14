import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector} from  "react-redux"
import CONSTANT from '../../locales/constants';

interface User {
  profilePic?: any;
  firstName: string;
  lastName: string;
  className?: string;
  role: string;
  schoolName?: string;
}

const UserProfile: React.FC = () => {
  const loginData = useSelector((state: any) => state.login.data);
  const role = loginData.role.name == 'Parent'
  
  const user: User = {
    profilePic: loginData?.profile_picture,
    firstName: loginData.first_name,
    lastName: loginData.last_name,
    className: loginData?.class_name,
    role: loginData?.role?.name,
    schoolName: loginData?.school_name
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: user.profilePic}} style={styles.profilePic} />
      <Text style={styles.name}>{user.firstName} {user.lastName}</Text>
      <Text style={styles.info}><Text style={styles.infoBold}>{CONSTANT.SCHOOL}: </Text>{user.schoolName}</Text>
      <Text style={styles.info}><Text style={styles.infoBold}>{CONSTANT.ROLE}: </Text>{user.role}</Text>
      {!role && <Text style={styles.info}><Text style={styles.infoBold}>{CONSTANT.CLASS}: </Text>{user.className}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  infoBold: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold"
  },
});

export default UserProfile;
