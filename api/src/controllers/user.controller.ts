import bcrypt from 'bcrypt';
import { createUser, getUser, updateUser } from '@/models/user.model';
import { generateToken } from '@/utils/jwt';

// create new user and return JWT token
export const registerController = (
  name: string,
  email: string,
  password: string,
  profile: string
) => {
  return new Promise<string>(async (resolve, reject) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    createUser({
      name,
      email,
      password: hashedPassword,
      profile,
    })
      .then((user) => resolve(generateMongoUserToken(user)))
      .catch(reject);
  });
};

// validate user credential and return JWT token
export const loginController = (email: string, password: string) => {
  return new Promise<string>((resolve, reject) => {
    getUser({ email })
      .then((user) => {
        // validating all fields to make typescript happy :)
        if (
          !user ||
          !user.name ||
          !user.email ||
          !user.password ||
          !user.name
        ) {
          return reject({ message: `User with ${email} not found` });
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (err) return reject({ message: 'Failed to validate password' });
          if (!res) return reject({ message: 'Invalid password' });

          resolve(generateMongoUserToken(user));
        });
      })
      .catch(reject);
  });
};

// update data and return JWT token
export const updateController = (
  id: string,
  data: {
    name?: string;
    email?: string;
    password?: string;
    profile?: string;
  }
) => {
  return new Promise<string>(async (resolve, reject) => {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    updateUser({
      id,
      ...data,
    })
      .then((user) => resolve(generateMongoUserToken(user)))
      .catch(reject);
  });
};

const generateMongoUserToken = (user: any) => {
  return generateToken({
    id: user?._id,
    name: user?.name,
    email: user?.email,
    profile: user?.profile,
  });
};
