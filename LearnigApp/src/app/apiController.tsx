import axios from "axios";
import store from "../store/store";
import { Alert } from "react-native";
import endurl from "./endurl";
import { updateLoginData } from "../store/loginSlice";


export async function getAPIRequest(baseURL: string, extraData?: any) {
  const storeData = store.getState();
  const headers = {
    Authorization: `Bearer ${storeData?.login?.data?.AccessToken}`,
    ...extraData,
  };
  

  let responseToBeSent;

  await axios(baseURL, { headers: headers })
    .then((response: any) => {
      console.log("response get Api", response);
      responseToBeSent = response;
    })
    .catch((error: any) => {
      console.log("getAPICall Error: " + JSON.stringify(error.response.data));
      throw error;
    });

  return responseToBeSent;
}

export async function postAPIRequest(
  baseURL: string,
  data: any,
  extraData?: any
) {
  const storeData = store.getState();
  const headers = {
    Authorization: `Bearer ${storeData?.login?.data?.AccessToken}`,
    ...extraData,
  };

  // const refreshToken = storeData?.login?.data?.RefreshToken
  // console.log("refreshToken",refreshToken)
  try {
    const response = await axios.post(baseURL, data, { headers: headers });
    console.log("response post Api", response);
    return response;
  } catch (error: any) {
    console.log("Post API error", error.response.data);
    Alert.alert(error.response.data.message);
    throw error;
  }
}

export async function patchAPIRequest(
  baseURL: string,
  data?: any,
  headers?: any
) {
  try {
    const response = await axios.patch(baseURL, data, headers);
    console.log("response patch Api", response);
    return response;
  } catch (error: any) {
    console.log("Patch api error", error.response.data);
    throw error;
  }
}


axios.interceptors.response.use(response =>{
  return response
},
async error=>{
  const {config , response} = error
  if(error == 'Network Error')
    throw new Error('Network Error')
   else if(response &&  response.status == 403 )
   {
    try {
      const storeData = store.getState();
    const refreshToken = storeData?.login?.data?.RefreshToken
    console.log("refreshToken",refreshToken)
    const res = await postAPIRequest(endurl.REFRESHTOKEN,{refresh_token:refreshToken})
    console.log("refreshToken ===========================",res?.data?.response)
    const result = res?.data?.response
    store.dispatch(updateLoginData({
      AccessToken: result.AccessToken,
      IdToken: result.IdToken,
      ExpiresIn: result.ExpiresIn,
    }));
    const originalConfig = {
      ...config,
      headers :{
        ...config.headers,
        Authorization: `Bearer ${result.AccessToken}`,
      }
    }
    return axios(originalConfig);
    } catch (error) {
      console.log(error)
    }
  }
  return Promise.reject(error) 
})