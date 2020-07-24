/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVendor = /* GraphQL */ `
  query GetVendor($id: ID!) {
    getVendor(id: $id) {
      id
      vendorName
      location
      telNo
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
        vendorName
        location
        telNo
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
        product
        unit
        quantity
        category
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
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
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
export const purchaseRequestDayCreatedAt = /* GraphQL */ `
  query PurchaseRequestDayCreatedAt(
    $dayMonthYear: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestDayCreatedAt(
      dayMonthYear: $dayMonthYear
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const purchaseRequestMonthCreatedAt = /* GraphQL */ `
  query PurchaseRequestMonthCreatedAt(
    $monthYear: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestMonthCreatedAt(
      monthYear: $monthYear
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const purchaseRequestStatusMonthYearCreatedAt = /* GraphQL */ `
  query PurchaseRequestStatusMonthYearCreatedAt(
    $status: Status
    $monthYearCreatedAt: ModelPurchaseRequestStatuswithMonthYearCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestStatusMonthYearCreatedAt(
      status: $status
      monthYearCreatedAt: $monthYearCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const purchaseRequestIsApprovedMonthYearCreatedAt = /* GraphQL */ `
  query PurchaseRequestIsApprovedMonthYearCreatedAt(
    $isApproved: isApproved
    $monthYearCreatedAt: ModelPurchaseRequestApprovedwithMonthYearCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestIsApprovedMonthYearCreatedAt(
      isApproved: $isApproved
      monthYearCreatedAt: $monthYearCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const purchaseRequestStatusDayMonthYearCreatedAt = /* GraphQL */ `
  query PurchaseRequestStatusDayMonthYearCreatedAt(
    $status: Status
    $dayMonthYearCreatedAt: ModelPurchaseRequestStatuswithDayMonthYearCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestStatusDayMonthYearCreatedAt(
      status: $status
      dayMonthYearCreatedAt: $dayMonthYearCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const purchaseRequestIsApprovedDayMonthYearcreatedAt = /* GraphQL */ `
  query PurchaseRequestIsApprovedDayMonthYearcreatedAt(
    $isApproved: isApproved
    $dayMonthYearCreatedAt: ModelPurchaseRequestApprovedwithDayMonthYearCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestIsApprovedDayMonthYearcreatedAt(
      isApproved: $isApproved
      dayMonthYearCreatedAt: $dayMonthYearCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const purchaseRequestStatusCreatedAt = /* GraphQL */ `
  query PurchaseRequestStatusCreatedAt(
    $status: Status
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestStatusCreatedAt(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const purchaseRequestIsApprovedCreatedAt = /* GraphQL */ `
  query PurchaseRequestIsApprovedCreatedAt(
    $isApproved: isApproved
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestIsApprovedCreatedAt(
      isApproved: $isApproved
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const purchaseRequestStatusIsApprovedMonthYear = /* GraphQL */ `
  query PurchaseRequestStatusIsApprovedMonthYear(
    $status: Status
    $isApprovedMonthYear: ModelPurchaseRequestStatuswithApprovedMonthYearCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestStatusIsApprovedMonthYear(
      status: $status
      isApprovedMonthYear: $isApprovedMonthYear
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const purchaseRequestStatusIsApprovedCreatedAt = /* GraphQL */ `
  query PurchaseRequestStatusIsApprovedCreatedAt(
    $status: Status
    $isApprovedCreatedAt: ModelPurchaseRequestStatuswithApprovedCreatedAtCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestStatusIsApprovedCreatedAt(
      status: $status
      isApprovedCreatedAt: $isApprovedCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const purchaseRequestStatusIsApprovedDayMonthYear = /* GraphQL */ `
  query PurchaseRequestStatusIsApprovedDayMonthYear(
    $status: Status
    $isApprovedDayMonthYear: ModelPurchaseRequestStatuswithApprovedDayMonthYearCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPurchaseRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseRequestStatusIsApprovedDayMonthYear(
      status: $status
      isApprovedDayMonthYear: $isApprovedDayMonthYear
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchVendors = /* GraphQL */ `
  query SearchVendors(
    $filter: SearchableVendorFilterInput
    $sort: SearchableVendorSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchVendors(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        vendorName
        location
        telNo
        terms
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchPurchaseRequests = /* GraphQL */ `
  query SearchPurchaseRequests(
    $filter: SearchablePurchaseRequestFilterInput
    $sort: SearchablePurchaseRequestSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchPurchaseRequests(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        purchaseRequestNo
        isApproved
        orders {
          product
          unit
          quantity
          category
        }
        count
        monthYear
        dayMonthYear
        status
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchProducts = /* GraphQL */ `
  query SearchProducts(
    $filter: SearchableProductFilterInput
    $sort: SearchableProductSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchProducts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
