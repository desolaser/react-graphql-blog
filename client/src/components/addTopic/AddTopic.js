import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import TopicForm from './TopicForm'

const useStyles = makeStyles({
  root: {
    marginTop: 15
  }
})

const ADD_TOPIC = gql`
  mutation AddTopic($name: String!, $categoryId: ID!, $userId: ID!) {
    addTopic(name: $name, categoryId: $categoryId, userId: $userId) {
      id
      name
    }
  }
`

const AddTopic = () => {
  const classes = useStyles()
  const [ name, setName ] = useState("")
  const [ categoryId, setCategoryId ] = useState("")
  const [addTopic, { data }] = useMutation(ADD_TOPIC)

  const handleSubmit = e => {
    e.preventDefault()

    addTopic({ variables: {
        name,
        categoryId,
        userId: "5f19a89406e46c239cb04040",
    } })

    setName("")

    console.log(data)
    alert("Post added.")
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <TopicForm
          name={name}
          setName={setName}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          handleSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  )
}

export default AddTopic