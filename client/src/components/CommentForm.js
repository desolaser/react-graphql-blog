import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

const addCommentMutation = gql`
    mutation AddComment($content: String!, $postId: ID!) {
        addComment(content: $content, postId: $postId) {
            id
            content
        }
    }
`
const getPostsQuery = gql`
    {
        posts {
            id
            content
        }
    }
`

const CommentForm = () => {
    const classes = useStyles()

    const [ id, setId ] = useState("")
    const [ content, setContent ] = useState("")

    const [addComment, { result }] = useMutation(addCommentMutation);
    
    const { loading, error, data } = useQuery(getPostsQuery);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const handleSubmit = e => {
        e.preventDefault()

        addComment({ variables: {
            content,
            postId: id
        } })

        setId("")
        setContent("")
    }

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <FormControl className={classes.formControl}>
                <InputLabel id="age">Age</InputLabel>
                <Select
                    style={{ width: "80vw" }}
                    labelId="age"
                    id="demo-simple-select"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    required                    
                >
                    <MenuItem value="">Select a post</MenuItem>
                    {data.posts.map(item => (
                        <MenuItem
                            key={item.id}
                            value={item.id}
                        >
                            {item.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                id="content"
                label="Content"
                style={{ margin: 8 }}
                placeholder="Content here"
                helperText="The content of the comment"
                fullWidth
                margin="normal"
                onChange={e => setContent(e.target.value)}
                value={content}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button 
                variant="contained" 
                color="primary" 
                style={{ marginBottom: 20 }}
                onClick={handleSubmit}
            >
                Add Comment
            </Button>
        </form>
    )
}

export default CommentForm