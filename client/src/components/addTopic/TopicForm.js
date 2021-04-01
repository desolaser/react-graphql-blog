import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { FormControl, InputLabel, TextField, Button, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import Loading from '../Loading'

const useStyles = makeStyles({  
  select: {
    width: '100%',
    marginLeft: 8
  }
})

const GET_CATEGORIES = gql`
  {
    categories {
      id
      name
    }
  }
`

const TopicForm = ({name, setName, categoryId, setCategoryId, handleSubmit}) => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_CATEGORIES)

  if (loading) return <Loading />
  if (error) return `Error! ${error.message}`

  return (
    <>
      <TextField
        id="name"
        label="name"
        style={{ margin: 8 }}
        placeholder="Name here"
        helperText="The name of the topic"
        fullWidth
        margin="normal"
        onChange={e => setName(e.target.value)}
        value={name}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <FormControl className={classes.select}>
        <InputLabel id="categoryId">Topic</InputLabel>
        <Select
          labelId="categoryId"
          id="categoryId"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        >
          {data.categories.map(category => 
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
        </Select>
      </FormControl>
      <Button 
          variant="contained" 
          color="primary" 
          style={{ marginBottom: 20 }}
          onClick={handleSubmit}
      >
          Add Post
      </Button>
    </>
  )
}

export default TopicForm