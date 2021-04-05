import React from 'react'
import { ListItem, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const EditDeleteButtons = ({ editFunction, deleteFunction }) => (
  <ListItem className="topic-item" style={{ height: "100%" }}>
    <IconButton 
      variant="contained" 
      onClick={editFunction} 
      style={{ margin: "auto" }}
      color="primary">
      <EditIcon />
    </IconButton>
    <IconButton 
      variant="contained" 
      onClick={deleteFunction} 
      style={{ margin: "auto" }}
      color="secondary">
      <DeleteIcon />
    </IconButton>
  </ListItem>
)

export default EditDeleteButtons