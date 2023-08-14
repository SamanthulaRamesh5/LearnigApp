import axios from "axios";




export const getRequest = (url:any) => {

  return axios.get(url)
}

export const postRequest = (url:any, data:any) => {
  return axios.post(url, data)
}

