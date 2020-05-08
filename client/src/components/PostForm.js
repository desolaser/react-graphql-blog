import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';

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
        <form className="post-form" onSubmit={handleSubmit}>
            <div>
                <label className="label" htmlFor="title">Title</label>
                <input 
                    className="input"
                    type="text"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    required
                />                
            </div>
            <div>
                <label className="label" htmlFor="text">Text</label>
                <input
                    className="input"
                    type="text"
                    onChange={e => setText(e.target.value)}
                    value={text}
                    required
                />
            </div>
            <button type="submit" className="submit-button">Add Post</button>
        </form>
    )
}

export default PostList