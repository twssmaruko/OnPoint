/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVendor = /* GraphQL */ `
  subscription OnCreateVendor {
    onCreateVendor {
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
export const onUpdateVendor = /* GraphQL */ `
  subscription OnUpdateVendor {
    onUpdateVendor {
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
export const onDeleteVendor = /* GraphQL */ `
  subscription OnDeleteVendor {
    onDeleteVendor {
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
export const onCreatePurchaseRequest = /* GraphQL */ `
  subscription OnCreatePurchaseRequest {
    onCreatePurchaseRequest {
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
export const onUpdatePurchaseRequest = /* GraphQL */ `
  subscription OnUpdatePurchaseRequest {
    onUpdatePurchaseRequest {
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
export const onDeletePurchaseRequest = /* GraphQL */ `
  subscription OnDeletePurchaseRequest {
    onDeletePurchaseRequest {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
