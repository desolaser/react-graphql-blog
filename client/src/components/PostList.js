import React, { useState, useEffect } from 'react'
import Post from './Post'

const PostList = () => {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        setPosts([])
    }, [])

    const postList = posts.map(post => (
        <Post key={post.id} props={post} />
    ))

    return (
        <div className="post-list">
            {postList}
        </div>
    )
}

export default PostList