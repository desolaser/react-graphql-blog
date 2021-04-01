import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import ADD_POST from '../../mutations/AddPost'
import PostForm from './PostForm'

const useStyles = makeStyles({
  root: {
    marginTop: 15
  }
})

const AddPost = () => {
  const classes = useStyles()

  const [ title, setTitle ] = useState("")
  const [ content, setContent ] = useState("")
  const [ topicId, setTopicId ] = useState("")

  const [addPost, { data }] = useMutation(ADD_POST);

  const handleSubmit = e => {
    e.preventDefault()

    addPost({ variables: {
        title,
        content,
        topicId,
        userId: "5f19a89406e46c239cb04040",
    } })

    setTitle("")
    setContent("")

    console.log(data)
    alert("Post added.")
  }

  return (
    <Card className={classes.root}>
      <CardHeader title="Add Post" />
      <CardContent>
        <PostForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          topicId={topicId}
          setTopicId={setTopicId}
          handleSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  )
}

export default AddPost