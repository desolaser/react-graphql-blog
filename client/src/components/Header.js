import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    title: {
      textAlign: 'center',
      margin: 20,
    }
}))

const Header = () => {
    const classes = useStyles()

    return (
        <Typography variant="h2" className={classes.title}>
            React GraphQL Forum
        </Typography>
    )
}

export default Header