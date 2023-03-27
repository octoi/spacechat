import mongoose from 'mongoose';
import { User } from '@/types/user.type';
import { MongooseError } from '@/types/error.type';

const UserSchema = new mongoose.Schema<User>({
  name: { type: String },
  email: { type: String, index: true, unique: true },
  password: { type: String },
  profile: { type: String },
});

const UserModel = mongoose.model<User>('user', UserSchema);

type UserResponse = mongoose.Document<unknown, {}, User> &
  Omit<
    User &
      Required<{
        _id: string;
      }>,
    never
  >;

export const createUser = (data: User) => {
  return new Promise<UserResponse>((resolve, reject) => {
    UserModel.create(data)
      .then((user) => resolve(user))
      .catch((err: MongooseError) => {
        if (err.code == 11000) {
          reject({
            ...err,
            message: `Email ${data.email} is already taken`,
          });
          return;
        }
        reject(err);
      });
  });
};

export const getUser = ({ id, email }: { id?: string; email?: string }) => {
  return id ? UserModel.findById(id) : UserModel.findOne({ email });
};

export const updateUser = (data: User) => {
  return new Promise<UserResponse>((resolve, reject) => {
    UserModel.findByIdAndUpdate(data._id, data)
      .then((user: any) => resolve(user))
      .catch((err: MongooseError) => {
        if (err.code == 11000) {
          reject({
            ...err,
            message: `Email ${data.email} is already taken`,
          });
          return;
        }
        reject(err);
      });
  });
};
