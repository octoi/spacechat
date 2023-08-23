import bcrypt from 'bcrypt';
import { prismaClient } from './prisma';

export const findUserModel = ({
  username,
  id,
}: {
  username?: string;
  id?: number;
}) => {
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
      .catch(() => reject('Failed to find user'));
  });
};

export const registerUserModel = (data: {
  username: string;
  name: string;
  password: string;
  profile: string;
}) => {
  return new Promise(async (resolve, reject) => {
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

export const loginUserModel = (data: {
  username: string;
  password: string;
}) => {
  return new Promise(async (resolve, reject) => {
    const user: any = await findUserModel({ username: data.username }).catch(
      reject
    );

    if (!user) return;

    bcrypt.compare(data.password, user?.password, (err, res) => {
      if (err) return reject('Failed to validate password');
      if (!res) return reject('Invalid password');
      resolve(user);
    });
  });
};

export const updateUserModel = (
  userId: number,
  data: {
    name?: string;
    username?: string;
    password?: string;
    profile?: string;
    about?: string;
  }
) => {
  return new Promise(async (resolve, reject) => {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    prismaClient.user
      .update({
        where: { id: userId },
        data,
      })
      .then(resolve)
      .catch(() => reject('Failed to update user'));
  });
};

export const getUserChatListModel = (userId: number) => {
  return new Promise((resolve, reject) => {
    prismaClient.user
      .findMany({
        where: {
          OR: [
            // fetching users who have sent given user messages
            {
              sent: {
                some: {
                  targetId: userId,
                },
              },
            },
            // fetching users who the given user sent messages to
            {
              received: {
                some: {
                  senderId: userId,
                },
              },
            },
          ],
        },
        include: {
          _count: {
            select: {
              sent: {
                // including count which is not seen
                where: {
                  targetId: userId,
                  status: 'SENT' || 'RECEIVED',
                  // OR: [{ status: 'SENT' }, { status: 'RECEIVED' }],
                },
              },
            },
          },
          // get last message
          sent: {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      })
      .then(resolve)
      .catch((err) => {
        console.log(err);
        reject('Failed to fetch chat list');
      });
  });
};
