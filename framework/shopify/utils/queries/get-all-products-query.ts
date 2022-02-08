export const productConnectionFragment = /* GraphQL */ `
  fragment productConnection on ProductConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        handle
        availableForSale
        title
        vendor
        description
        descriptionHtml
        options {
          id
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 250) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              id
              title
              sku
              availableForSale
              requiresShipping
              selectedOptions {
                name
                value
              }
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        images(first: 1) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              transformedSrc(maxWidth: 800)
              altText
              width
              height
            }
          }
        }
        metafields(first: 100) {
          edges {
            node {
              value
              namespace
              id
              key
            }
          }
        }
      }
    }
  }
`

const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $first: Int = 250
    $query: String = ""
    $sortKey: ProductSortKeys = RELEVANCE
    $reverse: Boolean = false
  ) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
      ...productConnection
    }
  }

  ${productConnectionFragment}
`
export default getAllProductsQuery
