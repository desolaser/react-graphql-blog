import gql from 'graphql-tag'

const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!, $userId: ID!) {
    addCategory(name: $name, userId: $userId) {
      id
      name
    }
  }
`

export default ADD_CATEGORY