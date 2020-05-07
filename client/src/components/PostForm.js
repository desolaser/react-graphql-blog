import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const addPostMutation = gql`
    mutation {
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

    const handleSubmit = () => {
        return true
    }

    return (
        <form class="post-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input class="input" type="text" onChange={e => setTitle(e.target.value)}/>                
            </div>
            <div>
                <label htmlFor="text">Text</label>
                <input class="input" type="text" onChange={e => setText(e.target.value)}/>
            </div>
            <button class="submit-button">Add Post</button>
        </form>
    )
}

export default PostList