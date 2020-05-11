import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Typography, List, Card, CardContent, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {
        margin: '15px 0',
        '& .app-bar': {
            padding: '4px 10px',
            backgroundColor: '#4CB58A'
        },
        '& .topic-item': {
            backgroundColor: '#FFFFFF',
            marginBottom: '5px',
        }
    }
})

const GET_POST = gql`
    query getPost($id: ID!) {
        post(id: $id) {
            id
            title
            content
            comments {
                id
                content
                user {
                    id
                    name
                }
            }
            user {
                id
                name
            }
        }
    }
`

const PostPage = props => {    
    const classes = useStyles()

    const { loading, error, data } = useQuery(GET_POST, {
        variables: { id: props.match.params.id }
    })

    if (loading) return "loading..."
    if (error) return `Error ${error.message}`

    return (
        <div className={classes.root}>
            <Card>
                <CardHeader
                    title={data.post.user.name}
                    subheader={data.post.user.role}
                />
                <CardContent>
                    <Typography color="title">
                        {data.post.title}
                    </Typography>
                    <Typography color="textSecondary">
                        {data.post.content}
                    </Typography>
                </CardContent>
            </Card>
            <List component="nav">
                {data.post.comments.map(comment => (
                    <Card>
                        <CardHeader
                            title={data.comment.user.name}
                            subheader={data.comment.user.role}
                        />
                        <CardContent>
                            <Typography color="textSecondary">
                                {data.post.content}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </div>
    )
}

export default PostPage