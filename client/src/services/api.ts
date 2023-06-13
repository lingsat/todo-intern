import axios, { AxiosInstance } from "axios";

export const createApiInstance = (token?: string): AxiosInstance => {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const apiInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers,
  });

  return apiInstance;
};
