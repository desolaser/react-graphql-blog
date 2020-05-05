import React, { useState, useEffect } from 'react'
import Comment from './Comment'

const Post = props => {
    const [ comments, setComments ] = useState([])

    useEffect(() => {
        setComments([])
    }, [])

    const commentList = comments.map(comment => (
        <Comment key={comment.id} props={comment} />
    ))

    return (
        <div className="post">
            <h2>{props.post.title}</h2>
            <p>{props.post.text}</p>
            <div>
                {commentList}
            </div>
        </div>
    )
}

export default Post