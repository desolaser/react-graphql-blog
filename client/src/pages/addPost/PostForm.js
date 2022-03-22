import React from 'react'
import { useQuery } from '@apollo/client'
import { 
  Box,
  FormControl, 
  InputLabel, 
  TextField, 
  Button, 
  Select, 
  Typography,
  MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Remarkable } from 'remarkable'
import GET_TOPIC_NAMES_AND_IDS from '../../queries/GetTopicNamesAndIds'
import Loading from '../../components/Loading'

const md = new Remarkable()

const useStyles = makeStyles({  
  select: {
    width: '100%'
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
      <Typography mt={2} variant="h5" mb={2}>Preview</Typography>
      <Typography my={2} dangerouslySetInnerHTML={{__html: md.render(content)}}>
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit}
      >
        Add Post
      </Button>
    </>
  )
}

export default PostForm