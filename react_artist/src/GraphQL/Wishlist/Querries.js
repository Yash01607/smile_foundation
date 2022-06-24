import { gql } from '@apollo/client';

export const GET_WISHLIST = gql`
  query {
    activeCustomer {
      id
      customFields {
        Favourite
      }
    }
  }
`;
