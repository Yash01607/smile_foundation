import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation (
    $assetIds: [ID!]
    $enabled: Boolean!
    $featuredAssetId: ID!
    $languageCode: LanguageCode!
    $name: String!
    $slug: String!
    $description: String!
  ) {
    createProduct(
      input: {
        assetIds: $assetIds
        enabled: $enabled
        featuredAssetId: $featuredAssetId
        translations: {
          languageCode: $languageCode
          name: $name
          slug: $slug
          description: $description
        }
      }
    ) {
      id
    }
  }
`;
