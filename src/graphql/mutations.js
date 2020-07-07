/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVendor = /* GraphQL */ `
  mutation CreateVendor(
    $input: CreateVendorInput!
    $condition: ModelVendorConditionInput
  ) {
    createVendor(input: $input, condition: $condition) {
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
export const updateVendor = /* GraphQL */ `
  mutation UpdateVendor(
    $input: UpdateVendorInput!
    $condition: ModelVendorConditionInput
  ) {
    updateVendor(input: $input, condition: $condition) {
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
export const deleteVendor = /* GraphQL */ `
  mutation DeleteVendor(
    $input: DeleteVendorInput!
    $condition: ModelVendorConditionInput
  ) {
    deleteVendor(input: $input, condition: $condition) {
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
export const createPurchaseRequest = /* GraphQL */ `
  mutation CreatePurchaseRequest(
    $input: CreatePurchaseRequestInput!
    $condition: ModelPurchaseRequestConditionInput
  ) {
    createPurchaseRequest(input: $input, condition: $condition) {
      id
      purchaseRequestNo
      isApproved
      orders {
        items {
          id
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
      createdAt
      updatedAt
    }
  }
`;
export const updatePurchaseRequest = /* GraphQL */ `
  mutation UpdatePurchaseRequest(
    $input: UpdatePurchaseRequestInput!
    $condition: ModelPurchaseRequestConditionInput
  ) {
    updatePurchaseRequest(input: $input, condition: $condition) {
      id
      purchaseRequestNo
      isApproved
      orders {
        items {
          id
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
      createdAt
      updatedAt
    }
  }
`;
export const deletePurchaseRequest = /* GraphQL */ `
  mutation DeletePurchaseRequest(
    $input: DeletePurchaseRequestInput!
    $condition: ModelPurchaseRequestConditionInput
  ) {
    deletePurchaseRequest(input: $input, condition: $condition) {
      id
      purchaseRequestNo
      isApproved
      orders {
        items {
          id
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
      createdAt
      updatedAt
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      purchaseRequestId
      product {
        id
        name
        description
        createdAt
        updatedAt
      }
      unit
      quantity
      price
      createdAt
      updatedAt
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      purchaseRequestId
      product {
        id
        name
        description
        createdAt
        updatedAt
      }
      unit
      quantity
      price
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      purchaseRequestId
      product {
        id
        name
        description
        createdAt
        updatedAt
      }
      unit
      quantity
      price
      createdAt
      updatedAt
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
