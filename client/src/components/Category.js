import React from 'react'
import { 
    AppBar, 
    Typography,
    List, 
    ListItem, 
    ListItemText, 
    Grid, 
    Card, 
    CardContent } 
from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import dateFormatter from '../utils/dateFormatter'

const useStyles = makeStyles({
    root: {
        marginBottom: '10px',
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

const Category = ({data}) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" className="app-bar">
                <Grid container justify="space-between">
                    <Typography variant="subtitle1" inline>
                        {data.name}
                    </Typography>
                    <Typography variant="caption" align="right" inline>
                        {`Created by ${data.user.name}`}
                    </Typography>
                </Grid>
            </AppBar>
            <List component="nav">
                {data.topics.length == 0 ? (
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                This category hasn't topics
                            </Typography>
                        </CardContent>
                    </Card>
                )
                :
                data.topics.map(topic => {
                    const formattedDate = dateFormatter(topic.createdAt)
                    return (
                        <ListItem key={topic.id} className="topic-item" component="a" href={`/topic/${topic.id}`} button>
                            <ListItemText primary={topic.name} secondary={`Created by ${topic.user.name} - ${formattedDate}`} />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}

export default Category