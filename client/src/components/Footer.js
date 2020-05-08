import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    title: {
      textAlign: 'center',
      margin: 20,
    }
}))

const Footer = () => {
    const classes = useStyles()
    
    return (
        <footer className="footer">            
            <Typography variant="h5" className={classes.title}>
                Footer
            </Typography>
        </footer>
    )
}

export default Footer