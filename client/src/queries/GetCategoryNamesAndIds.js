import gql from 'graphql-tag'

const GET_CATEGORY_NAMES_AND_IDS = gql`
  {
    categories {
      id
      name
    }
  }
`

export default GET_CATEGORY_NAMES_AND_IDS