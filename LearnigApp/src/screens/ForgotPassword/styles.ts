import {StyleSheet} from 'react-native';
import COLORS from '../../assests/color';
import {HEIGHT, WIDTH} from '../../locales/common';

export default StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
  },
  subContainer: {
    width: '90%',
    height: '100%',
    justifyContent: 'flex-end',
    flex: 1,
  },
  borderView: {
    height: 22,
    backgroundColor: COLORS.ThemeGreen,
    // width: WIDTH,
  },
  companyStyle: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 118,
    height: 42,
    marginRight: 7,
  },
  CompanyLogo: {
    width: 152,
    height: 48,
    marginLeft: 7,
  },
  borderLine: {
    backgroundColor: COLORS.borderLine,
    borderWidth: 0.2,
    marginTop: 23,
  },
  ForgotText: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 32,
  },
  loginText: {
    color: COLORS.blackCode,
    fontWeight: '400',
    fontSize: 14,
    marginTop: 10,
  },
  TextInput: {
    marginTop: 40,
  },
  button: {
    marginTop: 38,
  },
  PrivacyText: {
    marginTop: 20,
    color: COLORS.grey,
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '300',
    color: COLORS.colorBlack,
  },
  errorIcon: {
    marginTop: 2,
    marginLeft: 2,
  },
  errorView: {
    marginTop: 5,
    flexDirection: 'row',
  },
  errorText: {
    color: COLORS.red,
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '400',
  },
});
