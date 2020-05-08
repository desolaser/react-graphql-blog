import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';
import { TextField, Button } from '@material-ui/core'

const addPostMutation = gql`
    mutation AddPost($title: String!, $text: String!) {
        addPost(title: $title, text: $text) {
            id
            title
            text
        }
    }
`

const PostList = () => {
    const [ title, setTitle ] = useState("")
    const [ text, setText ] = useState("")

    const [addPost, { data }] = useMutation(addPostMutation);

    const handleSubmit = e => {
        e.preventDefault()

        addPost({ variables: {
            title,
            text
        } })

        setTitle("")
        setText("")
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
                id="text"
                label="Text"
                style={{ margin: 8 }}
                placeholder="Text here"
                helperText="The content of the post"
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
                Add Post
            </Button>
        </form>
    )
}

export default PostList