import bcrypt from 'bcrypt';
import { prismaClient } from './prisma';

export const registerUserModel = (data: {
  username: string;
  name: string;
  password: string;
  profile: string;
}) => {
  return new Promise(async (resolve, reject) => {
    ``;
    data.password = await bcrypt.hash(data.password, 10);

    prismaClient.user
      .create({ data })
      .then(resolve)
      .catch((err) => {
        /* 
          https://www.prisma.io/docs/reference/api-reference/error-reference
          error `P2002` = "Unique constraint failed on the {constraint}" 
          user is trying to signup with and email which is already exits
        */
        if (err.code === 'P2002') {
          reject(`${data.username} already exist`);
          return;
        }

        reject('Failed to register user');
      });
  });
};
