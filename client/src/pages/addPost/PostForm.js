import React from 'react'
import { useQuery } from '@apollo/client'
import { FormControl, InputLabel, TextField, Button, Select, MenuItem, TextareaAutosize } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import GET_TOPIC_NAMES_AND_IDS from '../../queries/GetTopicNamesAndIds'
import Loading from '../../components/Loading'

const useStyles = makeStyles({  
  select: {
    width: '100%',
    marginLeft: 8
  }
})

const PostForm = ({title, setTitle, topicId, setTopicId, content, setContent, handleSubmit}) => {
  const classes = useStyles()

  const { loading, error, data } = useQuery(GET_TOPIC_NAMES_AND_IDS)

  if (loading) return <Loading />
  if (error) return `Error! ${error.message}`

  return (
    <>
      <TextField
        id="title"
        label="Title"
        style={{ margin: 8 }}
        placeholder="Title here"
        helperText="The title of the post"
        fullWidth
        margin="normal"
        onChange={e => setTitle(e.target.value)}
        value={title}
        InputLabelProps={{
            shrink: true,
        }}
      />
      <FormControl className={classes.select}>
        <InputLabel id="topicId">Topic</InputLabel>
        <Select
          labelId="topicId"
          id="topicId"
          value={topicId}
          onChange={e => setTopicId(e.target.value)}
        >
          {data.topics.map(topic => <MenuItem key={topic.id} value={topic.id}>{topic.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className={classes.select}>
        <TextField
          id="content"
          label="Content"
          placeholder="Write the content of the post here"
          helperText="The content of the post"
          fullWidth
          margin="normal"
          multiline
          rows={10}
          onChange={e => setContent(e.target.value)}
          value={content}
          InputLabelProps={{
              shrink: true,
          }}
        />
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

export default PostForm