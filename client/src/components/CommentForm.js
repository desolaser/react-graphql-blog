import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks';

const addCommentMutation = gql`
    mutation AddComment($id: String!, $text: String!) {
        addComment(id: $id, text: $text) {
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

    const [addComment, { data }] = useMutation(addCommentMutation);
    
    const { loading, error, data } = useQuery(getPostsQuery);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const handleSubmit = e => {
        e.preventDefault()

        addComment({ variables: {
            id,
            text
        } })

        setId("")
        setText("")
        console.log(data)
    }

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <div>
                <label className="label" htmlFor="id">Post Id</label>
                <select className="input" onChange={e => setId(e.target.value)} value={id} required>
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
            <button type="submit" className="submit-button">Add Post</button>
        </form>
    )
}

export default CommentForm