import axios from "axios";
import { ErrorInfo, useState } from "react";

const axiosBase = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
const basicApi = () => {
  axios.defaults.baseURL = "http://localhost:8080";
  axiosBase.interceptors.response.use(
    (response) => response,
    (error) => {
      throw error;
    }
  );

  return axiosBase;
};
export default function customApi<T = any>(url: string) {
  const postApi = async (data: T) => {
    const result = await basicApi().post(url, data);
    return result.data;
  };
  const getApi = async () => {
    const result = await basicApi().get(url);
    return result.data;
  };

  const deleteApi = async (data: T) => {
    const result = await basicApi().delete(url, { data });
    return result.data;
  };
  const putApi = async (data: T) => {
    const result = await basicApi().put(url, data);
    return result.data;
  };
  return { postApi, getApi, deleteApi, putApi };
}