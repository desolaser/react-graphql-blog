import { gql } from '@apollo/client'

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      payload
      user {
        id
        name
        role
      }
    }
  }
`

export default LOGIN