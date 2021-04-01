import gql from 'graphql-tag'

const ADD_TOPIC = gql`
  mutation AddTopic($name: String!, $categoryId: ID!, $userId: ID!) {
    addTopic(name: $name, categoryId: $categoryId, userId: $userId) {
      id
      name
    }
  }
`

export default ADD_TOPIC