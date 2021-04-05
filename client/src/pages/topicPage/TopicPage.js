import React from 'react'
import { useQuery } from '@apollo/client'
import { AppBar, Typography, List, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import GET_TOPIC from '../../queries/GetTopic'

import Loading from '../../components/Loading'
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
        {data.topic.posts.map(post => <Post key={post.id} post={post}/>)}
      </List>
    </div>
  )
}

export default TopicPage