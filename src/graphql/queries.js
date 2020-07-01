/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVendor = /* GraphQL */ `
  query GetVendor($id: ID!) {
    getVendor(id: $id) {
      id
      name
      address
      contactNumber
      terms
      createdAt
      updatedAt
    }
  }
`;
export const listVendors = /* GraphQL */ `
  query ListVendors(
    $filter: ModelVendorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVendors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address
        contactNumber
        terms
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPurchaseRequest = /* GraphQL */ `
  query GetPurchaseRequest($id: ID!) {
    getPurchaseRequest(id: $id) {
      id
      purchaseRequestNo
      isApproved
      orders {
        items {
          id
          unit
          qty
          price
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPurchaseRequests = /* GraphQL */ `
  query ListPurchaseRequests(
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPurchaseRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      product {
        id
        name
        description
        createdAt
        updatedAt
      }
      unit
      qty
      price
      purchaserequest {
        id
        purchaseRequestNo
        isApproved
        orders {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        product {
          id
          name
          description
          createdAt
          updatedAt
        }
        unit
        qty
        price
        purchaserequest {
          id
          purchaseRequestNo
          isApproved
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
