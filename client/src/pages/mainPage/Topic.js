import React from 'react'
import { useSelector } from 'react-redux'
import { ListItem, ListItemText, Grid } from '@material-ui/core'

import dateFormatter from '../../utils/dateFormatter'
import EditDeleteButtons from '../../components/EditDeleteButtons'
import validateAuth from '../../validation/validateAuth'

const Topic = ({ topic }) => {
  const auth = useSelector(store => store.auth)
  const formattedDate = dateFormatter(topic.createdAt)

  const deleteTopic = () => {
    console.log("delete")
  }

  const editTopic = () => {
    console.log("edit")
  }

  return (
    <Grid container>
      <Grid item xs={validateAuth(auth, topic.user.id) ? 10 : 12}>
        <ListItem key={topic.id} className="topic-item" component="a" href={`/topic/${topic.id}`} button>
          <ListItemText
            key={topic.id}
            primary={topic.name}
            secondary={`Created by ${topic.user.name} - ${formattedDate}`}
          />
        </ListItem>
      </Grid>
      {validateAuth(auth, topic.user.id) ? 
        <Grid item xs={2}>
          <EditDeleteButtons editFunction={editTopic} deleteFunction={deleteTopic} />
        </Grid> 
        :
        null
      }
    </Grid>
  )
}

export default Topic