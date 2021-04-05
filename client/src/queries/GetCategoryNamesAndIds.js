import { gql } from '@apollo/client'

const GET_CATEGORY_NAMES_AND_IDS = gql`
  {
    categories {
      id
      name
    }
  }
`

export default GET_CATEGORY_NAMES_AND_IDS