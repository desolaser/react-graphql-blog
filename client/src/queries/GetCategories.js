import gql from 'graphql-tag'

const GET_CATEGORIES = gql`
  {
    categories {
      id
      name
      topics {
        id
        name
        createdAt
        user {
          id
          name
        }
      }
      user {
        id
        name
      }
    }
  }
`

export default GET_CATEGORIES