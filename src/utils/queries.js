import gql from "graphql-tag";

export const getMenuItems = gql`
  {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

export const getCategoryItems = gql`
  query category($input: CategoryInput!) {
    category(input: $input) {
      products {
        id
        name
        inStock
        gallery
        category
        attributes {
          type
          name
          items {
            displayValue
          }
        }

        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const getProductDetails = gql`
  query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      brand
      attributes {
        id
        name
        type
        items {
          displayValue
          id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
`;
