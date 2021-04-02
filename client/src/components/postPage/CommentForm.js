import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Card, CardHeader, CardContent, TextField, Button } from '@material-ui/core'

import ADD_COMMENT from '../../mutations/AddComment'

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState("")
  const [addComment, { data }] = useMutation(ADD_COMMENT)

  const handleSubmit = e => {
    e.preventDefault()
    addComment({ variables: {
      content,
      postId,
      userId: "5f19a89406e46c239cb04040",
    } })

    setContent("")
    console.log(data)
    alert('Comment added')
  }

  return (
    <Card>
      <CardHeader title={"Make a comment"} />
      <CardContent>
        <TextField 
          id="comment"
          label="Comment"
          placeholder="Comment text"
          helperText="Do a comment to share your thoughts"
          margin="normal"
          value={content}
          onChange={e => setContent(e.target.value)}
          fullWidth
          multiline
          InputLabelProps={{
              shrink: true,
          }}
        />
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 20 }}
        onClick={handleSubmit}
      >
        Submit comment
      </Button>
    </Card>
  )
}

export default CommentForm