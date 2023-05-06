import { GraphQLError, GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { UserType } from '../typedefs/user.typedef';
import { loginUser, registerUser, updateUser } from '@/models/user.model';
import { generateToken, getUserFromContext } from '@/utils/jwt';
import {
  validateLoginArgs,
  validateRegisterArgs,
} from '../validators/user.validator';

export const RegisterMutation: GraphQLDefaultFieldConfig = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    profile: { type: GraphQLString },
  },
  async resolve(_, requestArgs) {
    const args = validateRegisterArgs(requestArgs);
    const user: any = await registerUser(args).catch((err) => {
      throw new GraphQLError(err);
    });

    return {
      ...user,
      token: generateToken(user),
    };
  },
};

export const LoginMutation: GraphQLDefaultFieldConfig = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, requestArgs) {
    const args = validateLoginArgs(requestArgs);
    const user: any = await loginUser(args).catch((err) => {
      throw new GraphQLError(err);
    });

    return {
      ...user,
      token: generateToken(user),
    };
  },
};

export const UpdateMutation: GraphQLDefaultFieldConfig = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    password: { type: GraphQLString },
    profile: { type: GraphQLString },
    about: { type: GraphQLString },
  },
  async resolve(_, requestArgs, context) {
    const requestUser: any = getUserFromContext(context);

    const user: any = await updateUser(requestUser?.id, requestArgs).catch(
      (err) => {
        throw new GraphQLError(err);
      }
    );

    return {
      ...user,
      token: generateToken(user),
    };
  },
};
