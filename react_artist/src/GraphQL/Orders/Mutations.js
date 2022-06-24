import { gql } from "@apollo/client";

export const ADD_ITEM_TO_ORDER = gql`
  mutation ($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        id
      }
      ... on OrderModificationError {
        errorCode
        message
      }
      ... on OrderLimitError {
        errorCode
        message
      }
      ... on NegativeQuantityError {
        errorCode
        message
      }
      ... on InsufficientStockError {
        errorCode
        message
        quantityAvailable
      }
    }
  }
`;

export const REMOVE_ITEM_FROM_ORDER = gql`
  mutation ($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      ... on Order {
        id
      }
      ... on OrderModificationError {
        errorCode
        message
      }
    }
  }
`;

export const SET_ORDER_SHIPPING_ADDRESS = gql`
  mutation (
    $fullName: String!
    $streetLine1: String!
    $streetLine2: String!
    $city: String!
    $province: String!
    $postalCode: String!
    $countryCode: String!
    $phoneNumber: String!
  ) {
    setOrderShippingAddress(
      input: {
        fullName: $fullName
        streetLine1: $streetLine1
        streetLine2: $streetLine2
        city: $city
        province: $province
        postalCode: $postalCode
        countryCode: $countryCode
        phoneNumber: $phoneNumber
      }
    ) {
      ... on Order {
        id
      }
      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`;
