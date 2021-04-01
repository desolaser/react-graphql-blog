import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import GET_POST from '../../queries/GetPost'

import Loading from '../Loading'
import Comment from './Comment'
import Post from './Post'

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

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: props.match.params.id }
  })

  if (loading) return <Loading />
  if (error) return `Error ${error.message}`
  
  return (
    <div className={classes.root}>
      <Post post={data.post}/>
      <List component="nav">
        {data.post.comments.map(comment => 
          <Comment key={comment.id} comment={comment} />)}
      </List>
    </div>
  )
}

export default PostPage