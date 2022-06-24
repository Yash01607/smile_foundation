import { gql } from "@apollo/client";

export const GET_ASSET_LIST = gql`
  query {
    assets(options: { sort: { id: ASC } }) {
      items {
        name
        type
        source
        id
      }
    }
  }
`;
