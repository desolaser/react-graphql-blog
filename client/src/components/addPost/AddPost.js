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

const addPostMutation = gql`
  mutation AddPost($title: String!, $content: String!) {
    addPost(title: $title, content: $content) {
      title
      content
      topicId
      userId
    }
  }
`

const AddPost = () => {
  const classes = useStyles()

  const [ title, setTitle ] = useState("")
  const [ content, setContent ] = useState("")
  const [ topicId, setTopicId ] = useState("")

  const [addPost, { data }] = useMutation(addPostMutation);

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