import React, { useState, useEffect } from 'react'
import Comment from './Comment'

const Post = props => {
    const [ comments, setComments ] = useState([])

    useEffect(() => {
        setComments([])
    }, [])

    const commentList = comments.map(comment => (
        <Comment key={comment.id} data={comment} />
    ))

    return (
        <div className="post">
            <h2>{props.data.title}</h2>
            <p>{props.data.text}</p>
            <div>
                {commentList}
            </div>
        </div>
    )
}

export default Post