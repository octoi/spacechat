import bcrypt from 'bcrypt';
import { prismaClient } from './prisma';

interface FindUserArgs {
  username?: string;
  id?: string;
}

export const findUser = ({ username, id }: FindUserArgs) => {
  return new Promise((resolve, reject) => {
    if (!(username || id)) {
      reject('Username or userId is not provided.');
      return;
    }

    prismaClient.user
      .findUnique({
        where: { username, id },
      })
      .then((user: any) => {
        if (!user) {
          reject('User does not exist');
          return;
        }
        resolve(user);
      })
      .catch(() => {
        reject('Failed to find user');
      });
  });
};

interface LoginUserData {
  username: string;
  password: string;
}

export const loginUser = (data: LoginUserData) => {
  return new Promise(async (resolve, reject) => {
    const user: any = await findUser({ username: data.username }).catch(reject);
    if (!user) return;

    bcrypt.compare(data.password, user?.password, (err, res) => {
      if (err) return reject('Failed to validate password');
      if (!res) return reject('Invalid password');
      resolve(user);
    });
  });
};

interface RegisterUserData {
  name: string;
  username: string;
  profile: string;
  password: string;
}

export const registerUser = (data: RegisterUserData) => {
  return new Promise(async (resolve, reject) => {
    data.password = await bcrypt.hash(data.password, 10);

    prismaClient.user
      .create({ data })
      .then(resolve)
      .catch((err: { code: string }) => {
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
