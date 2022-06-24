import { gql } from '@apollo/client';

export const GET_COLLECTIONS_LIST = gql`
  query {
    collections(options: {}) {
      items {
        id
        name
        children {
          id
          name
          featuredAsset {
            id
            source
          }
        }
      }
    }
  }
`;

export const GET_COLLECTION_DETAILS = gql`
  query ($collectionId: ID!) {
    collection(id: $collectionId) {
      name
      id
      description
      featuredAsset {
        id
        name
        source
      }
    }
  }
`;

export const GET_COLLECTION_VARIANT_LIST = gql`
  query ($collectionId: ID!) {
    collection(id: $collectionId) {
      productVariants {
        items {
          id
          productId
        }
      }
    }
  }
`;
