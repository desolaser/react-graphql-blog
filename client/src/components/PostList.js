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

    return (
        <div className="post-list">
            {data.posts.map(post => (
                <Post key={post.title} data={post} />
            ))}
        </div>
    )
}

export default PostList