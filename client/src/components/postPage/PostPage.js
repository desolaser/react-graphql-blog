import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

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

const GET_POST = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      createdAt
      comments {
        id
        content
        createdAt
        user {
          id
          name
        }
      }
      user {
        id
        name
        role
      }
    }
  }
`

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