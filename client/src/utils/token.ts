import { LOCAL_STORAGE_TOKEN } from "@/constants";

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_TOKEN);
};

export const clearToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
};
