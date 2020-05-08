import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import { TextField, Button } from '@material-ui/core'

const addPostMutation = gql`
    mutation AddPost($title: String!, $content: String!) {
        addPost(title: $title, content: $content) {
            id
            title
            content
        }
    }
`

const PostList = () => {
    const [ title, setTitle ] = useState("")
    const [ content, setContent ] = useState("")

    const [addPost, { data }] = useMutation(addPostMutation);

    const handleSubmit = e => {
        e.preventDefault()

        addPost({ variables: {
            title,
            content
        } })

        setTitle("")
        setContent("")
        console.log(data)
    }

    return (
        <form className="post-form">
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
            <TextField
                id="content"
                label="Content"
                style={{ margin: 8 }}
                placeholder="Content here"
                helperText="The content of the post"
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
                Add Post
            </Button>
        </form>
    )
}

export default PostList