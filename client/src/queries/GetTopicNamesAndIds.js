import { gql } from '@apollo/client'

const GET_TOPIC_NAMES_AND_IDS = gql`
  {
    topics {
      id
      name
    }
  }
`

export default GET_TOPIC_NAMES_AND_IDS