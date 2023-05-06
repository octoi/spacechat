import { GraphQLObjectType } from 'graphql';
import {
  LoginMutation,
  RegisterMutation,
  UpdateMutation,
} from './user.mutation';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    // user mutations
    register: RegisterMutation,
    login: LoginMutation,
    updateUser: UpdateMutation,
  }),
});
