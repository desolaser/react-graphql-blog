import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import ADD_TOPIC from '../../mutations/AddTopic'
import TopicForm from './TopicForm'

const useStyles = makeStyles({
  root: {
    marginTop: 15
  }
})

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
    alert("Topic added.")
  }

  return (
    <Card className={classes.root}>
      <CardHeader title="Add Topic" />
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