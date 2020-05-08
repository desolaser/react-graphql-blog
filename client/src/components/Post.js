import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Comment from './Comment'

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: 25
    }
}))

const Post = props => {
    const classes = useStyles()

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h3" gutterBottom>
                    {props.data.title}
                </Typography>
                <Typography variant="h6" component="p" color="textSecondary">
                    {props.data.content}
                </Typography>
                <div>
                    {props.data.comments.map(comment => (
                        <Comment key={comment.id} data={comment} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default Post