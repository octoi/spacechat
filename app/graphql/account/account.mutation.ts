import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation ($username: String, $password: String) {
    login(username: $username, password: $password) {
      id
      username
      name
      profile
      about
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation (
    $name: String
    $username: String
    $password: String
    $profile: String
  ) {
    register(
      name: $name
      username: $username
      password: $password
      profile: $profile
    ) {
      id
      username
      name
      profile
      about
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation (
    $name: String
    $username: String
    $password: String
    $profile: String
    $about: String
  ) {
    updateUser(
      name: $name
      username: $username
      password: $password
      profile: $profile
      bio: $bio
    ) {
      id
      username
      name
      profile
      about
      token
    }
  }
`;
