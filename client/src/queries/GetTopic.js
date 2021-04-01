import gql from 'graphql-tag'

const GET_TOPIC = gql`
  query getTopic($id: ID!) {
    topic(id: $id) {
      id
      name
      posts {
        id
        title
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

export default GET_TOPIC