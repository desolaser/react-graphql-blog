import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import PostForm from './PostForm'

const useStyles = makeStyles({
  root: {
    marginTop: 15
  }
})

const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!, $topicId: ID!, $userId: ID!) {
    addPost(title: $title, content: $content, topicId: $topicId, userId: $userId) {
      id
      title
      content
    }
  }
`

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

      alert("Post added.")
  }

  return (
    <Card className={classes.root}>
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