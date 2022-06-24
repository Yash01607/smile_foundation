import { gql } from '@apollo/client';

export const GET_PRODUCT_LIST = gql`
  query {
    products(options: { sort: { id: ASC } }) {
      items {
        id
        name
        slug
        description
        featuredAsset {
          source
        }
      }
    }
  }
`;

export const GET_PRODUCT_DETAILS = gql`
  query ($id: ID!) {
    product(id: $id) {
      name
      description
      id
      featuredAsset {
        source
      }
      collections {
        id
        name
      }
      variants {
        id
        sku
        name
        featuredAsset {
          id
          source
        }
        facetValues {
          name
          id
        }
        assets {
          id
          source
        }
        price
        currencyCode
      }
    }
  }
`;
