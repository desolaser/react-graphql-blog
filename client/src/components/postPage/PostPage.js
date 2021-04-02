import React from 'react'
import { useQuery } from '@apollo/client'
import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import GET_POST from '../../queries/GetPost'

import Loading from '../Loading'
import Comment from './Comment'
import Post from './Post'
import CommentForm from './CommentForm'

const useStyles = makeStyles({
  root: {
    margin: '15px 0',
    '& .app-bar': {
      padding: '4px 10px',
      backgroundColor: '#4CB58A'
    },
    '& .topic-item': {
      backgroundColor: '#FFFFFF',
      marginBottom: '5px',
    }
  }
})

const PostPage = props => {    
  const classes = useStyles()
  const postId = props.match.params.id

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: postId }
  })

  if (loading) return <Loading />
  if (error) return `Error ${error.message}`
  
  return (
    <div className={classes.root}>
      <Post post={data.post}/>
      <CommentForm postId={postId} />
      <List component="nav">
        {data.post.comments.map(comment => 
          <Comment key={comment.id} comment={comment} />)}
      </List>
    </div>
  )
}

export default PostPage