import { gql } from '@apollo/client'

const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      createdAt
      comments {
        id
        content
        createdAt
        user {
          id
          name
        }
      }
      user {
        id
        name
        role
      }
    }
  }
`

export default GET_POST