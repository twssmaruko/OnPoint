/* eslint-disable */

export const getPurchaseRequest = /* GraphQL */ `
  query GetPurchaseRequest($id: ID!) {
    getPurchaseRequest(id: $id) {
      id
      purchaseRequestNo
      isApproved
      orders {
        items {
          id
          product{
            id
            name
            description
          }
          purchaseRequestId
          unit
          quantity
          price
          createdAt
          updatedAt
        }
        nextToken
      }
      count
      monthYear
      dayMonthYear
      status
      totalPrice
      createdAt
      updatedAt
    }
  }
`;
