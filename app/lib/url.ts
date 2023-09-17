import { API_ENDPOINT } from './constants';

export const getFullURL = (pathName: string) => {
  const url = new URL(pathName, API_ENDPOINT);
  return url.href;
};
