import { gql } from '@apollo/client'

const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $password: String!) {
    signUp(name: $name, email: $email, password: $password) {
      payload
      user {
        id
        name
        role
      }
    }
  }
`

export default SIGN_UP