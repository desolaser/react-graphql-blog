import React from 'react'

const Comment = props => {
    return (
        <div className="comment">
            {props.data.content}
        </div>
    )
}

export default Comment