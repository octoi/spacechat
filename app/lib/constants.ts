export enum Paths {
  home = '/',
  login = '/account/login',
  register = '/account/register',
  settings = '/account/settings',
  chat = '/chat',
  notFound = '/404',
}

export const API_ENDPOINT =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000';
