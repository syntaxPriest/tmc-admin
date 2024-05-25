import axios, { type AxiosError, type AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";

export const contribuildApi = axios.create({
  baseURL: 'https://api.contribuild.ng',
});

export const setToken = (token: string | undefined, user_id: string | undefined) => {
  if (token){
    contribuildApi.defaults.headers["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }
  if (user_id){
    contribuildApi.defaults.headers['User_id'] = user_id;
  }
  contribuildApi.defaults.headers["Access-Control-Allow-Origin"] = "*";
  contribuildApi.defaults.headers["Access-Control-Allow-Credentials"] = true;
};

export const removeAfterLogout = () => {
  delete contribuildApi.defaults.headers["Authorization"];
  delete contribuildApi.defaults.headers['User_id'];
}

//  interceptor
contribuildApi.interceptors.response.use(
    function (response: AxiosResponse) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      return response;
    },
    function (error: any) {
        try{
          // Any status codes that falls outside the range of 2xx cause this function to trigger
          enqueueSnackbar({
            variant: "error",
            message: error && error.response && error.response.data && error.response.data.message ? error.response.data.message : 'An error occurred!'
          });
          if (error.code === 'ERR_NETWORK'){
            enqueueSnackbar({
              variant: "error",
              message: 'An error occurred, please check your internet connection!'
            });
          }
          // throw new axios.Cancel('Operation canceled by the user.');
          return Promise.reject(error);
        }catch{}
        },
);

export type StandardResponse<T> = {
  message: string;
  data: T;
  success: boolean;
};
