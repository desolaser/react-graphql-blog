import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    marginTop: 15
  }
})

const Loading = () => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">
          Loading...
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Loading