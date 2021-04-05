import React from 'react'
import dateFormatter from '../../utils/dateFormatter'
import { ListItem, ListItemText, Grid } from '@material-ui/core'
import EditDeleteButtons from '../../components/EditDeleteButtons'

const Post = ({ post }) => {
  const formattedDate = dateFormatter(post.createdAt)

  const editPost = () => {
    console.log("editing post")
  }

  const deletePost = () => {
    console.log("deleting post")
  }

  return(
    <Grid container>
      <Grid item xs={10}>
        <ListItem className="topic-item" component="a" href={`/post/${post.id}`} button>
          <ListItemText primary={post.title} secondary={`Created by ${post.user.name} - ${formattedDate}`} />
        </ListItem>
      </Grid>
      <Grid item xs={2}>
        <EditDeleteButtons editFunction={editPost} deleteFunction={deletePost} />
      </Grid>
    </Grid>
  )
}

export default Post