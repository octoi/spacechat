import { GraphQLError } from 'graphql';
import { ValidatorMessage } from '@/utils/constants';

export const validateRegisterArgs = (args: {
  username: string;
  name: string;
  password: string;
  profile: string;
}) => {
  if (!args.username || !args.name || !args.password || !args.profile) {
    throw new GraphQLError(ValidatorMessage);
  }

  return args;
};

export const validateLoginArgs = (args: {
  username: string;
  password: string;
}) => {
  if (!args.username || !args.password) {
    throw new GraphQLError(ValidatorMessage);
  }

  return args;
};
