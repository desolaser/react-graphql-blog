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

const LoginForm = ({ data, handleChange, handleSubmit }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader title="Login" />
      <CardContent>
        <TextField 
          className={classes.input}
          name="username"
          label="Username"
          placeholder="Username"
          helperText="Insert your username"
          value={data.username}
          onChange={handleChange}
          InputLabelProps={{
              shrink: true,
          }}
        />
        <TextField 
          className={classes.input}
          name="password"
          label="Password"
          placeholder="Password"
          helperText="Insert your password"
          value={data.password}
          onChange={handleChange}
          InputLabelProps={{
              shrink: true,
          }}
        />
      </CardContent>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleSubmit}>
        Login
      </Button>
    </Card>
  )
}

export default LoginForm