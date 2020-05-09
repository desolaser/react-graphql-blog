import React from 'react'
import { AppBar, Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

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

const Category = props => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static" className="app-bar">
                <Grid container justify="space-between">
                    <Typography variant="subtitle1" inline>
                        {props.data.name}
                    </Typography>
                    <Typography variant="caption" align="right" inline>
                        {`Created by ${props.data.user.name}`}
                    </Typography>
                </Grid>
            </AppBar>
            <List component="nav">
                {props.data.topics.map(topic => (
                    <ListItem key={topic.id} className="topic-item" component="a" href="" button>
                        <ListItemText primary={topic.name} secondary={`Created by ${topic.user.name}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Category