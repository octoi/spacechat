export enum Paths {
  home = '/',
  login = '/account/login',
  register = '/account/register',
  settings = '/account/settings',
  user = '/user',
  notFound = '/404',
}

export const GRAPHQL_ENDPOINT =
  process.env.GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';
export const FILE_API_ENDPOINT =
  process.env.FILE_API_ENDPOINT || 'http://localhost:5000/file';
