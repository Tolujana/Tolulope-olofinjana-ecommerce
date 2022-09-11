import gql from "graphql-tag";

//navigation menu
export const getMenuItems = gql`
  {
    categories {
      name
    }
  }
`;

export const getCategoryItems = (id) => gql`
  {
    category(input: { title: "${id}" }) {
      products {
        id
        name
        inStock
        gallery
        description
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
