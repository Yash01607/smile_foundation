import { gql } from '@apollo/client';

export const GET_ORDER_DETAILS = gql`
  query ($orderId: ID!) {
    order(id: $orderId) {
      total
      subTotal
      id
      currencyCode
      lines {
        id
        productVariant {
          product {
            collections {
              name
              id
            }
          }
          name
          id
          currencyCode
          productId
          price
          featuredAsset {
            id
            source
          }
        }
        unitPrice
        quantity
        linePrice
      }
    }
  }
`;

export const GET_ACTIVE_ORDER = gql`
  query {
    activeOrder {
      total
      subTotal
      id
      currencyCode
      lines {
        id
        productVariant {
          product {
            collections {
              name
              id
            }
          }
          name
          id
          currencyCode
          productId
          price
          featuredAsset {
            id
            source
          }
        }
        unitPrice
        quantity
        linePrice
      }
    }
  }
`;

export const GET_COUNTRIES_LIST = gql`
  query {
    availableCountries {
      code
      name
      id
    }
  }
`;

export const GET_AVAILABLE_SHIPPING_METHODS = gql`
  query {
    eligibleShippingMethods {
      id
      price
      code
      name
    }
  }
`;
