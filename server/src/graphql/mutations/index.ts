import { GraphQLObjectType } from 'graphql';
import {
  LoginMutation,
  RegisterMutation,
  UpdateMutation,
} from './user.mutation';
import {
  AddMemberMutation,
  CreateChatRoomMutation,
  DismissAdminMutation,
  MakeAdminMutation,
  RemoveMemberMutation,
  UpdateChatRoomMutation,
} from './chatroom.mutation';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    // user mutations
    register: RegisterMutation,
    login: LoginMutation,
    updateUser: UpdateMutation,
    // chatroom mutations
    createChatRoom: CreateChatRoomMutation,
    updateChatRoom: UpdateChatRoomMutation,
    // chatroom user mutation
    addMember: AddMemberMutation,
    removeMember: RemoveMemberMutation,
    makeAdmin: MakeAdminMutation,
    dismissAdmin: DismissAdminMutation,
  }),
});
