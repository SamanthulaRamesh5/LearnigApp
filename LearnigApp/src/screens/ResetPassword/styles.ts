import { StyleSheet } from 'react-native'
import COLORS from '../../assests/color'
import { HEIGHT, WIDTH } from '../../locales/common'

export default StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex:1
  },
  subContainer: {
    width: '90%',
    height: '100%',
    justifyContent: 'flex-end',
    flex:1
  },
  borderView: {
    height: 22,
    backgroundColor: COLORS.ThemeGreen,
  },
  companyStyle: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    height: 42,
    marginRight: 7,
  },
  CompanyLogo: {
    marginLeft: 7,
  },
  borderLine: {
    backgroundColor: COLORS.borderLine,
    borderWidth: 0.1,
    marginTop: 23,
  },
  TextView: {
    marginTop: 32,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.orange,
  },
  TextInput1: {
    marginTop: 60,
  },
  TextInput2: {
    marginTop: 20,
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
    fontWeight: '400',
  },
  errorIcon: {
    marginTop: 2,
    marginLeft: 2,
  },
  errorView: {
    flexDirection: 'row',
    marginTop: 2,
  },
  errorText: {
    color: COLORS.red,
    marginLeft: 10,
    fontSize: 12,
    fontWeight: '400',
  },
})
