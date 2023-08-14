import * as Keychain from 'react-native-keychain';

export const setItem = async (username:any, password:any) => {
  try {
    await Keychain.setGenericPassword(username, password);
  } catch (e) {
    return null;
  }
};

export const getItem = async () => {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
  await Keychain.resetGenericPassword();
};

