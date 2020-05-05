import React from 'react'

const Comment = props => {
    return (
        <div className="comment">
            {props.data.text}
        </div>
    )
}

export default Comment