import React from 'react'
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import dateFormatter from '../../utils/dateFormatter'

const useStyles = makeStyles({
  root: {
    marginBottom: '10px'
  }
})

const Comment = ({comment}) => {
  const classes = useStyles()
  const formattedDate = dateFormatter(comment.createdAt)

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
    </Card>
  )
}

export default Comment