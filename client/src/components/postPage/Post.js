import React from 'react'
import { Typography, Card, CardHeader, CardContent } from '@material-ui/core'

import dateFormatter from '../../utils/dateFormatter'

const Post = ({post}) => {
  const formattedDate = dateFormatter(post.createdAt)

  return (
    <Card>
      <CardHeader
        title={post.user.name}
        subheader={post.user.role}
      />
      <CardContent>
        <Typography variant="h6">
          {post.title}
        </Typography>
        <Typography color="textSecondary">
          {post.content}
        </Typography>
        <Typography color="textSecondary">
          {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Post