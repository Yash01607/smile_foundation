import { gql } from '@apollo/client';

export const GET_ADDRESSES_LIST = gql`
  query {
    activeCustomer {
      addresses {
        id
        city
        streetLine1
        streetLine2
        postalCode
        province
        phoneNumber
        postalCode
        country {
          id
          name
          code
        }
        fullName
      }
    }
  }
`;

export const GET_ACTIVE_CUSTOMRE_DETAILS = gql`
  query {
    activeCustomer {
      id
      firstName
      lastName
      phoneNumber
      emailAddress
      addresses {
        id
        city
        streetLine1
        streetLine2
        postalCode
        province
        phoneNumber
        postalCode
        country {
          id
          name
          code
        }
        fullName
      }
    }
  }
`;
