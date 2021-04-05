import React from 'react'
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import dateFormatter from '../../utils/dateFormatter'
import EditDeleteButtons from '../../components/EditDeleteButtons'

const useStyles = makeStyles({
  root: {
    marginBottom: '10px'
  }
})

const Comment = ({comment}) => {
  const classes = useStyles()
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
      <EditDeleteButtons editFunction={editComment} deleteFunction={deleteComment} />
    </Card>
  )
}

export default Comment