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
    },
    card: {
        marginBottom: '10px'
    }
})

const GET_POST = gql`
    query getPost($id: ID!) {
        post(id: $id) {
            id
            title
            content
            createdAt
            comments {
                id
                content
                createdAt
                user {
                    id
                    name
                }
            }
            user {
                id
                name
                role
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
    
    const topicDate = new Date(Date.parse(data.post.createdAt))
    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(topicDate)
    const formattedDate = `${da}-${mo}-${ye}`

    return (
        <div className={classes.root}>
            <Card>
                <CardHeader
                    title={data.post.user.name}
                    subheader={data.post.user.role}
                />
                <CardContent>
                    <Typography variant="h6">
                        {data.post.title}
                    </Typography>
                    <Typography color="textSecondary">
                        {data.post.content}
                    </Typography>
                    <Typography color="textSecondary">
                        {formattedDate}
                    </Typography>
                </CardContent>
            </Card>
            <List component="nav">
                {data.post.comments.map(comment => {                    
                    const topicDate = new Date(Date.parse(comment.createdAt))
                    const dtf = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
                    const [{ value: mo },,{ value: da },,{ value: ye }] = dtf.formatToParts(topicDate)
                    const formattedDate = `${da}-${mo}-${ye}`
                    return (
                        <Card className={classes.card}>
                            <CardHeader
                                title={comment.user.name}
                                subheader={comment.user.role}
                            />
                            <CardContent>
                                <Typography color="textSecondary">
                                    {comment.content}
                                </Typography>
                                <Typography color="textSecondary">
                                    {formattedDate}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })}
            </List>
        </div>
    )
}

export default PostPage