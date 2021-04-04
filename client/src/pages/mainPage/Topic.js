import React from 'react'
import { ListItem, ListItemText, Button } from '@material-ui/core'
import dateFormatter from '../../utils/dateFormatter'

const Topic = ({topic}) => {
  const formattedDate = dateFormatter(topic.createdAt)

  const deleteTopic = () => {
    console.log("delete")
  }

  return (
    <ListItem key={topic.id} className="topic-item" component="a" href={`/topic/${topic.id}`} button>
      <ListItemText primary={topic.name} secondary={`Created by ${topic.user.name} - ${formattedDate}`} />
      <Button variant="contained" onClick={deleteTopic} color="secondary">X</Button>
    </ListItem>
  )
}

export default Topic
          