import { gql } from '@apollo/client';

export const GET_USER_DETAILS = gql`
  query GetUser($username: String) {
    getUser(username: $username) {
      name
      username
      profile
    }
  }
`;
