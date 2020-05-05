import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';
import Post from './Post'

const getPostsQuery = gql`
    {
        posts {
            title
            text
        }
    }
`

const PostList = () => {
    const { loading, error, data } = useQuery(getPostsQuery);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    const postList = data.posts.map(post => (
        <Post key={post.title} data={post} />
    ))

    return (
        <div className="post-list">
            { postList }
        </div>
    )
}

export default PostList