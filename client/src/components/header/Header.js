import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    title: {
      textAlign: 'center',
      margin: 20,
    },
}))

const Header = () => {
    const classes = useStyles()

    return (
        <div>
            <Typography variant="h2" className={classes.title}>
                React GraphQL Forum
            </Typography>
            <Typography variant="subtitle1" className={classes.title}>
                The bests posts ever
            </Typography>
        </div>
    )
}

export default Header