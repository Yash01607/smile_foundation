import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerCustomerAccount(
    $emailAddress: String!
    $title: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $password: String!
  ) {
    registerCustomerAccount(
      input: {
        emailAddress: $emailAddress
        title: $title
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        password: $password
      }
    ) {
      ... on Success {
        success
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on CurrentUser {
        identifier
        id
      }
      ... on InvalidCredentialsError {
        errorCode
        message
        authenticationError
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
      ... on NotVerifiedError {
        errorCode
        message
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation {
    logout {
      success
    }
  }
`;
