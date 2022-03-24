import axios, { AxiosPromise, AxiosResponse, Method } from "axios";
import { useNavigate } from "react-router-dom";
import { clearStorageState, getStorageState } from "./storage";

const myaxios = axios.create({});

interface ReqAttribute {
  baseURL: string;
  method: Method;
  token?: string;
  body?: any;
}

interface P {
  method: Method;
  url: string;
  data?: any;
  signal?: AbortSignal;
}

export const axiosReq: (a: P) => AxiosPromise<any> = function ({
  method,
  url,
  data,
  signal,
}) {
  const headers: {
    [k: string]: string;
  } = {};
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return myaxios.request({
    signal: signal,
    method: method,
    baseURL: "/api" + url,
    data,
    headers,
  });
};
