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
    mutation AddComment($text: String!, $postId: ID!) {
        addComment(text: $text, postId: $postId) {
            id
            text
        }
    }
`
const getPostsQuery = gql`
    {
        posts {
            id
            text
        }
    }
`

const CommentForm = () => {
    const classes = useStyles()

    const [ id, setId ] = useState("")
    const [ text, setText ] = useState("")

    const [addComment, { result }] = useMutation(addCommentMutation);
    
    const { loading, error, data } = useQuery(getPostsQuery);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const handleSubmit = e => {
        e.preventDefault()

        addComment({ variables: {
            text,
            postId: id
        } })

        setId("")
        setText("")
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
                            {item.text}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                id="text"
                label="Text"
                style={{ margin: 8 }}
                placeholder="Text here"
                helperText="The content of the comment"
                fullWidth
                margin="normal"
                onChange={e => setText(e.target.value)}
                value={text}
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