import { gql } from '@apollo/client'

const ADD_COMMENT = gql`
  mutation AddComment($content: String!, $postId: ID!, $userId: ID!) {
    addComment(content: $content, postId: $postId, userId: $userId) {
      id
      content
    }
  }
`

export default ADD_COMMENT