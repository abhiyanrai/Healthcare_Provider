import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL ,SERVER_ENDPOINT} from "../utils/baseUrl";


axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      toast.error(error.response.data?.messsage || error.messsage);
    } else{
      throw error ;
    }
  }
);

export const postApi = (path, data) => {
  const token = localStorage.getItem("token")
  if(!token) return ;
  return axios.post(API_BASE_URL + path,  data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
}
export const postImgApi = (path, data) => {
  const token = localStorage.getItem("token")
  if(!token) return ;
  return axios.post(API_BASE_URL + path,  data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
  })
}

export const getApi = (path) => {
  const token = localStorage.getItem("token");
  if(!token) return ;
  return axios.get(API_BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
}




export const getListApi = (path)=>{
  const token = localStorage.getItem("token");
  if(!token) return ;
  return axios.get( SERVER_ENDPOINT + path,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
}

export const postApiWithoutToken = (path, data) => {
    return axios.post(API_BASE_URL + path, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
}
export const patchApiWithoutToken = (path, data) => {
  return axios.patch(API_BASE_URL + path, data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export const patchApi = (path, data) => {
  const token = localStorage.getItem("token")
  if(!token) return ;
  return axios.patch(API_BASE_URL + path, data, {
    headers: {
      "Content-Type": "application/json",
     Authorization: `Bearer ${token}`
    }
  })
}

export const deleteApi = (path, data) => {
  const token = localStorage.getItem("token")
  if(!token) return ;
  return axios.put(API_BASE_URL + path,data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export const putApi = (path, data) => {
  const token = localStorage.getItem("token");
  if(!token) return ;
  return axios.put(API_BASE_URL  + path, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


export const deletedApi = (path) => {
  const token = localStorage.getItem("token")
  if(!token) return ;
  return axios.delete(API_BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}



 




