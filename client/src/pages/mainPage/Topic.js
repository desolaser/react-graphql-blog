import React from 'react'
import { ListItem, ListItemText, IconButton, Grid } from '@material-ui/core'
import dateFormatter from '../../utils/dateFormatter'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

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
          <ListItemText primary={topic.name} secondary={`Created by ${topic.user.name} - ${formattedDate}`} />
        </ListItem>
      </Grid>
      <Grid item xs={2}>
        <ListItem key={topic.id} className="topic-item" style={{ height: "100%" }}>
          <IconButton 
            variant="contained" 
            onClick={deleteTopic} 
            style={{ margin: "auto" }}
            color="secondary">
            <DeleteIcon />
          </IconButton>
          <IconButton 
            variant="contained" 
            onClick={editTopic} 
            style={{ margin: "auto" }}
            color="primary">
            <EditIcon />
          </IconButton>
        </ListItem>
      </Grid>
    </Grid>
  )
}

export default Topic