import React from 'react'
import dateFormatter from '../../utils/dateFormatter'
import { ListItem, ListItemText, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'

import validateAuth from '../../validation/validateAuth'
import EditDeleteButtons from '../../components/EditDeleteButtons'

const Post = ({ post }) => {
  const auth = useSelector(store => store.auth)
  const formattedDate = dateFormatter(post.createdAt)

  const editPost = () => {
    console.log("editing post")
  }

  const deletePost = () => {
    console.log("deleting post")
  }

  return(
    <Grid container>
      <Grid item xs={validateAuth(auth, post.user.id) ? 10 : 12}>
        <ListItem className="topic-item" component="a" href={`/post/${post.id}`} button>
          <ListItemText primary={post.title} secondary={`Created by ${post.user.name} - ${formattedDate}`} />
        </ListItem>
      </Grid>
      {validateAuth(auth, post.user.id) ? 
        <Grid item xs={2}>
          <EditDeleteButtons editFunction={editPost} deleteFunction={deletePost} />
        </Grid> 
        :
        null
      }
    </Grid>
  )
}

export default Post