import React from 'react'
import Comment from './Comment'

const Post = props => {
    return (
        <div className="post">
            <h2>{props.data.title}</h2>
            <p>{props.data.text}</p>
            <div>
                {props.data.comments.map(comment => (
                    <Comment key={comment.id} data={comment} />
                ))}
            </div>
        </div>
    )
}

export default Post