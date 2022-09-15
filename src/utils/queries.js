import gql from "graphql-tag";

//navigation menu
export const getMenuItems = gql`
  {
    categories {
      name
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
      attributes {
        id
        name
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
