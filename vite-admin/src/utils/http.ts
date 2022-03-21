import axios, { AxiosPromise, AxiosResponse, Method } from "axios";
import { useNavigate } from "react-router-dom";
import { clearStorageState, getStorageState } from "./storage";

interface ReqAttribute {
  baseURL: string;
  method: Method;
  token?: string;
  body?: any;
}

export const axiosApi: (
  requestOption: ReqAttribute
) => Promise<void | AxiosResponse<any, any>> = function ({
  baseURL,
  method,
  body,
}) {
  const headers: {
    [k: string]: string;
  } = {};
  const { token } = getStorageState();
  if (token.length) headers["Authorization"] = `Bearer ${token}`;
  return axios({
    baseURL,
    method,
    headers,
    data: body,
  }).catch((err) => {
    const navigator = useNavigate();
    navigator("/login", { replace: true });
    clearStorageState();
  });
};

interface P {
  method: Method;
  url: string;
  data?: any;
}

export const axiosReq: (a: P) => AxiosPromise<any> = function ({
  method,
  url,
  data,
}) {
  const headers: {
    [k: string]: string;
  } = {};
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return axios({
    method: method,
    baseURL: "/api" + url,
    data,
    headers,
  });
};
