//import {Link, User} from './types';
import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      id
    }
  }
`;
/*
export interface CreateUserMutationResponse {
  loading: boolean;
  createUser: User;
  signinUser: {
    token: string,
    user?: User
  };
}*/

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!, $clientID: String!) {
    login(loginInput: {
      email: $email,
      password: $password
      clientID: $clientID
    }) {
      token,
      id
    }
  }
`;

export const SIGNOUT_USER_MUTATION = gql`
  mutation SignoutUserMutation{
    logout{
      done
    }
  }
`;


/*
export interface CreateUserMutationResponse {
  loading: boolean;
  signinUser: {
    token: string,
    user?: User
  };
}*/