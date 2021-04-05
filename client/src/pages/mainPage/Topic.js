import React from 'react'
import { ListItem, ListItemText, Grid } from '@material-ui/core'
import dateFormatter from '../../utils/dateFormatter'
import EditDeleteButtons from '../../components/EditDeleteButtons'

const Topic = ({ topic }) => {
  const formattedDate = dateFormatter(topic.createdAt)

  const deleteTopic = () => {
    console.log("delete")
  }

  const editTopic = () => {
    console.log("edit")
  }

  return (
    <Grid container>
      <Grid item xs={10}>
        <ListItem key={topic.id} className="topic-item" component="a" href={`/topic/${topic.id}`} button>
          <ListItemText
            key={topic.id}
            primary={topic.name}
            secondary={`Created by ${topic.user.name} - ${formattedDate}`}
          />
        </ListItem>
      </Grid>
      <Grid item xs={2}>
        <EditDeleteButtons editFunction={editTopic} deleteFunction={deleteTopic} />
      </Grid>
    </Grid>
  )
}

export default Topic