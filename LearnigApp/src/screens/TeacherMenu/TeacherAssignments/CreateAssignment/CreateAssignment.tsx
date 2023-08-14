import { SafeAreaView, ScrollView } from "react-native";
import CommonBorder from "../../../../component/CommonBorder";
import TeacherHeader from "../../../../component/TeacherHeader";
import CONSTANT from "../../../../locales/constants";
import BackHeader from "../../../../component/BackHeader";
import style from "./style";
import CreateSectionOne from "./CreateAssignmnetSectionOne/CreateAssignmnetSectionOne";
import CreateSectionTwo from "./CreateAssignmnetSectionTwo/CreateAssignmnetSectionTwo";
import CreateSectionThree from "./CreateAssignmnetSectionThree/CreateAssignmnetSectionThree";
import { useEffect, useState } from "react";

const CreateAssignment = () => {
  const [dataSectionOne, setDataSectionOne] = useState();
  const [dataSectionTwo, setDataSectionTwo] = useState();
  const [dataSectionOneStatus, setDataSectionOneStatus] = useState(true);
  const [dataSectionTwoStatus, setDataSectionTwoStatus] = useState(false);
  const [dataSectionThree, setDataSectionThreeStatus] = useState(false);
  console.log(dataSectionOne,dataSectionTwo)
  useEffect(() => {
    if (dataSectionOne) {
      setDataSectionOneStatus(false);
      setDataSectionTwoStatus(true);
      setDataSectionThreeStatus(false)
    }
  }, [dataSectionOne]);

  useEffect(() => {
    if (dataSectionTwo) {
      setDataSectionOneStatus(false);
      setDataSectionTwoStatus(false);
      setDataSectionThreeStatus(true)
    }
  }, [dataSectionTwo]);

  return (
    <SafeAreaView style={style.mainView}>
      <BackHeader title={CONSTANT.CREATE_ASSIGNMENT} />
      {dataSectionOneStatus ? (
        <CreateSectionOne passData={(data: any) => setDataSectionOne(data)} />
      ) : null}
      {dataSectionTwoStatus ? <CreateSectionTwo passData={(data: any) => setDataSectionTwo(data)} /> : null}
      {dataSectionThree ? <CreateSectionThree /> : null}
    </SafeAreaView>
  );
};

export default CreateAssignment;
