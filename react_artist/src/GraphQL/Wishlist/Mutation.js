import { gql } from '@apollo/client';

export const ADD_ITEM_TO_WISHLIST = gql`
  mutation ($Favourite: [String!]) {
    updateCustomer(input: { customFields: { Favourite: $Favourite } }) {
      id
    }
  }
`;
