import React from 'react'
import { Card, CardHeader, CardContent, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    padding: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    marginTop: 20,
  }
})

const Login = () => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader title="Login" />
      <CardContent>
        <TextField 
          className={classes.input}
          label="Name"
          placeholder="Username"
        />
        <TextField 
          className={classes.input}
          label="Password"
          placeholder="Your Password"
        />
      </CardContent>
      <Button className={classes.button} variant="contained" color="primary">
        Login
      </Button>
    </Card>
  )
}

export default Login