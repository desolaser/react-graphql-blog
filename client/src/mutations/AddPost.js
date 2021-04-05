import { gql } from '@apollo/client'

const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!, $topicId: ID!, $userId: ID!) {
    addPost(title: $title, content: $content, topicId: $topicId, userId: $userId) {
      id
      title
      content
    }
  }
`

export default ADD_POST