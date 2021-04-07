import React from 'react'
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

import dateFormatter from '../../utils/dateFormatter'
import validateAuth from '../../validation/validateAuth'
import EditDeleteButtons from '../../components/EditDeleteButtons'

const useStyles = makeStyles({
  root: {
    marginBottom: '10px'
  }
})

const Comment = ({comment}) => {
  const classes = useStyles()
  const auth = useSelector(store => store.auth)
  const formattedDate = dateFormatter(comment.createdAt)

  const editComment = () => {
    console.log("editing comment")
  }

  const deleteComment = () => {
    console.log("deleting comment")
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title={comment.user.name}
        subheader={comment.user.role}
      />
      <CardContent>
        <Typography color="textSecondary">
          {comment.content}
        </Typography>
        <Typography color="textSecondary">
          {formattedDate}
        </Typography>
      </CardContent>
      {validateAuth(auth, comment.user.id) ? 
        <EditDeleteButtons editFunction={editComment} deleteFunction={deleteComment} />
        :
        null
      }
    </Card>
  )
}

export default Comment