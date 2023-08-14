import COLORS from "../assests/color";

const scoreColor = (score: any) => {
  let scoreColour = "";

  if (score <= 35) {
    scoreColour = COLORS.bgOrange;
  } else if (score >= 36 && score < 59) {
    scoreColour = COLORS.bgOrange;
  } else if (score >= 60 && score < 69) {
    scoreColour = COLORS.bgYellow;
  } else if (score >= 70 && score < 79) {
    scoreColour = COLORS.bgBlue;
  } else if (score >= 80 && score < 100) {
    scoreColour = COLORS.bgGreen;
  } else {
    scoreColour = COLORS.white;
  }

  // switch (score) {
  //   case score <= 35:
  //     scoreColour = COLORS.bgOrange;
  //     break;
  //   case score >= 36 && score < 59:
  //     scoreColour = COLORS.bgOrange;
  //     break;
  //   case score >= 60 && score < 69:
  //     scoreColour = COLORS.bgYellow;
  //     break;
  //   case score >= 70 && score < 79:
  //     scoreColour = COLORS.bgBlue;
  //     break;
  //   case score >= 80 && score < 100:
  //     scoreColour = COLORS.bgGreen;
  //     break;
  //   default:
  //     scoreColour = COLORS.white;
  // }
  return scoreColour;
};
export default scoreColor;
