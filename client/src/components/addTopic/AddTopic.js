import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import PostTopic from './PostTopic'
import Loading from '../Loading'

const ADD_TOPIC = gql`
  mutation AddTopic($name: String!, $categoryId: ID!, $userId: ID!) {
    addTopic(name: $name, categoryId: $categoryId, userId: $userId) {
      id
      name
    }
  }
`



const AddTopic = props => {
  return (
    <Card>
      <CardContent>
        
      </CardContent>
    </Card>
  )
}

export defautl AddTopic