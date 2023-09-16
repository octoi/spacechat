import { API_ENDPOINT } from './constants';

export const getFullURL = (pathName: string) => {
  const url = new URL(API_ENDPOINT, pathName);
  return url.href;
};
