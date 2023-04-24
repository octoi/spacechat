import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidV4().replace(/\-/g, ''),
    },
    username: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    name: String,
    profile: String,
    about: String,
    password: String,
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

const UserModel = mongoose.model('User', UserSchema);

interface CreateUserArgs {
  username: string;
  name: string;
  profile: string;
  password: string;
}

export const createUser = (data: CreateUserArgs) => {
  return new Promise(async (resolve, reject) => {
    data.password = await bcrypt.hash(data.password, 10); // hashing password

    UserModel.create({ ...data })
      .then(resolve)
      .catch((err) => {
        // E11000 duplicate key error
        if (err && err.code === 11000) {
          reject('Username is taken.');
          return;
        }

        reject('Failed to create user.');
      });
  });
};

interface GetUserArgs {
  id?: string;
  username?: string;
}

export const getUser = (data: GetUserArgs) => {
  return new Promise((resolve, reject) => {
    if (!data.id && !data.username) {
      reject('Required params not given');
      return;
    }

    UserModel.findOne({ _id: data.id, username: data.username })
      .then(resolve)
      .catch(() => reject('Failed to find user.'));
  });
};

interface UpdateUserArgs {
  id: string;
  username?: string;
  name?: string;
  profile?: string;
  about?: string;
  password?: string;
}

export const updateUser = (data: UpdateUserArgs) => {
  return new Promise(async (resolve, reject) => {
    // hashing password if password is updating..
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    UserModel.updateOne({ _id: data.id }, { ...data })
      .then(resolve)
      .catch((err) => {
        // E11000 duplicate key error
        if (err && err.code === 11000) {
          reject('Username is taken.');
          return;
        }

        reject('Failed to update user.');
      });
  });
};

// Search user by `username` or `name`
export const searchUser = (query: string) => {
  return new Promise((resolve, reject) => {
    UserModel.find({
      // using OR because query between `username` and `name` should never clash
      // both should be independent searches
      $or: [
        { username: { $regex: query } }, // $regex will check the field text
        { name: { $regex: query } },
      ],
    })
      .then(resolve)
      .catch(() => reject('Failed to find user with given query.'));
  });
};
