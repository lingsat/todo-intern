import { LOCAL_STORAGE_REFRESH, LOCAL_STORAGE_TOKEN } from "@/constants";

export const saveTokensToLocalStorage = (
  token: string,
  refreshToken: string
) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
  localStorage.setItem(LOCAL_STORAGE_REFRESH, refreshToken);
};

export const getTokenFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const clearTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH);
};
