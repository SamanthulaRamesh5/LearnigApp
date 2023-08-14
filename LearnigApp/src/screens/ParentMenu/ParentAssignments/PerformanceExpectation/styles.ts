import { StyleSheet } from "react-native";
import COLORS from "../../../../assests/color";
import { HEIGHT, WIDTH } from "../../../../locales/common";

export default StyleSheet.create({
  mainView: {
    height: HEIGHT,
    width: WIDTH,
    backgroundColor: COLORS.white,
  },
  marginView: {
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },

  handleMargin: {
    marginTop: 24,
  },

  item: {
    paddingVertical: "5%",
    paddingHorizontal: "2%",
    marginLeft: "5%",
    width: "85%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemText: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "400",
    color: COLORS.blackCode,
    paddingLeft: "5%",
  },
  itemSeparator: {
    height: 1,
    width: "85%",
    marginLeft: "5%",
    backgroundColor: COLORS.listSeparatorColor,
  },

  textStyle: {
    fontWeight: "600",
    fontSize: 14,
    padding: 10,
    lineHeight: 19,
    color: COLORS.blackCode,
  },

  flatListMain: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.listSeparatorColor,
  },

  mainRenderView: {
    width: "34%",
    borderColor: COLORS.transparentGrey,
    borderLeftWidth: 3,
    height: 55,
    justifyContent: "center",
  },

  fromView: {
    width: "33%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  toView: {
    width: "33%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  headerFirst: {
    margin: "4%",
    padding: "3%",
    flexDirection: "column",
    borderWidth: 1,
    borderColor: COLORS.InputBorderColor,
    alignItems: "center",
  },
  rowWiseView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    padding: "4%",
    height: 65,
  },
  performanceView: {
    width: "34%",

  },
  fromHeaderView: {
    width: "33%",
    alignItems: "center",
  },
  ToHeaderView: {
    width: "33%",
    paddingLeft: '10%',
    alignItems: "center",
  },
  emptyList:{textAlign:'center'}
});
