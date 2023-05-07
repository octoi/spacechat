import { GraphQLError, GraphQLString } from 'graphql';
import { GraphQLDefaultFieldConfig } from '../typedefs/graphql.typedef';
import { UserType } from '../typedefs/user.typedef';
import { ValidatorMessage } from '@/utils/constants';
import { findUser } from '@/models/user.model';

export const GetUserQuery: GraphQLDefaultFieldConfig = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
  },
  async resolve(_, requestArgs) {
    if (!requestArgs?.username) {
      throw new GraphQLError(ValidatorMessage);
    }

    const user = await findUser({ username: requestArgs?.username }).catch(
      (err) => {
        throw new GraphQLError(err);
      }
    );

    return user;
  },
};
