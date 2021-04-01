import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AppBar, Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import dateFormatter from '../../utils/dateFormatter'
import Loading from '../Loading'

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

const GET_TOPIC = gql`
  query getTopic($id: ID!) {
    topic(id: $id) {
      id
      name
      posts {
        id
        title
        createdAt
        user {
          id
          name
        }
      }
      user {
        id
        name
      }
    }
  }
`

const TopicPage = props => {    
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_TOPIC, {
    variables: { id: props.match.params.id }
  })

  if (loading) return <Loading />
  if (error) return `Error ${error.message}`

  return (
    <div className={classes.root}>
      <AppBar position="static" className="app-bar">
        <Grid container justify="space-between">
          <Typography variant="subtitle1" inline>
            {data.topic.name}
          </Typography>
          <Typography variant="caption" align="right" inline>
            {`Created by ${data.topic.user.name}`}
          </Typography>
        </Grid>
      </AppBar>
      <List component="nav">
        {data.topic.posts.map(post => {
          const formattedDate = dateFormatter(post.createdAt)
          return(
            <ListItem key={post.id} className="topic-item" component="a" href={`/post/${post.id}`} button>
              <ListItemText primary={post.title} secondary={`Created by ${post.user.name} - ${formattedDate}`} />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default TopicPage