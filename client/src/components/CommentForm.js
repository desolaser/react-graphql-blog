import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks';

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
            <div>
                <label className="label" htmlFor="id">Post Id</label>
                <select onChange={e => setId(e.target.value)} value={id} required>
                    <option value="">Select a post</option>
                    {data.posts.map(item => (
                        <option
                            key={item.id}
                            value={item.id}
                        >
                            {item.text}
                        </option>
                    ))}
                </select>              
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
            <button type="submit" className="submit-button">Add Comment</button>
        </form>
    )
}

export default CommentForm